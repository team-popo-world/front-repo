import type { ReactNode } from "react";

interface StockDescriptionProps {
  image: string;
  label: string;
  children: ReactNode;
}

export const StockDescription = ({ image, label, children }: StockDescriptionProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center gap-y-0.5 w-20">
        <img src={image} alt={label} className="min-w-0 h-9 object-contain" />
        <div className="ml-1 px-1.5 py-[0.125rem] font-light text-white text-[0.55rem] bg-main-pink-600 rounded-lg ">
          {label}
        </div>
      </div>
      <div className="">
        {/* tracking-[0.01rem] 글자 간격 조정 */}
        <ol className="text-[0.55rem] font-base list-disc space-y-1.5 pl-4 tracking-[0.01rem]">{children}</ol>
      </div>
    </div>
  );
};
