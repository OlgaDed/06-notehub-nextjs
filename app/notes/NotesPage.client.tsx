'use client';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '../../lib/api';
import SearchBox from './SearchBox/SearchBox';
import Pagination from './Pagination/Pagination';
import NoteList from './NoteList/NoteList';
import styles from './NotesPage.module.css';

export default function NotesPageClient({
  dehydratedState,
}: {
  dehydratedState: unknown;
}) {
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
  const { data: notes = [] } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  return (
    <div className={styles.container}>
      <SearchBox />
      <NoteList notes={notes} />
      <Pagination />
    </div>
  );
}
