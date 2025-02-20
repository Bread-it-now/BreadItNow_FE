"use client";
import Button from "../button/Button";

function Footer() {
  const onClick = () => {};
  return (
    <div className="fixed bottom-0 z-50 w-full p-5 bg-white">
      <Button onClick={onClick} fullWidth variant="primary" className="">
        <div>예약하기</div>
      </Button>
    </div>
  );
}

export default Footer;
