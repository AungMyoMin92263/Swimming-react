import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import {
	inviteStudent,
	LoadingActionFunc,
	getClassObject,
	getAllStudents,
} from "../../stores/actions";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import {
	getItem,
	removeItem,
	setItemWithObject,
} from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { isConstructorDeclaration } from "typescript";

interface StudentViewModel {
	name: any;
	phone: any;
	email: any;
	parent_name: any;
	age: number;
	gender: any;
	favorite: any;
	parent_email: any;
	parent_phone: any;
	avatar: any;
	status: string;
	errorMsg: string;

	isStudentEmailValid: boolean;
	isStudentEmailEmpty: boolean;
	studentEmailMsg: string;
	isParentEmailValid: boolean;
	isParentEmailEmpty: boolean;
	parentEmailMsg: string;
}

interface IStates {
	emails: string[];
	student: any[];
	isCompleted: boolean;
	isValid: boolean;
	students: StudentViewModel[];
	studentNameMsg: string;
	parentNameMsg: string;
	studentEmailMsg: string;
	parentEmailMsg: string;
	school_name: string;
	school_id: any;
	classObj: any;
	exisiting_users: any[];
	studentList: any[];
	selected_users: any[];
}

interface IProps {
	emails: string[];
	classes: any;
	inviteStudent: Function;
	LoadingActionFunc: Function;
	getClassObject: Function;
	studentList: any;
	getAllStudents: Function;
}

class InviteStudentPage extends React.Component<IProps, IStates> {
	url: any;
	backUrl: any;
	id: any;

	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3];

		this.state = {
			emails: [],
			student: [],
			isCompleted: false,
			isValid: false,
			students: [
				{
					name: null,
					phone: null,
					email: null,
					parent_name: null,
					age: 0,
					gender: null,
					favorite: null,
					parent_email: null,
					parent_phone: null,
					avatar: null,
					status: "init",
					errorMsg: "",

					isStudentEmailValid: false,
					isStudentEmailEmpty: true,
					studentEmailMsg: "",
					isParentEmailValid: false,
					isParentEmailEmpty: true,
					parentEmailMsg: "",
				},
			],
			studentNameMsg: "",
			parentNameMsg: "",
			studentEmailMsg: "",
			parentEmailMsg: "",
			school_name: "",
			school_id: -1,
			classObj: null,
			exisiting_users: [],
			studentList: [],
			selected_users: [],
		};
	}
	componentDidMount() {
		this.authFromLocal();
	}

	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo && user.userInfo.assign_school) {
			await this.setState({
				school_name: user.userInfo.assign_school.school.name,
				school_id: user.userInfo.assign_school.school.id,
			});

			if (!this.id) {
				const classObject = JSON.parse(getItem("class") || "null");
				if (classObject) {
					this.id = classObject.id;
					this.setState({
						classObj: classObject,
					});
					this.url = "/manager/invite-student-summary/new/" + classObject.id;
				}
				this.backUrl = "/manager/invite-coach";
			} else {
				this.url = "/manager/invite-student-summary/" + this.id;
				this.backUrl = "/manager/invite-student-summary/" + this.id;
				this.getClass();
			}
			this.props.LoadingActionFunc(false);
		} else this.props.LoadingActionFunc(false);
	};

	getClass = async () => {
		if (this.state.school_id && this.id) {
			let url = "school/" + this.state.school_id + "/class/" + this.id;
			await this.props.getClassObject(url);
			if (this.props.classes && this.props.classes.result)
				this.setState({
					classObj: this.props.classes.result,
				});
		}
	};

	addStudent = () => {
		let temp = this.state.students;
		temp.push({
			name: null,
			phone: null,
			email: null,
			parent_name: null,
			age: 0,
			gender: null,
			favorite: null,
			parent_email: null,
			parent_phone: null,
			avatar: null,
			status: "init",
			errorMsg: "",

			isStudentEmailValid: false,
			isStudentEmailEmpty: true,
			studentEmailMsg: "",
			isParentEmailValid: false,
			isParentEmailEmpty: true,
			parentEmailMsg: "",
		});
		this.setState({
			students: temp,
			isValid: false,
		});
	};

	isValidated = () => {
		if (this.state.students.length > 0) {
			this.setState({ isValid: true });
			this.state.students.map((studentObject: any) => {
				if (
					studentObject.email === "" ||
					!studentObject.isStudentEmailValid ||
					studentObject.parent_email === "" ||
					!studentObject.isParentEmailValid ||
					studentObject.status === "error"
				) {
					this.setState({ isValid: false });
				}
			});
		} else {
			this.setState({ isValid: false });
		}
	};

	submit = async () => {
		if (this.state.isValid) {
			let temp = this.state.emails;
			let tempStu = this.state.student;
			for (let i = 0; i < this.state.students.length; i++) {
				temp.push(this.state.students[i].email);
				tempStu.push({
					email: this.state.students[i].email,
					parent_email: this.state.students[i].parent_email,
				});
			}
			await this.setState({
				emails: temp,
				student: tempStu,
			});
			if (this.id) {
				this.props.LoadingActionFunc(true);
				for (let i = 0; i < this.state.students.length; i++) {
					if (this.state.students[i].status === "init") {
						await this.props.inviteStudent({
							user_email: this.state.students[i].email,
							student: {
								name: this.state.students[i].name,
								phone: this.state.students[i].phone,
								email: this.state.students[i].email,
								parent_name: this.state.students[i].parent_name,
								age: this.state.students[i].age,
								gender: this.state.students[i].gender,
								favorite: this.state.students[i].favorite,
								parent_email: this.state.students[i].parent_email,
								parent_phone: this.state.students[i].parent_phone,
								avatar: this.state.students[i].avatar,
							},
							class_id: this.state.classObj.id,
						});
						if (this.props.classes && this.props.classes.error) {
							let temp = this.state.students;
							temp[i].status = "error";
							temp[i].errorMsg =
								this.props.classes.error && this.props.classes.error.length > 0
									? this.props.classes.error[0]
									: this.props.classes.error;
							await this.setState({
								isCompleted: false,
								students: temp,
								isValid: false,
							});
							this.props.LoadingActionFunc(false);
						} else {
							const coach = JSON.parse(getItem("students") || "null");
							let temp = this.state.students;
							temp[i].status = "success";
							temp[i].errorMsg = "";
							if (coach) {
								setItemWithObject("students", coach.concat(temp));
							} else setItemWithObject("students", temp);
							this.setState({
								students: temp,
							});
						}
						if (i === this.state.students.length - 1) this.checkBack();
					}
					if (i === this.state.students.length - 1) this.checkBack();
				}
			}
		}
	};

	checkBack = () => {
		console.log("no error");
		if (this.state.students.length > 0) {
			for (let i = 0; i < this.state.students.length; i++) {
				if (this.state.students[i].status === "error") return;
				else if (
					this.state.students[i].status !== "error" &&
					i === this.state.students.length - 1
				) {
					this.props.LoadingActionFunc(false);
					this.setState({
						isCompleted: true,
					});
					this.props.LoadingActionFunc(false);
				}
			}
		}
	};

	renderBtn = () => {
		if (!this.state.isValid) {
			return (
				<button type='submit' className='idle-btn fw-600 ml-16'>
					Done
				</button>
			);
		} else
			return (
				<>
					<button
						type='submit'
						className='primary-btn fw-600 ml-16'
						onClick={this.submit}
					>
						Done
					</button>
				</>
			);
	};
	getStudents = async (classStudents: any[]) => {
		let url = "schools/all-user/" + this.state.school_id + "?role=student";
		await this.props.getAllStudents(url);
		if (this.props.studentList && this.props.studentList.result) {
			if (this.props.studentList.result.length > 0) {
				let temp = this.props.studentList.result;
				for (let i = 0; i < classStudents.length; i++) {
					let ind = temp.findIndex(
						(s: any) => s.id === classStudents[i].user.id
					);
					if (ind > -1) temp.splice(ind, 1);
					if (i === classStudents.length - 1) {
						await this.setState({
							exisiting_users: temp,
							studentList: temp,
						});
					}
				}
			}
		}
	};

	removeStudent = async (index: number) => {
		let temp = this.state.students;
		temp.splice(index, 1);
		await this.setState({
			students: temp,
		});
		this.isValidated();
		this.getClass();
	};

	render() {
		const {
			students,
			studentNameMsg,
			parentNameMsg,
			studentEmailMsg,
			parentEmailMsg,
			school_name,
			classObj,
		} = this.state;
		return (
			<>
				{this.state.isCompleted && <Navigate to={this.url} replace={true} />}
				<div className='wrapper scroll-y'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6'>
							<div className='f-14 mb-32'>
								<Link
									to={
										this.id
											? "/manager/invite-student-summary/" + this.id
											: "/manager/invite-coach-summary"
									}
									style={{ textDecoration: "none" }}
								>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>

							<div className='mb-16 align-center'>
								<img
									src={
										classObj && classObj.logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + classObj.logo
											: placeholder
									}
									alt='logo'
									className={`${
										classObj && classObj.logo ? "item-icon" : "w-48"
									}`}
								/>
								<span className='f-16'>
									{classObj && classObj.name} ({school_name})
								</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite Students.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>
									Invite students to your class. You can add more details in
									their profiles later.
								</span>
							</div>
							{students &&
								students.length > 0 &&
								students.map((student: any, index) => (
									<>
										<div>
											<div className='f-16 mb-16 fw-500 flex justify-space-between'>
												<span>Student #{index + 1}</span>
												{index >= 0 && (
													<div
														onClick={() => {
															this.removeStudent(index);
														}}
														className='fc-primary cursor'
													>
														Clear
													</div>
												)}
											</div>
											<div className='fw-400 mb-16'>
												<InputFormAtom
													label='Student Email'
													placeholder={"Enter email of Student"}
													warning={studentEmailMsg}
													type='text'
													disabled={student.status === "success"}
													showWarning={false}
													isDropdown={false}
													callback={async (value: string) => {
														let temp = students;
														temp[index].email = value;
														await this.setState({
															students: temp,
														});
														this.isValidated();
													}}
													id='inviteStudentEmail'
													name='inviteStudentEmail'
													value={student.email}
													required={true}
													maxLength={200}
													className=''
													clickCallback={() => {}}
													focusCallback={() => {
														let temp = students;
														temp[index].isStudentEmailEmpty = false;
														temp[index].isStudentEmailValid = true;
														temp[index].status = "init";

														this.setState({
															students: temp,
														});
													}}
													status={student.status}
												/>
											</div>

											<div className='fw-400 mb-16'>
												<InputFormAtom
													label='Parent Email'
													placeholder={"Enter email of parent"}
													warning={parentEmailMsg}
													type='text'
													disabled={student.status === "success"}
													showWarning={false}
													isDropdown={false}
													callback={async (value: string) => {
														let temp = students;
														temp[index].parent_email = value;
														await this.setState({
															students: temp,
														});
														this.isValidated();
													}}
													id='inviteParentEmail'
													name='inviteParentEmail'
													value={student.parent_email}
													required={true}
													maxLength={200}
													className=''
													clickCallback={() => {}}
													focusCallback={() => {
														let temp = students;
														temp[index].isParentEmailEmpty = false;
														temp[index].isParentEmailValid = true;
														temp[index].status = "init";

														this.setState({
															students: temp,
														});
													}}
													status={student.status}
												/>
											</div>
											{student && student.errorMsg !== "" && (
												<p className='text-danger'>{student.errorMsg}</p>
											)}
										</div>
									</>
								))}

							<div className='flex-center justify-space-between'>
								<div className='flex-center'>
									<div onClick={this.addStudent} className='cursor'>
										<AddIcon
											sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
										></AddIcon>
										<span className='primary'>Add another Student</span>
									</div>
								</div>

								<div className='flex-center'>
									<span className='secondary'>4 of 4</span>
									{this.renderBtn()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	classes,
	studentList,
}: StoreState): {
	classes: any;
	studentList: any;
} => {
	return {
		classes,
		studentList,
	};
};

export default connect(mapStateToProps, {
	inviteStudent,
	LoadingActionFunc,
	getClassObject,
	getAllStudents,
})(InviteStudentPage);
