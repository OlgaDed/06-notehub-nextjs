'use client';

import Link from 'next/link';

import type { Note } from '@/types/note';

import css from './NoteItem.module.css';

interface NoteItemProps {
  note: Note;

  onDelete: (id: string) => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the note: "${note.title}"?`
      )
    ) {
      onDelete(note.id);
    }
  };

  const contentPreview =
    note.content.substring(0, 150) + (note.content.length > 150 ? '...' : '');

  return (
    <article className={css.item}>
      <div className={css.header}>
        <h3 className={css.title}>{note.title}</h3>
      </div>

      <p className={css.content}>{contentPreview}</p>

      {note.category && (
        <div className={css.tags}>
          <span className={css.tag}>{note.category}</span>
        </div>
      )}

      <div className={css.actions}>
        <Link href={`/notes/${note.id}`} className={css.viewLink}>
          View details
        </Link>

        <button
          onClick={handleDelete}
          type="button"
          className={css.deleteButton}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
