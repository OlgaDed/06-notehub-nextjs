import axios from 'axios';
import type { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  console.warn('WARNING: NOTEHUB TOKEN IS MISSING!');
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page = 1,
  search = ''
): Promise<NotesResponse> {
  const params: Record<string, string> = {
    page: String(page),
    perPage: '12',
  };

  if (search.trim() !== '') {
    params.search = search;
  }

  const { data } = await api.get<NotesResponse>('/notes', { params });

  return {
    notes: data.notes || [],
    totalPages: data.totalPages || 1,
  };
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
