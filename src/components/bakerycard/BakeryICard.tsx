import Image from "next/image";
import { cn } from "@/utils/cn";
import { Bakery, OPERATING_STATUS } from "@/types/bakery";
import profileImage from "@/assets/images/1.png";

export interface BakeryCardProps
  extends Pick<Bakery, "id" | "operatingStatus" | "profileImg" | "name"> {
  rank: number;
  distance?: number;
}

const BakeryCard = ({
  operatingStatus,
  name,
  rank,
  distance,
}: BakeryCardProps) => {
  return (
    <div className={cn(" flex flex-col items-start gap-3", "w-60")}>
      <div className={cn("relative w-full h-40")}>
        <Image src={profileImage} fill alt="bakery" className="rounded-md" />
      </div>
      <div className={cn("flex items-start gap-[10px]", "w-full h-11")}>
        <span
          className={cn(
            "w-5 h-[26px]",
            "text-center",
            "text-gray-900 text-lg font-semibold",
          )}
        >
          {rank}
        </span>
        <div className={cn("flex flex-col items-start gap-[2px]", "w-full")}>
          <div className={cn("text-gray-900", "text-body-m", "w-full")}>
            {name}
          </div>
          <div className={cn("flex items-center gap-1", "w-full h-[19px]")}>
            <span
              className={cn("font-semibold", "text-[13px]", "text-secondary")}
            >
              {OPERATING_STATUS[operatingStatus]}
            </span>
            <span className={cn("text-gray-200")}>•</span>
            <span className={cn("text-[13px]", "text-gray-500")}>
              {distance}KM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryCard;
