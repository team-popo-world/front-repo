import { InventoryTemplate } from "@/module/market/template/inventory";
import { useState } from "react";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { useNavigate } from "react-router-dom";

export const TEXT_MESSAGE = {
  not_product: {
    text: "아직 상품이 없어요. \n 다음에 찾아주세요!",
    buttonText: "",
  },
  first: {
    text: "더 많은 상품을 보고 싶나요?",
    buttonText: "더보기",
  },
  middle: {
    text: "좋은 물건 많죠? \n 다음 것도 볼래요?",
    buttonText: "더보기",
  },
  last: {
    text: "이제 마지막이에요. 처음부터 \n 보고싶으면 여기를 눌러요!",
    buttonText: "처음으로",
  },
};

export const PRODUCT_LIST = [
  {
    name: "노트북 10분",
    image: IMAGE_URLS.items.donut,
    price: 100,
  },
  {
    name: "노트북 20분",
    image: IMAGE_URLS.items.Bungeoppang,
    price: 100,
  },
  {
    name: "노트북 30분",
    image: IMAGE_URLS.items.carrot,
    price: 100,
  },
  {
    name: "노트북 40분",
    image: IMAGE_URLS.items.strawberry,
    price: 100,
  },
  {
    name: "노트북 50분",
    image: IMAGE_URLS.items.donut,
    price: 100,
  },
  {
    name: "노트북 60분",
    image: IMAGE_URLS.items.apple,
    price: 100,
  },
  {
    name: "노트북 70분",
    image: IMAGE_URLS.items.feed,
    price: 100,
  },
  {
    name: "노트북 80분",
    image: IMAGE_URLS.items.strawberry,
    price: 100,
  },
  {
    name: "노트북 90분",
    image: IMAGE_URLS.items.feed,
    price: 100,
  },
  {
    name: "노트북 100분",
    image: IMAGE_URLS.items.carrot,
    price: 100,
  },
];

export default function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const lastIndex = Math.ceil(PRODUCT_LIST.length / 3) - 1;
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: number; image: string } | null>(null);
  const navigate = useNavigate();

  const getMessage = () => {
    if (PRODUCT_LIST.length === 0) {
      return TEXT_MESSAGE.not_product;
    }
    if (productIndex === 0) {
      return TEXT_MESSAGE.first;
    }
    if (productIndex === lastIndex) {
      return TEXT_MESSAGE.last;
    }
    return TEXT_MESSAGE.middle;
  };

  const currentMessage = getMessage();

  const handleSpeechBubbleClick = () => {
    if (currentMessage.buttonText === "더보기") {
      setProductIndex((prev) => prev + 1);
    } else if (currentMessage.buttonText === "처음으로") {
      setProductIndex(0);
    }
  };

  const handleProductClick = (product: { name: string; price: number; image: string }) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleBack = () => {
    navigate("/market", { state: { from: "inventory" } });
  };

  return (
    <InventoryTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      productIndex={productIndex}
      selectedProduct={selectedProduct}
      currentMessage={currentMessage}
      handleSpeechBubbleClick={handleSpeechBubbleClick}
      handleProductClick={handleProductClick}
      PRODUCT_LIST={PRODUCT_LIST}
      handleBack={handleBack}
    />
  );
}
