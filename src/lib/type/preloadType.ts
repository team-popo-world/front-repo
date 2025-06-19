// preload 함수의 타입 선언
declare module "react-dom" {
  export function preload(
    href: string,
    options?: {
      as?: string;
    }
  ): void;
}
