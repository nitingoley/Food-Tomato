import { StoreContext } from "@/context/StoreContext";
import React, { useContext } from "react";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const {getTotalCartAmount, getTotalCalculateAmount} = useContext(StoreContext);
  return (
    <div className="place-order">
      {/* <h1>Place-Order</h1>
       */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder="First Name: " />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Last Name" />
        <div className="multi-field">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-field">
          <input type="text" placeholder="Postal Code " />
          <input type="text" placeholder="Country"/>
        </div>
        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right"> 
   
      <div className="cart-total">
          <h2>Cart Total</h2>
           <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
               <p>{ getTotalCalculateAmount()}</p>
            </div>
            <hr />
           <div className="cart-total-details">
              <p>Delivery fees</p>
              <p>{getTotalCalculateAmount()===0 ? 0 : 49}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCalculateAmount() === 0 ? '0' : (getTotalCalculateAmount() + 49).toFixed(2)}</b>

            </div>
           </div>
           <button className='btn1' onClick={()=>navigate("/order")}>Proceed to pay</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
