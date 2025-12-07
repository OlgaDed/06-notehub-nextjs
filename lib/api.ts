import axios from 'axios';
import { Note, NoteCreatePayload } from '@/types/note';

const api = axios.create({
  baseURL: 'https://notes-api.goit.global',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(): Promise<Note[]> {
  const response = await api.get('/notes');
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: NoteCreatePayload): Promise<Note> {
  const response = await api.post('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}

console.log('TOKEN:', process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);
