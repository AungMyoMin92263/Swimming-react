import { IPageProp } from "../pagePropsInterface";
import './MenuBar.css';

import PoolIcon from '@mui/icons-material/Pool';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

const FooterMobileMenu = (props: IPageProp) => {
  let path = props.history.location.pathname.split("/");
  return (
		<>
			<div className='menu-bar'>
				<div className='menu-list'>
					<div
						className={`menu-item cursor ${
							path[2] === "dashboard" ? "active" : ""
						}`}
						onClick={() => props.history.push("dashboard")}
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
						className={`menu-item cursor${
							path[2] === "class-list" ? "active" : ""
						}`}
						onClick={() => props.history.push("class-list")}
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
						onClick={() => props.history.push("event-list")}
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
						className={`menu-item cursor${
							path[2] === "profile" ? "active" : ""
						}`}
						onClick={() => props.history.push("profile-detail")}
					>
						<img
							src={"/assets/icons/me.png"}
							alt='profile'
							style={{ width: "24px" }}
						/>
						<span className='f-8'>ME</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default FooterMobileMenu;
