import { IMAGE_URLS } from "@/lib/constants/constants";
import { Modal } from "@/components/modal/Modal";
import { motion } from "framer-motion";

interface CompleteModalProps {
  text: string;
  price: number;
  image: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const CompleteModal = ({
  text,
  price,
  image,
  isOpen,
  onConfirm,
  onClose,
}: CompleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col items-center w-[22rem] min-h-[16rem] py-6 px-5 bg-gradient-to-b from-[#FFF6D5] to-[#FFE8B5] border-4 border-[#FEA95E] rounded-2xl shadow-lg"
      >
        <motion.img
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          src={IMAGE_URLS.market.modal_popo}
          alt="modal_popo"
          className="w-24 h-24 object-contain absolute -bottom-3 -left-6 drop-shadow-md z-10"
        />

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-y-3 w-full bg-white/40 p-4 rounded-xl backdrop-blur-sm"
        >
          <h4 className="text-[#EE9223] text-xl font-extrabold">구매완료!</h4>
          <div className="flex items-center justify-center gap-x-4">
            <img src={image} alt="purchased item" className="w-16 h-16 object-contain" />
            <div className="flex flex-col gap-y-1">
              <div className="text-lg text-[#6E532C] font-bold text-center">{text}</div>
              <div className="flex items-center gap-x-2 bg-[#FFF6D5] px-3 py-1.5 rounded-lg">
                <img src={IMAGE_URLS.common.coin} alt="coin" className="w-5 h-5 object-contain animate-bounce" />
                <div className="text-base text-[#6E532C] font-bold">{price}냥</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-4"
        >
          <button
            onClick={onConfirm}
            className="w-full py-2.5 text-center rounded-lg bg-gradient-to-r from-[#EE9223] to-[#FEA95E] text-white text-base font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            확인
          </button>
        </motion.div>
      </motion.div>
    </Modal>
  );
};
