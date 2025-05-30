import { TextWithStroke } from "../../../components/text/TextWithStroke";

export const AttandanceTemplate = () => {
  return (
    <div className="w-screen h-screen bg-black font-TJ overflow-hidden flex justify-center items-center">
      <div className="relative w-[360px] h-[258px] sm:w-[430px] sm:h-[300px] md:w-[615px] md:h-[430px] xl:w-[1180px] xl:h-[820px]">
        <TextWithStroke
          text="출석"
          textClassName="text-main-yellow-800 text-[3.5rem]"
          strokeClassName="text-main-brown-800 text-[3.5rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
        />
      </div>
    </div>
  );
};
