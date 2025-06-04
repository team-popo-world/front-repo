type EndGameResult = {
  success: boolean;
  message: string;
};

export async function endGame(
  sessionId: string,
  chapterId: string,
  isSuccess: boolean,
  profitValue: number
): Promise<EndGameResult> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/invest/clear/chapter?chapterId=${chapterId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          success: isSuccess,
          profit: profitValue,
        }),
      }
    );

    if (response.ok) {
      const result = await response.text();
      console.log("게임 종료:", result);
      return { success: true, message: result };
    } else {
      const error = await response.text();
      console.error("게임 종료 실패:", error);
      return { success: false, message: error };
    }
  } catch (error: any) {
    console.error("네트워크 오류:", error);
    return { success: false, message: error.message };
  }
}
