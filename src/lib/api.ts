import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export async function fetchNoteById(id: string) {
  const response = await axios.get(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
}
