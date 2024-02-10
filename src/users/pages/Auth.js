import React, { useContext, useState } from "react";
//import { useHistory } from "react-router-dom";
import Button from "../../shared/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";
import { AdminContext } from "../../shared/context/AdminContext";
//import { AdminContext } from "../../shared/context/AdminContext";

function Auth() {
  const [formInputs, setFormInputs] = useState({
    //secret: "",
    username: "",
    email: "",
    password: "",
  });
  const auth = useContext(AdminContext);

  const { sendRequest, message } = useHttpClient();
  //const admin = useContext(AdminContext);
  const [isSignUpMode, setIsSignupMode] = useState(false);
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };
  // const handleCallbackResponse = (response) => {
  //   console.log(response.credential);
  // };
  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       "https://225252853116-79cs0tdtkpj3re00o1sb29m4b439rb8m.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (isSignUpMode) {
      try {
        //console.log(formInputs.username, formInputs.email, formInputs.password);
        const responseData = await sendRequest(
          "https://ecommerce-ybcj.onrender.com/api/users/signup",
          "POST",
          JSON.stringify({
            // secret: formInputs.secret,
            name: formInputs.username,
            email: formInputs.email,
            password: formInputs.password,
          }),
          { "content-Type": "application/json" }
        );

        auth.login(responseData.token);
      } catch (err) {}
    } else {
      const responseData = await sendRequest(
        "https://ecommerce-ybcj.onrender.com/api/users/login",
        "POST",
        JSON.stringify({
          email: formInputs.email,
          password: formInputs.password,
        }),
        { "content-Type": "application/json" }
      );
      auth.login(responseData.token);
    }
  };

  const switchAdminHandler = () => {
    setIsSignupMode((prevAdmin) => !prevAdmin);
  };

  return (
    <div className="signUp-form">
      <div>
        <Button onClickHander={switchAdminHandler}>
          {isSignUpMode ? "Switch to Login" : "Switch to Signup"}
        </Button>
      </div>
      {message && (
        <div>
          <h2>{message}</h2>
        </div>
      )}

      <form onSubmit={submitHandler} className="Auth-form">
        {isSignUpMode && (
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={inputChangeHandler}
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={inputChangeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={inputChangeHandler}
        />
        <Button className="btn-signUp">
          {isSignUpMode ? "Sign Up" : "Login"}
        </Button>
      </form>
      <div id="signInDiv"></div>
    </div>
  );
}

export default Auth;
