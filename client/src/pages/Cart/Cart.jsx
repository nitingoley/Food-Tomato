import { StoreContext } from '@/context/StoreContext';
import React, { useContext } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart ,  getTotalCalculateAmount} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-item-wrapper">
                <div className="cart-items-tittle cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.price.toFixed(2)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <button
                    className="cross"
                    onClick={() => removeFromCart(item._id)}
                  >
                    x
                  </button>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

       <div className="cart-bottom">
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

        <div className="cart-promoCode">
          <div>
          <p>If you have a promo code, enter it to get 10% off:</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Apply Code</button>
            </div>
          </div>
        </div>
       </div>



    </div>
  );
};

export default Cart;
