import React from "react";

import "./CartItem.scss";

function CartItem({
  name,
  price,
  URL,
  quantity,
  onDeleteItem,
  onChangingQuantity,
  id,
}) {
  return (
    <div className="item-wrapper">
      <div className="item">
        <div className="img-cont">
          <img
            src={require(`../../assets/images/${URL}.jpg`)}
            alt="product in cart"
          />
        </div>
        <div className="info">
          <p>
            <span className="meta">Name</span>
            <span className="data">{name}</span>
          </p>
          <p>
            <span className="meta">Price</span>
            <span className="data">{`${price} birr`}</span>
          </p>
          <p>
            <span className="meta">Quantity</span>
            <span className="data">{quantity}</span>
          </p>
        </div>
        <div className="btn-cont-1">
          <button
            data-id={id}
            onClick={(e) => {
              onChangingQuantity(e.target.dataset.id, 'INC');
            }}
          >
            ➕
          </button>
          <button
            data-id={id}
            onClick={(e) => {
              onChangingQuantity(e.target.dataset.id, 'DEC');
            }}
          >
            ➖
          </button>
          <button
            data-id={id}
            onClick={(e) => {
              onDeleteItem(e.target.dataset.id);
            }}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
