import React from "react";
import { IPageProp } from "../pagePropsInterface";
import './menuBar.css';

import PoolIcon from '@mui/icons-material/Pool';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useEffect } from "react";
import { getItem } from "../auth/LocalStorage";
import { InitialIcon } from "../atoms/InitialIcon";

const FooterMobileMenu = (props: IPageProp) => {
const [url,setURL]= React.useState('');
const [name,setName]= React.useState('');

  let path = props.history.location.pathname.split("/");
  useEffect(() => {
	let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      if (user.userInfo) {
        setURL('/coach/dashboard/profile-detail/'+user.userInfo.id);
				setName(user.userInfo.name);
      }
    }
  }, [])

  return (
		<>
			<div className='menu-bar'>
				<div className='menu-list'>
					<div
						className={`menu-item cursor ${
							path[2] === "dashboard" ? "active" : ""
						}`}
						onClick={() => props.history.push("/coach/dashboard")}
					>
						<HomeOutlinedIcon
							sx={{
								color: path[2] === "dashboard" ? "#0070F8" : "#808080",
								fontSize: 24,
							}}
						></HomeOutlinedIcon>
						<span className='f-8'>HOME</span>
					</div>
					<div
						className={`menu-item cursor ${
							path[2] === "class-list" ? "active" : ""
						}`}
						onClick={() => props.history.push("/coach/class-list")}
					>
						<EventNoteIcon
							sx={{
								color: path[2] === "class-list" ? "#0070F8" : "#808080",
								fontSize: 24,
							}}
						></EventNoteIcon>
						<span className='f-8'>CLASSES</span>
					</div>
					<div
						className={`menu-item cursor ${
							path[2] === "event-list" ? "active" : ""
						}`}
						onClick={() => props.history.push("/coach/event-list")}
					>
						<PoolIcon
							sx={{
								color: path[2] === "event-list" ? "#0070F8" : "#808080",
								fontSize: 24,
							}}
						></PoolIcon>
						<span className='f-8'>EVENTS</span>
					</div>
					<div
						className={`menu-item cursor ${
							path[2] === "me" ? "active" : ""
						}`}
						onClick={() => props.history.push("/coach/me")}
					>
						{name && (
							<InitialIcon
								initials={name.substr(0, 1).toUpperCase()}
								isFooterMenu={true}
							/>
						)}

						<span className='f-8'>ME</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default FooterMobileMenu;
