import Input from '@/components/common/Input/Input';
import Textarea from '@/components/common/Input/Textarea';
import { useState } from 'react';

function EditBakeryNameAndIntroduction() {
  const [bakeryName, setBakeryName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  return (
    <div className="text-black">
      <div>
        <div>빵집 이름</div>
        <Input
          className="rounded-lg w-full px-4 py-[14px] border-gray-200 border-2 mt-2"
          value={bakeryName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBakeryName(e.target.value)}
        />
      </div>
      <div className="mt-[30px]">
        <div>빵집 소개글</div>
        <div className="mt-2">
          <Textarea
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditBakeryNameAndIntroduction;
