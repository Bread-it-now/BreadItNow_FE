import Button from '@/components/button/Button';
import Input from '@/components/common/Input/Input';
import { useState } from 'react';
interface EditBakeryAddressProps {
  zipCode: string;
  address: string;
  detailAddress: string;
}

function EditBakeryAddress({ zipCode, address, detailAddress }: EditBakeryAddressProps) {
  const [newZipCode, setNewZipCode] = useState<string>(zipCode);
  const [newAddress, setNewAddress] = useState<string>(address);
  const [newDetailAddress, setNewDetailAddress] = useState<string>(detailAddress);
  return (
    <div className="grid grid-cols-3 gap-y-2 gap-x-[6px]">
      <Input
        readonly
        className="col-span-2 border border-gray-200 rounded-lg"
        value={newZipCode}
        onChange={(e) => setNewZipCode(e.target.value)}
      />
      <Button variant="secondary" onClick={() => {}} className="!col-span-1 !w-full h-full">
        주소 검색
      </Button>
      <Input
        className="col-span-3 border border-gray-200 rounded-lg"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <Input
        className="col-span-3 border border-gray-200 rounded-lg"
        value={newDetailAddress}
        onChange={(e) => setNewDetailAddress(e.target.value)}
      />
    </div>
  );
}

export default EditBakeryAddress;
