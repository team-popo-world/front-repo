export interface Quest {
  quest_id: string;
  child_id: string;
  type: "parent" | "daily";
  name: string;
  description: string;
  state:
    | "수락하기"
    | "다 했어요"
    | "기다리는 중"
    | "돈 받기"
    | "완료!"
    | "만료!";
  end_date: string;
  created: string;
  isStatic: boolean;
  reward: number;
  imageUrl?: string;
  label: string;
}
