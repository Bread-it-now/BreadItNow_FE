"use client";

interface TabsProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  setActiveTab: (key: string) => void;
}

export default function HotBreadTab({
  tabs,
  activeTab,
  setActiveTab,
}: TabsProps) {
  return (
    <div className="w-full">
      <div className="w-full h-12 relative bg-white flex justify-between items-center px-5">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray100" />

        {tabs.map(({ key, label }) => (
          <div
            key={key}
            className="w-1/2 h-12 flex flex-col justify-center items-center cursor-pointer relative"
            onClick={() => setActiveTab(key)}
          >
            <span
              className={`text-[15px] font-semibold ${activeTab === key ? "text-primary" : "text-gray400"}`}
            >
              {label}
            </span>
            {activeTab === key && (
              <div className="absolute bottom-0 w-4/5 h-0.5 bg-primary rounded-[99px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
