'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import SearchBar from '@/components/SearchBar/SearchBar';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

export default function NotesClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Your Notes</h1>
        <NoteForm />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <NoteList notes={filteredNotes} />
      </div>
    </main>
  );
}
