import { GamePlay } from "./little-pig-template/game-play";

interface GamePlayTemplateProps {
  gameType: string;
}

export const GamePlayTemplate = ({ gameType }: GamePlayTemplateProps) => {
  switch (gameType) {
    case "little_pig":
      return <GamePlay />;
    default:
      return null;
  }
};
