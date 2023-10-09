import React from "react";
import { useState } from "react";

const ModalTestPage = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  return (
    <>
      <div>
        <button
          type="button"
          id="close-modal"
          onClick={() => setModalState(!modalState)}
        >
          모달 뛰우기!!
        </button>
      </div>

      <div
        id={`${!modalState ? "hidden" : "modal"}`}
        onClick={() => setModalState(!modalState)}
      >
        {/* onClick={(e) => e.stopPropagation()}  이걸 추가해주면, 이벤트가 이벤트가 외부 모달로 전파되지 않아서 해결방법이 될 수 있다. */}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>모달창 제목</h2>
          <p>모달창 내용</p>
          <button
            type="button"
            id="close-modal"
            onClick={() => setModalState(!modalState)}
          >
            닫기
          </button>
        </div>
      </div>
      <style jsx>
        {`
          #modal {
            border: 1px solid red;
            position: fixed;
            z-index: ${modalState
              ? "0"
              : "-1"}; /* 모달 열려 있을 때는 1000, 닫혀 있을 때는 -1 */
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
          }

          .modal-content {
            background-color: #fefefe;
            z-index: 9999;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid black;
            width: 80%;
          }

          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          #hidden {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default ModalTestPage;
