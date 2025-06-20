import React from "react";

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* 원형 테두리 */}
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* X 아이콘 */}
    <path
      d="M16.24 7.76a1 1 0 0 0-1.41 0L12 10.59 9.17 7.76A1 1 0 1 0 7.76 9.17L10.59 12l-2.83 2.83a1 1 0 1 0 1.41 1.41L12 13.41l2.83 2.83a1 1 0 0 0 1.41-1.41L13.41 12l2.83-2.83a1 1 0 0 0 0-1.41z"
      fill="currentColor"
    />
  </svg>
);

export default CloseIcon;
