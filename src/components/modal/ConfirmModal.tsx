'use client';
import Button from '@/components/button/Button';
interface ConfirmModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function ConfirmModal({ title, description, onConfirm, onCancel, isOpen }: ConfirmModalProps) {
  return (
    <div
      className={`
      fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 bg-black bg-opacity-50
      ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    `}>
      <div className="px-5 pt-[30px] pb-5 border-box bg-white rounded-2xl">
        <div className="text-center text-[16px] font-semibold">{title}</div>
        {description && <div className="text-center text-sm font-normal">{description}</div>}
        <div className="flex justify-center gap-2 mt-[30px]">
          {onCancel && (
            <Button variant="default" onClick={onCancel}>
              취소
            </Button>
          )}
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              확인
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
