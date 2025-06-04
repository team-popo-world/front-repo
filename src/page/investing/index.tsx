import { useNavigate } from "react-router-dom";
import { InvestingTemplate } from "../../module/investing/template";

export default function InvestingPage() {
  const navigate = useNavigate();

  const onClickChapter = (chapter: string) => {
    navigate(`/investing/game/${chapter}`);
  };
  return <InvestingTemplate onClickChapter={onClickChapter} />;
}
