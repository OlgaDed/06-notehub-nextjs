import Link from 'next/link';
import { Note } from '@/types/note';
import NoteItem from '@/components/NoteItem/NoteItem';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p className={css.empty}>No notes found</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.item}>
          <NoteItem note={note} />
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.viewLink}>
              View details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
