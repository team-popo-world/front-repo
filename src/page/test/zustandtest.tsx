import { useAuthStore } from "@/lib/zustand/store";

export const ZustandTest = () => {
  // Zustand 스토어에서 필요한 상태와 액션들을 가져옴
  const { accessToken, isAuthenticated, setAccessToken, logout } = useAuthStore();

  // const dummyUser = {
  //   email: "test@example.com",
  //   name: "테스트 유저",
  // };

  const handleLogin = () => {
    setAccessToken("dummy-access-token");
    // setUser(dummyUser);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Zustand Auth Store 테스트</h1>

      <div className="space-y-4">
        {/* 현재 스토어 상태를 JSON 형태로 표시 */}
        <div className="p-4 border rounded">
          <h2 className="font-bold mb-2">현재 상태:</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify({ accessToken, isAuthenticated}, null, 2)}
          </pre>
        </div>

        {/* 로그인/로그아웃 버튼 */}
        <div className="space-x-2">
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            로그인 (더미 데이터)
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            로그아웃
          </button>
        </div>

        {/* 로그인 상태일 때만 표시되는 사용자 정보 */}
        {isAuthenticated && (
          <div className="p-4 bg-green-100 rounded">
            <p>로그인 상태입니다!</p>
            {/* <p>이메일: {user?.email}</p>
            <p>이름: {user?.name}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};
