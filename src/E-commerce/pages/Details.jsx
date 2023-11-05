import React, { useEffect, useState, useContext } from "react";

import GlobalContext from "../Context";

import "./Details.scss";

function Details({ showDetail, hideDetail }) {
  const { updateCart } = useContext(GlobalContext);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  const getProduct = async () => {
    const response = await fetch(
      `http://localhost:4002/product/${showDetail.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    const result = results.at(0);

    Object.assign(result, {
      URL: result.product_images.at(0),
    });

    return result;
  };
  const handleAddToCart = async (id) => {
    try {
      await fetch("http://localhost:4002/cart", {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      updateCart();
      hideDetail();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProduct().then((result) => {
      setProduct(result);
      setActiveImage(result.URL);
    });
  }, []);

  return (
    <div className="detail">
      {product === null ? (
        "WAITING TO LOAD..."
      ) : (
        <>
          <section className="sec-1">
            <div className="img-cont">
              <div className="img-show">
                <img
                  src={require(`../../assets/images/${activeImage}.jpg`)}
                  alt="product show"
                />
              </div>

              <div className="img-btns">
                {product?.product_images.map((p) => {
                  if (p === null || p === "" || p === undefined) return;
                  return (
                    <img
                      src={require(`../../assets/images/${p}.jpg`)}
                      alt="product show"
                      key={Math.random()}
                      className={p === activeImage ? "active" : ""}
                      onClick={(e) => {
                        setActiveImage(p);
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="info">
              <p>
                <span className="meta">Catagory</span>
                <span className="data">{product.catagory}</span>
              </p>
              <p>
                <span className="meta">Name</span>
                <span className="data">{product.name}</span>
              </p>
              <p>
                <span className="meta">Price</span>
                <span className="data">{product.price}</span> birr
              </p>
              <p className="like">
                <span className="meta">👍</span>
                <span className="data">{product.likes}</span>
              </p>
              <p className="dislike">
                <span className="meta">👎</span>
                <span className="data">{[product.disLikes]}</span>
              </p>
              <p>
                <span className="meta">Short Description</span>
                <span className="data">{product.short_desc}</span>
              </p>
            </div>
          </section>

          <section className="sec-2">
            <p>
              <span className="meta">Detail Description</span>
              <span className="data">{product.long_desc}</span>
            </p>
          </section>

          <div className="btns">
            <button
              className="back"
              onClick={(e) => {
                hideDetail();
              }}
            >
              Back
            </button>
            <button
              className="addToCart"
              onClick={(e) => {
                handleAddToCart(showDetail.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
