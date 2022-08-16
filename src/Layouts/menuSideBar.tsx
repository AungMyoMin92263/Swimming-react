import React from 'react';
import './menuSideBar.css';
const SideBar = () => {
  return (
    <div className="side-bar">
      <h1 className="aside-title primary">My Report Cards</h1>
      <div className="active-school ">
        <div className="list-item active">
          <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">Dolphin Swimming School</span>
        </div>
      </div>
      <div className="class-box">
        <label className="menu-label">ClassNames</label>
        <div className="list-item">
          <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">Pro Youth</span>
        </div>
        <div className="list-item">
          <div className="item-icon">
            <img src={"/assets/icons/plus-primary.png"} alt="right-arrow" />
          </div>
          <span className="item-text primary">Create ClassName</span>
        </div>
      </div>
      <div className="class-box">
        <div className="list-item">
          <img src={"/assets/icons/people.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">People</span>
        </div>
        <div className="list-item">
          <img src={"/assets/icons/events.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">Events</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar