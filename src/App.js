import React, { useCallback } from "react";
import "./App.css";
import Nav from "./navbar/Nav";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Recommended from "./recommended/Recommended";
import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import Products from "./products/Products";
import { useState, useEffect } from "react";
import Card from "./utils/Card";
//import Cart from "./cart/pages/Cart";
import AddProduct from "./AddProduct/AddProduct";

import UpdateProduct from "./editProduct/UpdateProduct";
import { AdminContext } from "./shared/context/AdminContext";
import AboutUs from "./AboutUs";
import Auth from "./users/pages/Auth";
import SingleProduct from "./products/SingleProduct";
import ContactForm from "./clientInfo/ContactForm";
function App() {
  // const [isAdmin, setIsAdmin] = useState(true);
  const [token, setToken] = useState();
  const [products, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((token) => {
    setToken(token);
  }, []);
  const logOut = () => {
    setToken(null);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(true);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const filteredItems = products.filter(
    (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  function filteredData(products) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, name }) =>
          category.toLowerCase() === selectedCategory.toLowerCase() ||
          color.toLowerCase() === selectedCategory.toLowerCase() ||
          company.toLowerCase() === selectedCategory.toLowerCase() ||
          name.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return filteredProducts.map((prod) => (
      <Card
        key={Math.random()}
        id={prod._id}
        img={prod.image}
        name={prod.name}
        price={prod.price}
        description={prod.description}
        item={prod}
      />
    ));
  }
  const result = filteredData(products, selectedCategory, query);
  //   <Route path="/cart" exact>
  //   <Cart />
  // </Route>
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Products result={result} />
        </Route>

        <Route path="/addProduct" exact>
          <AddProduct />
        </Route>
        <Route path="/edit/:productId" exact>
          <UpdateProduct />
        </Route>
        <Route path="/aboutus" exact>
          <AboutUs />
        </Route>
        <Route path="/item/:pid" exact>
          <SingleProduct />
        </Route>
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Route path="/contact" exact>
          <ContactForm />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Products result={result} />
        </Route>

        <Route path="/aboutus" exact>
          <AboutUs />
        </Route>
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Route path="/item/:pid" exact>
          <SingleProduct />
        </Route>
        <Route path="/contact" exact>
          <ContactForm />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <AdminContext.Provider
        value={{
          isLoggedIn: !!token,
          login: login,
          logout: logOut,
        }}
      >
        <Router>
          <Sidebar handleChange={handleChange} />
          <div className="container">
            <Nav handleInputChange={handleInputChange} query={query} />
            <Recommended handleClick={handleClick} />
            {isLoading && (
              <div className="loading">
                <h1>Loading...</h1>
              </div>
            )}
            {/* <ContactForm /> */}
            <main>
              <Switch>{routes}</Switch>
            </main>
          </div>
        </Router>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
