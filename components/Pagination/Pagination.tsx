// components/Pagination/Pagination.tsx
'use client';

import css from './Pagination.module.css';

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      <li
        className={page === 1 ? `${css['disabled']}` : ''}
        onClick={() => page > 1 && onChange(page - 1)}
        role="button"
      >
        <a>←</a>
      </li>

      {pages.map(p => (
        <li
          key={p}
          className={p === page ? `${css.active}` : ''}
          onClick={() => onChange(p)}
          role="button"
        >
          <a>{p}</a>
        </li>
      ))}

      <li
        className={page === totalPages ? `${css['disabled']}` : ''}
        onClick={() => page < totalPages && onChange(page + 1)}
        role="button"
      >
        <a>→</a>
      </li>
    </ul>
  );
}
