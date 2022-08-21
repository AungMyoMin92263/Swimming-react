import React from 'react';
import './menuBar.css';

const MenuBarTag = (props : any) => {
  return (
  <div className="menu-bar">
    <div className="menu-list">
      <div className="menu-item">
        <img src={"/assets/icons/home.png"} alt="home" className="item-icon" />
        <span className="item-text">Home</span>
      </div>
      <div className="menu-item">
        <img src={"/assets/icons/classes.png"} alt="className" className="item-icon" />
        <span className="item-text">Classes</span>
      </div>
      <div className="menu-item">
        <img src={"/assets/icons/events.png"} alt="event" className="item-icon" />
        <span className="item-text">Events</span>
      </div>
      <div className="menu-item">
        <img src={"/assets/icons/me.png"} alt="profile" className="item-icon" />
        <span className="item-text">Me</span>
      </div>
    </div>
  </div>
  );
}

export default MenuBarTag;