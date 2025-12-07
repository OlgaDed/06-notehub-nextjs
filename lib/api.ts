// lib/api.ts

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  console.warn('⚠️ WARNING: NOTEHUB TOKEN IS MISSING!');
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

export async function fetchNotes(page = 1, search = '') {
  const url = new URL(`${BASE_URL}/notes`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('perPage', '12');
  if (search.trim() !== '') url.searchParams.set('search', search);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: defaultHeaders,
  });

  if (!res.ok) {
    console.error('Error fetching notes:', res.status);
    throw new Error('Failed to fetch notes');
  }

  const data = await res.json();
  return {
    notes: Array.isArray(data) ? data : data.notes,
    totalPages: data.totalPages ?? 1,
  };
}

export async function fetchNoteById(id: string) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    cache: 'no-store',
    headers: defaultHeaders,
  });

  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

export async function createNote(payload) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to create note');

  return res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });

  if (!res.ok) throw new Error('Failed to delete note');
}
