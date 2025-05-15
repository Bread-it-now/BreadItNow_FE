'use client';

import { EditPasswordForm } from '@/types/auth';
import { EditPasswordFormLayout } from '@/components/editpasswordFormlayout/EditPasswordFormLayout';
import { editOwnerPassword } from '@/lib/api/bakery';

export default function Page() {
  return (
    <EditPasswordFormLayout mutate={(editPasswordForm: EditPasswordForm) => editOwnerPassword(editPasswordForm)} />
  );
}
