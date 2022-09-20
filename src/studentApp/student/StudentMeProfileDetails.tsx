import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { getStudentObject, getAll } from "../../stores/actions";

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
	userId: number
}

interface IProps {
	history: any
}

class StudentViewProfile extends React.Component<IProps, IStates> {
	id: any;
	urlProfileDetail: any

	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];

		this.state = {
			userId: parseInt(path[4])
		};
	}
	componentDidMount() {
		console.log(this.state);
	}

	render() {
		return (
			<div className="wrapper-mobile bg-w">
				<div className="content-mobile-cus-space col-sm-12">
					<StudentMobileHeader backBtn={true} editBtn={true}></StudentMobileHeader>
					<StudentProfile user_id={this.state.userId} history={this.props.history} defaultPath={'/student'}></StudentProfile>
				</div>
			</div>
		)
	}

}

export default StudentViewProfile;
