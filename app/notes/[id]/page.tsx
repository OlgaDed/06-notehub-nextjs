import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function NoteDetailsPage({ params }: any) {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  const dehydrated = dehydrate(qc);

  return <NoteDetailsClient id={params.id} dehydratedState={dehydrated} />;
}
