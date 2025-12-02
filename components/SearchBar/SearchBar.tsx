'use client';

import css from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={css.searchWrapper}>
      <input
        type="text"
        className={css.searchInput}
        placeholder="Search notes by title or content..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
