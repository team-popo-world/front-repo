import { Background } from "../../../components/layout/Background";
import backgroundImage from "../../../assets/image/login/login_background.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    navigate("/");
  };

  return (
    <Background backgroundImage={backgroundImage}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1
          className="text-[4rem] font-extrabold text-[#BBEB4B] text-center mt-6"
          style={{ WebkitTextStroke: "3px #457E9E" }}
        >
          로그인
        </h1>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="mt-3 rounded-full bg-[#EB864B] px-4 py-3 text-white font-bold w-80 text-[1.2rem]"
        >
          로그인
        </button>
        <Link
          to="/auth/register"
          className="mt-2 text-white text-center text-[0.8rem] "
        >
          회원가입
        </Link>
        <div className="w-13 h-[1px] bg-white rounded-full" />
      </form>
    </Background>
  );
}
