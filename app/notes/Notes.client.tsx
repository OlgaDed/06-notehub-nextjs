'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';
import css from './NotesPage.module.css';
import type { Note } from '@/types/note';

export default function NotesClient() {
  const [search, setSearch] = useState('');

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
      if (!token) {
        throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is missing');
      }

      const res = await fetch('https://notehub-public.goit.study/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const json = await res.json();

      if (!Array.isArray(json)) {
        throw new Error('API returned non-array data');
      }

      return json;
    },
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error)
    return (
      <p>❌ Could not fetch the list of notes. {(error as Error).message}</p>
    );

  const filtered = (data || []).filter(
    n =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/create" className={css.button}>
          Create note
        </Link>
      </div>

      <NoteList notes={filtered} />
    </div>
  );
}
