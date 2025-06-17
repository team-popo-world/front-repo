interface SpeechBubbleProps {
  text: string;
  className?: string;
}

export const SpeechBubble = ({ text, className = "" }: SpeechBubbleProps) => {
  return (
    <div className={` ${className}`}>
      <div className="relative">
        {/* 말풍선 본체 */}
        <div className="flex flex-col-reverse text-sm bg-main-yellow-700 rounded-lg px-4 py-2 min-w-[8rem] max-w-[12rem] ">
          {text}
        </div>
        {/* 화살표 */}
        <div
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 border-t-main-yellow-700 border-t-8 border-x-transparent border-x-8 border-b-0`}
        />
      </div>
    </div>
  );
};
