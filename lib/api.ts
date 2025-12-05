import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goit-notehub.herokuapp.com',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});

export const fetchNotes = async () => {
  const { data } = await api.get('/notes');
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: any) => {
  const { data } = await api.post('/notes', payload);
  return data;
};
