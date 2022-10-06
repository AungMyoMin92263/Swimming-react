import React from "react";
import moment from "moment";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { getAllComment, getAllEvents, getAll } from "../../stores/actions";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProfileContainer from "../../atoms/ProfileContainer";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link, Navigate } from "react-router-dom";

import BadgeList from "../../molecules/BadgeList";
import ListBoxUI from "../../molecules/ListBox";
import StudentMobileHeader from "../../atoms/StudentMobileHeader";
import StudentProfile from "../../molecules/StudentProfile";

interface IStates {
	userId: number,
	role : string
}

interface IProps {
	history: any;
	getAllComment: Function;
	getAll: Function;
	response: any;
	getclassesByDateRange: Function;
}

class StudentViewProfile extends React.Component<IProps, IStates> {
	id: any;
	urlProfileDetail: any;

	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];

		this.state = {
			userId: parseInt(path[4]),
			role : ''
		};
	}

	componentDidMount() {
		this.getComments();
		this.getMyAttendance();
		 const authUser = JSON.parse(localStorage.getItem("authUser") || "null");
			if (authUser && authUser.userInfo) {
				this.setState({
					role: authUser.userInfo.role
				});
			}
	}
	getMyAttendance = async () => {
		let date = moment().format("YYYY-MM-DD");
		let getAttendUrl = "attendance/student/" + this.id + "/range?month=" + date;
		await this.props.getAll(getAttendUrl);
	
	};

	getComments = async () => {
		let url = "comment/by-student/";
		await this.props.getAllComment(url + this.id);
		// this.setState({
		//   comments: this.props.comments.result,
		// });
		// {class_id}
	};

	render() {
		return (
			<div className='wrapper-mobile bg-w'>
				<div className='content-mobile-cus-space col-sm-12'>
					<StudentMobileHeader
						backBtn={true}
						editBtn={true}
						isStudent={this.state.role === "student"}
						isParent={this.state.role === "parent"}
					></StudentMobileHeader>
					<StudentProfile
						byCoach={false}
						user_id={this.state.userId}
						history={this.props.history}
						defaultPath={"/student"}
					></StudentProfile>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({
	authUser,
	comments,
	eventList,
	attendance,
	response,
}: StoreState): {
	authUser: any;
	comments: any;
	eventList: any;
	attendance: any;
	response: any;
} => {
	return {
		authUser,
		comments,
		eventList,
		attendance,
		response,
	};
};

export default connect(mapStateToProps, {
	getAllComment,
	getAll,
})(StudentViewProfile);
