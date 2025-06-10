import apiClient, { ApiError } from "../axios";

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
    const response = await apiClient.post(`/api/invest/clear/chapter`, {
      chapterId: chapterId,
      sessionId: sessionId,
      success: isSuccess,
      profit: profitValue,
    });

    console.log("게임 종료:", response.data);
    return { success: true, message: response.data };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("게임 종료 실패:", error.message);
      return { success: false, message: error.message };
    }
    console.error("예상치 못한 에러:", error);
    return { success: false, message: "예상치 못한 에러가 발생했습니다." };
  }
}
