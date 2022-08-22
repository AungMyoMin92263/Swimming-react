import React from 'react';
import { IPageProp } from '../pagePropsInterface';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PoolIcon from '@mui/icons-material/Pool';
import AddIcon from '@mui/icons-material/Add';

import './menuSideBar.css';

const NewSideBar = (props: IPageProp) => {
  console.log(props.history.location);
  let path = props.history.location.pathname.split("/")
  return (
    <div className="side-bar">
      <h1 className="aside-title primary" onClick={() => props.history.push('dashboard')}>My Report Cards</h1>
      <div className="active-school ">
        <div className={`list-item ${path[2] == 'dashboard' ? "active" : ""}`}>
          <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">Dolphin Swimming School</span>
        </div>
      </div>
      <div className="class-box">
        <label className="menu-label">ClassNames</label>
        <div className={`list-item ${path[2] == 'class' ? "active" : ""}`}>
          <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">Pro Youth</span>
        </div>
        <div className={`list-item ${path[2] == 'create-class' ? "active" : ""}`}>
          <div className="item-icon">
            <AddIcon sx={{ color: '#0070F8', fontSize: 32, mr: 2 }} ></AddIcon>
          </div>
          <span className="item-text primary">Create ClassName</span>
        </div>
      </div>
      <div className="class-box">
        <div className={`list-item ${path[2] == 'people-list' ? "active" : ""}`} onClick={() => props.history.push('people-list')}>
          <AccountCircleOutlinedIcon sx={{ color: '#808080', fontSize: 32, mr: 2 }} ></AccountCircleOutlinedIcon>
          <span className="item-text"  >People</span>
        </div>
        <div className={`list-item ${path[2] == 'event' ? "active" : ""}`}>
          <PoolIcon sx={{ color: '#808080', fontSize: 32, mr: 2 }} ></PoolIcon>
          <span className="item-text">Events</span>
        </div>
      </div>
    </div>
  )
}

export default NewSideBar