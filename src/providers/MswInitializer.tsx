'use client';

import { useEffect } from 'react';
import { initMockServiceWorker } from '@/msw';

export default function MswInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initMockServiceWorker();
    }
  }, []);

  return null;
}
