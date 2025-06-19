import { Background } from "../../components/layout/Background";
import { IMAGE_URLS } from "../../lib/constants/constants";
import { BackArrow } from "../../components/button/BackArrow";
import { useState, useEffect } from "react";
import apiClient from "../../lib/api/axios";

// 먹이 타입 정의
interface Feed {
  productId: string;
  name: string;
  price: number;
  stock: number;
  type: string;
  exp: number;
}

// 포포 키우기 응답 타입
interface FeedsResponse {
  currentLevel: number;
  currentExperience: number;
  totalExperience: number;
  availableFeeds: Feed[];
}

// 먹이 주기 응답 타입
interface FeedResponse {
  newLevel: number;
  currentExperience: number;
  totalExperience: number;
  gainedExperience: number;
  levelUp: boolean;
  fedItems: string[];
  message: string;
}

// 먹이 이미지 매핑
const feedImageMap: Record<string, keyof typeof IMAGE_URLS.raising> = {
  "당근": "carrot",
  "물고기": "fish",
  "빵": "bread",
  "사과": "apple",
  "수박": "watermelon",
  "브로콜리": "broccoli"
};

// 기본 먹이 목록 (모든 가능한 먹이 정보)
const ALL_FEEDS: Feed[] = [
  {
    productId: "866bef12-a4cd-4b27-baf7-9d75194e7175",
    name: "당근",
    price: 100,
    stock: 0,
    type: "npc",
    exp: 10
  },
  {
    productId: "6bb33b33-5c96-4f01-b902-844a2556d5f8",
    name: "물고기",
    price: 200,
    stock: 0,
    type: "npc",
    exp: 15
  },
  {
    productId: "ac4fef2e-8b24-467a-91cd-ebac7d69725d",
    name: "빵",
    price: 150,
    stock: 0,
    type: "npc",
    exp: 12
  },
  {
    productId: "a2899806-3258-48e6-b394-02681339b336",
    name: "사과",
    price: 80,
    stock: 0,
    type: "npc",
    exp: 8
  },
  {
    productId: "c53f181f-7c6e-44c8-a711-4194cac552f1",
    name: "수박",
    price: 300,
    stock: 0,
    type: "npc",
    exp: 20
  },
  {
    productId: "cbb28e06-b5d9-425d-aea9-f33e7f74a32b",
    name: "브로콜리",
    price: 120,
    stock: 0,
    type: "npc",
    exp: 10
  }
];

export default function RaisingPage() {
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [maxExp, _setMaxExp] = useState(100);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [showExpMsg, setShowExpMsg] = useState(false);
  const [addedExp, setAddedExp] = useState(0);
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const [levelUp, setLevelUp] = useState(false);
  const [_pendingExpMsg, setPendingExpMsg] = useState(false);
  const [characterAnim, setCharacterAnim] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // 먹이 목록 조회
  const fetchFeeds = async () => {
    try {
      const response = await apiClient.get<FeedsResponse>("/api/popo/feeds");
      const { currentLevel, currentExperience, availableFeeds } = response.data;
      
      // API 응답과 기본 먹이 목록을 합침
      const mergedFeeds = ALL_FEEDS.map(defaultFeed => {
        const apiFeed = availableFeeds.find(feed => feed.productId === defaultFeed.productId);
        return apiFeed || defaultFeed;  // API에 없는 먹이는 기본 정보(stock: 0) 사용
      });

      setLevel(currentLevel);
      setExp(currentExperience);
      setFeedList(mergedFeeds);
    } catch (error) {
      console.error("먹이 목록 조회 실패:", error);
      setLevel(1);
      setExp(0);
      setFeedList(ALL_FEEDS);  // 에러 시 모든 먹이를 0개로 표시
    }
  };

  // 컴포넌트 마운트 시 먹이 목록 조회
  useEffect(() => {
    fetchFeeds();
  }, []);

  function getCharacterImg(level: number) {
    if (level >= 5) return IMAGE_URLS.raising.character5;
    if (level == 4) return IMAGE_URLS.raising.character4;
    if (level == 3) return IMAGE_URLS.raising.character3;
    if (level == 2) return IMAGE_URLS.raising.character2;
    return IMAGE_URLS.raising.character1;
  }

  function FeedModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: (selectedFeeds: string[]) => void }) {
    const toggleFeed = (feedId: string) => {
      setSelected((prev) => 
        prev.includes(feedId) ? prev.filter((id) => id !== feedId) : [...prev, feedId]
      );
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
        <div className="relative bg-[#FFF6D1]/100 rounded-3xl px-10 py-8 min-w-[420px]">    
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 bg-[#EBD057] text-center py-2 rounded-xl font-bold text-2xl text-[#834400] w-50">
            먹이 선택하기
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8 mb-6">
            {feedList.map((feed) => (
              <div
                key={feed.productId}
                className={`flex items-center bg-white rounded-xl px-4 py-2 shadow
                  ${feed.stock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  ${selected.includes(feed.productId) ? "ring-4 ring-yellow-300" : ""}
                `}
                onClick={() => {
                  if (feed.stock === 0) return;
                  toggleFeed(feed.productId);
                }}
              >
                <img 
                  src={IMAGE_URLS.raising[feedImageMap[feed.name]]} 
                  alt={feed.name} 
                  className="w-8 h-8 object-contain mr-2" 
                />
                <span className="font-bold ml-5 text-lg text-[#6F4223]">{feed.stock}개</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <button
              className="bg-[#EBD057] text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow cursor-pointer"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="bg-[#EBD057] text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow cursor-pointer"
              onClick={() => onConfirm(selected)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFeedConfirm = async (selectedFeeds: string[]) => {
    setIsFeedModalOpen(false);
    if (selectedFeeds.length > 0) {
      try {
        // 선택한 먹이 ID 목록을 서버에 전송
        const response = await apiClient.post<FeedResponse>("/api/popo/feed", {
          feedItems: selectedFeeds.map(id => ({
            productId: id,
            amount: 1
          }))
        });

        const { 
          newLevel,
          currentExperience: newExp,
          gainedExperience,
          levelUp: didLevelUp,
          message 
        } = response.data;

        setAddedExp(gainedExperience);

        if (didLevelUp) {
          setLevelUp(true);
          setPendingExpMsg(true);
          setTimeout(() => {
            setLevelUp(false);
            setCharacterAnim(true);
            setTimeout(() => setCharacterAnim(false), 1000);
          }, 1000);
        } else {
          setShowExpMsg(true);
          setTimeout(() => setShowExpMsg(false), 1000);
        }

        setLevel(newLevel);
        setExp(newExp);
        setSelected([]);
        
        // 먹이 목록 갱신
        fetchFeeds();
      } catch (error: any) {
        console.error("먹이 주기 실패:", error);
        if (error.response?.data?.message) {
          // 서버에서 전달된 에러 메시지가 있다면 표시
          alert(error.response.data.message);
        } else {
          alert("먹이 주기에 실패했습니다.");
        }
      }
    }
  };

  return (
    <Background backgroundImage={IMAGE_URLS.raising.background}>
      <div className="absolute top-3 left-1 w-23 min-h-0 flex flex-wrap active:scale-95 transition-all duration-100 z-50">
        <BackArrow />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="mt-9 text-[2rem] font-bold text-[#834400] bg-[#EBD057] px-8 py-1 rounded-[1rem]">포포 키우기</h1>
        <div className="relative w-[13rem] h-[13rem] flex items-end justify-center mt-5">
          
          <img
            src={getCharacterImg(level)}
            alt={`character${level}`}
            className={`absolute left-1/2 top-0 -translate-x-1/2 w-[13rem] z-1 transition-transform duration-500 ${
              characterAnim ? "scale-125 drop-shadow-glow" : ""
            }`}
          />
          <img
            src={IMAGE_URLS.raising.nest}
            alt="nest"
            className="absolute left-1/2 top-40 -translate-x-1/2 w-[12rem] z-0"
          />
        </div>
        <div className="w-full max-w-xl mx-auto mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-2xl text-[#6F4223]">Level {level}</span>
            <button
              className="bg-yellow-300 text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow cursor-pointer"
              onClick={() => {
                fetchFeeds(); // 먹이 주기 버튼 클릭 시 먹이 목록 실시간 조회
                setIsFeedModalOpen(true);
              }}
            >
              먹이 주기
            </button>
            <span className="font-bold text-2xl text-[#6F4223]">
              {exp}/{maxExp}
            </span>
          </div>
          <div className="w-full h-5 bg-green-100 rounded-full shadow-inner overflow-hidden">
            <div
              className="h-full bg-green-300 rounded-full transition-all duration-300"
              style={{ width: `${(exp / maxExp) * 100}%` }}
            />
          </div>
        </div>
        {isFeedModalOpen && (
          <FeedModal
            onCancel={() => {
              setIsFeedModalOpen(false);
              setSelected([]);
            }}
            onConfirm={handleFeedConfirm}
          />
        )}
        {levelUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-[#FFF6D1] rounded-2xl px-8 py-6 shadow text-center flex flex-col items-center">
              <div className="text-3xl font-extrabold text-yellow-500 mb-2">레벨업!</div>
              <img src={getCharacterImg(level)} alt={`character${level}`} className="w-40 h-40 mx-auto mb-2" />
              <div className="text-xl font-bold text-[#6F4223] mb-2">포포가 성장했어요!</div>
            </div>
          </div>
        )}
        {showExpMsg && !levelUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-[#FFF6D1] rounded-2xl px-8 py-3 shadow text-center">
              <div className="text-2xl font-bold text-[#6F4223] mt-1">+{addedExp} 경험치 획득!</div>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
}
