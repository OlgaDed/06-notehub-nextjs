// src/app/notes/Notes.client.tsx
'use client';

import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
// + useQuery, SearchBox, Pagination і т. д.

export default function NotesClient() {
  // тут твоя логіка useQuery, стейт пошуку, форми тощо

  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <h1>Notes</h1>
        <button className={css.button} type="button">
          Add note
        </button>
      </div>

      {/* Тут уже рендериш SearchBox, NoteForm, NoteList, Pagination */}
    </main>
  );
}
