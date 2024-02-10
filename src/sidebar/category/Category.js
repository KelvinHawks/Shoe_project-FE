import React from "react";
import Input from "../../shared/Input";
import "./Category.css";
function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" name="test" value="" />
        <span className="checkmark"></span>
        All
      </label>
      <div>
        <Input
          handleChange={handleChange}
          value="flats"
          title="Flats"
          name="test"
        >
          Flats
        </Input>
        <Input
          handleChange={handleChange}
          value="sandals"
          title="Sandals"
          name="test"
        >
          Sandals
        </Input>

        <Input
          handleChange={handleChange}
          value="heels"
          title="Heels"
          name="test"
        >
          Heels
        </Input>
      </div>
    </div>
  );
}

export default Category;
