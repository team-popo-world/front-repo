import { IMAGE_URLS } from "@/lib/constants/constants";

import { GameStart } from "../game-template/game-start";

export const NinjaGameStart = () => {
  return (
    <GameStart
      backgroundImage={IMAGE_URLS.investing_game.ninja.ninja_bg}
      title="달빛 도둑"
      subtitle="성공할 작전을 찾아라!"
      characters={[
        {
          image: IMAGE_URLS.investing_game.ninja.ninja1,
          alt: "달빛 가루",
          label: "고위험 고수익",
        },
        {
          image: IMAGE_URLS.investing_game.ninja.ninja2,
          alt: "달조각 목걸이",
          label: "균형형",
        },
        {
          image: IMAGE_URLS.investing_game.ninja.ninja3,
          alt: "달빛 방패",
          label: "장기 안정형",
        },
      ]}
      gameTitle="게임 설명"
      gameDescription={` 여기는 밤마다 달빛이 내려앉는 신비로운 세계, 달빛 왕국! 당신은 날쌘 달빛 도둑으로, 매일 밤 세 가지 은밀한 보물
        훔치기 작전에 참여하게 됩니다.
        과연 당신은 최고의 달빛 도둑이 될 수 있을까요?`}
      descriptions={[
        {
          image: IMAGE_URLS.investing_game.ninja.ninja1,
          label: "달빛 가루",
          descriptions: [
            "가장 조용하고 안전한 작전이에요.",
            "큰 변화는 없지만 꾸준히 돈을 벌 수 있어요.",
            "들킬 위험은 거의 없어요!",
          ],
        },
        {
          image: IMAGE_URLS.investing_game.ninja.ninja2,
          label: "달조각 목걸이",
          descriptions: [
            "목표물은 작지만 반짝이는 보물이에요.",
            "들킬 수도 있지만, 잘만 하면 꽤 괜찮은 보상을 얻을 수 있어요.",
            "적당한 모험과 적당한 보상!",
          ],
        },
        {
          image: IMAGE_URLS.investing_game.ninja.ninja3,
          label: "달빛 방패",
          descriptions: [
            "왕실의 보물창고 깊숙이 숨겨진 전설의 방패예요.",
            "훔치기 어렵고 위험하지만, 성공하면 엄청난 돈을 벌 수 있어요.",
            "대담한 도둑만이 이 작전에 도전할 수 있어요",
          ],
        },
      ]}
      gamePlayPath="/investing/game/ninja?stage=game-play"
    />
  );
};
