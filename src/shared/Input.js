import React from "react";
import "./Input.css";
function Input(props) {
  return (
    <label className="sidebar-label-container">
    <input onChange={props.handleChange} type="radio" name={props.name} value={props.value} />
    <span className="checkmark" style={{backgroundColor:props.value}}></span>
    {props.children}
  </label>
  );
}

export default Input;
