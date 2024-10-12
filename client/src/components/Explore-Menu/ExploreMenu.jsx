import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "@/assets/assets";

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our latest foods</h1> {/* Updated h1 */}
      <p className="explore-menu-text">
        Discover a wide range of electronics from top brands, including the latest gadgets, smart devices, and home appliances. Stay ahead with cutting-edge technology for your everyday needs.
      </p> {/* Updated p */}

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=> prev===item.menu_name ? "All": item.menu_name)} key={index} className="explore-menu-list-item">
              <img src={item.menu_image} alt="Category" className={category===item.menu_name ?"active":""} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
