import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const dehydrated = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydrated}>
      <NotesClient />
    </HydrationBoundary>
  );
}
