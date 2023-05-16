import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  // disabled?: boolean;
  body?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, body }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
    console.log("모달 일단 찍힘");
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflosw-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
        
        "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lh:h-auto
            md:h-auto
            
            "
        >
          {/* 배경깔기 끝 여기부터 중앙 모달 창 꾸미기 */}
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-2
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
              "
            >
              {/*  */}
              <div
                className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                boder-b-[1px]                
                "
              >
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                {/* 바디 부분 */}
                <div className="relative p-6 flex-auto">{body}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
