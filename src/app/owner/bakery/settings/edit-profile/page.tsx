'use client';

import { EditPasswordForm } from '@/types/auth';
import { EditPasswordFormLayout } from '@/components/editpasswordFormlayout/EditPasswordFormLayout';
import { editOwnerPassword } from '@/lib/api/bakery';
import { useState } from 'react';
import Button from '@/components/button/Button';

export default function Page() {
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false);

  return (
    <div className="w-full h-full bg-gray50">
      {showEditPasswordForm ? (
        <EditPasswordFormLayout mutate={(editPasswordForm: EditPasswordForm) => editOwnerPassword(editPasswordForm)} />
      ) : (
        <div className="flex flex-col gap-2 pt-6 pb-[30px] px-5 bg-white">
          <label className="text-title-content-xs">{'비밀번호'}</label>
          <Button variant="secondary" fullWidth onClick={() => setShowEditPasswordForm((prev) => !prev)}>
            비밀번호 변경하기
          </Button>
        </div>
      )}
    </div>
  );
}
