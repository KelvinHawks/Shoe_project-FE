import React from "react";
import "./color.css";
import Input from "../../shared/Input";
function Color({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title color-title">Color</h2>
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" name="test" value="" />
        <span className="checkmark all"></span>
        All
      </label>
      <div>
        <Input
          color="black"
          title="Black"
          value="black"
          name="test1"
          handleChange={handleChange}
        >
          Black
        </Input>
        <Input
          handleChange={handleChange}
          value="blue"
          title="Blue"
          name="test1"
          color="blue"
        >
          Blue
        </Input>

        <Input
          handleChange={handleChange}
          value="brown"
          title="Red"
          name="test1"
          color="brown"
        >
          Brown
        </Input>

        <Input
          handleChange={handleChange}
          value="white"
          title="Green"
          name="test1"
          color="green"
        >
          White
        </Input>
      </div>
    </div>
  );
}

export default Color;
