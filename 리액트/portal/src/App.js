import React, { useState } from "react";
import Modal from "./Modal";

const ButtonStyle = {
  position: "relative",
  zIndex: 10,
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    setIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header>
        <button style={ButtonStyle} onClick={openModal}>
          모달 열기
        </button>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          모달
        </Modal>
      </header>
      <div>콘텐츠</div>
    </>
  );
};

export default App;
