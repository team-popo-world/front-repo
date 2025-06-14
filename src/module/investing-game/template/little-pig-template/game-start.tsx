import { GameStart } from "../game-template/game-start";
import { IMAGE_URLS } from "@/lib/constants/constants";

export const LittlePigGameStart = () => {
  return (
    <GameStart
      backgroundImage={IMAGE_URLS.investing_game.little_pig.little_pig_bg}
      title="아기돼지 삼형제"
      subtitle="가장 부자 돼지는 누구?"
      characters={[
        {
          image: IMAGE_URLS.investing_game.little_pig.little_pig_1,
          alt: "첫째 돼지",
          label: "고위험 고수익",
        },
        {
          image: IMAGE_URLS.investing_game.little_pig.little_pig_2,
          alt: "둘째 돼지",
          label: "균형형",
        },
        {
          image: IMAGE_URLS.investing_game.little_pig.little_pig_3,
          alt: "셋째 돼지",
          label: "장기 안정형",
        },
      ]}
      gameTitle="게임 설명"
      gameDescription={`오늘은 아기돼지 삼형제가 각자 집을 짓기 시작했어요!
첫째 돼지는 지푸라기, 둘째 돼지는 나무, 셋째 돼지는 벽돌로 집을 지을거래요.
어떤 돼지가 더 많은 돈을 벌 수 있을까요?`}
      descriptions={[
        {
          image: IMAGE_URLS.investing_game.little_pig.little_pig_1,
          label: "첫째 돼지",
          descriptions: [
            "무엇이든 빠르게 해요.",
            "집을 뚝딱 짓고, 빠르게 돈을 벌고 싶어해요.",
            "조금은 위험해도 괜찮다고 생각해요. 조금 망가져도 다시 빠르게 고치면 되니깐요!",
          ],
        },
        {
          image: IMAGE_URLS.investing_game.little_pig.little_pig_2,
          label: "둘째 돼지",
          descriptions: [
            "이 정도면 괜찮아~ 하고 웃어요.",
            "조금 빠르게, 조금 튼튼하게! 둘 다 하고 싶어요.",
            "너무 오래 일하는건 싫어해요.",
          ],
        },
        {
          image: IMAGE_URLS.investing_game.little_pig.little_pig_3,
          label: "셋째 돼지",
          descriptions: [
            "천천히 하지만 끝까지 잘해요.",
            "안전이 가장 중요하다고 생각해서, 집을 가장 튼튼하게 만들어요.",
            "나중을 미리 생각하며 힘든 일도 참을 수 있어요.",
          ],
        },
      ]}
      gamePlayPath="/investing/game/little-pig?stage=game-play"
    />
  );
};
