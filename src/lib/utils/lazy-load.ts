// src/lib/lazy-load.ts
import { lazy, type ComponentType } from "react";

type ModuleType<T> = {
  default: ComponentType<T>;
};

type LazyComponent<T = any> = ComponentType<T> & {
  preload: () => Promise<ModuleType<T>>;
};

type ImportComponent<T = any> = () => Promise<ModuleType<T>>;

export const lazyLoad = <T = any>(importComponent: ImportComponent<T>): LazyComponent<T> => {
  const Component = lazy(importComponent) as unknown as LazyComponent<T>;
  Component.preload = importComponent;
  return Component;
};

// 사용 예시:
// const MarketPage = lazyLoad(() => import("../page/market"));
