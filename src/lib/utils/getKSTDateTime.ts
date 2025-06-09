export function getKSTDateTime() {
  return new Date()
    .toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(
      /(\d{4})\. (\d{2})\. (\d{2})\. (\d{2}):(\d{2}):(\d{2})/,
      "$1-$2-$3T$4:$5:$6"
    );
}
