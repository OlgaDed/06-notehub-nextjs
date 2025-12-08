import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes', 1, ''], // page=1, search=''
    queryFn: () => fetchNotes(1, ''),
  });

  const dehydrated = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydrated}>
      <NotesClient />
    </HydrationBoundary>
  );
}
