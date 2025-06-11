import { QuestDetailTemplate } from "@/module/quest/template/QuestDetailTemplate";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Quest } from "@/module/quest/types/quest";

const questStateMap: Record<string, Quest["state"]> = {
  PENDING_ACCEPT: "수락하기",
  IN_PROGRESS: "다 했어요",
  PENDING_APPROVAL: "기다리는 중",
  APPROVED: "돈 받기",
  COMPLETED: "완료!",
  EXPIRED: "만료!",
};

const serverQuestStateMap: Record<Quest["state"], string> = {
  수락하기: "IN_PROGRESS",
  "다 했어요": "PENDING_APPROVAL",
  "기다리는 중": "",
  "돈 받기": "COMPLETED",
  "완료!": "",
  "만료!": "",
};

const nextStateMap: Record<Quest["state"], Quest["state"] | undefined> = {
  수락하기: "다 했어요",
  "다 했어요": "기다리는 중",
  "기다리는 중": undefined,
  "돈 받기": "완료!",
  "완료!": undefined,
  "만료!": undefined,
};

export default function QuestDetail() {
  const { questType } = useParams() as { questType: string };
  const navigate = useNavigate();

  const [questData, setQuestData] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<Quest["state"] | null>(
    null
  );
  const total = questData.length;
  const completed = questData.filter((q) => q.state === "완료!").length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://52.78.53.247:8080/api/quest?type=${questType}`
        );
        if (!response.ok) throw new Error("서버 응답 실패");

        const data = await response.json();
        const mapped = data.map((item: any) => ({
          ...item,
          state: questStateMap[item.state],
        }));
        setQuestData(mapped);
      } catch (err: any) {
        setError(err.message || "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questType]);

  const handleComplete = useCallback(() => {
    navigate("/quest/detail/complete", { state: { questType } });
  }, [navigate, questType]);

  const handleBack = () => {
    navigate("/quest");
  };

  const handleChangeState = async (
    questId: string,
    childId: string,
    state: Quest["state"]
  ) => {
    const serverState = serverQuestStateMap[state];
    if (!serverState) return;

    const body = { questId, childId, state: serverState };
    console.log("상태 변경 요청 body:", body);

    try {
      const response = await fetch("http://52.78.53.247:8080/api/quest/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("상태 변경 실패");

      const nextState = nextStateMap[state];
      if (!nextState) return;

      setQuestData((prev) =>
        prev.map((quest) =>
          quest.quest_id === questId ? { ...quest, state: nextState } : quest
        )
      );
    } catch (err) {
      console.error("상태 변경 실패:", err);
    }
  };

  const filteredQuestData = selectedState
    ? questData.filter((q) => q.state === selectedState)
    : questData;

  return (
    <div>
      {!loading && !error && (
        <QuestDetailTemplate
          questType={questType}
          questData={filteredQuestData}
          selectedState={selectedState}
          onSelectState={(state) =>
            setSelectedState((prev) => (prev === state ? null : state))
          }
          onComplete={handleComplete}
          onBack={handleBack}
          onChangeState={handleChangeState}
          total={total}
          completed={completed}
          percentage={percentage}
        />
      )}
    </div>
  );
}
