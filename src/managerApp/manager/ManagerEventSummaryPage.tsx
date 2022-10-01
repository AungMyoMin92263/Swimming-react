import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Link } from "react-router-dom";

import { getItem, removeItem, setItemWithObject } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { InitialIcon } from "../../atoms/InitialIcon";
import {
	getSchoolObj,
	LoadingActionFunc,
	getAssignUserByClass,
} from "../../stores/actions";
import { getClassObject, getAll } from "../../stores/actions";
import { deleteStudent } from "./../../stores/actions/student-action";
import { Modal } from "react-bootstrap";
import { getDetailEvents } from "../../stores/actions";
interface IStates {
	school: any;
	isLogout: boolean;
	dropdown: boolean;
	errorMsg: string;
	studentList: any[];
	modalShow: boolean;
	removeIndex: number;
	schoolId: any;
	school_logo: any;
	event_id: any;
	school_name: string;
}

interface IProps {
	LoadingActionFunc: Function;
	signOut: Function;
	schools: any;
	getAll: Function;
	response: any;
	getDetailEvents: Function;
	classes: any;
	deleteStudent: Function;
	student: any;
	history: any;
    events:any
}
class ManagerEventSummaryPage extends React.Component<IProps, IStates> {
	id: any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		let event_id = path[3];

		this.state = {
            school_name: '',
            school_logo:'',
			event_id: event_id,
			isLogout: false,
			school: { name: "", logo: "", assign_user: [] },
			errorMsg: "",
			dropdown: false,
			studentList: [],
			modalShow: false,
			removeIndex: -1,
			schoolId: -1,
		};
	}
	componentDidMount() {
		this.authFromLocal();
		
		this.props.LoadingActionFunc(false);
	}

	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			await this.setState({
				school_name: user.userInfo.assign_school
					? user.userInfo.assign_school.school.name
					: "",
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school_id
					: -1,
				school_logo:user.userInfo.assign_school &&  user.userInfo.assign_school.school?.logo,
			});
		}
        await this.getEventDetail();
        if (this.props.events && this.props.events.eventDetail){
            this.setState({
                studentList:this.props.events.eventDetail?.students
            })
        }
		this.props.LoadingActionFunc(false);
        
	};

	handleDelete = async () => {
		let deleteStudentUrl = "assigned/event";
		await this.props.deleteStudent(
			deleteStudentUrl,
			this.state.studentList[this.state.removeIndex].assign_event_id
		);
		

		if (
			this.props.student &&
			this.props.student.result &&
			this.props.student.result.data.statusText === "success"
		) {
            
			this.setState({
				modalShow: this.state.modalShow ? false : this.state.modalShow,
			})
			await this.getEventDetail();
		}
		else {
            await this.getEventDetail();
			this.setState({
				errorMsg: this.props.student.error,
			});
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

	render() {
		const {
			studentList,
			removeIndex,
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
							<div
								className='f-14 mb-32 cursor'
								onClick={() => this.props.history.back()}
							>
								<ArrowBackIcon
									sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
								></ArrowBackIcon>
								<span>Back</span>
							</div>
							<div className='mb-8 align-center'>
								<img
									src={
										this.state.school_logo
											? process.env.REACT_APP_API_ENDPOINT +
											  "/" +
											  this.state.school_logo
											: placeholder
									}
									alt='logo'
									id='logo'
									className={`${this.state.school_logo ? "item-icon" : "w-48"}`}
								/>
								<span className='f-16'>{this.state.school_name}</span>
								<span className='ml-16'>/</span>
								<span className='ml-16 fc-second'>
									{this.props.events &&
										this.props.events.eventDetail &&
										this.props.events.eventDetail.name}
								</span>
							</div>
							<div className='hr mb-32'></div>

							<div className='f-32 fw-500 mb-32'>
								<span>Participants.</span>
							</div>

							{studentList &&
								studentList.length > 0 &&
								studentList.map((student: any, index: number) => (
									<>
										<div className='f-16 mb-32 align-center justify-space-between'>
											<div className='align-center'>
												<InitialIcon
													initials={(student.name
														? student.name
														: student.email
													)
														.substr(0, 1)
														.toUpperCase()}
													isFooterMenu={false}
												/>
												<span className='ml-16'>
													{student && student.name
														? student.name
														: student.email}
												</span>
											</div>
											<div>
												<DeleteOutlineOutlinedIcon
													sx={{
														color: "#0070F8",
														fontSize: 24,
														cursor: "pointer",
													}}
													// onClick={() => this.handleDelete(student.id)}
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
							<Link
								// to={"/manager/invite-student"}
								to={"/manager/edit-invite-student-event/" + this.state.event_id}
								style={{ textDecoration: "none" }}
							>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another student</span>
								</div>
							</Link>

							<div className='hr mb-32'></div>

							<button
								type='submit'
								className='primary-btn right'
								onClick={() => {
									this.props.history.back();
								}}
							>
								Done
							</button>
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
								Remove Student {""}‘
								{studentList[removeIndex] &&
									studentList[removeIndex] &&
									(studentList[removeIndex].name
										? studentList[removeIndex].name
										: studentList[removeIndex].email)}{" "}
								’?
							</span>
						</div>
						<div className='mb-16'>
							<span className='f-16'>
								This action cannot be undone. This action will only remove the
								student from this event, not your school.
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
	events,
    student,
}: StoreState): {
	events: any;
    student:any
} => {
	return {
		events,
        student
	};
};

export default connect(mapStateToProps, {
	LoadingActionFunc,
	getDetailEvents,
	deleteStudent,
})(ManagerEventSummaryPage);
