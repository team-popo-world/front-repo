import { LittlePigGameStart } from "./little-pig-template/game-start";

interface GameStartTemplateProps {
  gameType: string;
}

export const GameStartTemplate = ({ gameType }: GameStartTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return <LittlePigGameStart />;
    default:
      return null;
  }
};
