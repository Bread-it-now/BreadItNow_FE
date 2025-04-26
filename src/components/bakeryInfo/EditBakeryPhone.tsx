import Input from '@/components/common/Input/Input';
import { useState, useEffect } from 'react';
interface EditBakeryPhoneProps {
  phone: string;
}

function EditBakeryPhone({ phone }: EditBakeryPhoneProps) {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>(phone);
  const [validationText, setValidationText] = useState<string>('');
  useEffect(() => {
    if (newPhoneNumber.length === 0) {
      setValidationText('필수입력 항목입니다.');
    } else {
      setValidationText('');
    }
  }, [newPhoneNumber]);
  return (
    <div>
      <Input
        className={`rounded-lg border w-full ${validationText ? 'border-red-500' : 'border-gray-200'}`}
        value={newPhoneNumber}
        onChange={(e) => setNewPhoneNumber(e.target.value)}
      />
      <div className="text-primary text-xs font-medium mt-1">{validationText}</div>
    </div>
  );
}

export default EditBakeryPhone;
