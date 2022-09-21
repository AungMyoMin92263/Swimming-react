import React from "react";

// import css
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
	getClassObject,
	getAll,
	getClassProgram,
	postClassProgram,
	getAssignUserByClass,
} from "../../stores/actions";
import { connect } from "react-redux";
import { signOut, LoadingActionFunc } from "../../stores/actions";
import { Link } from "react-router-dom";
import { Class } from "../../stores/model/class";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AuthInterface } from "../../stores/model/auth-interface";
import ListItem, { IListItem } from "../../atoms/ListItem";
import { InitialIcon } from "../../atoms/InitialIcon";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ClassInterface } from "../../stores/model/class-interface";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { profile } from "console";
import ListBoxUI from "../../molecules/ListBox";
import CommentItem from "../../atoms/Comment";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BadgeListDash from "../../molecules/BadgeListDash";
import { getUserInfo } from './../../stores/actions/auth-action';
interface IStates {
	email: string;
	logo: string;
	dropdown: boolean;
	isLogout: boolean;
	school_name: string;
	step: number;
	url: string;
	image: any;
	schoolId: any;
	id: any;
}
interface IProps {
	user_id: any;
	authUser: any;
	getUserInfo: Function;
	getAllComment: Function;
	history: any;
	getClassObject: Function;
	defaultPath: string;
	signOut: Function;
	LoadingActionFunc: Function;
	classes: any;
	comments: any;
}

class ManagerAllBadgetsStudent extends React.Component<IProps, IStates> {
	id: any;
	class_id: any;
	url = "/manager/student-edit-profile/";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];
		this.class_id = path[6];
		this.state = {
			email: "",
			logo: "",
			school_name: "",
			dropdown: false,
			isLogout: false,
			step: 0,
			url: this.url + this.id,
			image: { preview: "", raw: "" },
			schoolId: -1,
			id: this.id ? this.id : -1,
		};
	}
	componentDidMount() {
		this.authFromLocal();
		// this.getDetailAll();
		//loading
	}

	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		console.log(user.userInfo);
		if (user && user.userInfo) {
			await this.setState({
				email: user.userInfo.email,
				logo: user.userInfo.assign_school
					? user.userInfo.assign_school.school.logo
					: "",
				school_name: user.userInfo.assign_school
					? user.userInfo.assign_school.school.name
					: "",
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school_id
					: -1,
			});
			let classUrl =
				"school/" + this.state.schoolId + "/class/" + this.class_id;
			this.props.getClassObject(classUrl, true);
			this.props.getUserInfo(this.id, true);
		}
	};
	toggleOpen = () => {
		let dropdownVal = !this.state.dropdown;
		this.setState({
			dropdown: dropdownVal,
		});
	};
	logout = async () => {
		await this.props.signOut();
		removeItem("authUser");
		removeItem("class");
		this.setState({
			isLogout: true,
		});
		this.props.LoadingActionFunc(true);
	};

	renderBadgetList = () => {
		const badgeData: any[] =
			this.props.authUser.otherUserinfo?.own_badges
				.map((res: any) => {
					return {
						text: res.badge.name,
						icon: res.badge.logo,
						description: res.badge.description,
						callback: () => {},
						isActive: true,
					};
				}) || [];
		return (
			<>
				<div className='class-attendance-body mt-16 p-24'>
					<BadgeListDash badges={badgeData} key='st_badge_list'></BadgeListDash>
				</div>
			</>
		);
	};

	render() {
		const { email, logo, school_name, step } = this.state;
		return (
			<>
				<div className='container-cus'>
					<div className='dashboard'>
						<div className='dashboard-header'>
							<div className='justify-center justify-space-between'>
								<div className='flex cursor align-center '>
									<div
										className='flex cursor align-center '
										onClick={() => this.props.history.back()}
										style={{ textDecoration: "none" }}
									>
										<ArrowBackIcon
											sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
										></ArrowBackIcon>
										<span className='fc-primary'>Back</span>
									</div>
									<span className='ml-16 fc-second'>
										{this.state.school_name} {"		"}
										<span className='ml-16 fc-second'>/</span>
									</span>
									<span className='ml-16 fc-second'>
										{this.props.classes && this.props.classes.viewClass?.name}
									</span>
									<span className='ml-16 fc-second'>/</span>
									<span className='ml-16 fc-second'>
										{this.props.authUser &&
											this.props.authUser.otherUserinfo?.name}
									</span>
								</div>

								<div className='justify-end'>
									<div className='dropdown'>
										<div className='email-div cursor' onClick={this.toggleOpen}>
											<InitialIcon
												initials={email.substr(0, 1).toUpperCase()}
												isFooterMenu={false}
											/>
											<span>{email} </span>
										</div>
										<div
											className={`dropdown-menu dropdown-menu-right ${
												this.state.dropdown ? "show" : ""
											}`}
											aria-labelledby='dropdownMenuButton'
										>
											<div
												className='dropdown-item cursor'
												onClick={this.logout}
											>
												<LogoutOutlinedIcon
													sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
												></LogoutOutlinedIcon>
												<span>Logout</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='justify-center'>
								<div className='col-8 col-md-8 justify-start align-center'>
									<div className='mr-16'></div>

									<div className='f-40 fw-500'>
										<span>All Badgets</span>
									</div>
								</div>
							</div>
						</div>

						<div className='class-detail-body'>
							<>{this.renderBadgetList()}</>
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = ({
	authUser,
	classes,
	response,
}: StoreState): {
	authUser: AuthInterface;
	classes: any;
	response: any;
} => {
	return {
		authUser,
		classes,
		response,
	};
};

export default connect(mapStateToProps, { getUserInfo,	getClassObject, })(
	ManagerAllBadgetsStudent
);


