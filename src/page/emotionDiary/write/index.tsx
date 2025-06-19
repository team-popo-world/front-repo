import { DiaryWriteTemplate } from "@/module/emotionDiary/template/diaryWrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient, { ApiError } from "@/lib/api/axios";

const API_URL = "/api/diary";

export default function EmotionDiaryWritePage() {
  const navigate = useNavigate();

  const [emotion, setEmotion] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(
    "이 날의 이야기는 마음속에만 담아두었어요."
  );

  const handleBack = () => {
    navigate("/emotionDiary");
  };

  const handleSubmit = async () => {
    if (!emotion) {
      alert("감정을 선택해주세요!");
      return;
    }

    try {
      await apiClient.post(API_URL, {
        emotion: emotion,
        description: description || "",
      });

      console.log("POST 데이터 확인:", {
        emotion,
        description,
      });

      navigate("/emotionDiary");
    } catch (error) {
      console.error("submit error:", error);
      if (error instanceof ApiError) {
        const errorMessage = error.data?.message || error.message;
        alert(`일기 저장 실패: ${errorMessage}`);
      } else {
        alert("알 수 없는 오류로 일기 저장에 실패했어요.");
      }
    }
  };
  return (
    <DiaryWriteTemplate
      onBack={handleBack}
      onSelectEmotion={setEmotion}
      onChangeDescription={setDescription}
      onSubmit={handleSubmit}
      selectedEmotion={emotion}
    />
  );
}
