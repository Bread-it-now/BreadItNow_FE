import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/assets/icons/close-white.svg';
import addImageIcon from '@/assets/icons/plus-primary.svg';
interface EditBakeryImageProps {
  images: string[];
  setImages: (images: string[]) => void;
}

function EditBakeryImage({ images, setImages }: EditBakeryImageProps) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const onDeleteImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setImageFile(imageFile.filter((image, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile([...imageFile, file]);
      setNewImages([...newImages, URL.createObjectURL(file)]);
    }
  };

  const onDeleteOriginImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  const totalImageLength = useMemo<number>(() => {
    return images.length + newImages.length;
  }, [images, newImages]);
  return (
    <div className="overflow-y-auto">
      <div className="grid grid-cols-3 gap-[10px]">
        {images.map((image, index) => (
          <div key={`image-${index}`} className="relative h-[105px] w-full">
            <button
              onClick={() => onDeleteOriginImage(index)}
              className="absolute z-10 w-[22px] h-[22px] top-[6px] right-[6px] bg-gray-900 bg-opacity-50 rounded-full">
              <Image src={closeIcon} alt="close" width={12} height={12} className="mx-auto" />
            </button>
            <Image src={image} alt={`빵집 기존 이미지 ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
        {newImages.map((image, index) => (
          <div key={`new-image-${index}`} className="relative h-[105px] w-full">
            <button
              onClick={() => onDeleteImage(index)}
              className="absolute z-10 w-[22px] h-[22px] top-[6px] right-[6px] bg-gray-900 bg-opacity-50 rounded-full">
              <Image src={closeIcon} alt="close" width={12} height={12} className="mx-auto" />
            </button>
            <Image src={image} alt={`빵집 추가 이미지 ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
        <input
          onChange={handleImageUpload}
          id="image-upload"
          type="file"
          className="hidden"
          ref={fileUploadRef}
          accept="image/*"
        />
        <button
          onClick={() => fileUploadRef.current?.click()}
          className="w-full h-[105px] border-primary border-dashed border  bg-white rounded-lg">
          <Image src={addImageIcon} alt="add" width={14} height={14} className="mx-auto" />
          <p className="text-primary text-[13px] font-medium">{totalImageLength}/20</p>
        </button>
      </div>
    </div>
  );
}

export default EditBakeryImage;
