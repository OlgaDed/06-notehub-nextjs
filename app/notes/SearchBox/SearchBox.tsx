'use client';

import { useState } from 'react';
import styles from './SearchBox.module.css';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <div className={styles.box}>
      <input
        className={styles.input}
        placeholder="Search notes..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
