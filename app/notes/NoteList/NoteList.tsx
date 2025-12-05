import Link from 'next/link';
import styles from './NoteList.module.css';

export default function NoteList({ notes }: { notes: any[] }) {
  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li className={styles.item} key={note.id}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.text}>{note.content}</p>

          <Link href={`/notes/${note.id}`} className={styles.link}>
            Read more →
          </Link>
        </li>
      ))}
    </ul>
  );
}
