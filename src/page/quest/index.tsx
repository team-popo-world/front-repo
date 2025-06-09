import { QuestTemplate } from "../../module/quest/template";
import { useNavigate } from "react-router-dom";

export default function QuestPage() {
  const navigate = useNavigate();

  const onClickQuest = (questType: string) => {
    navigate(`/quest/detail/${questType}`);
  };

  const handleBack = () => {
    navigate("/");
  };
  return <QuestTemplate onClickQuest={onClickQuest} onBack={handleBack} />;
}
