import { QuestCompleteTemplate } from "@/module/quest/template/QuestCompleteTemplate";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuestComplete() {
  const navigate = useNavigate();
  const location = useLocation();

  const questType = location.state?.questType;

  const handleClick = () => {
    navigate(`/quest/detail/${questType}`);
  };
  return <QuestCompleteTemplate onComplete={handleClick} />;
}
