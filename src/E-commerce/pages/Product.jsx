import React, { useEffect, useState, useContext, useCallback } from "react";

import "./Product.scss";
import Item from "../components/Item";
import EditProduct from "./Edit";
import GlobalContext from "../Context";
import LoadingSpinner from "../components/LoadingSpinner";
import Empty from "../components/Empty";
import Search from "../components/Search";
function Product() {
  const { updateCart } = useContext(GlobalContext);
  const [products, setProducts] = useState(null);

  const [edit, setEdit] = useState({
    mode: false,
    id: "",
  });

  const hideEdit = () => {
    setEdit((prev) => {
      return {
        mode: false,
        id: "",
      };
    });
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

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4002/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      updateCart();
      setProducts((prev) => prev.filter((product) => product._id !== id));
    }
  };

  const handleEdit = async (id) => {
    setEdit({
      mode: true,
      id: id,
    });
  };
  const searchData = useCallback(
    async (SEARCH) => {
      let search = "";
      if (SEARCH === "") return;
      search = SEARCH;
      const response = await fetch(
        `http://localhost:4002/product/search?search=${search}`,
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
    [setProducts]
  );

  useEffect(() => {
    getProducts();
  }, [edit.mode]);

  let Content = <LoadingSpinner />;
  if (products?.length >= 0) {
    Content = (
      <>
        {" "}
        {!edit.mode ? (
          <div className="Product">
            <Search searchData={searchData} Type="PRODUCT" />
            {products?.length !== 0 ? (
              products.map((product) => {
                Object.assign(product, {
                  image: require(`../../assets/images/${product.product_images.at(
                    0
                  )}.jpg`),
                });

                return (
                  <Item
                    product={product}
                    btn_1="Edit"
                    btn_2="Delete"
                    id={product._id}
                    on_btn_1={handleEdit}
                    on_btn_2={handleDelete}
                    key={product._id}
                    caller={"PRODUCT"}
                  />
                );
              })
            ) : (
              <Empty text="Products are empty for now!" />
            )}
          </div>
        ) : (
          <EditProduct id={edit.id} onHide={hideEdit} />
        )}
      </>
    );
  }

  return Content;
}

export default Product;
