import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NotesPageClient from './NotesPage.client';

export default async function NotesPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const dehydrated = dehydrate(qc);

  return <NotesPageClient dehydratedState={dehydrated} />;
}
