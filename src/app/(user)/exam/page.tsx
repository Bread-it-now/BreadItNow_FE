"use client";

import Tag from "@/components/common/Tag";

export default function Page() {
  const schedule = [
    {
      time: "07:00",
      items: [
        "크루아상",
        "생크림 식빵",
        "마늘바게트",
        "소보루빵",
        "베이글",
        "소보루빵",
        "밤식빵",
        "무화과 깜빠뉴",
      ],
    },
    { time: "09:30", items: ["생크림 식빵", "베이글", "크루아상"] },
    { time: "12:00", items: ["크루아상", "소보루빵", "밤식빵", "마늘바게트"] },
    {
      time: "14:30",
      items: [
        "크루아상",
        "생크림 식빵",
        "소보루빵",
        "베이글",
        "소보루빵",
        "밤식빵",
        "무화과 깜빠뉴",
      ],
    },
    { time: "16:00", items: ["마늘바게트", "소보루빵", "베이글", "크루아상"] },
  ];

  return (
    <div className="space-y-4 p-4">
      {schedule.map((slot, index) => (
        <div key={index} className="relative flex space-x-4">
          <div className="flex-shrink-0">
            <Tag label={slot.time} type="time" />
          </div>

          {index !== schedule.length && (
            <div className="absolute left-8 top-[50%] w-[1px] min-h-[20px] h-full bg-gray-300 translate-y-[-50%]" />
          )}

          <div className="flex flex-wrap gap-2">
            {slot.items.map((item, idx) => (
              <Tag key={idx} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
