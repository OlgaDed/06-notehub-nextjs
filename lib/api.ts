import type { Note } from '@/types/note';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch('/api/notes', {
    cache: 'no-store',
  });
  return res.json();
}
