import React, { useContext } from "react";
//import { BsFillBagFill } from "react-icons/bs";
//import { useCart } from "react-use-cart";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";
import { AdminContext } from "../shared/context/AdminContext";
import "./Card.css";
//import { useParams } from "react-router-dom";
function Card(props) {
  //const prodId = React.useParams;
  const auth = useContext(AdminContext);
  // const { addItem } = useCart();
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <div className="card">
      <div className="image_container">
        <Tilt options={defaultOptions}>
          <Link to={`/item/${props.id}`}>
            <div>
              <img src={props.img} alt={props.name} className="card-img" />
            </div>
          </Link>
        </Tilt>
      </div>

      <div className="details">
        <Link to={`/item/${props.id}`}>
          <h1 className="card-title">{props.name}</h1>
          <p>{props.description}</p>
        </Link>

        <div className="card-price">
          <h3>{`$ ${props.price}`}</h3>
          {/* <BsFillBagFill
            className="bag-icon"
            onClick={() => addItem(props.item)}
          /> */}
          {auth.isLoggedIn && (
            <Link to={`/edit/${props.id}`} className="edit_product">
              Edit
            </Link>
          )}
          <Link to={`/item/${props.id}`}>
            <button>
              <FaHeart />
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
