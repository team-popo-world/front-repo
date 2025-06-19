import { Background } from "../../components/layout/Background";
import { IMAGE_URLS } from "../../lib/constants/constants";

import { useState } from "react";

export default function RaisingPage() {
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [maxExp, _setMaxExp] = useState(100);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [showExpMsg, setShowExpMsg] = useState(false);
  const [addedExp, setAddedExp] = useState(0);
  const [feedList, setFeedList] = useState([
    { name: "carrot", img: IMAGE_URLS.raising.carrot, count: 3 },
    { name: "bread", img: IMAGE_URLS.raising.bread, count: 8 },
    { name: "fish", img: IMAGE_URLS.raising.fish, count: 7 },
    { name: "apple", img: IMAGE_URLS.raising.apple, count: 2 },
    { name: "watermelon", img: IMAGE_URLS.raising.watermelon, count: 5 },
    { name: "broccoli", img: IMAGE_URLS.raising.broccoli, count: 3 },
  ]);
  const [levelUp, setLevelUp] = useState(false);
  const [_pendingExpMsg, setPendingExpMsg] = useState(false);
  const [characterAnim, setCharacterAnim] = useState(false);

  function getCharacterImg(level: number) {
    if (level >= 5) return IMAGE_URLS.raising.character5;
    if (level == 4) return IMAGE_URLS.raising.character4;
    if (level == 3) return IMAGE_URLS.raising.character3;
    if (level == 2) return IMAGE_URLS.raising.character2;
    return IMAGE_URLS.raising.character1;
  }

  function FeedModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: (selectedFeeds: string[]) => void }) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleFeed = (feedName: string) => {
      setSelected((prev) => (prev.includes(feedName) ? prev.filter((name) => name !== feedName) : [...prev, feedName]));
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
                key={feed.name}
                className={`flex items-center bg-white rounded-xl px-4 py-2 shadow
                  ${feed.count === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  ${selected.includes(feed.name) ? "ring-4 ring-yellow-300" : ""}
                `}
                onClick={() => {
                  if (feed.count === 0) return;
                  toggleFeed(feed.name);
                }}
              >
                <img src={feed.img} alt={feed.name} className="w-8 h-8 object-contain mr-2" />
                <span className="font-bold ml-5 text-lg text-[#6F4223]">{feed.count}개</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <button
              className="bg-[#EBD057] text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="bg-[#EBD057] text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow"
              onClick={() => onConfirm(selected)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFeedConfirm = (selectedFeeds: string[]) => {
    setIsFeedModalOpen(false);
    if (selectedFeeds.length > 0) {
      const expToAdd = selectedFeeds.length * 20;
      setAddedExp(expToAdd);

      setExp((prev) => {
        let totalExp = prev + expToAdd;
        let newLevel = level;
        let didLevelUp = false;
        while (totalExp >= maxExp) {
          totalExp -= maxExp;
          newLevel += 1;
          didLevelUp = true;
        }
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
        return totalExp;
      });

      setFeedList((prev) =>
        prev.map((feed) => (selectedFeeds.includes(feed.name) ? { ...feed, count: Math.max(0, feed.count - 1) } : feed))
      );
    }
  };

  return (
    <Background backgroundImage={IMAGE_URLS.raising.background}>
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
              className="bg-yellow-300 text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow"
              onClick={() => setIsFeedModalOpen(true)}
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
        {isFeedModalOpen && <FeedModal onCancel={() => setIsFeedModalOpen(false)} onConfirm={handleFeedConfirm} />}
        {levelUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-[#FFF6D1] rounded-2xl px-8 py-6 shadow text-center flex flex-col items-center">
              <div className="text-3xl font-extrabold text-yellow-500 mb-2">레벨업!</div>
              <img src={getCharacterImg(level + 1)} alt={`character${level + 1}`} className="w-40 h-40 mx-auto mb-2" />
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
