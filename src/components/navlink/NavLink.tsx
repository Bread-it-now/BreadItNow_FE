'use client';
import Image from 'next/image';
import arrow from '@/assets/icons/arrow-right.svg';
import { useRouter } from 'next/navigation';

interface NavLinkProps {
  icon: string;
  title: string;
  targetUrl: string;
  showBtn?: boolean;
}

const NavLink = ({ icon, title, targetUrl, showBtn = true }: NavLinkProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-5 w-full h-[21px] bg-white">
      <div className="flex items-center gap-[0.375rem] h-full w-full">
        <div className="flex h-5">
          <Image src={icon} width={20} height={20} alt="link-page-image" />
        </div>
        <div className="w-full text-title-subtitle text-gray900">{title}</div>
      </div>
      {showBtn && (
        <button onClick={() => router.push(targetUrl)}>
          <Image src={arrow} width={20} height={20} alt="link" />
        </button>
      )}
    </div>
  );
};

export default NavLink;
