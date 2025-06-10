import { IMAGE_URLS } from "@/lib/constants/constants";

// text F48A00
// button_bg F48A00
// bg FFF4BF
const WEEK = ["월", "화", "수", "목", "금", "토", "일"];

export function AttandanceTemplate() {
  return (
    <div className="w-screen h-screen bg-black font-TJ overflow-hidden flex justify-center items-center">
      <div
        className={
          "bg-[#FFF4BF] px-28 relative w-[360px] h-[258px] sm:w-[430px] sm:h-[300px] md:w-[615px] md:h-[430px] xl:w-[1180px] xl:h-[820px] bg-contain bg-center bg-no-repeat"
        }
      >
        {/* 왼쪽 제목 */}
        <div className="ml-6 flex flex-col w-fit mb-6">
          <h3 className="mt-20 mb-2 text-[#F48A00] text-2xl font-bold text-center">
            축하해요! 연속성공 <br />
            2일을 달성했어요.
          </h3>
          <span className="text-lg text-center font-bold">이제부터 시작입니다!</span>
        </div>
        {/* 마법사 포포 */}
        <img
          src={IMAGE_URLS.attandance.masic_popo}
          alt="마법사 포포"
          className="absolute top-10 right-24 w-44 h-44 object-contain"
        />
        {/* 월 화 수 목 금 토 일 */}
        <div className="flex px-8 py-4 gap-x-3 bg-white rounded-2xl">
          {WEEK.map((day, index) => {
            return (
              <div className="flex flex-col h-full justify-center items-center">
                <div className="text-lg font-bold" key={day}>
                  {day}
                </div>
                {index < 5 ? (
                  <img
                    src={IMAGE_URLS.attandance.circle_popo}
                    alt="출석 포포"
                    className="w-11 min-h-0 object-contain"
                  />
                ) : (
                  <div className="mt-1 w-7.5 h-7.5 rounded-full border border-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
        {/* 출석하기 버튼 */}
        <div className="mt-8 mx-auto w-fit py-2 px-10 bg-[#F48A00] text-white text-lg rounded-xl">출석하기</div>
      </div>
    </div>
  );
}
