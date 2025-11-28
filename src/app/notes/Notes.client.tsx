'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import { fetchNotes, createNote, deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

type NotesResponse = {
  items: Note[];
  totalPages: number;
};

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<NotesResponse>({
    queryKey: ['notes', { search, page }],
    queryFn: () => fetchNotes({ search, page }),
  });

  const notes = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleAddNote = (data: { title: string; content: string }) => {
    createMutation.mutate(data);
  };

  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <h1>Notes</h1>
        {/* Ця кнопка може, наприклад, скролити до форми або відкривати модал */}
        <button
          className={css.button}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Add note
        </button>
      </div>

      <SearchBox value={search} onChange={handleSearchChange} />

      <NoteForm
        onSubmit={handleAddNote}
        isSubmitting={createMutation.isPending}
      />

      {isLoading && <p>Loading, please wait...</p>}

      {isError && <p>Oops, something went wrong: {(error as Error).message}</p>}

      {!isLoading && !isError && (
        <>
          <NoteList notes={notes} onDelete={handleDeleteNote} />

          {/* 🔢 Пагінація */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
