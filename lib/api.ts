import type { Note, NoteInput } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/notes`, {
    cache: 'no-store',
  });
  return res.json();
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export async function createNote(payload: NoteInput): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateNote(
  id: string,
  payload: NoteInput
): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
}
