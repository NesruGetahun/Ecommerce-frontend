import React from "react";

import "./Item.scss";
import Button from "../UI/Button";

function Item(props) {
  const product = props.product;
  const caller = props.caller;

  return (
    <div className="item-wrapper-1">
      <div className="item">
        <div className="img-cont">
          <img src={product.image} alt="drink 1" />
          <p className="name">{product.name}</p>
        </div>

        {caller === "SHOP" ? (
          <div className="header">
            <p>
              <button onClick={(e) => props.onLike(props.id)}>👍</button>
              <span>{product.likes}</span>
            </p>
            <p>
              <button onClick={(e) => props.onDislike(props.id)}>👎</button>
              <span>{product.disLikes}</span>
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="price">
          <p>{product.price} birr</p>
        </div>

        <div className="short-desc">
          <p>{product.short_desc}</p>
        </div>

        <div className="btn-cont">
          <Button
            onClick={(e) => props.on_btn_1(e.target.dataset.id)}
            id={props.id}
          >
            {props.btn_1}
          </Button>
          <Button
            onClick={(e) => props.on_btn_2(e.target.dataset.id)}
            id={props.id}
          >
            {props.btn_2}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Item;
