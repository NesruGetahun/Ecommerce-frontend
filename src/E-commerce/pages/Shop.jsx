import React, { useState, useEffect, useContext, useCallback } from "react";

import Item from "../components/Item";
import Empty from "../components/Empty";

import GlobalContext from "../Context";

import { CATAGORISES } from "../../Constants/Data";

import "./Shop.scss";
import Details from "./Details";
import LoadingSpinner from "../components/LoadingSpinner";
import Search from "../components/Search";
function Shop() {
  const { updateCart } = useContext(GlobalContext);
  const catagories = ["All", ...CATAGORISES];
  const [products, setProducts] = useState(null);
  const [active, setActive] = useState(catagories.at(0));
  const [showDetail, setShowDetail] = useState({
    show: false,
    id: null,
  });
  const activeStyle = {
    backgroundColor: "rgba(5, 5, 30, 0.5)",
    color: "#fff",
  };

  const getProducts = async () => {
    const response = await fetch("http://localhost:4002/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await response.json();

    setProducts((prev) => [...results]);
  };

  const handleSelection = async (e) => {
    const cat = e.target.dataset.cat;
    const response = await fetch(
      `http://localhost:4002/product/search?catagory=${cat}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    hideDetail();
    setProducts((prev) => [...results]);
    setActive(cat);
  };

  const onLike = async (id) => {
    const response = await fetch(`http://localhost:4002/product/favour/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "LIKE",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.reject) return;
      setProducts((prev) => {
        const updateProucts = prev.map((p) => {
          if (p._id === id)
            return {
              ...p,
              likes: p.likes + 1,
            };
          else return p;
        });

        return [...updateProucts];
      });
    }
  };

  const onDislike = async (id) => {
    const response = await fetch(`http://localhost:4002/product/favour/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "DISLIKE",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.reject) return;
      setProducts((prev) => {
        const updateProucts = prev.map((p) => {
          if (p._id === id)
            return {
              ...p,
              disLikes: p.disLikes + 1,
            };
          else return p;
        });

        return [...updateProucts];
      });
    }
  };

  const handleDetail = (id) => {
    setShowDetail((prev) => {
      return {
        id: id,
        show: true,
      };
    });
  };

  const hideDetail = () => {
    setShowDetail({
      id: null,
      show: false,
    });
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

      setShowDetail((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchData = useCallback(
    async (SEARCH) => {
      console.log("SEARCH: " + SEARCH);
      let search = SEARCH;
      const response = await fetch(
        `http://localhost:4002/product/search?catagory=${active}&search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const results = await response.json();
      setProducts((prev) => [...results]);
    },
    [setProducts, active]
  );

  useEffect(() => {
    getProducts();
  }, []);

  let Content = <LoadingSpinner />;
  if (products?.length === 0) {
    Content = <Empty text={`${active} Catagory is empty for now`} />;
  } else if (products?.length > 0) {
    Content = showDetail.show ? (
      <Details showDetail={showDetail} hideDetail={hideDetail} />
    ) : (
      <div className="products">
        {products.map((product) => {
          Object.assign(product, {
            image: require(`../../assets/images/${product.product_images.at(
              0
            )}.jpg`),
          });
          return (
            <Item
              id={product._id}
              product={product}
              btn_1="Detail"
              btn_2="Add to Cart"
              on_btn_1={handleDetail}
              on_btn_2={handleAddToCart}
              key={product._id}
              onLike={onLike}
              onDislike={onDislike}
              caller={"SHOP"}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="shop">
      <Search searchData={searchData} Type="SHOP" />
      <div className="catagories">
        {catagories.map((cat) => {
          return (
            <p
              key={cat}
              data-cat={cat}
              style={active === cat ? activeStyle : {}}
              onClick={handleSelection}
            >
              {cat}
            </p>
          );
        })}
      </div>
      {Content}
    </div>
  );
}

export default Shop;
