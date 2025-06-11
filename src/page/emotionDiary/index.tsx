import { useNavigate } from "react-router-dom";
import { EmotionDiaryTemplate } from "../../module/emotionDiary/template";

export default function EmotionDiaryPage() {
  const navigate = useNavigate();

  const handleClickWrite = () => {
    navigate("/emotionDiary/write");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <EmotionDiaryTemplate onClickWrite={handleClickWrite} onBack={handleBack} />
  );
}
