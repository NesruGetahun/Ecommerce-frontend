import React, { useReducer, useState } from "react";
import "./AddProduct.scss";
import { CATAGORISES } from "../../Constants/Data";

const inputInit = {
  cat: CATAGORISES.at(0),
  name: "",
  price: false,
  URL: "",
  URL2: "",
  URL3: "",
  shortDesc: "",
  longDesc: "",
  name_err: false,
  price_err: false,
  URL_err: false,
  SD_err: false,
  LD_err: false,
};
const inputReducer = (state, action) => {
  if (action.type === "SET_CAT") {
    return { ...state, cat: action.payload };
  }
  if (action.type === "SET_NAME") {
    return { ...state, name: action.payload, name_err: false };
  }

  if (action.type === "SET_PRICE") {
    return { ...state, price: action.payload, price_err: false };
  }
  if (action.type === "SET_URL") {
    return { ...state, URL: action.payload, URL_err: false };
  }

  if (action.type === "SET_URL_2") {
    return { ...state, URL2: action.payload, URL_err: false };
  }

  if (action.type === "SET_URL_3") {
    return { ...state, URL3: action.payload, URL_err: false };
  }

  if (action.type === "SET_SHORT_DESC") {
    return { ...state, shortDesc: action.payload, SD_err: false };
  }

  if (action.type === "SET_LONG_DESC") {
    return { ...state, longDesc: action.payload, LD_err: false };
  }

  if (action.type === "NAME_ERR") {
    return { ...state, name_err: true };
  }

  if (action.type === "PRICE_ERR") {
    return {
      ...state,
      price_err: true,
    };
  }

  if (action.type === "URL_ERR") {
    return { ...state, URL_err: true };
  }

  if (action.type === "SD_ERR") {
    return { ...state, SD_err: true };
  }

  if (action.type === "LD_ERR") {
    return { ...state, LD_err: true };
  }

  return inputInit;
};

function AddProduct() {
  const [inputState, inputDispatch] = useReducer(inputReducer, inputInit);
  const [isSuccess, setIsSuccess] = useState("PENDING");
  const ErrorStyle = {
    borderColor: "rgba(200, 10, 10, .7)",
    borderWidth: "1.5px",
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputState.name.trim() === "") {
      inputDispatch({ type: "NAME_ERR" });
    } else if (inputState.price === false) {
      inputDispatch({ type: "PRICE_ERR" });
    } else if (inputState.URL.trim() === "") {
      inputDispatch({ type: "URL_ERR" });
    } else if (inputState.shortDesc.trim() === "") {
      inputDispatch({ type: "SD_ERR" });
    } else if (inputState.longDesc.trim() === "") {
      inputDispatch({ type: "LD_ERR" });
    } else {
      console.log(inputState);
      await AddToDb();
    }
  };

  const AddToDb = async () => {
    console.log("add product");
    const response = await fetch("http://localhost:4002/product", {
      method: "POST",
      body: JSON.stringify({
        product: {
          catagory: inputState.cat,
          name: inputState.name,
          price: inputState.price,
          product_images: [inputState.URL, inputState.URL2, inputState.URL3],
          short_desc: inputState.shortDesc,
          long_desc: inputState.longDesc,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsSuccess("SUCCESS");
    } else setIsSuccess("ERROR");

    // FOR ANIMATION PURPOSE
    setTimeout(() => setIsSuccess("PENDING"), 1000);
  };
  return (
    <div className="addProduct">
      <form onSubmit={submitHandler}>
        <select
          className="sec-1"
          onChange={(e) =>
            inputDispatch({
              type: "SET_CAT",
              payload: e.target.value,
            })
          }
          value={inputState.cat}
        >
          {CATAGORISES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <section className="part-two">
          <section className="part-one">
            <input
              type="text"
              placeholder="Item name"
              onChange={(e) =>
                inputDispatch({
                  type: "SET_NAME",
                  payload: e.target.value,
                })
              }
              value={inputState.name}
              style={inputState.name_err ? ErrorStyle : {}}
            />
            <input
              type="number"
              placeholder="Item price"
              min={0}
              onChange={(e) => {
                inputDispatch({
                  type: "SET_PRICE",
                  payload: e.target.value,
                });
              }}
              value={inputState.price}
              style={inputState.price_err ? ErrorStyle : {}}
            />
            <input
              type="text"
              placeholder="Item image(main)"
              onChange={(e) =>
                inputDispatch({
                  type: "SET_URL",
                  payload: e.target.value,
                })
              }
              value={inputState.URL}
              style={inputState.URL_err ? ErrorStyle : {}}
            />
            <input
              type="text"
              placeholder="Item additional image(optional)"
              onChange={(e) =>
                inputDispatch({
                  type: "SET_URL_2",
                  payload: e.target.value,
                })
              }
              value={inputState.URL2}
            />
            <input
              type="text"
              placeholder="Item additional image(optional)"
              onChange={(e) =>
                inputDispatch({
                  type: "SET_URL_3",
                  payload: e.target.value,
                })
              }
              value={inputState.URL3}
            />
          </section>
          <textarea
            className="short-desc"
            rows="5"
            placeholder="Short description in less than 200 letters"
            onChange={(e) =>
              inputDispatch({
                type: "SET_SHORT_DESC",
                payload: e.target.value,
              })
            }
            maxLength={120}
            value={inputState.shortDesc}
            style={inputState.SD_err ? ErrorStyle : {}}
          ></textarea>
        </section>
        <textarea
          className="long-desc"
          rows="25"
          placeholder="Long description for details page"
          onChange={(e) =>
            inputDispatch({
              type: "SET_LONG_DESC",
              payload: e.target.value,
            })
          }
          value={inputState.longDesc}
          style={inputState.LD_err ? ErrorStyle : {}}
        ></textarea>

        <button className="addBtn">Add Product</button>
      </form>
      {isSuccess === "SUCCESS" ? (
        <div
          className="confirmation"
          style={{
            backgroundColor: "rgba(20, 120, 20, .5)",
          }}
        >
          <p>Product Added Sucessfully👍</p>
        </div>
      ) : (
        ""
      )}

      {isSuccess === "ERROR" ? (
        <div
          className="confirmation"
          style={{
            backgroundColor: "rgba(120, 20, 20, .5)",
          }}
        >
          <p>Product didn't added, try again😥</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddProduct;
