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
import {
  getSchoolObj,
  LoadingActionFunc,
  getAssignUserByClass,
} from "../../stores/actions";
import { getClassObject, getAll } from "../../stores/actions";
import { deleteStudent } from "./../../stores/actions/student-action";
import { Modal } from "react-bootstrap";
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
}
class ManagerInviteStudentSummaryPage extends React.Component<IProps, IStates> {
  id: any;
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[3] === "new" ? path[4] : path[3];

    this.state = {
      school: { name: "", logo: "", assign_user: [] },
      errorMsg: "",
      url:
        path[3] === "new" ? "/manager/dashboard" : "/manager/class/" + this.id,
      school_logo: "",
      school_name: "",
      schoolId: "",
      classId: this.id,
      class_name: "",
      class_logo: "",
      studentList: [],
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
    this.props.LoadingActionFunc(false);
  };

  getClass = async () => {
    let classurl =
      "school/" + this.state.schoolId + "/class/" + this.state.classId;
    await this.props.getClassObject(classurl);
    let url = "assigned/class/by-class/" + this.id;
    await this.props.getAssignUserByClass(url);
    console.log(this.props);
    if (this.props.classes && this.props.classes.viewClass) {
      console.log("asign");

      this.setState({
        class_logo: this.props.classes.viewClass.logo,
        class_name: this.props.classes.viewClass.name,
      });
    }
    if (this.props.classes) {
      let studentTemp = [];
      for (let i = 0; i < this.props.classes.assignUser.length; i++) {
        if (this.props.classes.assignUser[i].type === "student") {
          studentTemp.push(this.props.classes.assignUser[i]);
        }
      }
      this.setState({
        studentList: studentTemp,
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
  };

  handleDelete = async () => {
    let deleteStudentUrl = "assigned/class";
    await this.props.deleteStudent(
      deleteStudentUrl,
      this.state.studentList[this.state.removeIndex].id
    );

    if (
      this.props.student &&
      this.props.student.result &&
      this.props.student.result.data.statusText === "success"
    ) {
      this.setState({
        modalShow: this.state.modalShow ? false : this.state.modalShow,
      });
      this.getClass();
    }
    if (this.props.student.error) {
      this.setState({
        errorMsg: this.props.student.error,
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
								<span>My Students.</span>
							</div>

							{studentList &&
								studentList.length > 0 &&
								studentList.map((student: any, index: number) => (
									<>
										<div className='f-16 mb-32 align-center justify-space-between'>
											<div className='align-center'>
												<InitialIcon
													initials={(student.user ? student.user.email : "")
														.substr(0, 1)
														.toUpperCase()}
													isFooterMenu={false}
												/>
												<div className='ml-16 width-300'>
													<span>
														{student.user.name
															? student.user.name
															: student.user.email}{" "}
														&nbsp;
													</span>
													<span className='secondary'>
														(
														{student.user.password && student.user.password !== ""
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
								to={"/manager/invite-student/" + this.id}
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
}: StoreState): {
  schools: any;
  classes: any;
  student: any;
  response: any;
} => {
  return {
    schools,
    classes,
    student,
    response,
  };
};

export default connect(mapStateToProps, {
  LoadingActionFunc,
  getAll,
  getSchoolObj,
  getClassObject,
  deleteStudent,
  getAssignUserByClass,
})(ManagerInviteStudentSummaryPage);
