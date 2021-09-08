import React from "react";
import { createPortal } from "react-dom";

const ModalContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 11,
};

const ModalBackgroundStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  zIndex: 11,
};

const ChildrenStyle = {
  width: "300px",
  padding: "32px",
  backgroundColor: "#fff",
  zIndex: 11,
};

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div style={ModalContainerStyle}>
      <div style={ModalBackgroundStyle} onClick={closeModal} />
      <div style={ChildrenStyle}>
        {children}
        <button onClick={closeModal}>모달 닫기</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
