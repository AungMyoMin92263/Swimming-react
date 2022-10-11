import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { signOut } from "../../stores/actions/auth-action";
import {  LoadingActionFunc } from "../../stores/actions";
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
import { CreateProfile } from "../../atoms/createProfile";
import ListItem from "../../atoms/ListItem";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import { setStudentView } from "../../stores/actions";
import { StoreState } from "../../stores/reducers";
import ListBoxUI from "../../molecules/ListBox";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon, InitialIconList } from "../../atoms/InitialIcon";
import { getDetailEvents } from "../../stores/actions";

interface IStates {
	email: string;
	logo: string;
	dropdown: boolean;
	isLogout: boolean;
	school_name: string;
	step: number;
	image: any;
	schoolId: any;
	event_id: any;
}
interface IProps {
	history: any;
	defaultPath: string;
	events: any;
	getDetailEvents: Function;
	signOut: Function;
	LoadingActionFunc: Function;
}

class ManagerEventDetailPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		let event_id = path[3];
		this.state = {
			event_id: event_id,
			email: "",
			logo: "",
			school_name: "",
			dropdown: false,
			isLogout: false,
			step: 0,
			image: { preview: "", raw: "" },
			schoolId: -1,
		};
	}

	componentDidMount(): void {
		this.authFromLocal();
		this.props.LoadingActionFunc(false);
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
			this.getEventDetail();
		}
	};
	getEventDetail = async () => {
		await this.props.getDetailEvents(this.state.schoolId, this.state.event_id);
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
	renderParticipants = () => {
		// let editAddCoachUrl = "/manager/invite-coach-summary/" + this.state.id;

		return (
			<>
				<div className='class-attendance-header mt-24 fc-second'>
					<span>Participants</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div className='class-attendance-sub-header flex mt-16 ml-16'>
						<div className='col-7 f-10'>
							<span className='ml-56'>STUDENT</span>
						</div>
						<div className='col-3 f-10'>
							<span className=''>COACH(ES)</span>
						</div>
						<div className='col-2 f-10'>
							<span className='ml-16'>RECORD</span>
						</div>
					</div>
					<div className='class-attendance-content flex align-center'>
						<div className='student-content col-10 flex align-center'>
							<div className='plus flex-center ml-16 cursor'>
								<AddIcon />
							</div>
							<Link to={"/manager/event-summary/" + this.state.event_id}>
								<span className='f-16 ml-16 fc-primary fw-500'>
									Add/Edit Student
								</span>
							</Link>
						</div>
					</div>
					{this.props.events.eventDetail?.students.map(
						(student: any, index: any) => {
							return (
								<>
									<div
										className='class-attendance-content flex align-center cursor'
										onClick={() => {}}
									>
										<div className='student-content col-7 flex align-center'>
											<div className='plus flex-center ml-16'>
												<InitialIcon
													initials={(student.name || student.email || "User")
														.substr(0, 1)
														.toUpperCase()}
													isFooterMenu={false}
												/>
											</div>

											<span className='f-16 ml-16'>{student.name? student.name : student.email}</span>
										</div>
										<div className='attendance-content col-3 align-center '>
											{student.coaches?.map((coach: any, index: any) =>
												index === 0 ? (
													<InitialIcon
														initials={coach.email.substr(0, 1).toUpperCase()}
														isFooterMenu={false}
													/>
												) : (
													<InitialIconList
														initials={coach.email.substr(0, 1).toUpperCase()}
														isFooterMenu={false}
													/>
												)
											)}
										</div>

										<div className='attendance-content col-2 align-center ml-16'>
											{student.best_record}
										</div>
									</div>
								</>
							);
						}
					)}
				</div>
			</>
		);
	};

	render() {
		const { email, logo, school_name, step } = this.state;
		const profile: IProfile = {
			isLogo: false,
			title: this.props.events.eventDetail?.name,
			display_item: [
				{
					title: "Stroke",
					value: this.props.events.eventDetail?.stroke,
				},
				{
					title: "Length",
					value: this.props.events.eventDetail?.stroke_length,
				},
				{
					title: "Gender",
					value: (this.props.events.eventDetail?.gender || "").toUpperCase(),
				},
				{
					title: "Age Class",
					value: `${this.props.events.eventDetail?.from_age || "-"} to ${
						this.props.events.eventDetail?.to_age || "-"
					} y/o`,
				},
				{
					title: "No. Students",
					value: this.props.events.eventDetail?.students.length,
				},
			],
		};
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
									</span>
									<span className='ml-16 fc-second'></span>
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
									<div className='f-40 fw-500'>
										<span>{profile?.title}</span>
									</div>
								</div>
								<div className='col-4 col-md-4 justify-end'>
									<Link to={"/manager/edit-event/" + this.state.event_id}>
										<button
											type='submit'
											className='secondary-btn'
											// style={{ width: "140px" }}
										>
											Edit Event
											<AddIcon
												sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
											></AddIcon>
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className='mt-24 class-daily'>
							<div className='class-detail col-12'>
								<div className=''>
									<span className='fc-second'>Event Details</span>

									<div className='mt-16 class-detail-content'>
										<div className='class-detail-date-time'>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].value}
												</span>
											</div>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].value}
												</span>
											</div>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[2].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[2].value}
												</span>
											</div>
										</div>
										<div className='coach-no-students'>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[3].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[3].value}
												</span>
											</div>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[4].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[4].value}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='class-detail-body'>
							<>{this.renderParticipants()}</>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	events,
}: StoreState): {
	events: any;
} => {
	return {
		events,
	};
};

export default connect(mapStateToProps, { LoadingActionFunc, getDetailEvents })(
	ManagerEventDetailPage
);
