'use client';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNoteById } from '../../../lib/api';
import styles from './NoteDetails.module.css';

export default function NoteDetailsClient({ id, dehydratedState }: any) {
  const [qc] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={qc}>
      <HydrationBoundary state={dehydratedState}>
        <Details id={id} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

function Details({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.text}>{data.content}</p>
      <span className={styles.date}>{data.createdAt}</span>
    </div>
  );
}
