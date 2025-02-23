import { PropsWithChildren, useEffect } from "react";
import "./styles.css";
import React from "react";

const Modal: React.FC<
  PropsWithChildren<{ isOpen: boolean; handleClose: () => void }>
> = ({ children, isOpen, handleClose }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <button onClick={handleClose} className="close-btn">
        Close
      </button>
      <div className="modal-content py-8 overflow-auto">{children}</div>
    </div>
  );
};

export default Modal;
