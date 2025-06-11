import { Background } from "../../../components/layout/Background";
import backgroundImage from "../../../assets/image/register/register_background.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../lib/api/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    gender: "",
    age: "",
    parentCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.email ||
      !form.password ||
      !form.passwordCheck ||
      !form.name ||
      !form.gender ||
      !form.age ||
      !form.parentCode
    ) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }
    if (form.password !== form.passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("비밀번호는 8자리 이상이어야 합니다.");
      return;
    }
    const passwordRule =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
    if (!passwordRule.test(form.password)) {
      toast.error(
        "비밀번호에는 특수문자 1개, 대문자 1개, 숫자 1개 이상이 포함되어야 합니다."
      );
      return;
    }

    try {
      console.log({
        email: form.email,
        password: form.password,
        name: form.name,
        sex: form.gender === "male" ? "M" : "F",
        age: Number(form.age),
        role: "Child",
        parentCode: form.parentCode,
      });
      await apiClient.post("/auth/signup", {
        email: form.email,
        password: form.password,
        name: form.name,
        sex: form.gender === "male" ? "M" : "F",
        age: Number(form.age),
        role: "Child",
        parentCode: form.parentCode,
      });
      toast.success("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Background backgroundImage={backgroundImage}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1
          className="text-[3rem] font-extrabold text-[#BBEB4B] text-center mt-3"
          style={{ WebkitTextStroke: "3px #457E9E" }}
        >
          회원가입
        </h1>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="passwordCheck"
          value={form.passwordCheck}
          onChange={handleChange}
          placeholder="비밀번호 재입력"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <div className="mt-1 rounded-full bg-white px-3 py-1 w-70 flex">
          <span className="text-[#48BBD3] font-bold mr-4">성별</span>
          <label className="flex items-center mr-4 ml-1 font-bold text-[0.8rem]">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
              className="appearance-none w-3 h-3 border-2 border-[#48BBD3] rounded-full checked:bg-[#48BBD3] checked:border-[#48BBD3] mr-2 relative"
            />
            남자
          </label>
          <label className="flex items-center font-bold text-[0.8rem]">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
              className="appearance-none w-3 h-3 border-2 border-[#48BBD3] rounded-full checked:bg-[#48BBD3] checked:border-[#48BBD3] mr-2 relative"
            />
            여자
          </label>
        </div>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="나이"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="text"
          name="parentCode"
          value={form.parentCode}
          onChange={handleChange}
          placeholder="부모님 코드"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="mt-5 rounded-full bg-[#EB864B] text-white font-bold w-70 py-2 shadow-lg focus:outline-none focus:ring-0 cursor-pointer"
        >
          회원가입 완료
        </button>
      </form>
      <ToastContainer
        position="top-right"
        style={{ top: "3.3rem", right: "9rem" }}
      />
    </Background>
  );
}
