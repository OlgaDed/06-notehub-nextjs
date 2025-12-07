// lib/api.ts
export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

const BASE_URL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/notes`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  const data = await res.json();
  return data;
}

export type CreateNoteInput = {
  title: string;
  content: string;
  category: string;
};

export async function createNote(payload: CreateNoteInput): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create note');
  }

  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete note');
  }
}
