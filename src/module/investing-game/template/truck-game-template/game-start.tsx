import { IMAGE_URLS } from "@/lib/constants/constants";

import { GameStart } from "../game-template/game-start";

export const TruckGameStart = () => {
  return (
    <GameStart
      backgroundImage={IMAGE_URLS.investing_game.truck.truck_bg}
      title="푸드트럭 마을"
      subtitle="어떤 트럭이 사람들의 마음을 사로잡을까?"
      characters={[
        {
          image: IMAGE_URLS.investing_game.truck.taco_truck,
          alt: "퓨전 타코 트럭",
          label: "고위험 고수익",
        },
        {
          image: IMAGE_URLS.investing_game.truck.icecream_truck,
          alt: "아이스크림 트럭",
          label: "균형형",
        },
        {
          image: IMAGE_URLS.investing_game.truck.sandwich_truck,
          alt: "샌드위치 트럭",
          label: "장기 안정형",
        },
      ]}
      gameTitle="게임 설명"
      gameDescription={`여기는 푸드트럭 마을!
        매일매일 맛있는 냄새가 가득해요.
        당신은 이 마을에서 제일 궁금쟁이 요리사예요.
        오늘은 어떤 트럭이 사람들의 마음을 사로잡을까?
        햇빛이 쨍쨍한 날, 비 오는 날, 유명한 요리사가 오는 날…
        하루하루 다른 일이 생기면서, 트럭들의 인기도 조금씩 달라져요!`}
      descriptions={[
        {
          image: IMAGE_URLS.investing_game.truck.taco_truck,
          label: "퓨전 타코 트럭",
          descriptions: [
            "색다른 맛으로 친구들을 놀라게 해요.",
            `"우와!" 하고 반응할 수도 있고,
            "이건 무슨 맛이지?" 하고 고개를 갸웃할 수도 있어요.`,
          ],
        },
        {
          image: IMAGE_URLS.investing_game.truck.icecream_truck,
          label: "아이스크림 트럭",
          descriptions: ["햇빛이 쨍쨍한 날엔 인기 최고!", "하지만 추운 날에는 손님이 줄어들 수도 있어요."],
        },
        {
          image: IMAGE_URLS.investing_game.truck.sandwich_truck,
          label: "샌드위치 트럭",
          descriptions: ["언제 먹어도 맛있고, 누구나 좋아하는 메뉴예요.", "늘 비슷하게 잘 되는 편이에요."],
        },
      ]}
      gamePlayPath="/investing/game/ninja?stage=game-play"
    />
  );
};
