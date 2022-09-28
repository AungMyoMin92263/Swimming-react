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
import { deleteCoach } from './../../stores/actions/coach-action';
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
	coachList:string[],
}

interface IProps {
	LoadingActionFunc: Function;
	schools: any;
	getSchoolObj: Function;
	getClassObject: Function;
	classes: any;
	deleteCoach: Function;
	coach:any
}
class ManagerInviteCoachSummaryPage extends React.Component<IProps, IStates> {
	id: any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3] === 'new'? path[4] : path[3];

		this.state = {
			school: { name: "", logo: "", assign_user: [] },
			errorMsg: "",
			url: path[3] === 'new' ? "/manager/invite-student" : "/manager/class/"+ this.id,
			school_logo: "",
			school_name: "",
			schoolId: "",
			classId: this.id,
			class_name: "",
			class_logo: "",
			coachList: [],
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
		this.props.LoadingActionFunc(false);
	}

	getClass = async () => {
		let url = "school/" + this.state.schoolId + "/class/" + this.state.classId;
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
			this.setState({
				coachList: this.props.classes.result.assign_user,
				class_logo: this.props.classes.result.logo,
				class_name: this.props.classes.result.name,
			});
		}
	};
	handleDelete = async (user_id:any) =>{
		let deleteCoachUrl = "assigned/class";
		await this.props.deleteCoach(deleteCoachUrl, user_id)
		if (
			this.props.coach &&
			this.props.coach.result &&
			this.props.coach.result.data.statusText === "success"
		){
			console.log('this.props.coach',this.props.coach)
			this.getClass();
		}
			if (this.props.coach.error) {
				this.setState({
					errorMsg: this.props.coach.error,
				});
			}

	}

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
		} = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-32'>
								<Link
									to={"/manager/class/" + classId}
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
								<span className='f-16'>{school_name}/</span>
								<span className='fc-second'>({class_name})</span>
							</div>
							<div className='hr mb-32'></div>

							<div className='f-32 fw-500 mb-32'>
								<span>My Coaches.</span>
							</div>

							{coachList &&
								coachList.length > 0 &&
								coachList.map((coach: any) => (
									<>
										<div className='f-16 mb-32 align-center justify-space-between'>
											<div className='align-center'>
												<InitialIcon
													initials={(coach.user ? coach.user.email : "")
														.substr(0, 1)
														.toUpperCase()}
													isFooterMenu={false}
												/>
												<span className='ml-16'>
													{coach.user && coach.user.name
														? coach.user.name
														: "-"}
												</span>
											</div>
											<div>
												<DeleteOutlineOutlinedIcon
													sx={{
														color: "#0070F8",
														fontSize: 24,
														cursor: "pointer",
													}}
													onClick={() => this.handleDelete(coach.id)}
												></DeleteOutlineOutlinedIcon>
											</div>
										</div>

										<div className='hr mb-16'></div>
									</>
								))}
							<Link
								to={"/manager/invite-coach/" + this.id}
								style={{ textDecoration: "none" }}
							>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another coach</span>
								</div>
							</Link>

							<div className='hr mb-32'></div>
							{this.state.errorMsg && <p className='text-danger'>{this.state.errorMsg}</p>}
							<Link to={url} style={{ textDecoration: "none" }}>
								<button type='submit' className='primary-btn right'>
									Done
								</button>
							</Link>
						</div>
					</div>
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
	coach:any;
} => {
	return {
		schools,
		classes,
		coach,
	};
};

export default connect(mapStateToProps, {
	LoadingActionFunc,
	getSchoolObj,
	getClassObject,
	deleteCoach,
})(ManagerInviteCoachSummaryPage);
