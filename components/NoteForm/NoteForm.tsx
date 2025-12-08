'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [tag, setTag] = useState('Todo');

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    onError: error => {
      console.error('Failed to create note:', error);
      alert('Failed to create note. Check console for details.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input
          className={css.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea
          className={css.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select
          className={css.select}
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          className={css.submitButton}
          disabled={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? 'Saving...' : 'Create'}
        </button>
        <button className={css.cancelButton} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
