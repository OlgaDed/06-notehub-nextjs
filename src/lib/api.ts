import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined');
}

const headers = {
  Authorization: token,
};

type NotesResponse = {
  items: Note[];
  totalPages: number;
};

export async function fetchNotes(params?: {
  search?: string;
  page?: number;
}): Promise<NotesResponse> {
  const { search = '', page = 1 } = params ?? {};

  const response = await axios.get(`${API_BASE_URL}/notes`, {
    headers,
    params: {
      search,
      page,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await axios.get(`${API_BASE_URL}/notes/${id}`, {
    headers,
  });
  return response.data;
}
