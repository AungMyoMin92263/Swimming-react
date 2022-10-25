import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Link } from "react-router-dom";

import { getItem, setItemWithObject } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { InitialIcon } from "../../atoms/InitialIcon";
import { getSchoolObj, LoadingActionFunc } from "../../stores/actions";
import { getClassObject, getAll } from "../../stores/actions";
import { deleteCoach } from "./../../stores/actions/coach-action";
import { Modal } from "react-bootstrap";
import { getAssignUserByClass } from "./../../stores/actions/class-action";

//add coaches
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import SearchIcon from "@mui/icons-material/Search";
interface IStates {
	school: any;
	errorMsg: string;
	url: string;
	school_logo: any;
	school_name: string;
	schoolId: string;
	classId: any;
	class_name: string;
	class_logo: string;
	coachList: any[];
	modalShow: boolean;
	removeIndex: number;
}

interface IProps {
	LoadingActionFunc: Function;
	schools: any;
	getSchoolObj: Function;
	getAssignUserByClass: Function;
	getClassObject: Function;
	classes: any;
	deleteCoach: Function;
	coach: any;
	history: any;
}
class AdminInviteCoachSummaryPage extends React.Component<IProps, IStates> {
	id: any;
	schoolId: any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[5] === "new" ? path[7] : path[5];
		this.schoolId = path[5] === "new" ? path[4] : path[3];
		this.state = {
			school: { name: "", logo: "", assign_user: [] },
			errorMsg: "",
			url:
				path[3] === "new"
					? "/admin/school/" + this.schoolId + "/invite-student"
					: "/admin/school/" + this.schoolId + "/class/" + this.id,
			school_logo: "",
			school_name: "",
			schoolId: "",
			classId: this.id,
			class_name: "",
			class_logo: "",
			coachList: [],
			modalShow: false,
			removeIndex: -1,
		};
	}
	componentDidMount() {
		this.authFromLocal();
	}

	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			await this.setState({
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school.id
					: 0,
				school_name: user.userInfo.assign_school
					? user.userInfo.assign_school.school.name
					: "",
			});
			this.getClass();
		}
		this.getSchool();
		this.props.LoadingActionFunc(false);
	};

	getClass = async () => {
		let url = "school/" + this.state.schoolId + "/class/" + this.state.classId;
		let class_url = "assigned/class/by-class/" + this.state.classId;
		await this.props.getAssignUserByClass(class_url);
		await this.props.getClassObject(url);
		if (this.props.classes && this.props.classes.viewClass) {
			this.setState({
				coachList: this.props.classes.viewClass.assign_user,
				class_logo: this.props.classes.viewClass.logo,
				class_name: this.props.classes.viewClass.name,
			});
		}
		if (
			this.props.classes &&
			this.props.classes.result &&
			this.props.classes.result.assign_user
		) {
			let coachTemp = [];
			for (let i = 0; i < this.props.classes.assignUser.length; i++) {
				if (this.props.classes.assignUser[i].type === "coache") {
					coachTemp.push(this.props.classes.assignUser[i]);
				}
			}
			this.setState({
				class_logo: this.props.classes.result.logo,
				class_name: this.props.classes.result.name,
				coachList: coachTemp,
			});
		}
	};

	getSchool = async () => {
		await this.props.getSchoolObj("schools/" + this.schoolId);
		let school = this.props.schools.result;
		if (school) {
			this.setState({
				school_name: school.name,
				school_logo: school.logo,
			});
		}
	};

	handleDelete = async () => {
		let deleteCoachUrl = "assigned/class";
		await this.props.deleteCoach(
			deleteCoachUrl,
			this.state.coachList[this.state.removeIndex].id
		);
		if (
			this.props.coach &&
			this.props.coach.result &&
			this.props.coach.result.data.statusText === "success"
		) {
			this.setState({
				modalShow: this.state.modalShow ? false : this.state.modalShow,
			});
			this.getClass();
		}
		if (this.props.coach.error) {
			this.setState({
				errorMsg: this.props.coach.error,
			});
		}
	};

	render() {
		const {
			url,
			school_logo,
			school_name,
			schoolId,
			classId,
			class_name,
			class_logo,
			coachList,
			removeIndex,
		} = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/admin/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-32'>
								<Link
									to={"/admin/school/" + this.schoolId + "/class/" + classId}
									style={{ textDecoration: "none" }}
								>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='mb-8 align-center'>
								<img
									src={
										class_logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + class_logo
											: placeholder
									}
									alt='logo'
									className={`${class_logo ? "item-icon" : "w-48"}`}
								/>
								<span className='f-16'>{class_name}</span>
								<span className='fc-second'>({school_name})</span>
							</div>
							<div className='hr mb-32'></div>

							<div className='f-32 fw-500 mb-32'>
								<span>My Coaches.</span>
							</div>

							{coachList &&
								coachList.length > 0 &&
								coachList.map((coach: any, index: number) => (
									<>
										<div className='f-16 mb-32 align-center justify-space-between'>
											<div className='align-center'>
												<InitialIcon
													initials={(coach.user ? coach.user.email : "")
														.substr(0, 1)
														.toUpperCase()}
													isFooterMenu={false}
												/>
												<div className='ml-16 width-300'>
													<span>
														{coach.user.name
															? coach.user.name
															: coach.user.email}{" "}
														&nbsp;
													</span>
													<span className='secondary'>
														(
														{coach.user.password && coach.user.password !== ""
															? "Onboarded"
															: "Pending"}
														)
													</span>
												</div>
											</div>
											<div>
												<DeleteOutlineOutlinedIcon
													sx={{
														color: "#0070F8",
														fontSize: 24,
														cursor: "pointer",
													}}
													// onClick={() => this.handleDelete(coach.id)}
													onClick={() =>
														this.setState({
															removeIndex: index,
															modalShow: true,
														})
													}
												></DeleteOutlineOutlinedIcon>
											</div>
										</div>

										<div className='hr mb-16'></div>
									</>
								))}
							{/* <Link
								to={
									"/admin/school/" + this.schoolId + "/invite-coach/" + this.id
								}
								style={{ textDecoration: "none" }}
							>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another coach</span>
								</div>
							</Link> */}

							<div className='mb-16'>
								<div className='mb-16'>
									<span className='f-12 fw-400'>Invite New Coaches</span>
								</div>
								<div
									className='mb-16 cursor'
									onClick={() =>
										this.props.history.push(
											"/admin/school/" +
												this.schoolId +
												"/invite-coach/" +
												this.id
										)
									}
								>
									<PersonAddAltIcon
										sx={{ color: "#0070F8", fontSize: 24, mr: 0.5 }}
									></PersonAddAltIcon>
									<span className='f-16 fc-primary fw-500 ml-16'>
										Invite New Coach via Email
									</span>
								</div>
								<div
									className='mb-16 cursor'
									onClick={() =>
										this.props.history.push(
											"/admin/school/" +
												this.schoolId +
												"/invite-old-coaches/" +
												this.id
										)
									}
								>
									<PersonAddAltIcon
										sx={{ color: "#0070F8", fontSize: 24, mr: 0.5 }}
									></PersonAddAltIcon>
									<span className='f-16 fc-primary fw-500 ml-16'>
										Invite Existing Coach from School
									</span>
								</div>
							</div>

							<div className='hr mb-32'></div>
							{this.state.errorMsg && (
								<p className='text-danger'>{this.state.errorMsg}</p>
							)}
							<Link to={url} style={{ textDecoration: "none" }}>
								<button type='submit' className='primary-btn right'>
									Done
								</button>
							</Link>
						</div>
					</div>

					<Modal
						aria-labelledby='contained-modal-title-vcenter'
						centered
						dialogClassName={"confirm-modal"}
						show={this.state.modalShow}
						onHide={() => {
							this.setState({
								...this.state,
								modalShow: false,
							});
						}}
					>
						<div className='mb-16'>
							<span className='f-20 fw-500'>
								Remove Coach {""}‘
								{coachList[removeIndex] &&
									coachList[removeIndex].user &&
									(coachList[removeIndex].user.name
										? coachList[removeIndex].user.name
										: coachList[removeIndex].user.email)}{" "}
								’?
							</span>
						</div>
						<div className='mb-16'>
							<span className='f-16'>
								This action cannot be undone. This action will only remove the
								coach from this class, not your school.
							</span>
						</div>
						<div className='flex-center'>
							<button
								type='submit'
								className='secondary-btn mr-8'
								onClick={() =>
									this.setState({
										...this.state,
										modalShow: false,
									})
								}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='secondary-btn'
								style={{ color: "#F80000", borderColor: "#F80000" }}
								onClick={this.handleDelete}
							>
								Remove
							</button>
						</div>
					</Modal>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	schools,
	classes,
	coach,
}: StoreState): {
	schools: any;
	classes: any;
	coach: any;
} => {
	return {
		schools,
		classes,
		coach,
	};
};

export default connect(mapStateToProps, {
	LoadingActionFunc,
	getAssignUserByClass,
	getSchoolObj,
	getClassObject,
	deleteCoach,
})(AdminInviteCoachSummaryPage);
