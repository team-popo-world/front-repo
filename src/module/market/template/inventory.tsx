import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { InventorySpeechBubble, SpeechBubble } from "../components/SpeechBubble";
import { InventoryDarkWoodTitle } from "../components/WoodTitle";
import { Modal } from "@/components/modal/Modal";
import { InventoryModal } from "../components/InventoryModal";
import NameAndPoint from "@/components/user/NameAndPoint";

interface InventoryTemplateProps {
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

export const InventoryTemplate = ({
  isOpen,
  setIsOpen,
  productIndex,
  selectedProduct,
  currentMessage,
  handleSpeechBubbleClick,
  handleProductClick,
  PRODUCT_LIST,
  handleBack,
}: InventoryTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.market.inventory_bg}>
      <BackArrow onClick={handleBack} />
      <NameAndPoint />
      <InventoryDarkWoodTitle title="창고" />
      <InventorySpeechBubble
        text={currentMessage.text}
        buttonText={currentMessage.buttonText}
        onClick={handleSpeechBubbleClick}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <InventoryModal
          text={selectedProduct?.name || ""}
          price={selectedProduct?.price || 0}
          image={selectedProduct?.image || ""}
          onConfirm={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      {/* 상품들 */}
      <div className="absolute top-39 left-43 w-75 flex flex-col gap-y-5">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-x-13">
            {PRODUCT_LIST.slice(row * 3, (row + 1) * 3).map((product) => (
              <div
                className="relative w-[3.8rem] active:scale-95 transition-all duration-100 flex flex-col items-center gap-y-1"
                key={product.name}
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <div className="bg-[#5C3600] py-0.5 px-1 text-[0.5rem] text-[#FFEDDA] text-center rounded-md whitespace-nowrap max-w-[3.8rem] truncate">
                  {product.name}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Background>
  );
};
