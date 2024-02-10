import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import Modal from "../shared/Modal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Button from "../shared/Button";
function SingleProduct() {
  const [product, setProduct] = useState({});
  const [formInput, setFormInput] = useState({
    size: typeof Number,
    qty: typeof Number,
  });
  const [openModal, setOpenModal] = useState(false);
  const hideModal = () => {
    setOpenModal(false);
  };
  const hidePaymentModal = () => {
    setOpenModal(false);
    alert("Payment unsuccessful, please try again later");
  };
  const showPaymentMethod = () => {
    setOpenModal(true);
  };
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const submitInputsHandler = (e) => {
    e.preventDefault();
    console.log(formInput);
  };

  const [isLoading, setIsLoading] = useState(false);

  const pid = useParams().pid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/${pid}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(true);
      }
    };

    fetchData();
    setIsLoading(false);
  }, [pid]);

  return (
    <>
      <Modal
        show={openModal}
        footerClass={
          <div className="modal_btns">
            <Button onClickHander={hidePaymentModal}>PROCEED</Button>{" "}
            <Button onClickHander={hideModal}>CANCEL</Button>
          </div>
        }
        className="modal_container"
      >
        <h3>MPESA Account</h3>
        <ul className="modal_list">
          <li>
            Confirm payment phone number then click <b>proceed</b> to generate
            payment request to your phone
          </li>
          <li>
            Enter your <b>MPESA PIN</b> on prompt pop-up on your phone to
            complete payment
          </li>
          <input type="text" name="phone" placeholder="Phone Number" />
        </ul>
        <p>Proceed to pay 180. 00</p>
      </Modal>
      <div className="main-container_div">
        {isLoading && (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
        <div className="img_container">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="desc">
          <div className="header_title">
            <div className="title">
              <h2>{product.description}</h2>
            </div>
            <div className="price">
              <p>Price:{` $ ${product.price}`}</p>
            </div>
          </div>
          <div>
            <form onSubmit={submitInputsHandler}>
              <p>Size :</p>
              <input type="number" name="size" onChange={inputChangeHandler} />
              <p>Quantity :</p>
              <input type="number" name="qty" onChange={inputChangeHandler} />
              <Button onClickHander={showPaymentMethod}>Buy Now</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
