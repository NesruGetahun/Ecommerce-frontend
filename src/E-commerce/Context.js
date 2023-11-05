import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  cart: 0,
});

export default GlobalContext;

export function ContextProvider({ children }) {
   const [cart, setCart] = useState({
      length: 0,
      items: null,
      user: null
   });
   const updateCart = async () => {
       try {
         const response = await fetch("http://localhost:4002/cart", {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         });

         if (response.ok) {
           const result = await response.json();
            setCart({
               length: result.cart.items.length,
               user: result._id,
               items: result.cart.items
           });
         }
       } catch (err) {
         console.log(err);
       }
   }

   return <GlobalContext.Provider value={
      {
         cart,
         updateCart,
     }
  }>{children}</GlobalContext.Provider>;
}
