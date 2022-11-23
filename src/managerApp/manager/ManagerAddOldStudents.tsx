import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Link } from "react-router-dom";
// import css
import "../manager/ManagerDashboard.css";
import "../manager/ManagerClassDetailPage.css";
import { getItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { InitialIcon } from "../../atoms/InitialIcon";
import {
	getSchoolObj,
	LoadingActionFunc,
	getAssignUserByClass,
	getAllStudents,
	inviteStudent
} from "../../stores/actions";
import { getClassObject, getAll } from "../../stores/actions";
import { deleteStudent } from "./../../stores/actions/student-action";
import { Modal } from "react-bootstrap";

//add students
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TagInput from "../../components/TagInput";

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
	studentList: any[];
	modalShow: boolean;
	removeIndex: number;
	filterText: string;
	exisiting_users: any[];
	selected_users: any[];
	emails : any;
	student : any;
	classObj : any;
	isCompleted : boolean;
	classStudents : any[],
}

interface IProps {
	LoadingActionFunc: Function;
	schools: any;
	getAll: Function;
	response: any;
	getSchoolObj: Function;
	getAssignUserByClass: Function;
	getClassObject: Function;
	classes: any;
	deleteStudent: Function;
	student: any;
	history: any;
	studentList: any;
	getAllStudents: Function;
	inviteStudent : Function;
}
class ManagerAddOldStudents extends React.Component<IProps, IStates> {
	id: any;
	schoolId: any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		// this.id = path[3] === "new" ? path[4] : path[3];
		this.id = path[5] === "new" ? path[7] : path[5];
		this.schoolId = path[5] === "new" ? path[4] : path[3];
		this.state = {
			school: { name: "", logo: "", assign_user: [] },
			errorMsg: "",
			url:
				path[3] === "new"
					? "/manager/dashboard"
					: "/manager/class/" + this.id,
			school_logo: "",
			school_name: "",
			schoolId: this.schoolId,
			classId: this.id,
			class_name: "",
			class_logo: "",
			studentList: [],
			modalShow: false,
			removeIndex: -1,
			filterText: "",
			exisiting_users: [],
			selected_users: [],
			emails : [],
	student : [],
	classObj: null,
	isCompleted : false,
	classStudents : []
		};
	}
	componentDidMount() {
		this.getClass();
		this.getSchool();
		this.props.LoadingActionFunc(false);
		const classObject = JSON.parse(getItem("class") || "null");
      if (classObject) {
        this.setState({
          classObj: classObject,
        });
      }
	}

	handleChange = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		this.setState({
			...this.state,
			filterText: e.currentTarget.value,
		});
	};

	getStudents = async (classStudents : any[]) => {
		let url = "schools/all-user/" + this.schoolId + "?role=student";
		await this.props.getAllStudents(url);
		if (classStudents.length === 0) {
			this.setState({
				exisiting_users: this.props.studentList.result,
				studentList: this.props.studentList.result,
			});
		}
		if (this.props.studentList && this.props.studentList.result) {
			if (this.props.studentList.result.length > 0) {
				let temp = this.props.studentList.result;
        for (let i = 0; i < classStudents.length; i++) {
          let ind = temp.findIndex(
            (s : any) => s.id === classStudents[i].user.id
          );
          if (ind > -1) temp.splice(ind, 1);
          if (i === classStudents.length - 1) {
            await this.setState({
              exisiting_users: temp,
              studentList: temp,
            });
          }
        }
		console.log("lengths",classStudents)
		
			}
		}
	};

	getClass = async () => {
		let classurl =
			"school/" + this.state.schoolId + "/class/" + this.state.classId;
		await this.props.getClassObject(classurl);
		let url = "assigned/class/by-class/" + this.id;
		await this.props.getAssignUserByClass(url);
		if (this.props.classes && this.props.classes.viewClass) {
			this.setState({
				class_logo: this.props.classes.viewClass.logo,
				class_name: this.props.classes.viewClass.name,
				classId : this.props.classes.viewClass.id,
			});
		}
		if (
			this.props.classes &&
			this.props.classes.result &&
			this.props.classes.result.assign_user
		) {
			this.setState({
				class_logo: this.props.classes.result.logo,
				class_name: this.props.classes.result.name,
				
			});
		}

		if (this.props.classes) {

			let studentTemp = [];
			for (let i = 0; i < this.props.classes.assignUser.length; i++) {
			  if (this.props.classes.assignUser[i].type === "student") {
				studentTemp.push(this.props.classes.assignUser[i]);
			  }
			}
			await this.setState({
			  classStudents: studentTemp,
			});
			this.getStudents(studentTemp);
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
		let temp = this.state.studentList;
		temp.splice(this.state.removeIndex, 1);
		await this.setState({
			studentList: temp,
		});
	};

	selectUser = (id: number) => {
		let temp = this.state.selected_users;
		temp.push(this.state.exisiting_users.find((user: any) => user.id === id));
		this.setState({
			selected_users: temp,
			filterText: "",
		});
	};

	submit = async () => {
		if (this.state.selected_users && this.state.selected_users.length > 0) {
		  let temp = this.state.emails;
		  let tempStu = this.state.student;
		  for (let i = 0; i < this.state.selected_users.length; i++) {
			temp.push(this.state.selected_users[i].email);
			tempStu.push({
			  email: this.state.selected_users[i].email,
			  parent_email: this.state.selected_users[i].parent_email,
			});
		  }
		  await this.setState({
			emails: temp,
			student: tempStu,
		  });
		  if (this.id) {
			this.props.LoadingActionFunc(true);
			for (let i = 0; i < this.state.selected_users.length; i++) {
				await this.props.inviteStudent({
				  user_email: this.state.selected_users[i].email,
				  student: {
					name: this.state.selected_users[i].name,
					phone: this.state.selected_users[i].phone,
					email: this.state.selected_users[i].email,
					parent_name: this.state.selected_users[i].parent_name,
					age: this.state.selected_users[i].age,
					gender: this.state.selected_users[i].gender,
					favorite: this.state.selected_users[i].favorite,
					parent_email: this.state.selected_users[i].parent_email,
					parent_phone: this.state.selected_users[i].parent_phone,
					avatar: this.state.selected_users[i].avatar,
				  },
				  class_id: this.state.classId,
				});
				if (this.props.classes && this.props.classes.error) {
				  await this.setState({
					isCompleted: false,
					errorMsg: this.props.classes.error,
				  });
				} else {
					await this.setState({
						isCompleted: true,
						errorMsg: this.props.classes.error,
					  });
					  this.props.history.back();
				}
			}
			this.props.LoadingActionFunc(false);
		  }
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
			studentList,
			removeIndex,
			filterText,
			errorMsg
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
								{/* <Link
									to={"/manager/class/" + classId}
									style={{ textDecoration: "none" }}
								> */}
								<ArrowBackIcon
									sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
								></ArrowBackIcon>
								<span className='fc-primary'>Back</span>
								{/* </Link> */}
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
								<span className='f-16 mr-8'>{class_name} </span>
								<span className='fc-second'>({school_name})</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite Existing Students.</span>
							</div>
							<div className='f-16 mb-32 fc-second'>
								<span>Students in this school.</span>
							</div>
							<div className='tableSearch'>
								<div className='textArea'>
									<div className='invite-exisiting-div'>
										<div className='invite-exisiting'>
											<SearchIcon
												sx={{ color: "#808080", fontSize: 24, mr: 0.5 }}
											/>
										</div>
										<input
											className='invite-exisiting-input'
											placeholder='Search by name or role'
											value={filterText}
											onChange={this.handleChange}
										/>
									</div>
								</div>
							</div>
							{this.state?.selected_users &&
								this.state.selected_users.map((selected_user: any) => {
									return (
										<>
											<div className='selecting-user'>
												<div className='existing-user-content'>
													<InitialIcon
														initials={selected_user.email
															.substr(0, 1)
															.toUpperCase()}
														isFooterMenu={false}
													/>
													<span className='ml-16 fw-500 f-16'>
														{selected_user.name}
													</span>
												</div>
											</div>
										</>
									);
								})}
							<div></div>

							{this.state?.exisiting_users &&
								this.state.exisiting_users
									.filter((user: any) => {
										if (!filterText) {
											return false;
										} else {
											return (user.name || "")
												.toLowerCase()
												.startsWith(filterText.toLowerCase());
										}
									})
									.map((user: any, index: any) => {
										return (
											<>
												<div className='exisiting-user-lists'>
													<div
														className='exisiting-user'
														onClick={() => {
															this.selectUser(user.id);
														}}
													>
														<div className='existing-user-content'>
															<InitialIcon
																initials={user.email.substr(0, 1).toUpperCase()}
																isFooterMenu={false}
															/>
															<span className='ml-16 fw-500 f-16'>
																{user.name}
															</span>
														</div>
													</div>
												</div>
											</>
										);
									})}

							<div className='hr mb-32'></div>
							{errorMsg && <p className='text-danger'>{errorMsg}</p>}
							{/* <Link to={url} style={{ textDecoration: "none" }}> */}
							<button
								type='submit'
								className='primary-btn right'
								onClick={this.submit}
								disabled={this.state.selected_users.length === 0}
							>
								Done
							</button>
							{/* </Link> */}
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
									studentList[removeIndex].user &&
									(studentList[removeIndex].user.name
										? studentList[removeIndex].user.name
										: studentList[removeIndex].user.email)}{" "}
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
	student,
	response,
	studentList,
}: StoreState): {
	schools: any;
	classes: any;
	student: any;
	response: any;
	studentList: any;
} => {
	return {
		schools,
		classes,
		student,
		response,
		studentList,
	};
};

export default connect(mapStateToProps, {
	LoadingActionFunc,
	getAll,
	getSchoolObj,
	getClassObject,
	deleteStudent,
	getAssignUserByClass,
	getAllStudents,
	inviteStudent
})(ManagerAddOldStudents);
