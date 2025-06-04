import { Background } from "@/components/layout/Background";
import backgroundImage from "@/assets/image/investing-game/little_pig/little_pig_bg.webp";
import coin from "@/assets/image/common/common_coin.webp";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { useEffect, useRef } from "react";
import rough from "roughjs";
import * as d3 from "d3";
import scenarioData from "./scenario.json";
import { YellowBorderModal } from "../../component/little-pig-component/yellow-border-modal";
import littlePig1 from "@/assets/image/investing-game/little_pig/little_pig_1.webp";
import littlePig2 from "@/assets/image/investing-game/little_pig/little_pig_2.webp";
import littlePig3 from "@/assets/image/investing-game/little_pig/little_pig_3.webp";

// 각 돼지별 차트 색상 정의
const COLORS = {
  first: "#FF6B6B", // 빨간색 - 첫째 돼지
  second: "#4ECDC4", // 청록색 - 둘째 돼지
  third: "#FFD93D", // 노란색 - 셋째 돼지
};

// 시나리오 데이터를 차트에 맞는 형식으로 변환
const formatData = () => {
  return scenarioData.map((turn) => ({
    turn: turn.turn_number,
    "첫째 돼지": turn.stocks[0].current_value,
    "둘째 돼지": turn.stocks[1].current_value,
    "셋째 돼지": turn.stocks[2].current_value,
  }));
};

// SVG 명령어
// | 명령어     | 설명                 |
// | ------- | ------------------ |
// | `M x,y` | 이동 (MoveTo)        |
// | `L x,y` | 선 (LineTo)         |
// | `H x`   | 수평선                |
// | `V y`   | 수직선                |
// | `C ...` | 베지어 곡선             |
// | `Z`     | 경로 닫기 (Close path) |

export const LittlePigGameEnd = () => {
  const data = formatData();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 차트 크기 설정
    const margin = { top: 50, right: 10, bottom: 40, left: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // SVG 그룹 생성
    // 차트가 있는 전체 영역
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // X축 스케일 설정
    // scaleLinear()는 입력값(데이터)을 출력값(화면 좌표)로 선형(linear) 변환
    // domain()은 데이터의 원래 범위
    // range()는 화면 좌표의 범위
    const x = d3.scaleLinear().domain([1, data.length]).range([0, width]);

    // Y축 스케일 설정
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d["첫째 돼지"], d["둘째 돼지"], d["셋째 돼지"])) as number])
      .range([height, 0]) // 차트 높이
      .nice();

    // rough.js 캔버스 생성
    const rc = rough.svg(svgRef.current);

    // y축 그리드 그리기
    // 차트 높이를 4개로 나누어 그리드 선을 그리고 g 태그에 추가
    const yGridLines = g.selectAll(".grid-line").data(y.ticks(4)).enter().append("g");

    yGridLines
      .append("path")
      // y(d)는 scaleLinear()로 변환된 결과이므로 실제 픽셀 좌표 MoveTo (M) 명령어, Horizontal Line To (H) 명령어
      .attr("d", (d) => `M0,${y(d)}H${width}`) // attr()로는 주로 SVG 속성들을 설정
      .attr("stroke", "#7b5025") // --color-main-brown-575
      .attr("stroke-dasharray", (d, i) => {
        return i !== 0 ? "5,5" : "0,0";
      }) // 5px 선, 5px 공백
      .attr("stroke-width", 1);

    // x축 그리드 그리기
    const xGridLines = g.selectAll(".grid-line").data(x.ticks(7)).enter().append("g");

    xGridLines
      .append("path")
      .attr("d", (d) => `M${x(d)},0V${height}`)
      .attr("stroke", (d, i) => (i === 0 ? "#7b5025" : "none")) // 첫번째 그리고 나머지는 그리지 않음
      .attr("stroke-dasharray", (d, i) => {
        return i !== 0 ? "5,5" : "0,0";
      }) // 5px 선, 5px 공백
      .attr("stroke-width", 1);

    // X축 그리기
    // transform="translate(x, y)"는 해당 요소를 좌표 (x, y)로 이동
    // 현재는 맨 아래로 이동 = 차트 높이만큰 이동
    const xAxis = g.append("g").attr("transform", `translate(0,${height})`);

    // x축 tick 만들기
    xAxis
      .selectAll(".tick") // tick 요소 선택
      .data(x.ticks(data.length)) // data 길이만큼 x 축 개수 만듦
      .enter() // .tick요소가 없으면 새로 만듦
      .append("g") // g그룹에 추가
      .attr("class", "tick") // tick 클래스 추가
      .attr("transform", (d) => `translate(${x(d)},0)`) // 좌표 이동
      .each(function (d) {
        const roughLine = rc.line(0, 0, 0, 6, {
          roughness: 1,
          stroke: "#7b5025", // --color-main-brown-575
          strokeWidth: 2,
        });
        this.appendChild(roughLine); // 그룹에 추가
      });

    // x축 tick-label 만들기
    xAxis
      .selectAll(".tick-label") // tick-label 요소 선택
      // x.ticks의 반환값 =>  ticks(count?: number): number[];
      .data(x.ticks(data.length)) // data 길이만큼 tick-label 개수 만듦
      .enter() // tick-label 요소가 없으면 새로 만듦
      .append("text") // text 요소 추가
      .attr("class", "tick-label") // tick-label 클래스 추가
      .attr("x", (d) => x(d)) // 좌표 이동
      .attr("y", 20) // 위치 조정
      .attr("text-anchor", "middle") // 텍스트 정렬
      .attr("fill", "#7b5025") // --color-main-brown-575
      .attr("font-size", "0.7rem") // 폰트 크기
      .attr("dy", "0.35rem") // 텍스트 위치 조정
      .text((d) => d); // d는 배열의 값 // 인자가 함수라면 내부적으로 저 객체에 등록된 data의 값을 넣어줌

    // Y축 그리기
    const yAxis = g.append("g");

    // y축 tick 만들기
    yAxis
      .selectAll(".tick")
      .data(y.ticks(5))
      .enter()
      .append("g")
      .attr("class", "tick")
      .attr("transform", (d) => `translate(0,${y(d)})`)
      .each(function (d) {
        const roughLine = rc.line(0, 0, -6, 0, {
          roughness: 1,
          stroke: "#8B4513",
          strokeWidth: 2,
        });
        this.appendChild(roughLine);
      });

    // y축 tick-label 만들기
    yAxis
      .selectAll(".tick-label")
      .data(y.ticks(4))
      .enter()
      .append("text")
      .attr("class", "tick-label")
      .attr("x", -10)
      .attr("y", (d) => y(d))
      .attr("text-anchor", "end")
      .attr("fill", "#7b5025") // --color-main-brown-575
      .attr("font-size", "0.7rem") // 폰트 크기
      .attr("dy", "0.2rem") // 텍스트 위치 조정
      .attr("dx", "-0.1rem") // 텍스트 위치 조정
      .text((d) => d); // 텍스트 내용

    // 첫째 돼지 데이터 라인
    const firstPigPoints = data.map((d, i) => ({
      x: x(i + 1),
      y: y(d["첫째 돼지"]),
    }));

    // 첫째 돼지 라인 그리기
    for (let i = 0; i < firstPigPoints.length - 1; i++) {
      const line = rc.line(firstPigPoints[i].x, firstPigPoints[i].y, firstPigPoints[i + 1].x, firstPigPoints[i + 1].y, {
        roughness: 1.5,
        stroke: COLORS.first,
        strokeWidth: 3,
      });
      const lineElement = g.node()?.appendChild(line);
      if (lineElement) {
        lineElement.style.opacity = "0";
        lineElement.style.animation = `fadeIn 0.5s ease-out ${i * 0.2}s forwards`;
      }
    }

    // 둘째 돼지 데이터 라인
    const secondPigPoints = data.map((d, i) => ({
      x: x(i + 1),
      y: y(d["둘째 돼지"]),
    }));

    // 둘째 돼지 라인 그리기
    for (let i = 0; i < secondPigPoints.length - 1; i++) {
      const line = rc.line(
        secondPigPoints[i].x,
        secondPigPoints[i].y,
        secondPigPoints[i + 1].x,
        secondPigPoints[i + 1].y,
        {
          roughness: 1.5,
          stroke: COLORS.second,
          strokeWidth: 3,
        }
      );
      const lineElement = g.node()?.appendChild(line);
      if (lineElement) {
        lineElement.style.opacity = "0";
        lineElement.style.animation = `fadeIn 0.5s ease-out ${i * 0.2}s forwards`;
      }
    }

    // 셋째 돼지 데이터 라인
    const thirdPigPoints = data.map((d, i) => ({
      x: x(i + 1),
      y: y(d["셋째 돼지"]),
    }));

    // 셋째 돼지 라인 그리기
    for (let i = 0; i < thirdPigPoints.length - 1; i++) {
      const line = rc.line(thirdPigPoints[i].x, thirdPigPoints[i].y, thirdPigPoints[i + 1].x, thirdPigPoints[i + 1].y, {
        roughness: 1.5,
        stroke: COLORS.third,
        strokeWidth: 3,
      });
      const lineElement = g.node()?.appendChild(line);
      if (lineElement) {
        lineElement.style.opacity = "0";
        lineElement.style.animation = `fadeIn 0.5s ease-out ${i * 0.2}s forwards`;
      }
    }

    // 데이터 포인트 그리기
    data.forEach((d, i) => {
      // 첫째 돼지 포인트
      const firstPigPoint = rc.circle(x(i + 1), y(d["첫째 돼지"]), 10, {
        roughness: 1,
        fill: COLORS.first,
        fillStyle: "solid",
        stroke: "#7b5025",
        strokeWidth: 3,
      });
      const firstPointElement = g.node()?.appendChild(firstPigPoint);
      if (firstPointElement) {
        firstPointElement.style.opacity = "0";
        firstPointElement.style.animation = `fadeIn 0.5s ease-out ${i * 0.2}s forwards`;
      }

      // 둘째 돼지 포인트
      const secondPigPoint = rc.circle(x(i + 1), y(d["둘째 돼지"]), 10, {
        roughness: 1,
        fill: COLORS.second,
        fillStyle: "solid",
        stroke: "#7b5025",
        strokeWidth: 3,
      });
      const secondPointElement = g.node()?.appendChild(secondPigPoint);
      if (secondPointElement) {
        secondPointElement.style.opacity = "0";
        secondPointElement.style.animation = `fadeIn 0.5s ease-out ${i * 0.2}s forwards`;
      }

      // 셋째 돼지 포인트
      const thirdPigPoint = rc.circle(x(i + 1), y(d["셋째 돼지"]), 10, {
        roughness: 1,
        fill: COLORS.third,
        fillStyle: "solid",
        stroke: "#7b5025",
        strokeWidth: 3,
      });
      const thirdPointElement = g.node()?.appendChild(thirdPigPoint);
      if (thirdPointElement) {
        thirdPointElement.style.opacity = "0";
        thirdPointElement.style.animation = `fadeIn 0.5s ease-out ${i * 0.2}s forwards`;
      }

      // 마지막 데이터 포인트에 돼지 이미지 추가
      if (i === data.length - 1) {
        // 첫째 돼지 이미지
        const firstPigImage = g
          .append("image")
          .attr("xlink:href", littlePig1)
          .attr("x", x(i + 1) - 20)
          .attr("y", y(d["첫째 돼지"]) - 20)
          .attr("width", 40)
          .attr("height", 40)
          .style("opacity", "0")
          .style("animation", `fadeIn 0.5s ease-out ${i * 0.2}s forwards`);

        // 둘째 돼지 이미지
        const secondPigImage = g
          .append("image")
          .attr("xlink:href", littlePig2)
          .attr("x", x(i + 1) - 20)
          .attr("y", y(d["둘째 돼지"]) - 20)
          .attr("width", 40)
          .attr("height", 40)
          .style("opacity", "0")
          .style("animation", `fadeIn 0.5s ease-out ${i * 0.2}s forwards`);

        // 셋째 돼지 이미지
        const thirdPigImage = g
          .append("image")
          .attr("xlink:href", littlePig3)
          .attr("x", x(i + 1) - 20)
          .attr("y", y(d["셋째 돼지"]) - 20)
          .attr("width", 40)
          .attr("height", 40)
          .style("opacity", "0")
          .style("animation", `fadeIn 0.5s ease-out ${i * 0.2}s forwards`);
      }
    });

    // 범례 그리기
    const legend = g
      .append("g")
      .attr("transform", `translate(${width - 270}, -30)`)
      .attr("class", "legend")
      .attr("fill", "#7b5025") // --color-main-brown-575
      .attr("font-size", "0.6rem") // 폰트 크기
      .attr("font-weight", "bold"); // 폰트 굵기

    const legendItems = [
      { color: COLORS.first, name: "첫째 돼지" },
      { color: COLORS.second, name: "둘째 돼지" },
      { color: COLORS.third, name: "셋째 돼지" },
    ];

    legendItems.forEach((item, i) => {
      const legendItem = legend.append("g").attr("transform", `translate(${i * 100}, 0)`);

      const circle = rc.circle(0, 0, 10, {
        roughness: 1,
        fill: item.color,
        fillStyle: "solid",
        stroke: "#7b5025", // --color-main-brown-575
        strokeWidth: 3,
      });
      legendItem.node()?.appendChild(circle);

      legendItem
        .append("text")
        .attr("x", 10) // x축 간격 조정
        .attr("y", 5) // y축 간격 조정
        .attr("fill", "#7b5025") // --color-main-brown-575
        .attr("font-size", "0.6rem") // 폰트 크기
        .attr("font-weight", "bold") // 폰트 굵기
        .text(item.name);
    });

    // 애니메이션 효과
  }, [data]);

  return (
    <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
      <YellowBorderModal className="flex flex-col items-start">
        {/* 제목 */}
        <TextWithStroke
          text="투자 결과!"
          className="self-center mt-2.5 mb-1"
          textClassName="text-main-yellow-200 text-[1.75rem] font-bold"
          strokeClassName="text-main-brown-700 text-[1.75rem] font-bold text-stroke-width-[0.25rem] text-stroke-color-main-brown-700"
        />
        {/* 그래프 */}
        <div className="bg-[#FFFDFA] p-3 rounded-lg shadow-lg w-[600px] h-[350px] relative mx-auto">
          <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 600 350" preserveAspectRatio="xMidYMid meet" />
        </div>
        {/* 결과  */}
        <div className="flex items-center gap-x-2">
          <img src={coin} alt="코인" className="w-8 h-8" />
          <div className="text-main-brown-850 font-bold">총 수익: 1800냥</div>
        </div>
      </YellowBorderModal>
    </Background>
  );
};
