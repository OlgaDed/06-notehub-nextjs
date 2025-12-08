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

  if (search.trim() !== '') {
    url.searchParams.set('search', search);
  }

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: defaultHeaders,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error fetching notes:', res.status, errorText);
    throw new Error(`Failed to fetch notes: ${res.status}`);
  }

  const data = await res.json();

  console.log('📦 Notes data sample:', data.notes?.[0]);

  return {
    notes: data.notes || [],
    totalPages: data.totalPages || 1,
  };
}

export async function fetchNoteById(id: string) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    cache: 'no-store',
    headers: defaultHeaders,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error fetching note:', errorText);
    throw new Error('Failed to fetch note');
  }

  return res.json();
}

export async function createNote(payload: {
  title: string;
  content: string;
  tag: string; // ← змінено з category на tag
}) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error creating note:', res.status, errorText);
    throw new Error(`Failed to create note: ${errorText}`);
  }

  return res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error deleting note:', errorText);
    throw new Error('Failed to delete note');
  }
}
