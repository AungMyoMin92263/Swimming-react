import React from 'react';
import './menuBar.css';

function MenuBarTag(){
  return (<div className="menu-bar">
    <div className="menu-list">
      <div className="menu-item">
        <img src={"/assets/icons/home.png"} alt="home" className="item-icon" />
        <span className="item-text">home</span>
      </div>
      <div className="menu-item">
        <img src={"/assets/icons/classes.png"} alt="className" className="item-icon" />
        <span className="item-text">classNames</span>
      </div>
      <div className="menu-item">
        <img src={"/assets/icons/events.png"} alt="event" className="item-icon" />
        <span className="item-text">events</span>
      </div>
      <div className="menu-item">
        <img src={"/assets/icons/me.png"} alt="profile" className="item-icon" />
        <span className="item-text">me</span>
      </div>
    </div>
  </div>)
}

export default MenuBarTag