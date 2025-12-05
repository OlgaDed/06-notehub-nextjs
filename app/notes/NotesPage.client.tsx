// app/notes/NotesPage.client.tsx
// app/notes/NotesPage.client.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  useQuery,
} from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import styles from './NotesPage.module.css';
import { fetchNotes } from '../../lib/api';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  category?: string;
}

interface Props {
  dehydratedState: DehydratedState | null;
}

export default function NotesPageClient({ dehydratedState }: Props) {
  const [qc] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={qc}>
      <HydrationBoundary state={dehydratedState}>
        <NotesPageContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

function NotesPageContent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(), // якщо fetchNotes повертає { notes, total } - підлаштуй нижче
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (isError) return <div className={styles.error}>Could not load notes.</div>;

  const list: Note[] = Array.isArray(data) ? data : data?.notes ?? [];

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Notes</h1>
        <Link href="/notes/new" className={styles.createBtn}>
          Create note +
        </Link>
      </div>

      <div className={styles.grid}>
        {list.map((note: Note) => (
          <article className={styles.card} key={note.id}>
            <h3 className={styles.title}>{note.title}</h3>
            <p className={styles.preview}>{note.content}</p>
            <div className={styles.actions}>
              <Link href={`/notes/${note.id}`} className={styles.view}>
                View
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
