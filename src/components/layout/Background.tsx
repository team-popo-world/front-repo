import { clsx } from "clsx";

interface BackgroundProps {
  backgroundImage: string;
  children?: React.ReactNode;
  backgroundClassName?: string;
}

export function Background({ backgroundImage, children, backgroundClassName }: BackgroundProps) {
  return (
    <div className="w-screen h-screen bg-black font-TJ overflow-hidden flex justify-center items-center">
      <div
        className={clsx(
          "relative w-[360px] h-[258px] sm:w-[430px] sm:h-[300px] md:w-[615px] md:h-[430px] xl:w-[1180px] xl:h-[820px] bg-contain bg-center bg-no-repeat",
          backgroundClassName
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
