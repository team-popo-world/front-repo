import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    gender: '',
    age: '',
    parentCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, gender: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 처리
    // 예시: 회원가입 성공 시 로그인 페이지로 이동
    alert('회원가입 완료!');
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
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
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 재입력"
          value={form.passwordConfirm}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <input
          name="name"
          type="text"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <div className="mb-4">
          <span className="mr-4">성별</span>
          <label className="mr-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === 'male'}
              onChange={handleGenderChange}
              required
            /> 남자
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === 'female'}
              onChange={handleGenderChange}
              required
            /> 여자
          </label>
        </div>
        <input
          name="age"
          type="number"
          placeholder="나이"
          value={form.age}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <input
          name="parentCode"
          type="text"
          placeholder="부모코드 입력"
          value={form.parentCode}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}