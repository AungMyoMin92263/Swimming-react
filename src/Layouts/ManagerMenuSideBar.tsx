import React, { useEffect } from "react";
import { IPageProp } from '../pagePropsInterface';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PoolIcon from '@mui/icons-material/Pool';
import AddIcon from '@mui/icons-material/Add';
import placeholder from "../assets/images/place-holder.png";

import './MenuSideBar.css';
import { getItem } from '../auth/LocalStorage';

const ManagerSideBar = (props: IPageProp) => {
  let path = props.history.location.pathname.split("/")

  const [schoolName,setSchoolName] = React.useState('');
  const [schoolLogo,setSchoolLogo] = React.useState('');

  useEffect(() => {
  const user = JSON.parse(getItem("authUser") || "null");
  if(user && user.userInfo && user.userInfo.data.assign_school.length > 0) {
    setSchoolName(user.userInfo.data.assign_school[0].school.name);
    setSchoolLogo(user.userInfo.data.assign_school[0].school.logo);
  }
  }, [])

  return (
    <div className="side-bar">
      <h1 className="aside-title primary cursor" onClick={() => props.history.push('dashboard')}>My Report Cards</h1>
      <div className="active-school" onClick={() => props.history.push('dashboard')}>
        <div className={`list-item ${path[2] === 'dashboard' ? "active" : ""}`}>
          <img
                      src={
                        schoolLogo
                          ? process.env.REACT_APP_API_ENDPOINT + "/" + schoolLogo
                          : placeholder
                      }
                      alt="logo"
                      className={`${schoolLogo? "item-icon" : "w-48"}`}
                />
          <span className="item-text">{schoolName}</span>
        </div>
      </div>
      <div className="class-box">
        <label className="menu-label">Classes</label>
        <div className={`list-item ${path[2] === 'class' ? "active" : ""}`}>
          <img src={"/assets/icons/logo.png"} alt="right-arrow" className="item-icon" />
          <span className="item-text">Pro Youth</span>
        </div>
        <div className={`list-item ${path[2] === 'create-class' ? "active" : ""}`} onClick={() => props.history.push('add-class')}>
          <div className="item-icon">
            <AddIcon sx={{ color: '#0070F8', fontSize: 32, mr: 2 }} ></AddIcon>
          </div>
          <span className="item-text primary">Create Class</span>
        </div>
      </div>
      <div className="class-box">
        <div className={`list-item ${path[2] === 'people-list' ? "active" : ""}`} onClick={() => props.history.push('/manager/people-list')}>
          <AccountCircleOutlinedIcon sx={{ color: '#808080', fontSize: 32, mr: 2 }} ></AccountCircleOutlinedIcon>
          <span className="item-text"  >People</span>
        </div>
        <div className={`list-item ${path[2] === 'event-list' ? "active" : ""}`} onClick={() => props.history.push('/manager/event-list')}>
          <PoolIcon sx={{ color: '#808080', fontSize: 32, mr: 2 }} ></PoolIcon>
          <span className="item-text">Events</span>
        </div>
      </div>
    </div>
  )
}

export default ManagerSideBar