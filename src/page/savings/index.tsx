import { Background } from "../../components/layout/Background";
import background_img from "../../assets/image/savings/savings_background.webp";
import character_img from "../../assets/image/savings/savings_character.webp";
import star_img from "../../assets/image/savings/savings_star.webp";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackArrow } from "../../components/button/BackArrow";
import { ko } from "date-fns/locale";

export default function SavingsPage() {
  // ========== 상태 관리 변수들 ==========

  // 날짜 관련 상태
  const [startDate, setStartDate] = useState<Date | null>(null); // 저축 시작 날짜
  const [endDate, setEndDate] = useState<Date | null>(null); // 저축 종료 날짜
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null); // 현재 열린 날짜 선택기

  // 금액 관련 상태
  const [currentAmount, setCurrentAmount] = useState<string>(""); // 현재 저축된 금액
  const [goalAmount, setGoalAmount] = useState<string>(""); // 목표 저축 금액
  const [depositAmount, setDepositAmount] = useState<string>(""); // 초기 입금 금액 (통장 개설시)

  // 입력 모달 관련 상태
  const [openInput, setOpenInput] = useState<
    "current" | "goal" | "deposit" | null
  >(null); // 현재 열린 입력 모달 타입
  const [inputValue, setInputValue] = useState<string>(""); // 입력 모달의 임시 입력값

  // 날짜 선택기 참조
  const startPickerRef = useRef<any>(null);
  const endPickerRef = useRef<any>(null);

  // 저축 통장 상태 관리
  const [isCreated, setIsCreated] = useState(false); // 저축 통장 개설 여부

  // 입금 모달 관련 상태
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false); // 입금 모달 열림 상태
  const [depositInput, setDepositInput] = useState(""); // 입금 모달의 입력값

  // 보상 및 결과 모달 관련 상태
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false); // 목표 달성 보너스 모달
  const [isDepositResultModalOpen, setIsDepositResultModalOpen] =
    useState(false); // 입금 결과 모달
  const [lastDepositAmount, setLastDepositAmount] = useState(""); // 마지막 입금 금액 (결과 모달에서 표시용)

  // ========== 이벤트 핸들러 함수들 ==========

  /**
   * 오버레이 클릭 시 열린 모달들을 닫는 함수
   */
  const handleOverlayClick = () => {
    setOpenPicker(null); // 날짜 선택기 닫기
    setOpenInput(null); // 입력 모달 닫기
  };

  /**
   * 금액 입력 모달을 여는 함수
   * @param type - 입력할 금액의 타입 (현재금액/목표금액/입금금액)
   */
  const handleOpenInput = (type: "current" | "goal" | "deposit") => {
    setOpenInput(type);
    // 기존 값이 있으면 입력 필드에 미리 채워넣기
    if (type === "current") setInputValue(currentAmount);
    if (type === "goal") setInputValue(goalAmount);
    if (type === "deposit") setInputValue(depositAmount);
  };

  /**
   * 입력 모달에서 입력한 값을 저장하는 함수
   */
  const handleSaveInput = () => {
    // 현재 열린 입력 모달의 타입에 따라 해당 상태 업데이트
    if (openInput === "current") setCurrentAmount(inputValue);
    if (openInput === "goal") setGoalAmount(inputValue);
    if (openInput === "deposit") setDepositAmount(inputValue);
    setOpenInput(null); // 입력 모달 닫기
  };

  /**
   * 입금하기 버튼 클릭 시 입금 모달을 여는 함수
   */
  const handleDepositClick = () => {
    setDepositInput(""); // 입력값 초기화
    setIsDepositModalOpen(true); // 입금 모달 열기
  };

  /**
   * 입금 모달에서 입금을 확정하는 함수
   */
  const handleDepositConfirm = () => {
    // 현재 금액과 입금 금액을 합산
    const sum = (Number(currentAmount) || 0) + (Number(depositInput) || 0);
    setCurrentAmount(String(sum)); // 새로운 현재 금액 설정
    setIsDepositModalOpen(false); // 입금 모달 닫기

    setLastDepositAmount(depositInput); // 결과 모달에서 표시할 입금 금액 저장
    setIsDepositResultModalOpen(true); // 입금 결과 모달 열기

    // 목표 달성 체크 - 현재 금액이 목표 금액과 정확히 일치하면 보너스 모달 표시
    if (goalAmount && sum === Number(goalAmount)) {
      setIsBonusModalOpen(true);
    }
  };

  return (
    <>
      {/* 숫자 입력 필드의 스핀 버튼 제거를 위한 CSS */}
      <style>
        {`
        /* 달력 전체 배경색 */
        .react-datepicker {
          background: #FFF6D1 !important;
          font-family: 'TJJoyofsinging';
          border: 8px solid #BBA14F;
          border-radius: 1.2rem !important;
          overflow: hidden;
        }
        /* 달력 헤더(월/연도) 폰트, 색상 */
        .react-datepicker__current-month {
          font-size: 1.2rem;
          font-weight: bold;
          color: #6F4223;
          font-family: inherit;
        }
        /* 요일(일~토) 폰트, 색상 */
        .react-datepicker__day-name {
          color: #BBA14F;
          font-weight: bold;
          font-size: 1rem;
          font-family: inherit;
          
        }
        /* 날짜(숫자) 폰트, 색상 */
        .react-datepicker__day {
          color: #573924;
          font-size: 1.1rem;
          font-family: inherit;
        }
        /* 오늘 날짜 배경 */
        .react-datepicker__day--today {
          background: #FDF0B7;
          color: #573924;
        }
        /* 선택된 날짜 배경 */
        .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
          background: #78CA7F !important;
          color: #fff !important;
        }
        /* hover 효과 */
        .react-datepicker__day:hover {
          background: #BBA14F;
          color: #fff;
        }
        /* 네비게이션(화살표) 색상 */
        .react-datepicker__navigation-icon::before {
          border-color: #6F4223 !important;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .react-datepicker__navigation-icon {
          width: 0.4rem;   /* 원하는 크기로 조절 */
          height: 0.2rem;
        }

        .react-datepicker__day,
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__day--today {
          border-radius: 50% !important;
        }
      
}
        
      `}
      </style>

      {/* 메인 컨테이너 */}
      <Background backgroundImage={background_img}>
        <BackArrow />

        {/* 페이지 제목 */}
        <div className="w-full flex flex-col items-center mt-8">
          <h1 className="text-[2.3rem] font-extrabold text-white mb-2 text-center">
            반짝반짝 <br />
            포포의 저축 통장
          </h1>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-row justify-between items-end w-full mx-auto mt-2">
          {/* 저축 정보 카드 */}
          <div className="bg-[#FFF6D1] rounded-[3rem] ml-10 pl-9 pr-4 py-6 w-90">
            {/* 저축 통장이 개설되지 않은 경우 - 초기 설정 화면 */}
            {!isCreated ? (
              <div className="grid grid-cols-2 gap-x-1 gap-y-1">
                {/* 시작 날짜 입력 */}
                <div>
                  <div className="font-bold text-lg text-[#BBA14F]">
                    시작 날짜
                  </div>
                  <div
                    onClick={() => setOpenPicker("start")}
                    className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                  >
                    {startDate
                      ? new Date(startDate).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }) + ""
                      : "날짜 선택"}
                  </div>
                </div>

                {/* 종료 날짜 입력 */}
                <div>
                  <div className="font-bold text-lg text-[#BBA14F]">
                    종료 날짜
                  </div>
                  <div
                    onClick={() => setOpenPicker("end")}
                    className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                  >
                    {endDate
                      ? new Date(endDate).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }) + ""
                      : "날짜 선택"}
                  </div>
                </div>

                {/* 현재 금액 (초기값 0) */}
                <div>
                  <div className="font-bold text-lg text-[#BBA14F]">
                    현재 금액
                  </div>
                  <div className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8">
                    0냥
                  </div>
                </div>

                {/* 목표 저축 금액 입력 */}
                <div>
                  <div className="font-bold text-lg text-[#BBA14F]">
                    목표 저축 금액
                  </div>
                  <div
                    onClick={() => handleOpenInput("goal")}
                    className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                  >
                    {goalAmount ? goalAmount + "냥" : "입력"}
                  </div>
                </div>

                {/* 초기 입금 금액 입력 */}
                <div>
                  <div className="font-bold text-lg text-[#BBA14F]">
                    입금 금액
                  </div>
                  <div
                    onClick={() => handleOpenInput("deposit")}
                    className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                  >
                    {depositAmount ? depositAmount + "냥" : "입력"}
                  </div>
                </div>

                {/* 목표 달성 보상 안내 */}
                <div>
                  <div className="font-bold text-lg text-[#BBA14F]">
                    목표 달성시 보상
                  </div>
                  <div className="font-bold text-lg text-[#6F4223]">
                    보너스 300냥
                  </div>
                </div>
              </div>
            ) : (
              /* 저축 통장이 개설된 경우 - 정보 표시 화면 */
              <div className="flex flex-col items-center justify-center w-full py-[0.4rem]">
                <div className="w-full flex flex-col text-lg">
                  {/* 시작 날짜 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">
                      시작 날짜:{" "}
                    </span>
                    <span className="font-bold text-[#573924]">
                      {startDate
                        ? new Date(startDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "-"}
                    </span>
                  </div>

                  {/* 종료 날짜 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">
                      종료 날짜:{" "}
                    </span>
                    <span className="font-bold text-[#573924]">
                      {endDate
                        ? new Date(endDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "-"}
                    </span>
                  </div>

                  {/* 현재 금액 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">
                      현재 금액:{" "}
                    </span>
                    <span className="font-bold text-[#573924]">
                      {currentAmount ? currentAmount + "냥" : "-"}
                    </span>
                  </div>

                  {/* 목표 저축 금액 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">
                      목표 저축 금액:{" "}
                    </span>
                    <span className="font-bold text-[#573924]">
                      {goalAmount ? goalAmount + "냥" : "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 저축 진행 상황 바 (통장 개설 후에만 표시) */}
            {isCreated && (
              <div className="w-full flex flex-col items-center mt-4 ml-[-0.5rem]">
                <div className="w-4/5 h-6 relative flex items-center">
                  {/* 전체 진행 바 배경 */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 bg-[#E6E6E6] rounded-full"></div>

                  {/* 채워진 진행 바 */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-[#78CA7F] rounded-full transition-all duration-500"
                    style={{
                      width:
                        goalAmount && currentAmount
                          ? `${Math.min(
                              (Number(currentAmount) / Number(goalAmount)) *
                                100,
                              100
                            )}%`
                          : "0%",
                    }}
                  ></div>

                  {/* 진행 상황을 나타내는 별 아이콘 */}
                  <img
                    src={star_img}
                    alt="star"
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left:
                        goalAmount && currentAmount
                          ? `calc(${Math.min(
                              (Number(currentAmount) / Number(goalAmount)) *
                                100,
                              100
                            )}% - 1rem)`
                          : "-1rem",
                      width: "2rem",
                      height: "2rem",
                      transition: "left 0.5s",
                    }}
                  />
                </div>

                {/* 현재 금액 / 목표 금액 텍스트 */}
                <div className="mt-0 text-m font-bold text-[#573924]">
                  {currentAmount ? currentAmount : 0} /{" "}
                  {goalAmount ? goalAmount : 0}냥
                </div>
              </div>
            )}
          </div>

          {/* 캐릭터 이미지와 버튼 영역 */}
          <div className="flex flex-col items-center justify-start mt-[-15rem]">
            <img src={character_img} alt="character" className="w-65" />

            {/* 메인 액션 버튼 (통장 개설 또는 입금하기) */}
            <button
              className="bg-[#FDF0B7] text-[#573924] font-bold text-[1.2rem] rounded-4xl py-3 w-45 cursor-pointer"
              onClick={() => {
                if (!isCreated) {
                  // 통장이 개설되지 않은 경우: 초기 입금 금액을 현재 금액으로 설정하고 통장 개설
                  setCurrentAmount(depositAmount);
                  setIsCreated(true);
                } else {
                  // 통장이 이미 개설된 경우: 추가 입금 모달 열기
                  handleDepositClick();
                }
              }}
            >
              {isCreated ? "입금하기" : "저축 통장 개설"}
            </button>
          </div>
        </div>
      </Background>

      {/* ========== 모달들 ========== */}

      {/* 날짜 선택 모달 */}
      {openPicker && (
        <>
          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={handleOverlayClick}
          ></div>

          {/* 날짜 선택기 */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <DatePicker
              ref={openPicker === "start" ? startPickerRef : endPickerRef}
              selected={openPicker === "start" ? startDate : endDate}
              onChange={(date) => {
                // 선택된 날짜를 해당 상태에 저장하고 모달 닫기
                if (openPicker === "start") setStartDate(date);
                else setEndDate(date);
                setOpenPicker(null);
              }}
              open
              onClickOutside={handleOverlayClick}
              dateFormat="yyyy년 MM월 dd일"
              inline
              locale={ko}
            />
          </div>
        </>
      )}

      {/* 금액 입력 모달 */}
      {openInput && (
        <>
          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={handleOverlayClick}
          ></div>

          {/* 입력 폼 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 font-TJ">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[16rem]">
              {/* 모달 제목 */}
              <div className="text-xl font-bold mb-4 text-[#6F4223]">
                {openInput === "goal" && "목표 저축 금액"}
                {openInput === "deposit" && "입금 금액"}
              </div>

              {/* 금액 입력 필드 */}
              <input
                type="number"
                className="bg-white border-4 border-[#BBA14F] rounded-lg px-4 py-2 text-lg text-center mb-4 focus:outline-none w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="금액을 입력하세요"
                autoFocus
              />

              {/* 확인 버튼 */}
              <button
                className="cursor-pointer bg-[#78CA7F] text-[#6F4223] font-bold rounded-xl px-6 py-2 mt-2 transition"
                onClick={handleSaveInput}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* 추가 입금 모달 */}
      {isDepositModalOpen && (
        <>
          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setIsDepositModalOpen(false)}
          ></div>

          {/* 입금 폼 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 font-TJ">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[16rem]">
              <div className="text-xl font-bold mb-4 text-[#6F4223]">
                입금 금액
              </div>

              {/* 입금 금액 입력 필드 */}
              <input
                type="number"
                className="bg-white border-4 border-[#BBA14F] rounded-lg px-4 py-2 text-m text-center mb-4 focus:outline-none w-full"
                value={depositInput}
                onChange={(e) => setDepositInput(e.target.value)}
                placeholder="금액을 입력하세요"
                autoFocus
              />

              {/* 입금하기 버튼 */}
              <button
                className="cursor-pointer bg-[#78CA7F] text-[#6F4223] font-bold rounded-xl px-6 py-2 mt-2 transition"
                onClick={handleDepositConfirm}
              >
                입금하기
              </button>
            </div>
          </div>
        </>
      )}

      {/* 목표 달성 보너스 모달 */}
      {isBonusModalOpen && (
        <>
          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setIsBonusModalOpen(false)}
          ></div>

          {/* 축하 메시지 */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[18rem]">
              <div className="text-2xl font-bold mb-4 text-[#6F4223]">
                축하합니다!
              </div>
              <div className="text-lg text-[#573924] mb-4">
                목표를 달성해서
                <br />
                <span className="font-extrabold text-[#BBA14F]">
                  보너스 300냥
                </span>
                을 받았습니다!
              </div>

              {/* 확인 버튼 */}
              <button
                className="cursor-pointer bg-[#78CA7F] text-[#6F4223] font-bold rounded-xl px-6 py-2 mt-2 transition"
                onClick={() => setIsBonusModalOpen(false)}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* 입금 완료 결과 모달 */}
      {isDepositResultModalOpen && (
        <>
          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setIsDepositResultModalOpen(false)}
          ></div>

          {/* 입금 결과 표시 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 font-TJ">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[22rem] border-8 border-[#BBA14F]">
              <div className="text-2xl font-bold mb-4 text-[#BBA14F]">
                적금!
              </div>

              {/* 입금 정보와 확인 버튼 */}
              <div className="flex flex-row items-center justify-between w-full mb-4">
                <div className="text-lg font-bold text-[#573924] text-left">
                  현재 금액: {currentAmount}냥<br />
                  입금 금액: {lastDepositAmount}냥
                </div>
                <button
                  className="bg-[#BBA14F] text-white font-bold rounded-xl px-6 py-2 ml-4 cursor-pointer"
                  onClick={() => setIsDepositResultModalOpen(false)}
                >
                  확인
                </button>
              </div>

              {/* 업데이트된 진행 상황 바 */}
              <div className="w-full flex flex-col items-center mt-2">
                <div className="w-4/5 h-8 relative flex items-center">
                  {/* 전체 바 */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-6 bg-[#E6E6E6] rounded-full"></div>

                  {/* 채워진 바 */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 bg-[#78CA7F] rounded-full transition-all duration-500"
                    style={{
                      width:
                        goalAmount && currentAmount
                          ? `${Math.min(
                              (Number(currentAmount) / Number(goalAmount)) *
                                100,
                              100
                            )}%`
                          : "0%",
                    }}
                  ></div>

                  {/* 별 아이콘 */}
                  <img
                    src={star_img}
                    alt="star"
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left:
                        goalAmount && currentAmount
                          ? `calc(${Math.min(
                              (Number(currentAmount) / Number(goalAmount)) *
                                100,
                              100
                            )}% - 1.5rem)`
                          : "-1.5rem",
                      width: "3rem",
                      height: "3rem",
                      transition: "left 0.5s",
                    }}
                  />
                </div>

                {/* 달성률 퍼센트 표시 */}
                <div className="mt-2 text-xl font-bold text-[#573924]">
                  {goalAmount && currentAmount
                    ? `${Math.floor(
                        (Number(currentAmount) / Number(goalAmount)) * 100
                      )}%`
                    : "0%"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
