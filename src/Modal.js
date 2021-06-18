import React from "react";
import "./Modal.css";

function Modal({ display, title, children, onSave, onClose }) {
  return (
    <div className={`modal ${display ? "show" : "hidden"}`}>
      <div className="modal__content">
        <div className="modal__header">
          <h4 className="modal__title">{title}</h4>
        </div>
        <form onSubmit={onSave}>
          <div className="modal__body">{children}</div>
          <div className="modal__footer">
            <input type="submit" value="Submit" />
            <button onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
