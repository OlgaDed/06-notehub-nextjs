// components/SearchBox/SearchBox.tsx
'use client';

import css from './SearchBox.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBox({ value, onChange, placeholder }: Props) {
  return (
    <input
      className={css.input}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? 'Search notes...'}
      aria-label="Search notes"
    />
  );
}
