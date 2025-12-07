'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 🔥 ВИПРАВЛЕНИЙ СТЕЙТ CATEGORY
  const [category, setCategory] = useState<'personal' | 'work' | 'education'>(
    'personal'
  );

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, category });
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
        <label>Category</label>

        <select
          className={css.select}
          value={category}
          onChange={e =>
            setCategory(e.target.value as 'personal' | 'work' | 'education')
          }
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="education">Education</option>
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
