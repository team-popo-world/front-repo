interface TurnData {
  started_at: string; // ISO datetime string
  ended_at: string; // ISO datetime string
  risk_level: string; // 예: "고위험 고수익"
  current_point: number;
  before_value: number;
  current_value: number;
  initial_value: number;
  number_of_shares: number;
  income: number;
  transaction_type: string; // 예: "buy" 또는 "sell"
  plus_click: number;
  minus_click: number;
}

interface SendTurnResult {
  success: boolean;
  message: string;
}

export async function sendTurnData(
  sessionId: string,
  chapterId: string,
  turnNumber: number,
  turnData: TurnData
): Promise<SendTurnResult> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/invest/chapter?chapterId=${chapterId}&turn=${turnNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          started_at: turnData.started_at,
          ended_at: turnData.ended_at,
          risk_level: turnData.risk_level,
          current_point: turnData.current_point,
          before_value: turnData.before_value,
          current_value: turnData.current_value,
          initial_value: turnData.initial_value,
          number_of_shares: turnData.number_of_shares,
          income: turnData.income,
          transaction_type: turnData.transaction_type,
          plus_click: turnData.plus_click,
          minus_click: turnData.minus_click,
        }),
      }
    );

    const result = await response.text();
    console.log("턴 데이터 전송 성공:", result);
    return { success: true, message: result };
  } catch (error: any) {
    console.error("턴 데이터 전송 실패:", error);
    return { success: false, message: error.message };
  }
}
