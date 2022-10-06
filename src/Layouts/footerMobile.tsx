import React from "react";
import { IPageProp } from "../pagePropsInterface";
import PoolIcon from '@mui/icons-material/Pool';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useEffect } from "react";
import { getItem } from "../auth/LocalStorage";
import { InitialIcon } from "../atoms/InitialIcon";
import './MenuBar.css';

const FooterMobileMenu = (props: IPageProp) => {
const [role,setRole]= React.useState('');
const [name,setName]= React.useState<string>('');
const [id,setId]= React.useState('');
  let path = props.history.location.pathname.split("/");
  useEffect(() => {
	let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
        setRole(user.userInfo.role);
		setId(user.userInfo.id);
    }
	setName("");
  }, [])

  return (
		<>
			<div className='menu-bar'>
				<div className='menu-list'>
					<div
						className={`menu-item cursor ${
							path[2] === "dashboard" ? "active" : ""
						}`}
						onClick={() => props.history.push((role === 'student' || role === 'parent')? "/student/dashboard" :"/coach/dashboard" )}
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
						onClick={() => props.history.push((role === 'student' || role === 'parent')? "/student/class-list" : "/coach/class-list")}
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
						onClick={() => props.history.push((role === 'student' || role === 'parent')? "/student/event-list" : "/coach/event-list")}
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
						onClick={() => props.history.push((role === 'student' || role === 'parent')? "/student/me/profile-detail/"+id : "/coach/me")}
					>
							<InitialIcon
								initials={(name && name !== "" ? name.substring(0,1) : "M").toUpperCase()}
								isFooterMenu={true}
							/>

						<span className='f-8'>ME</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default FooterMobileMenu;
