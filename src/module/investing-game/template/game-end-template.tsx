import { LittlePigGameEnd } from "./little-pig-template/game-end";

interface GameEndTemplateProps {
  gameType: string;
  lastPoint: number;
  initialPoint: number;
  sessionId: string;
}
// http://localhost:5173/investing/game/little_pig?stage=game-end
export const GameEndTemplate = ({ gameType, lastPoint, initialPoint }: GameEndTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return <LittlePigGameEnd lastPoint={lastPoint} initialPoint={initialPoint} />;
    default:
      return null;
  }
};
