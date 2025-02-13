interface TagProps {
  label: string;
  type?: "time" | "category";
}

export default function Tag({ label, type = "category" }: TagProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-full 
          ${
            type === "time"
              ? "h-[18px] px-1.5 bg-[#dffaf2] text-[#26ce9e] text-[11px] font-medium"
              : "h-[22px] px-2 bg-[#f2f4f6] text-[#808284] text-xs font-medium"
          }`}
    >
      {label}
    </div>
  );
}
