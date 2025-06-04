import { Background } from "@/components/layout/Background";
import backgroundImage from "@/assets/image/investing-game/little_pig/little_pig_bg.webp";
import littlePig1 from "@/assets/image/investing-game/little_pig/little_pig_1.webp";
import littlePig2 from "@/assets/image/investing-game/little_pig/little_pig_2.webp";
import littlePig3 from "@/assets/image/investing-game/little_pig/little_pig_3.webp";
import coin from "@/assets/image/common/common_coin.webp";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { GamePlayPigCard } from "../../component/little-pig-component/game-play-pig-card";
import { NewsBox } from "../../component/little-pig-component/news-box";
import { GamePlayTurnFinish } from "./game-play-turn-finish";
import { Modal } from "@/components/modal/Modal";
import { useModal } from "@/lib/context/modal-context";

// 시나리오 데이터 타입 정의
interface Stock {
  name: string;
  risk_level: string;
  description: string;
  before_value: number;
  current_value: number;
  expectation: string;
}

interface Scenario {
  turn_number: number;
  result: string;
  news: string;
  news_hint: string;
  stocks: Stock[];
}

interface GamePlayProps {
  gameState: {
    point: number;
    turn: number;
    turnMax: number;
    price: number[];
    buyPrice: number[];
    count: number[];
    beforeCount: number[];
    scenario: Scenario[];
    currentScenario: Scenario | null;
    isGameOver: boolean;
    isGameStart: boolean;
    turnFinish: boolean;
    plusClickCount: number[];
    minusClickCount: number[];
  };
  updateGameState: (updates: any) => void;
  handleTurnFinish: () => void;
}

export const GamePlay = ({ gameState, updateGameState, handleTurnFinish }: GamePlayProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  const getPigData = (index: number, image: string) => {
    if (gameState.currentScenario) {
      const stock = gameState.currentScenario.stocks[index];
      const prev = gameState.beforeCount[index];
      const curr = gameState.count[index];
      const diff = curr - prev;

      return {
        image,
        name: stock?.name,
        description: stock?.description,
        currentPrice: gameState.price[index],
        previousPrice: gameState.turn === 1 ? stock?.before_value : stock?.before_value,
        priceChange: Math.floor(((gameState.price[index] - stock?.before_value) / stock?.before_value) * 100),
        soldQuantity: Math.max(0, prev - curr),
        buyPrice: Math.floor((gameState.buyPrice[index] + gameState.price[index] * diff) / gameState.count[index] || 0),
        buyQuantity: Math.max(0, diff),
        profit: Math.max(0, (prev - curr) * stock?.before_value),
      };
    }
  };

  // TODO: 시나리오가 없을 때 처리
  if (!gameState.currentScenario) return null;

  return (
    <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center">
      <Modal isOpen={isOpen}>
        <GamePlayTurnFinish
          onNextTurn={() => {
            closeModal();
            handleTurnFinish();
          }}
          turn={gameState.turn}
          pigData={[getPigData(0, littlePig1), getPigData(1, littlePig2), getPigData(2, littlePig3)].filter(
            (data): data is NonNullable<typeof data> => data !== null
          )}
        />
      </Modal>

      <div className="self-end mt-4 mr-6 mb-1">
        <TextWithStroke
          text={`${gameState.turn}턴 / ${gameState.turnMax}턴`}
          textClassName="text-main-yellow-200 text-[1rem] font-bold"
          strokeClassName="text-main-brown-700 text-[1rem] font-bold text-stroke-width-[0.2rem] text-stroke-color-main-brown-700"
        />
        <div className="flex items-center justify-end gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <TextWithStroke
            text={`${gameState.point}냥`}
            textClassName="text-main-yellow-200 text-[0.65rem] font-bold tracking-[0.075rem]"
            strokeClassName="text-main-brown-700 text-[0.65rem] font-bold text-stroke-width-[0.15rem] text-stroke-color-main-brown-700 tracking-[0.075rem]"
          />
        </div>
      </div>

      <NewsBox title={gameState.currentScenario.news} hint={gameState.currentScenario.news_hint} />

      <div className="relative flex items-center justify-center gap-x-2.5">
        {gameState.currentScenario.stocks.map((stock, index) => (
          <GamePlayPigCard
            key={stock.name}
            pigImage={index === 0 ? littlePig1 : index === 1 ? littlePig2 : littlePig3}
            name={stock.name}
            description={stock.description}
            currentPrice={gameState.price[index]}
            buyPrice={gameState.buyPrice[index]}
            quantity={gameState.beforeCount[index]}
            riskType={stock.risk_level}
            count={gameState.count[index]}
            onQuantityChange={(newQuantity) => {
              updateGameState({
                count: gameState.count.map((c, i) => (i === index ? newQuantity : c)),
              });
            }}
            point={gameState.point}
            setPoint={(newPoint) => updateGameState({ point: newPoint })}
            volumeChange={gameState.count[index] - gameState.beforeCount[index]}
            setMinusClickEvent={() => {
              updateGameState({
                minusClickCount: gameState.minusClickCount.map((c, i) => (i === index ? c + 1 : c)),
              });
            }}
            setPlusClickEvent={() => {
              updateGameState({
                plusClickCount: gameState.plusClickCount.map((c, i) => (i === index ? c + 1 : c)),
              });
            }}
          />
        ))}
      </div>

      <div
        onClick={() => {
          openModal();
        }}
        className="self-end mx-2 my-1 px-4 py-0.5 font-bold bg-main-yellow-350 border-2 xl:border-5 border-main-brown-400 rounded-lg"
      >
        턴 종료!
      </div>
    </Background>
  );
};
