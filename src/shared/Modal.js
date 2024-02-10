import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`}>
      {props.children}
      <div>{props.footerClass}</div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

function Modal(props) {
  return (
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="modal"
    >
      <ModalOverlay {...props} />
    </CSSTransition>
  );
}

export default Modal;
