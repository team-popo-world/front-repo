import { DiaryWriteTemplate } from "@/module/emotionDiary/template/diaryWrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://52.78.53.247:8080/api/diary";

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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotion: emotion,
          description: description || "",
        }),
      });

      console.log("POST 데이터 확인:", {
        emotion,
        description,
      });

      if (!response.ok) {
        throw new Error("서버 오류 발생");
      }

      alert("일기가 성공적으로 ㅓ!");
      navigate("/emotionDiary");
    } catch (error) {
      console.error("submit error:", error);
      alert("일기 저장에 실패했어요.");
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
