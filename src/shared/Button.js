import React from "react";
import "./Button.css";
function Button(props) {
  return (
    <button
      onClick={props.onClickHander}
      value={props.value}
      className={`bts ${props.className}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default Button;
