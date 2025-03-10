'use client';

import React from 'react';

interface AlertProps {
  title?: string;
  subtitle: string;
  buttonLabel: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, subtitle, buttonLabel, onClose }) => {
  return (
    <div className="w-[90%] max-w-[315px] px-5 pt-[30px] pb-5 bg-white rounded-2xl flex flex-col justify-start items-center gap-2.5 shadow-md">
      {/* 메시지 영역 */}
      <div className="w-[95%] max-h-[120px] overflow-y-auto text-center">
        {title && <div className="text-black text-base font-semibold leading-tight mb-1">{title}</div>}
        <div className="text-black text-sm font-normal leading-tight">{subtitle}</div>
      </div>

      {/* 버튼 */}
      <button
        className="w-[95%] h-11 mt-2 px-6 py-3.5 bg-[#ff7651] rounded-lg flex justify-center items-center text-white text-[15px] font-semibold leading-[21px]"
        onClick={onClose}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default Alert;
