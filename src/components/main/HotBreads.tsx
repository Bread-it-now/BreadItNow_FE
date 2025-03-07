import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface HotBreadsProps {
  breads: {
    title: string;
    subtitle: string;
    price: string;
    img: StaticImageData;
  }[];
}

const HotBreads = ({ breads }: HotBreadsProps) => {
  return (
    <ul className="mt-3 space-y-3 cursor-pointer">
      {breads.map((bread, index) => (
        <li key={index} className="flex items-center gap-3 py-2">
          <span className="text-base font-semibold w-6 text-gray900">{index + 1}</span>
          <Image src={bread.img} alt={bread.title} width={64} height={64} className="rounded-lg object-cover" />
          <div className="flex flex-col">
            <p className="text-gray500 text-sm">{bread.subtitle}</p>
            <p className="font-semibold text-gray900">{bread.title}</p>
            <p className="text-gray-500 text-sm">{bread.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HotBreads;
