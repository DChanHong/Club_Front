import { create } from "zustand";

interface SliderModalStore {
  isOpen: boolean;
  onOpen: (data: any) => void;
  onClose: () => void;
}

const useSliderModal = create<SliderModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSliderModal;
