import { API_END_POINT } from '@/constants/api';

interface SubmitOwnerBakeryInfoParams {
  bakeryName: string;
  address: string;
  zipcode: string;
  detailAddress: string;
  phoneNumber: string;
  businessHours: string;
  description: string;
  images: File[];
}

export async function submitOwnerBakeryInfo({
  bakeryName,
  address,
  zipcode,
  detailAddress,
  phoneNumber,
  businessHours,
  description,
  images,
}: SubmitOwnerBakeryInfoParams): Promise<{ success: boolean; message: string }> {
  try {
    const convertImageToBase64 = (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const imageBase64List = await Promise.all(images.map(convertImageToBase64));

    const res = await fetch(`/${API_END_POINT.OWNER_INIT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bakeryName,
        address,
        zipcode,
        detailAddress,
        phoneNumber,
        businessHours,
        description,
        images: imageBase64List,
      }),
    });

    if (!res.ok) {
      return { success: false, message: '빵집 정보 등록에 실패했습니다.' };
    }

    return { success: true, message: '빵집 정보가 성공적으로 등록되었습니다.' };
  } catch {
    return { success: false, message: '빵집 정보 등록 중 오류가 발생했습니다.' };
  }
}
