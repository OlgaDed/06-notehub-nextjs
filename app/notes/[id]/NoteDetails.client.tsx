// app/notes/[id]/NoteDetails.client.tsx
'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  useQuery,
} from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import styles from './NoteDetails.module.css';

interface Props {
  id: string;
  dehydratedState: DehydratedState | null;
}

export default function NoteDetailsClient({ id, dehydratedState }: Props) {
  const [qc] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={qc}>
      <HydrationBoundary state={dehydratedState}>
        <NoteDetailsContent id={id} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

function NoteDetailsContent({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (isError || !note)
    return <div className={styles.error}>Could not fetch note details.</div>;

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{note.title}</h1>
      </header>

      <section className={styles.content}>
        <p>{note.content}</p>
      </section>

      <footer className={styles.footer}>
        <span className={styles.date}>{note.createdAt ?? 'Unknown date'}</span>
      </footer>
    </article>
  );
}
