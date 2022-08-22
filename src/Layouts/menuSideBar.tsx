import React from 'react';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PoolIcon from '@mui/icons-material/Pool';
import AddIcon from '@mui/icons-material/Add';

import { StoreState } from "../stores/reducers";
import { connect } from "react-redux";

import './menuSideBar.css';
import { MenuDataInterFace } from '../stores/model/menu.interface';
import { selectedMenuAction } from "./../stores/actions/menu-action";
import { Navigate } from "react-router-dom";

interface IProps {
	menu: MenuDataInterFace;
	selectedMenuAction : Function;
  isAdmin : boolean;
}

function SideBar(props : IProps) {
  const [routeAdminDashboard,setRouteAdminDashboard]= React.useState(false);
  const [routeDashboard,setRouteDashboard]= React.useState(false);
  const [routeEvents,setRouteEvents]= React.useState(false);
  const [routePeople,setRoutePeople]= React.useState(false);

  console.log('props',props)

  const clickedMenu = async (menu : string) => {
    props.selectedMenuAction(menu.trim().toLowerCase());

    // await setRouteAdminDashboard(false);
    // await setRouteDashboard(false);
    // await setRouteEvents(false);
    // await setRoutePeople(false);

    if(menu === 'schools'){
      setRouteAdminDashboard(true);
    }
    else if(menu === 'one-school'){
      setRouteDashboard(true);
    }else if(menu === 'events'){
      setRouteEvents(true);
    }else if(menu === 'people'){
      setRoutePeople(true);
    }
  }

  const displayTitle = () => {
    if(props.isAdmin){
      if(props.menu.menu === 'schools'){
        return <div className="active-school">
        <div className="list-item active" onClick={()=> clickedMenu('schools')}>
        <SupervisedUserCircleOutlinedIcon sx={{ color: '#0070F8', fontSize: 32, mr : 2 }} ></SupervisedUserCircleOutlinedIcon>
        <span className="item-text f-16">Schools</span>
        </div>
      </div>;
      }else {
        return <div className="active-school">
        <div className="list-item" onClick={()=> clickedMenu('schools')}>
        <SupervisedUserCircleOutlinedIcon sx={{ color: '#0070F8', fontSize: 32, mr : 2 }} ></SupervisedUserCircleOutlinedIcon>
        <span className="item-text f-16">Schools</span>
        </div>
      </div>;
      }
    }
    else{
      if(props.menu.menu === 'one-school'){
        return <div className="active-school ">
        <div className="list-item active" onClick={()=> clickedMenu('one-school')}>
        <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text f-16 crop_text_cart">Dolphin Swimming School</span>
        </div>
      </div>;
      }else {
        return <div className="active-school ">
        <div className="list-item" onClick={()=> clickedMenu('one-school')}>
        <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text f-16 crop_text_cart">Dolphin Swimming School</span>
        </div>
      </div>;
      }
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

  const renderPeopleMenu = () => {
    if(props.menu.menu === 'people'){
      return <div className="list-item active" onClick={()=> clickedMenu('people')}>
      <AccountCircleOutlinedIcon sx={{ color: '#808080', fontSize: 32, mr : 2 }} ></AccountCircleOutlinedIcon>
        <span className="item-text f-16">People</span>
      </div>;
    }else {
      return <div className="list-item" onClick={()=> clickedMenu('people')}>
      <AccountCircleOutlinedIcon sx={{ color: '#808080', fontSize: 32, mr : 2 }} ></AccountCircleOutlinedIcon>
        <span className="item-text f-16">People</span>
      </div>;
    }
  }

  const renderEventMenus = () => {
    if(props.menu.menu === 'events'){
      return <div className="list-item active" onClick={()=> clickedMenu('events')}>
      <PoolIcon sx={{ color: '#808080', fontSize: 32, mr : 2 }} ></PoolIcon>
        <span className="item-text f-16">Events</span>`
      </div>;
    }else{
      return <div className="list-item" onClick={()=> clickedMenu('events')}>
      <PoolIcon sx={{ color: '#808080', fontSize: 32, mr : 2 }} ></PoolIcon>
        <span className="item-text f-16">Events</span>`
      </div>;
    }
  }

  return (
  <>
  <div className="side-bar">
  {/* {routeAdminDashboard && <Navigate to='/admin/dashboard' replace={true} />}
  {routeDashboard && <Navigate to='/manager/dashboard' replace={true} />}
  {routeEvents && <Navigate to='/manager/event-list' replace={true} />} */}
  {routePeople && <Navigate to='/manager/people-list' replace={true} />}
      <h1 className="aside-title primary f-16">My Report Cards</h1>
      {displayTitle()}
      {display()}
      <div className="class-box">
        {renderPeopleMenu()}
        {renderEventMenus()}
      </div>
    </div></>
  )
}

const mapStateToProps = ({
	menuState,
}: StoreState): {
	menu: MenuDataInterFace;
} => {
	return {
		menu : menuState
	};
};

export default connect(mapStateToProps, { selectedMenuAction })(SideBar);