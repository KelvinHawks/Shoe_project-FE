//import React, { useState } from "react";
import "./Cart.css";
import { useCart } from "react-use-cart";
import Button from "../../shared/Button";
//import Modal from "../../shared/Modal";

function Cart() {
  const {
    items,
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const showPaymentMethod = () => {
    setOpenModal(true);
  };

  return (
    <div className="cart_display-flex">
      {isEmpty && (
        <div>
          <h3>Your Cart Is Empty</h3>
        </div>
      )}
      <div className="total_cart-items">
        <h5>Total Items: {totalItems} </h5>
        <h5>Total Unique Items {totalUniqueItems}</h5>
      </div>
      <div className="container_cart-content">
        <ul>
          {items.map((item) => {
            return (
              <div className="cart" key={item.id}>
                <div className="cart_image_container">
                  <img src={item.image} alt={item.name} className="card-img" />
                </div>
                <div className="cart_details">
                  <h1 className="cart-title">{item.name}</h1>
                  <p>{item.description}</p>
                  <div className="cart-price">
                    <h3>{`$ ${item.price}`}</h3>
                    <h3>Quantity: {item.quantity}</h3>
                  </div>
                  <div className="quantity-button_div">
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="remove-btn">
                    <button onClick={() => removeItem(item.id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="cart_totals">
        <div>
          <h2>Total Price: {`$ ${cartTotal}`}</h2>
        </div>
        <div>
          {totalItems !== 0 && (
            <Button className="checkout__btn" onClickHander={showPaymentMethod}>
              CHECK OUT
            </Button>
          )}
        </div>
        <div className="clear_btn">
          {totalItems !== 0 && (
            <button onClick={() => emptyCart()}>Clear Cart</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
