// src/hooks/useApiError.ts
import { useState } from "react";
import { ApiError } from "@/lib/api/axios";

export const useApiError = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      setError(error);
    } else {
      setError(new ApiError(0, "알 수 없는 에러가 발생했습니다."));
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError,
  };
};
