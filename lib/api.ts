import axios from 'axios';

import type { Note, NotePayload } from '../types/note';

const api = axios.create({
  baseURL: 'https://goit-notehub.herokuapp.com',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (searchQuery: string = ''): Promise<Note[]> => {
  const params = searchQuery ? { search: searchQuery } : {};

  const { data } = await api.get('/notes', { params });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: NotePayload): Promise<Note> => {
  const { data } = await api.post('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
