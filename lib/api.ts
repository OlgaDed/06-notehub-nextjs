// lib/api.ts
const BASE_URL = 'https://notehub-public.goit.study/api';

export async function fetchNotes() {
  const res = await fetch(`${BASE_URL}/notes`, {
    cache: 'no-store',
  });

  const data = await res.json();

  // ДЗ5 повертає data.notes, а API GoIT у цьому проекті повертає просто масив
  return Array.isArray(data) ? data : data.notes;
}

export async function fetchNoteById(id: string) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export type CreateNoteInput = {
  title: string;
  content: string;
  category: string;
};

export async function createNote(payload: CreateNoteInput) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function deleteNote(id: string) {
  await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
}
