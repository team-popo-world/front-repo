import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { WoodTitle } from "../components/WoodTitle";
import { SpeechBubble } from "../components/SpeechBubble";
import coin from "@/assets/image/common/common_coin.webp";
import { Modal } from "@/components/modal/Modal";
import { PurchaseModal } from "../components/PurchaseModal";
import NameAndPoint from "@/components/user/NameAndPoint";

interface NpcShopTemplateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productIndex: number;
  selectedProduct: { name: string; price: number; image: string } | null;
  currentMessage: { text: string; buttonText: string };
  handleSpeechBubbleClick: () => void;
  handleProductClick: (product: { name: string; price: number; image: string }) => void;
  PRODUCT_LIST: { name: string; price: number; image: string }[];
  handleBack: () => void;
}

export const NpcShopTemplate = ({
  isOpen,
  setIsOpen,
  productIndex,
  selectedProduct,
  currentMessage,
  handleSpeechBubbleClick,
  handleProductClick,
  PRODUCT_LIST,
  handleBack,
}: NpcShopTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.market.npc_shop_bg}>
      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PurchaseModal
          image={selectedProduct?.image || ""}
          text={selectedProduct?.name || ""}
          price={selectedProduct?.price || 0}
          onConfirm={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <BackArrow onClick={handleBack} />
      <NameAndPoint />
      <WoodTitle title="NPC 상점" />
      <SpeechBubble
        text={currentMessage.text}
        buttonText={currentMessage.buttonText}
        onClick={handleSpeechBubbleClick}
      />
      {/* 상품들 */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-75 flex items-center gap-x-14">
        {PRODUCT_LIST.slice(productIndex * 3, (productIndex + 1) * 3).map((product) => (
          <div
            className="relative active:scale-95 transition-all duration-100"
            key={product.name}
            onClick={() => handleProductClick(product)}
          >
            <img src={IMAGE_URLS.items.dish} alt="dish" className="w-14 h-14 object-contain" />
            <img src={product.image} alt={product.name} className="w-8 h-8 top-0 left-3.5 absolute object-contain" />
          </div>
        ))}
      </div>
      {/* 가격표 */}
      <div className="absolute bottom-8.5 left-1/2 -translate-x-1/2 w-86 flex items-stretch gap-x-2">
        {PRODUCT_LIST.slice(productIndex * 3, (productIndex + 1) * 3).map((product) => (
          <div
            className="flex flex-col justify-center items-center gap-y-0.5 w-26 px-4 py-1.5 bg-[#F6D8B8] border-2 border-[#97784A] rounded-md min-h-[3.5rem] active:scale-95 transition-all duration-100"
            key={product.name}
            onClick={() => handleProductClick(product)}
          >
            <div className="text-[#6E532C] text-[0.65rem] font-bold">{product.name}</div>
            <div className="flex items-center gap-1">
              <img src={coin} alt="coin" className="w-3.5 h-3.5 object-contain" />
              <div className="text-[0.6rem] text-[#6E532C] font-bold">{product.price}냥</div>
            </div>
          </div>
        ))}
      </div>
    </Background>
  );
};
