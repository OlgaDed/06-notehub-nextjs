'use client';

import { useState } from 'react';
import { createNote } from '../../../lib/api';
import styles from './NoteForm.module.css';

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    await createNote({ title, content });
    window.location.href = '/notes';
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        placeholder="Content"
        onChange={e => setContent(e.target.value)}
      />

      <button className={styles.btn}>Create</button>
    </form>
  );
}
