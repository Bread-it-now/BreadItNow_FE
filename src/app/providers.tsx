'use client';

import { Session } from 'next-auth';

export function Providers({ children }: { children: React.ReactNode; session: Session }) {
  return <>{children}</>;
}
