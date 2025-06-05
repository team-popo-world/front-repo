import { QuestTemplate } from "../../module/quest/template";
import { useNavigate } from "react-router-dom";

export default function QuestPage() {
  const navigate = useNavigate();

  const onClickQuest = (questType: string) => {
    navigate(`/quest/detail/${questType}`);
  };
  return <QuestTemplate onClickQuest={onClickQuest} />;
}
