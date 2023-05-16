import Modal from "./Modal";
import useSliderModal from "../../../hooks/useSliderModal";

const SliderModal = ({ data }: any) => {
  const sliderModal = useSliderModal();
  const propsData = data;
  return (
    <div>
      <Modal isOpen={sliderModal.isOpen} onClose={sliderModal.onClose} />
    </div>
  );
};

export default SliderModal;
