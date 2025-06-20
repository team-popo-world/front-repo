import type { Scenario } from "@/page/investing/game";
import { GameEnd } from "./game-template/game-end";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface GameEndTemplateProps {
  gameType: string;
  lastPoint: number;
  initialPoint: number;
  sessionId: string;
  stockNames: string[];
  scenario: Scenario[];
}
// http://localhost:5173/investing/game/little_pig?stage=game-end
export const GameEndTemplate = ({ gameType, lastPoint, initialPoint, stockNames, scenario }: GameEndTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return (
        <GameEnd
          lastPoint={lastPoint}
          initialPoint={initialPoint}
          stockNames={stockNames}
          backgroundImage={IMAGE_URLS.investing_game.little_pig.little_pig_bg}
          characterImages={[
            IMAGE_URLS.investing_game.little_pig.little_pig_1,
            IMAGE_URLS.investing_game.little_pig.little_pig_2,
            IMAGE_URLS.investing_game.little_pig.little_pig_3,
          ]}
          chartImage={IMAGE_URLS.investing_game.little_pig.little_pig_chart}
          scenario={scenario}
          sirenImage={IMAGE_URLS.investing_game.little_pig.little_siren_pig}
        />
      );
    case "truck":
      return (
        <GameEnd
          lastPoint={lastPoint}
          initialPoint={initialPoint}
          stockNames={stockNames}
          backgroundImage={IMAGE_URLS.investing_game.truck.truck_bg}
          characterImages={[
            IMAGE_URLS.investing_game.truck.taco_truck,
            IMAGE_URLS.investing_game.truck.sandwich_truck,
            IMAGE_URLS.investing_game.truck.icecream_truck,
          ]}
          chartImage={IMAGE_URLS.investing_game.base.chart_popo}
          scenario={scenario}
        />
      );
    case "ninja":
      return (
        <GameEnd
          lastPoint={lastPoint}
          initialPoint={initialPoint}
          stockNames={stockNames}
          backgroundImage={IMAGE_URLS.investing_game.ninja.ninja_bg}
          characterImages={[
            IMAGE_URLS.investing_game.ninja.ninja1,
            IMAGE_URLS.investing_game.ninja.ninja2,
            IMAGE_URLS.investing_game.ninja.ninja3,
          ]}
          chartImage={IMAGE_URLS.investing_game.base.chart_popo}
          scenario={scenario}
        />
      );
    case "masic":
      return (
        <GameEnd
          lastPoint={lastPoint}
          initialPoint={initialPoint}
          stockNames={stockNames}
          backgroundImage={IMAGE_URLS.investing_game.masic.masic_bg}
          characterImages={[
            IMAGE_URLS.investing_game.masic.masic_1,
            IMAGE_URLS.investing_game.masic.masic_2,
            IMAGE_URLS.investing_game.masic.masic_3,
          ]}
          chartImage={IMAGE_URLS.investing_game.base.chart_popo}
          scenario={scenario}
        />
      );
    default:
      return null;
  }
};
