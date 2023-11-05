import React from "react";
import "./OrderItem.scss";
function OrderItem({ order }) {
  const products = order.products;
  let total = 0;
  products?.forEach(({ product, quantity }) => {
    total += product.price * quantity;
  });

  const date = new Date(order.createdAt);
  const formatedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <div className="orders">
      <div className="summery">
        <p className="orders-id">#{order._id}</p>
        <p className="orders-total">{total} birr</p>
      </div>
      <div className="wrapper">
        {products.map(({ product, quantity }) => {
          return (
            <div className="order" key={product._id}>
              <div className="img-cont">
                <img
                  src={require(`../../assets/images/${product.product_images?.at(
                    0
                  )}.jpg`)}
                  alt="order product"
                />

                <div className="desc">
                  <p className="name">{product.name}</p>
                  <p className="quantity">{quantity} Order</p>
                  <p className="total-price">{product.price * quantity} birr</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="date">
        <p>{formatedDate}</p>
      </div>
    </div>
  );
}

export default OrderItem;
