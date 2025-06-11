import { DiaryWriteTemplate } from "@/module/emotionDiary/template/diaryWrite";
import { useNavigate } from "react-router-dom";

export default function EmotionDiaryWritePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/emotionDiary");
  };
  return <DiaryWriteTemplate onBack={handleBack} />;
}
