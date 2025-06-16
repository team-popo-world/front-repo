import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MarketTemplate } from "../../module/market/template";
import { preload } from "react-dom";
import { IMAGE_URLS } from "@/lib/constants/constants";
export default function MarketPage() {
  const marketPageImages = [
    IMAGE_URLS.market.bg,
    IMAGE_URLS.market.popo,
    IMAGE_URLS.market.npc_shop,
    IMAGE_URLS.market.inventory,
    IMAGE_URLS.market.parent_shop,
  ];

  marketPageImages.forEach((image) => {
    preload(image, { as: "image" });
  });

  const { state } = useLocation();
  const from = state?.from;
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const navigate = useNavigate();

  // 맨처음 페이지 방문했을때 from이 어떤 페이지로 부터 왔는지 보여주는데
  // useEffect로 main 페이지에서 왔으면 포니 배태우고 오는것
  useEffect(() => {
    if (from === "main") {
      setIsAnimating(true);
      setDirection("right");
    }
  }, [from]);

  // 뒤로가기 버튼 눌렀을때 포니 배타고 나가는것
  const handleBack = () => {
    setIsAnimating(true);
    setDirection("left");
  };

  // 방향에 따라 애니메이션
  const handleAnimationComplete = () => {
    // 오른쪽으로 이동할때는 맨처음 페이지 방문했을때 포니 배타고 오는것
    if (direction === "right") {
      setIsAnimating(false);
    }
    // 왼쪽으로 이동할때는 뒤로가기 버튼 눌렀을때 포니 배타고 나가는것
    if (direction === "left") {
      setIsAnimating(false);
      navigate("/");
    }
    const inventoryPageImages = [
      IMAGE_URLS.market.inventory_bg,
      IMAGE_URLS.market.parent_shop_bg,
      IMAGE_URLS.market.npc_shop_bg,
      IMAGE_URLS.market.wood_title_parent,
      IMAGE_URLS.market.wood_title,
      ...Object.values(IMAGE_URLS.items),
    ];
    inventoryPageImages.forEach((image) => {
      preload(image, { as: "image" });
    });
  };

  const preloadNpcShop = () => {
    const npcShopPageImages = [
      IMAGE_URLS.market.npc_shop_bg,
      IMAGE_URLS.market.wood_title_parent,
      IMAGE_URLS.market.wood_title,
      ...Object.values(IMAGE_URLS.items),
    ];
    npcShopPageImages.forEach((image) => {
      preload(image, { as: "image" });
    });
  };

  const preloadInventory = () => {
    const inventoryPageImages = [
      IMAGE_URLS.market.inventory_bg,
      IMAGE_URLS.market.wood_title_parent,
      IMAGE_URLS.market.wood_title,
      ...Object.values(IMAGE_URLS.items),
    ];
    inventoryPageImages.forEach((image) => {
      preload(image, { as: "image" });
    });
  };

  const preloadParentShop = () => {
    const parentShopPageImages = [
      IMAGE_URLS.market.parent_shop_bg,
      IMAGE_URLS.market.wood_title_parent,
      IMAGE_URLS.market.wood_title,
      ...Object.values(IMAGE_URLS.items),
    ];
    parentShopPageImages.forEach((image) => {
      preload(image, { as: "image" });
    });
  };

  return (
    <MarketTemplate
      isAnimating={isAnimating}
      direction={direction}
      handleBack={handleBack}
      handleAnimationComplete={handleAnimationComplete}
      preloadNpcShop={preloadNpcShop}
      preloadInventory={preloadInventory}
      preloadParentShop={preloadParentShop}
    />
  );
}
