import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/getQueryClient';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
