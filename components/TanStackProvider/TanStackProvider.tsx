'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  useQuery,
  useMutation,
  type DehydratedState,
} from '@tanstack/react-query';

import { fetchNotes, deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

import NoteItem from '../../components/NoteItem/NoteItem';

import styles from './NotesPage.module.css';

interface NotesPageClientProps {
  dehydratedState: DehydratedState;
}

export default function NotesPageClient({
  dehydratedState,
}: NotesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: notes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Note[], Error>({
    queryKey: ['notes', searchQuery],
    queryFn: () => fetchNotes(searchQuery),

    initialData: dehydratedState.queries?.find(q => q.queryKey[0] === 'notes')
      ?.state.data as Note[] | undefined,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      refetch();
    },
    onError: err => {
      console.error('Failed to delete note:', err);
      alert('Failed to delete note. See console for details.');
    },
  });

  const handleDeleteNote = (id: string) => {
    if (window.confirm(`Are you sure you want to delete this note?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading || deleteMutation.isPending) {
    return <p className={styles.loading}>Loading notes...</p>;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        Could not load notes. Error: {error.message}
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Notes</h1>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <Link href="/notes/new" className={styles.createButton}>
            Create note +
          </Link>
        </div>
        <p className={styles.noNotes}>
          No notes found. Try adjusting your search query.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Notes</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <Link href="/notes/new" className={styles.createButton}>
          Create note +
        </Link>
      </div>

      <ul className={styles.list}>
        {notes.map(note => (
          <li key={note.id} className={styles.listItem}>
            <NoteItem note={note} onDelete={handleDeleteNote} />
          </li>
        ))}
      </ul>
    </div>
  );
}
