import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./DeviceItem.css";
import { StoreContext } from "@/context/StoreContext";

// useState 

const DeviceItem = ({ id, name, price, description, image }) => {
  // const [itemcount, setItemCount] = useState(0);
  const{cartItems , addToCart , removeFromCart} = useContext(StoreContext);

  const itemCount = cartItems[id] || 0;

  return (
    <div className="device-item">
      <div className="device-item-img-container">
        <img src={image} alt="" className="device-item-image" />
        {!itemCount?
          <img className="add" src={assets.add_icon_white} onClick={()=>addToCart(id)} /> : 
          <div className="device-item-counter">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{itemCount}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="device-item-info">
        <div className="device-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} />
        </div>
        <p className="device-description">{description}</p>
        <p className="device-item-price">${price}</p>
      </div>
    </div>
  );
};

export default DeviceItem;
