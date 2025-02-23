import BreadReserveCard from "./BreadReserveCard";
interface BreadReserveCardProps {
  url?: string;
  checked?: boolean;
  name: string;
  subText: string;
  price: string | number;
  count: number;
  existReserveTime?: boolean;
}
function MenuList({ menuList }: { menuList: BreadReserveCardProps[] }) {
  return (
    <article className="bg-white border-box rounded-2xl px-5 py-[30px] mb-[52px] overflow-y-scroll h-[600px]">
      <div className="f lex justify-between">
        <div className="font-semibold text-black text-md">빵류</div>
      </div>
      {menuList.map((menu, index) => (
        <BreadReserveCard key={`menu-${index}`} {...menu} />
      ))}
    </article>
  );
}

export default MenuList;
