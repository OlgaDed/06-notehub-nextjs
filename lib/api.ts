import type { Note, NoteCreatePayload, NoteUpdatePayload } from '@/types/note';

const BASE_URL = 'https://notes-api.goit.global';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/notes`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

export async function createNote(payload: NoteCreatePayload): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to create note');
  return res.json();
}

export async function updateNote(
  id: string,
  payload: NoteUpdatePayload
): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete note');
}
