import { createContext, useEffect, useState } from "react";
import { food_list } from "@/assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});

  const addToCart = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => {
      const updatedItem = prev[itemId] > 1 ? prev[itemId] - 1 : 0;
      return {
        ...prev,
        [itemId]: updatedItem,
      };
    });
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getTotalCalculateAmount = ()=>{
    let totalAmount = 0;
    for(let item in cartItems) {

      if(cartItems[item]>0) {
        let itemInfo = food_list.find((product)=>product._id === item)
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCalculateAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
