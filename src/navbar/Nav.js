import React from "react";
import { FaHome } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
//import { useCart } from "react-use-cart";
import { AdminContext } from "../shared/context/AdminContext";
import "./Nav.css";
import { useContext } from "react";
function Nav(props) {
  const auth = useContext(AdminContext);
  // const {
  //   // items,
  //   // isEmpty,
  //   totalItems,
  //   // cartTotal,
  //   // updateItemQuantity,
  //   // removeItem,
  //   // emptyCart,
  // } = useCart();

  return (
    <nav>
      <div className="input">
        <input
          type="text"
          placeholder="Enter your search"
          value={props.query}
          onChange={props.handleInputChange}
        />
      </div>

      <div className="Links">
        <Link to="/" exact>
          <FaHome className="nav-icons" />
        </Link>

        <Link to="/login">
          <AiOutlineUserAdd className="nav-icons" />
        </Link>
        {auth.isLoggedIn && (
          <Link to="/addProduct" className="add_product">
            Add Product
          </Link>
        )}
        <Link to="/contact" className="aboutUs">
          <MdMessage className="nav-icons" />
        </Link>
        <Link to="/aboutus" className="aboutUs">
          <FcAbout className="nav-icons" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
