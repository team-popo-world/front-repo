import clsx from "clsx";

interface SpeechBubbleProps {
  className?: string;
  text: string;
  buttonText?: string;
  onClick?: () => void;
}

export const SpeechBubble = ({ text, buttonText, className, onClick }: SpeechBubbleProps) => {
  return (
    <div className={clsx("absolute top-24 right-14", className)}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center px-2 pt-1 pb-1 min-w-[9rem] max-w-[10rem] min-h-[3.5rem] max-h-[5rem] bg-[#F6D8B8] border-2 lg:border-4 border-[#97784A] rounded-4xl"
        )}
      >
        {/* 단어단위 줄바꿈, 줄간격, 줄바꿈 처리 */}
        <p
          className={clsx(
            "text-[#6E532C] text-[0.6rem] font-bold text-center  leading-tight whitespace-pre-line",
            buttonText ? "pt-1 px-1" : "pt-0"
          )}
        >
          {text}
        </p>
        {buttonText && (
          <button
            onClick={onClick}
            className="mt-1.5 py-0.5 px-2 text-[#FFF6D5] text-[0.5rem] bg-[#6E532C] font-bold rounded-md active:scale-95 transition-all duration-100"
          >
            {buttonText}
          </button>
        )}
      </div>
      <div className="w-6 h-6 absolute top-16 -left-2 bg-[#F6D8B8] border-1 lg:border-3 border-[#97784A] rounded-full"></div>
      <div className="w-5 h-5 absolute top-22 -left-6 bg-[#F6D8B8] border-1 lg:border-3 border-[#97784A] rounded-full"></div>
      <div className="w-3 h-3 absolute top-28 -left-10 bg-[#F6D8B8] border-1 lg:border-3 border-[#97784A] rounded-full"></div>
    </div>
  );
};

export const InventorySpeechBubble = ({ text, buttonText, className, onClick }: SpeechBubbleProps) => {
  return (
    <div className={clsx("absolute top-24 right-10", className)}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center px-2 pt-1 pb-1 min-w-[9rem] max-w-[10rem] min-h-[3rem] max-h-[5rem] bg-[#F6D8B8] border-2 lg:border-4 border-[#97784A] rounded-4xl"
        )}
      >
        {/* 단어단위 줄바꿈, 줄간격, 줄바꿈 처리 */}
        <p
          className={clsx(
            "text-[#6E532C]  font-bold text-center  leading-tight whitespace-pre-line",
            buttonText ? "pt-1 px-1 text-[0.6rem]" : "pt-0 text-[0.7rem]"
          )}
        >
          {text}
        </p>
        {buttonText && (
          <button
            onClick={onClick}
            className="mt-1.5 py-0.5 px-2 text-[#FFF6D5] text-[0.5rem] bg-[#6E532C] font-bold rounded-md active:scale-95 transition-all duration-100"
          >
            {buttonText}
          </button>
        )}
      </div>
      <div className="w-6 h-6 absolute top-16 right-10 bg-[#F6D8B8] border-1 lg:border-3 border-[#97784A] rounded-full"></div>
      <div className="w-5 h-5 absolute top-22 right-6 bg-[#F6D8B8] border-1 lg:border-3 border-[#97784A] rounded-full"></div>
    </div>
  );
};
