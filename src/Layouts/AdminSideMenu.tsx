import { IPageProp } from "../pagePropsInterface";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PoolIcon from "@mui/icons-material/Pool";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";

import "./MenuSideBar.css";

const SideBar = (props: IPageProp) => {
  console.log(props.history.location);
  let path = props.history.location.pathname.split("/");

  return (
    <div className="side-bar">
      <h1
        className="aside-title primary cursor"
        onClick={() => props.history.push("dashboard")}
      >
        My Report Cards
      </h1>

      <div className="class-box">
        <div
          className={`list-item ${path[2] === "dashboard" ? "active" : ""}`}
          onClick={() => props.history.push("dashboard")}
        >
          <SupervisedUserCircleOutlinedIcon
            sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
          ></SupervisedUserCircleOutlinedIcon>
          <span className="item-text f-16">Schools</span>
        </div>

        <div
          className={`list-item ${path[2] === "people-list" ? "active" : ""}`}
          onClick={() => props.history.push("people-list")}
        >
          <AccountCircleOutlinedIcon
            sx={{ color: "#808080", fontSize: 32, mr: 2 }}
          ></AccountCircleOutlinedIcon>
          <span className="item-text">People</span>
        </div>
        <div
          className={`list-item ${path[2] === "event-list" ? "active" : ""}`}
          onClick={() => props.history.push("event-list")}
        >
          <PoolIcon sx={{ color: "#808080", fontSize: 32, mr: 2 }}></PoolIcon>
          <span className="item-text">Events</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
