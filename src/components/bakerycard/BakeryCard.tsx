import Image from "next/image";
import { cn } from "@/utils/cn";
import { Bakery, OPERATING_STATUS } from "@/types/bakery";
import profileImage from "@/assets/images/1.png";
import bookmark from "@/assets/icons/bookmark.svg";

export interface BakeryCardProps
  extends Pick<Bakery, "id" | "operatingStatus" | "profileImg" | "name"> {
  rank: number;
  distance?: number;
  size?: "normal" | "large";
}

const BakeryCard = ({
  operatingStatus,
  name,
  rank,
  distance,
  size = "normal",
}: BakeryCardProps) => {
  return (
    <div
      className={cn(
        " flex flex-col items-start gap-3",
        size === "normal" ? "w-60" : "w-full",
      )}
    >
      <div
        className={cn(
          "relative",
          `w-full ${size === "normal" ? "h-40" : "h-[223px]"}`,
        )}
      >
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
        <div
          className={cn("flex justify-between items-center gap-5", "w-full")}
        >
          <div className={cn("flex flex-col items-start gap-[2px]", "w-full")}>
            <div className={cn("text-gray-900", "text-body-m", "w-full")}>
              {name}
            </div>
            <div className={cn("flex items-center gap-1", "w-full h-[19px]")}>
              <span
                className={cn(
                  "font-semibold",
                  "text-[13px]",
                  operatingStatus === "OPEN"
                    ? "text-secondary"
                    : "text-gray-500",
                )}
              >
                {OPERATING_STATUS[operatingStatus]}
              </span>
              <span className={cn("text-gray-200")}>•</span>
              <span className={cn("text-[13px]", "text-gray-500")}>
                {distance}KM
              </span>
            </div>
          </div>
          <button
            className={cn(
              "flex justify-center items-center",
              "w-8 h-8 min-w-8",
              "border rounded-full border-gray100",
            )}
            aria-label="bookmark"
          >
            <Image width={16} height={16} src={bookmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BakeryCard;
/* info */

// display: flex;
// flex-direction: row;
// justify-content: space-between;
// align-items: center;
// padding: 0px;
// gap: 20px;
// width: 335px;
// height: 44px;
