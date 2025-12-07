import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const qc = new QueryClient();
  const id = params.id;

  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydrated = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydrated}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
