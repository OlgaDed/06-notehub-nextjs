// app/notes/page.tsx
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesPageClient from './NotesPage.client';
import { fetchNotes } from '../../lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // prefetch notes on the server
  await queryClient.prefetchQuery({
    queryKey: ['notes', ''],
    queryFn: () => fetchNotes(''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}
