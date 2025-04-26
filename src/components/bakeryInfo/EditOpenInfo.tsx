import Textarea from '@/components/common/Input/Textarea';
import { useState } from 'react';
interface EditOpenInfoProps {
  defaultOpenInfo: string;
}

function EditOpenInfo({ defaultOpenInfo }: EditOpenInfoProps) {
  const [openInfo, setOpenInfo] = useState<string>(defaultOpenInfo);
  return (
    <div>
      <Textarea value={openInfo} onChange={(e) => setOpenInfo(e.target.value)} />
    </div>
  );
}

export default EditOpenInfo;
