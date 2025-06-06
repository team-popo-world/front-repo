import { usePosts } from "@/lib/react-query/use-data-query";

export const ReatQueryTestPage = () => {
  // 포스트 목록 조회
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Query 테스트</h1>
      {/* 포스트 목록 */}
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
            <p className="text-sm text-gray-500">User ID: {post.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
