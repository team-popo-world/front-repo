import { Link } from "react-router-dom";
import { StockDescription } from "../../component/little-pig-component/stock-description";
import { PinkBorderModal } from "../../component/little-pig-component/pink-border-modal";
import closeButton from "@/assets/image/common/close.webp";

interface GameDescription {
  image: string;
  label: string;
  descriptions: string[];
}

interface GameStartExplainProps {
  onClose: () => void;
  gameTitle: string;
  gameDescription: string;
  descriptions: GameDescription[];
  gamePlayPath: string;
}

export const GameStartExplain = ({
  onClose,
  gameTitle,
  gameDescription,
  descriptions,
  gamePlayPath,
}: GameStartExplainProps) => {
  return (
    <PinkBorderModal className="flex flex-col items-start ">
      <img src={closeButton} alt="닫기" className="absolute top-3 right-3 w-5 h-5 object-contain" onClick={onClose} />
      {/* 게임 설명 제목 */}
      <h1 className="text-main-pink-600 my-2 text-2xl font-extrabold self-center">게임 설명</h1>
      {/* 게임 설명 내용 */}
      {/* tracking-[0.02rem] 글자 간격 조정 */}
      <p className="text-main-pink-600 text-xs font-bold mb-3 letter-spacing: tracking-[0.02rem]">{gameDescription}</p>
      {/* 모의투자에서 돼지들 설명 영역 */}
      <section className="flex flex-col gap-y-3">
        {descriptions.map((desc, index) => (
          <StockDescription key={index} image={desc.image} label={desc.label}>
            {desc.descriptions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </StockDescription>
        ))}
      </section>
      {/* 게임 시작 버튼 */}
      <Link to={gamePlayPath}>
        <div className="absolute bottom-3 right-13 px-3 py-1.5 text-white text-[0.7rem] bg-main-pink-600 rounded-lg active:scale-95 transition-all duration-100">
          게임 시작
        </div>
      </Link>
    </PinkBorderModal>
  );
};
