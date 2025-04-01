'use client';
import Button from '@/components/button/Button';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import { useState } from 'react';

const HEADER_TABS = [
  { key: 'bakeryInfo', label: '빵집정보' },
  { key: 'bakeryProducts', label: '빵집 메뉴' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bakeryProducts');
  return (
    <div className={`bg-gray-100 flex flex-col ${activeTab === 'bakeryInfo' ? 'gap-[10px]' : ''}`}>
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'bakeryInfo' ? (
        <div></div>
      ) : (
        <div className="flex flex-col bg-gray-100 w-full">
          <section className="flex items-cetner justify-between pt-6 px-5 pb-[30px] gap-5 bg-white">
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={() => {}} className="w-[77px] h-9">
                순서변겅
              </Button>
              <Button variant="default" onClick={() => {}} className="w-[77px] h-9">
                메뉴삭제
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="primary" onClick={() => {}} className="w-[100px] h-9">
                + 메뉴 추가
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
