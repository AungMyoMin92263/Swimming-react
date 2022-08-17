import React from 'react';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PoolIcon from '@mui/icons-material/Pool';
import AddIcon from '@mui/icons-material/Add';

import './menuSideBar.css';
const SideBar = (props : any) => {
  const displayTitle = () => {
    if(props.isAdmin){
      return <div className="active-school">
      <div className="list-item active">
      <SupervisedUserCircleOutlinedIcon sx={{ color: '#0070F8', fontSize: 32, mr : 2 }} ></SupervisedUserCircleOutlinedIcon>
      <span className="item-text f-16">Schools</span>
      </div>
    </div>;
    }
    else{
      return <div className="active-school ">
      <div className="list-item active">
      <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
        <span className="item-text f-16 crop_text_cart">Dolphin Swimming School</span>
      </div>
    </div>;
    }
  }

  const display = () =>{
      if(props.isAdmin){
        return <></>;
      }else{
        return <div className="class-box">
          <label className="menu-label f-10">Classes</label>
          <div className="list-item">
            <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
            <span className="item-text f-16">Pro Youth</span>
          </div>
          <div className="list-item">
            <div className="item-icon">
            <AddIcon sx={{ color: '#0070F8', fontSize: 32, mr : 2 }} ></AddIcon>
            </div>
            <span className="item-text primary f-16">Create Class</span>
          </div>
        </div>;
      }
  }
  return (
    <div className="side-bar">
      <h1 className="aside-title primary f-16">My Report Cards</h1>
      {displayTitle()}
      {display()}
      <div className="class-box">
        <div className="list-item">
        <AccountCircleOutlinedIcon sx={{ color: '#808080', fontSize: 32, mr : 2 }} ></AccountCircleOutlinedIcon>
          <span className="item-text f-16">People</span>
        </div>
        <div className="list-item">
        <PoolIcon sx={{ color: '#808080', fontSize: 32, mr : 2 }} ></PoolIcon>
          <span className="item-text f-16">Events</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar