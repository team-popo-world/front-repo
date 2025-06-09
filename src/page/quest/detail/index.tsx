import { QuestDetailTemplate } from "@/module/quest/template/QuestDetailTemplate";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestDetail() {
  const { questType } = useParams() as { questType: string };
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    navigate("/quest/detail/complete", { state: { questType } });
  }, [navigate, questType]);

  const handleBack = () => {
    navigate("/quest");
  };
  // api 호출 코드 부분
  return (
    <div>
      <QuestDetailTemplate
        questType={questType}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    </div>
  );
}
