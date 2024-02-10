import React from "react";
import "./Sidebar.css";
import Category from "./category/Category";
import Color from "./colors/Color";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar({ handleChange }) {
  return (
    <section className="sidebar">
      {/* <a href="/" >
        
      </a> */}
      <Link className="home_link" to="/">
        <div className="shoppingCart">🛒</div>
      </Link>
      <Category handleChange={handleChange} />
      <Color handleChange={handleChange} />
    </section>
  );
}

export default Sidebar;
