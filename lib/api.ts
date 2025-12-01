import axios from 'axios';
import { Note } from '@/types/note';

const API_URL = 'https://notehub-api.onrender.com/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await axiosInstance.get<Note[]>('');
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axiosInstance.get<Note>(`/${id}`);
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>('', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
