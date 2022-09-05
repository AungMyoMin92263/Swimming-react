import React from "react";

// import css
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StoreState } from "../../stores/reducers";
import {
	getAllclasses,
	getClassObject,
} from "../../stores/actions/class-action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Class } from "../../stores/model/class";
import { getItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AuthInterface } from "../../stores/model/auth-interface";
import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import { InitialIcon } from "../../atoms/InitialIcon";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ClassInterface } from "../../stores/model/class-interface";
import { Checkbox } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
interface IStates {
	email: string;
	logo: string;
	school_name: string;
	step: number;
}
interface IProps {
	authUser: AuthInterface;
	classes: ClassInterface;
	getClassObject: Function;
}

class ManagerClassDetailPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: "",
			logo: "",
			school_name: "",
			step: 0,
		};
	}
	componentDidMount() {
		const user = JSON.parse(getItem("authUser") || "null");
		console.log(user.userInfo);
		if (user && user.userInfo) {
			this.setState({
				email: user.userInfo.data.email,
				logo:
					user.userInfo.data.assign_school.length > 0
						? user.userInfo.data.assign_school[0].school.logo
						: "",
				school_name:
					user.userInfo.data.assign_school.length > 0
						? user.userInfo.data.assign_school[0].school.name
						: "",
			});
		}
		console.log("authUser", this.props.authUser);
		//loading
	}

	renderClassDaily = () => {
		return (
			<div className='mt-24 class-daily'>
				<div className='class-detail col-8'>
					<div className='mr-24'>
						<span className='fc-second'>Class Detail</span>

						<div className='mt-16 class-detail-content'>
							<div className='class-detail-date-time'>
								<div className='col-6 flex-column'>
									<span className='f-10 fc-second'>Date</span>
									<span className='f-16 fw-500'>6 July 2022</span>
								</div>
								<div className='col-6 flex-column'>
									<span className='f-10 fc-second'>TIME</span>
									<span className='f-16 fw-500'>9:00 AM</span>
								</div>
							</div>
							<div className='coach-no-students'>
								<div className='col-6 flex-column'>
									<span className='f-10 fc-second'>Coach</span>
									<span className='f-16 fw-500'>9:00 AM</span>
								</div>

								<div className='col-6 flex-column'>
									<span className='f-10 fc-second'>No. Student</span>
									<span className='f-16 fw-500'>9:00 AM</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='class-detail col-4'>
					<span className='fc-second'>Daily programme</span>
					<div className='mt-16 class-detail-content'></div>
				</div>
			</div>
		);
	};
	renderComment = () => {
		return (
			<div className='mt-24'>
				<div className='class-comment-header flex justify-space-between '>
					<span className='fc-second'>Class Comments</span>
					<span className="fc-primary">View All</span>
				</div>
			</div>
		);
	};
	renderAttendance = () =>{

		return (
			<>
				<div className='class-attendance-header mt-24 fc-second'>
					<span>Attendance</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div className='class-attendance-sub-header flex mt-16 ml-16'>
						<div className='col-10 f-10'>
							<span className='ml-56'>Students</span>
						</div>
						<div className='col-2 f-10'>
							<span className='ml-16'>Attendace</span>
						</div>
					</div>
					<div className='class-attendance-content flex align-center'>
						<div className='student-content col-10 flex align-center'>
							<div className='plus flex-center ml-16 cursor'>
								<AddIcon />
							</div>
							<span className='f-16 ml-16 fc-primary'>Add Student</span>
						</div>
					</div>
					<div className='class-attendance-content flex align-center'>
						<div className='student-content col-10 flex align-center'>
							<div className='plus flex-center ml-16'>
								<InitialIcon initials={"J"} />
							</div>

							<span className='f-16 ml-16'>Joseph</span>
						</div>

						<div className='attendance-content col-2 align-center justify-space-around'>
							<Checkbox
								icon={<RadioButtonUncheckedIcon />}
								checkedIcon={<CheckCircleIcon />}
							/>
							<MoreVertIcon />
						</div>
					</div>
					<div className='class-attendance-content flex align-center'>
						<div className='student-content col-10 flex align-center '>
							<div className='plus flex-center ml-16'>
								<InitialIcon initials={"J"} />
							</div>

							<span className='f-16 ml-16'>Joseph</span>
						</div>

						<div className='attendance-content col-2 flex align-center justify-space-around'>
							<Checkbox
								icon={<RadioButtonUncheckedIcon />}
								checkedIcon={<CheckCircleIcon />}
							/>
							<MoreVertIcon />
						</div>
					</div>
				</div>
			</>
		);
	}

	render() {
		const { email, logo, school_name, step } = this.state;
		

		return (
			<>
				<div className='container-cus'>
					<div className='dashboard'>
						<div className='dashboard-header'>
							<div className='justify-center justify-space-between'>
								<Link to='/admin/welcome' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
								<div className='justify-end'>
									<div className='email-div'>
										<InitialIcon initials={email.substr(0, 1).toUpperCase()} />
										<span>{email} </span>
									</div>
								</div>
							</div>

							<div className='justify-center'>
								<div className='col-8 col-md-8 justify-start align-center'>
									<div className='mr-16'>
										<img
											src={
												logo
													? process.env.REACT_APP_API_ENDPOINT + "/" + logo
													: placeholder
											}
											alt='logo'
											className='big-logo'
										/>
									</div>

									<div className='f-40 fw-500'>
										<span>{school_name}</span>
									</div>
								</div>
								<div className='col-4 col-md-4 justify-end'>
									<Link to='/manager/dashboard'>
										<button
											type='submit'
											className='secondary-btn'
											// style={{ width: "140px" }}
										>
											Edit Class
											<AddIcon
												sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
											></AddIcon>
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className='class-detail-body'>
							<>
								{this.renderClassDaily()}
								{this.renderComment()}
								{this.renderAttendance()}
								
							</>
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = ({
	classes,
	authUser,
}: StoreState): {
	authUser: AuthInterface;
	classes: ClassInterface;
} => {
	return {
		classes,
		authUser,
	};
};

export default connect(mapStateToProps, { getClassObject })(
	ManagerClassDetailPage
);
