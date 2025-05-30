import clsx from "clsx";

interface TextWithStrokeProps {
  text: string;
  className?: string;
  textClassName?: string;
  strokeClassName?: string;
}

// textClassName에 글자 색, 크기 지정
// strokeClassName에 글자색, 크기 테두리 색 지정
// prettier-ignore
export const TextWithStroke = ({ text, className, textClassName, strokeClassName }: TextWithStrokeProps) => {
  return (
    <p className={clsx("relative z-0 inline-flex justify-center select-none", className)}>
      <span className={clsx("absolute left-0 -z-10", strokeClassName)}>{text}</span>
      <span className={clsx("relative z-10", textClassName)}>{text}</span>
    </p>
  );
};
