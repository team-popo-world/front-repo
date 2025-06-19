import apiClient from "../axios";
import { ApiError } from "../axios";

interface GetAttendanceResponse {
  dayOfWeek: string;
  attended: boolean;
}

export async function getAttendance(): Promise<GetAttendanceResponse[]> {
  try {
    const response = await apiClient.get<GetAttendanceResponse[]>("/api/attendance");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "출석 데이터를 불러오는데 실패했습니다.");
  }
}

export async function postAttendance(dayOfWeek: string) {
  try {
    const response = await apiClient.post<{ weekAttendance: GetAttendanceResponse[] }>("/api/attendance", {
      dayOfWeek,
      isAttended: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "출석 데이터를 전송하는데 실패했습니다.");
  }
}
