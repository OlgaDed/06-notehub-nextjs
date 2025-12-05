// components/TanStackProvider/TanStackProvider.tsx
'use client';

import React, { PropsWithChildren, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from '@tanstack/react-query';

interface Props {
  dehydratedState?: unknown;
}

export default function TanStackProvider({
  children,
  dehydratedState,
}: PropsWithChildren<Props>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary hydrationState={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
