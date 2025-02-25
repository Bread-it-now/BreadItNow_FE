import BreadReserveCard from "./BreadReserveCard";
import { Product } from "@/types/product";
interface BreadReserveCardProps {
  menuList: Product[];
  title: string;
}
function MenuList({ menuList, title }: BreadReserveCardProps) {
  return (
    <article className="bg-white border-box rounded-2xl px-5 py-[30px] mb-[52px] overflow-y-scroll h-[600px]">
      <div className="f lex justify-between">
        <div className="font-semibold text-black text-md">{title}</div>
      </div>
      {menuList.map((menu, index) => (
        <BreadReserveCard key={`menu-${index}`} {...menu} />
      ))}
    </article>
  );
}

export default MenuList;
