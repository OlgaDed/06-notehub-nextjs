'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder,
}: SearchBoxProps) {
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
