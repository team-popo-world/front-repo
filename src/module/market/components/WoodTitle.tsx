import { IMAGE_URLS } from "@/lib/constants/constants";

interface WoodTitleProps {
  title: string;
}

export const WoodTitle = ({ title }: WoodTitleProps) => {
  return (
    <header className="absolute top-4 left-42 flex items-center justify-center">
      <img src={IMAGE_URLS.market.wood_title} alt="wood_title" className="min-w-0 h-14 object-contain" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#7F410D] text-[1.5rem] font-bold">
        {title}
      </span>
    </header>
  );
};

export const DarkWoodTitle = ({ title }: WoodTitleProps) => {
  return (
    <header className="absolute top-4 left-42 flex items-center justify-center">
      <img src={IMAGE_URLS.market.wood_title_parent} alt="wood_title" className="min-w-0 h-14 object-contain" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FEC974] text-[1.5rem] font-bold">
        {title}
      </span>
    </header>
  );
};

export const InventoryDarkWoodTitle = ({ title }: WoodTitleProps) => {
  return (
    <header className="absolute top-7 left-46 flex items-center justify-center">
      <img src={IMAGE_URLS.market.wood_title_parent} alt="wood_title" className="min-w-0 h-14 object-contain" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FEC974] text-[1.5rem] font-bold">
        {title}
      </span>
    </header>
  );
};
