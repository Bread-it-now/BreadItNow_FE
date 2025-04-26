import { useMemo, useRef, useState, useCallback, memo } from 'react';
import Image from 'next/image';
import closeIcon from '@/assets/icons/close-white.svg';
import addImageIcon from '@/assets/icons/plus-primary.svg';

interface EditBakeryImageProps {
  images: string[];
  setImages: (images: string[]) => void;
}

// 이미지 아이템 컴포넌트 분리
const ImageItem = memo(
  ({ image, index, onDelete }: { image: string; index: number; onDelete: (index: number) => void }) => (
    <div className="relative h-[105px] w-full">
      <button
        onClick={() => onDelete(index)}
        className="absolute z-10 w-[22px] h-[22px] top-[6px] right-[6px] bg-gray-900 bg-opacity-50 rounded-full">
        <Image src={closeIcon} alt="close" width={12} height={12} className="mx-auto" />
      </button>
      <Image src={image} alt={`빵집 이미지 ${index + 1}`} sizes="100%" fill className="object-cover" />
    </div>
  ),
);

ImageItem.displayName = 'ImageItem';

// 업로드 버튼 컴포넌트 분리
const UploadButton = memo(({ onClick, totalImageLength }: { onClick: () => void; totalImageLength: number }) => (
  <button
    onClick={onClick}
    className="w-full h-[105px] flex flex-col justify-center items-center border-primary border-dashed border bg-white rounded-lg">
    <Image src={addImageIcon} alt="add" />
    <p className="text-primary text-[13px] font-medium">{totalImageLength}/20</p>
  </button>
));

UploadButton.displayName = 'UploadButton';

const EditBakeryImage = memo(({ images, setImages }: EditBakeryImageProps) => {
  const [newImages, setNewImages] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File[]>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const onDeleteImage = useCallback((index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFile((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile((prev) => [...prev, file]);
      setNewImages((prev) => [...prev, URL.createObjectURL(file)]);
    }
  }, []);

  const onDeleteOriginImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    },
    [images],
  );

  const totalImageLength = useMemo(() => {
    return images.length + newImages.length;
  }, [images.length, newImages.length]);

  const handleUploadClick = useCallback(() => {
    fileUploadRef.current?.click();
  }, []);

  return (
    <div className="overflow-y-auto">
      <div className="grid grid-cols-3 gap-[10px]">
        {images.map((image, index) => (
          <ImageItem key={`origin-${image}-${index}`} image={image} index={index} onDelete={onDeleteOriginImage} />
        ))}
        {newImages.map((image, index) => (
          <ImageItem key={`new-${image}-${index}`} image={image} index={index} onDelete={onDeleteImage} />
        ))}
        <input
          onChange={handleImageUpload}
          id="image-upload"
          type="file"
          className="hidden"
          ref={fileUploadRef}
          accept="image/*"
        />
        <UploadButton onClick={handleUploadClick} totalImageLength={totalImageLength} />
      </div>
    </div>
  );
});

EditBakeryImage.displayName = 'EditBakeryImage';

export default EditBakeryImage;
