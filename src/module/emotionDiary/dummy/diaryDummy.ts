import type { Diary } from "../types/diary";

export const dummyDiaries: Diary[] = [
  {
    emotion_diary_id: "ed1",
    child_id: "child001",
    description: "오늘은 친구랑 싸워서 속상했어요.",
    emotion: "슬픔",
    created_at: "2025-06-10T14:23:00Z",
  },
  {
    emotion_diary_id: "ed2",
    child_id: "child001",
    description: "엄마가 맛있는 간식을 줘서 기뻤어요!",
    emotion: "기쁨",
    created_at: "2025-06-09T10:05:00Z",
  },
  {
    emotion_diary_id: "ed3",
    child_id: "child002",
    description: "시험을 망쳐서 걱정돼요...",
    emotion: "불안",
    created_at: "2025-06-08T17:45:00Z",
  },
  {
    emotion_diary_id: "ed4",
    child_id: "child002",
    description: "강아지랑 놀아서 즐거웠어요 🐶",
    emotion: "즐거움",
    created_at: "2025-06-07T13:10:00Z",
  },
  {
    emotion_diary_id: "ed5",
    child_id: "child003",
    description: "동생이 내 장난감을 망가뜨려서 화가 났어",
    emotion: "화남",
    created_at: "2025-06-30T09:30:00Z",
  },
];
