'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });

  if (isLoading) return <p>Loading…</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.app}>
      {/* 🔵 ПАГІНАЦІЯ ЗВЕРХУ */}
      <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />

      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        <button className={css.button} onClick={() => setIsOpen(true)}>
          + Create note
        </button>
      </div>

      <NoteList notes={data.notes} />

      {/* 🔵 МОДАЛКА ДЛЯ СТВОРЕННЯ НОТАТКИ */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
