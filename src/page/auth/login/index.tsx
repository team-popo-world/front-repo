import { Background } from "../../../components/layout/Background";
import backgroundImage from "../../../assets/image/login/login_background.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../lib/api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/toast.css";
import { useAuthStore } from "@/lib/zustand/store";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, setAccessToken } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 로그인 요청
      const response = await apiClient.post("/auth/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      // 응답 데이터 로깅
      console.log("로그인 응답:", response);

      // 액세스 토큰 처리
      const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
      if (accessToken) {
        console.log("액세스 토큰 설정:", accessToken);
        setAccessToken(accessToken);
      } else {
        console.warn("액세스 토큰이 응답에 없습니다.");
      }

      // 리프레시 토큰 처리
      const refreshToken = response.headers["refresh-token"];
      if (refreshToken) {
        console.log("리프레시 토큰 저장");
        Cookies.set("refreshToken", refreshToken, {
          expires: 14,
          secure: true,
          sameSite: "lax"
        });
      } else {
        console.warn("리프레시 토큰이 응답에 없습니다.");
      }

      // 사용자 정보 저장
      if (response.data) {
        console.log("사용자 정보 저장:", response.data);
        login(response.data.name, response.data.point);
      }

      // 메인 페이지로 이동
      navigate("/");
    } catch (error: any) {
      console.error("로그인 에러:", error);
      
      // 에러 응답이 있는 경우
      if (error.response) {
        console.error("에러 상세:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        
        // 서버에서 보낸 에러 메시지 사용
        const errorMessage = error.response.data?.message || "로그인에 실패했습니다.";
        toast.error(errorMessage);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error("응답 없음:", error.request);
        toast.error("서버에서 응답이 없습니다. 잠시 후 다시 시도해주세요.");
      } else {
        // 요청 자체가 실패한 경우
        console.error("요청 실패:", error.message);
        toast.error("네트워크 연결을 확인해주세요.");
      }
    }
  };

  return (
    <Background backgroundImage={backgroundImage}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center" autoComplete="off">
        <h1
          className="text-[4rem] font-extrabold text-[#BBEB4B] text-center mt-6"
          style={{ WebkitTextStroke: "3px #457E9E" }}
        >
          로그인
        </h1>
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />

        <button
          type="submit"
          className="mt-3 rounded-full bg-[#EB864B] px-4 py-3 text-white font-bold w-80 text-[1.2rem] cursor-pointer"
        >
          로그인
        </button>
        <Link to="/auth/register" className="mt-2 text-white text-center text-[0.8rem] ">
          회원가입
        </Link>
        <div className="w-13 h-[1px] bg-white rounded-full" />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
        className="w-60"
      />
    </Background>
  );
}
