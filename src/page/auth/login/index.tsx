import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 처리
    // 예시: 로그인 성공 시 메인 페이지로 이동
    navigate("/");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-6 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            로그인
          </button>
          {/* 회원가입 버튼 */}
          <button
            type="button"
            className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            onClick={() => navigate("/auth/register")}
          >
            회원가입
          </button>
        </form>
      </div>
  );
}
