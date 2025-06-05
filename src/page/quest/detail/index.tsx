import { DailyQuestDetailTemplate } from "@/module/quest/template/DailyQuestDetailTemplate";
import { ParentQuestDetailTemplate } from "@/module/quest/template/ParentQuestDetailTemplate";
import { useParams } from "react-router-dom";

export default function QuestDetail() {
  const { questType } = useParams<{ questType: string }>();

  return (
    <div>
      {questType === "parent" ? (
        <ParentQuestDetailTemplate />
      ) : (
        <DailyQuestDetailTemplate />
      )}
    </div>
  );
}
