import React from "react";
import "./Recommended.css";
import Button from "../shared/Button";
function Recommended(props) {
  return (
    <div className="container_div">
      <h2>Recommended</h2>
      <Button onClickHander={props.handleClick} value="">
        All products
      </Button>
      <Button onClickHander={props.handleClick} value="Nike">
        Nike
      </Button>
      <Button onClickHander={props.handleClick} value="Adidas">
        Adidas
      </Button>
      <Button onClickHander={props.handleClick} value="Puma">
        Puma
      </Button>
      <Button onClickHander={props.handleClick} value="Vans">
        Vans
      </Button>
    </div>
  );
}

export default Recommended;
