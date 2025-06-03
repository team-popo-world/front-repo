import { LittlePigGameEnd } from "./little-pig-template/game-end";

interface GameEndTemplateProps {
  gameType: string;
}

export const GameEndTemplate = ({ gameType }: GameEndTemplateProps) => {
  switch (gameType) {
    case "little_pig":
      return <LittlePigGameEnd />;
    default:
      return null;
  }
};
