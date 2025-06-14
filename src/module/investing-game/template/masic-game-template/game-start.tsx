import { IMAGE_URLS } from "@/lib/constants/constants";

import { GameStart } from "../game-template/game-start";

export const MasicGameStart = () => {
  return (
    <GameStart
      backgroundImage={IMAGE_URLS.investing_game.masic.masic_bg}
      title="마법 왕국의 작은 마법사"
      subtitle="어느 가게가 잘될까?"
      characters={[
        {
          image: IMAGE_URLS.investing_game.masic.masic_1,
          alt: "마법연구소",
          label: "고위험 고수익",
        },
        {
          image: IMAGE_URLS.investing_game.masic.masic_2,
          alt: "서커스단",
          label: "균형형",
        },
        {
          image: IMAGE_URLS.investing_game.masic.masic_3,
          alt: "빵집",
          label: "장기 안정형",
        },
      ]}
      gameTitle="게임 설명"
      gameDescription={`옛날 옛날, 반짝이는 별빛이 가득한 마법 마을에는 마법을 배우는 작은 마법사가 살고 있었어요. 이 마법사는 지혜로운
        마법사가 되기 위한 훈련을 하고 있었답니다.
        작은 마법사를 도와 어느 가게를 도와줄지 선택해보세요!!`}
      descriptions={[
        {
          image: IMAGE_URLS.investing_game.masic.masic_1,
          label: "마법연구소",
          descriptions: [
            "사람들이 신나게 구경하는 멋진 공연장이에요.",
            "날씨가 좋거나 재미있는 일이 생기면 더 인기가 많아지고,",
            "비가 오거나 바람이 불면 공연이 어려울 수도 있어요.",
          ],
        },
        {
          image: IMAGE_URLS.investing_game.masic.masic_2,
          label: "서커스단",
          descriptions: [
            "사람들이 신나게 구경하는 멋진 공연장이에요.",
            "날씨가 좋거나 재미있는 일이 생기면 더 인기가 많아지고,",
            "비가 오거나 바람이 불면 공연이 어려울 수도 있어요.",
          ],
        },
        {
          image: IMAGE_URLS.investing_game.masic.masic_3,
          label: "빵집",
          descriptions: [
            "매일 아침 고소한 냄새가 나는 따뜻한 빵을 만드는 곳이에요.",
            "항상 손님이 많지만, 특별한 일이 생기면 영향을 받을 수도 있어요.",
          ],
        },
      ]}
      gamePlayPath="/investing/game/masic?stage=game-play"
    />
  );
};
