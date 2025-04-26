'use client';
import Button from '../button/Button';

function Footer({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-0 z-10 w-full max-w-[375px] p-5 bg-white">
      <Button onClick={onClick} fullWidth variant="primary" scale="large" className="">
        <div>예약하기</div>
      </Button>
    </div>
  );
}

export default Footer;
