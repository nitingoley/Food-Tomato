import React, { useContext } from "react";
import "./Device.css";
import { StoreContext } from "@/context/StoreContext";
import DeviceItem from "../DeviceItem/DeviceItem";

// DeviceItem

const Device = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="device-display" id="device-display">
      <h2>Top rated Mobile Devices</h2>
      <div className="device-display-list">
        {food_list.map((item, index) => {
          return (
            <DeviceItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Device;
