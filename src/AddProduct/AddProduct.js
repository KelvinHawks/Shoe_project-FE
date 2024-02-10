import React, { useState } from "react";
import "./AddProduct.css";
import Button from "../shared/Button";
import ImageUpload from "../shared/images/ImageUpload";
//import { useHistory } from "react-router-dom";
function AddProduct() {
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    image: null,
    color: "",
    price: typeof Number,
    category: "",
    company: "",
  });
  const [loading, setIsLoading] = useState(false);
  // const history = useHistory();
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", formInputs.name);
      formData.append("description", formInputs.description);
      formData.append("image", formInputs.image);
      formData.append("color", formInputs.color);
      formData.append("price", formInputs.price);
      formData.append("category", formInputs.category);
      formData.append("company", formInputs.company);

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",

        formData,
      });

      const responseData = await response.json();
      console.log(responseData);
      // history.push("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="form-control">
      {loading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={inputChangeHandler}
          image-upload__preview
        />

        <ImageUpload setFormInputs={setFormInputs} formInputs={formInputs} />
        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={inputChangeHandler}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          onChange={inputChangeHandler}
        />
        <Button>Add Product</Button>
      </form>
    </div>
  );
}

export default AddProduct;
