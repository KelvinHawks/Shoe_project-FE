import React, { useState, useEffect } from "react";
import Button from "../shared/Button";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./UpdateProduct.css";
function UpdateProduct() {
  const [products, setProducts] = useState();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    image: "",
    color: "",
    price: "",
    category: "",
    company: "",
  });

  const productId = useParams().productId;

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-ybcj.onrender.com/api/${productId}`
        );

        setProducts(response.data);
        setFormState({
          name: response.data.name,
          description: response.data.description,
          image: response.data.image,
          color: response.data.color,
          price: response.data.price,
          category: response.data.category,
          company: response.data.company,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productId, setProducts, setFormState]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/${productId}`, {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          description: formState.description,
          image: formState.image,
          color: formState.color,
          price: formState.price,
          category: formState.category,
          company: formState.company,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    //console.log(formState);
  };
  //Update values...
  return (
    <div className="form-control">
      {products && (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={inputChangeHandler}
            value={formState.name}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={inputChangeHandler}
            value={formState.description}
          />
          <input
            type="text"
            name="image"
            placeholder="imageUrl"
            onChange={inputChangeHandler}
            value={formState.image}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            onChange={inputChangeHandler}
            value={formState.color}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={inputChangeHandler}
            value={formState.price}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={inputChangeHandler}
            value={formState.category}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={inputChangeHandler}
            value={formState.company}
          />
          <Button>Edit Product</Button>
        </form>
      )}
    </div>
  );
}

export default UpdateProduct;
