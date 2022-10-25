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
  getAllStudents,
} from "../../stores/actions";
import { getClassObject, getAll } from "../../stores/actions";
import { deleteStudent } from "./../../stores/actions/student-action";
import { Modal } from "react-bootstrap";

//add students
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
  studentList: any[];
  modalShow: boolean;
  removeIndex: number;
  filterText: string;
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
  studentList : any;
  getAllStudents : Function;
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
          ? "/admin/dashboard"
          : "/admin/school/" + this.schoolId + "/class/" + this.id,
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
    };
  }
  componentDidMount() {
    this.getClass();
    this.getSchool();
    this.props.LoadingActionFunc(false);
  }

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      ...this.state,
      filterText: e.currentTarget.value,
    });
  };

  getStudents = async () => {
    let url = "schools/all-user/"+ this.schoolId +"?role=student";
    await this.props.getAllStudents(url);
    if (this.props.studentList && this.props.studentList.result) {
			if (this.props.studentList.result.length > 0) {
        await this.setState({
          studentList : this.props.studentList.result
        })
      }
    }
  }

  getClass = async () => {
    let classurl =
      "school/" + this.state.schoolId + "/class/" + this.state.classId;
    await this.props.getClassObject(classurl);
    let url = "assigned/class/by-class/" + this.id;
    await this.props.getAssignUserByClass(url);
    console.log(this.props);
    if (this.props.classes && this.props.classes.viewClass) {

      this.setState({
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
        class_logo: this.props.classes.result.logo,
        class_name: this.props.classes.result.name,
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
    let temp = this.state.studentList;
    temp.splice(this.state.removeIndex,1);
    await this.setState({
      studentList : temp
    })
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
      filterText
    } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <Link to="/admin/dashboard">
              <span>My Report Cards</span>
            </Link>
          </div>
          <div className="container-cus">
            <div className="content col-lg-6 col-md-6 col-sm-12">
              <div className="f-14 mb-32">
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
              <div className="mb-8 align-center">
                <img
                  src={
                    class_logo
                      ? process.env.REACT_APP_API_ENDPOINT + "/" + class_logo
                      : placeholder
                  }
                  alt="logo"
                  className={`${class_logo ? "item-icon" : "w-48"}`}
                />
                <span className="f-16">{class_name}</span>
                <span className="fc-second">({school_name})</span>
              </div>
              <div className="hr mb-32"></div>
              <div className="f-32 fw-500">
                <span>Invite Existing Students.</span>
              </div>
              <div className="f-16 mb-32">
                <span>Students in this school.</span>
              </div>
            </div>

            <div className='textArea'>
										<div className='dash-search-div'>
											<div className='dash-search-icon-div'>
												<SearchIcon
													sx={{ color: "#808080", fontSize: 16, mr: 0.5 }}
												/>
											</div>
											<input
												className='dash-input-div'
												placeholder='Search by name'
												value={filterText}
												onChange={this.handleChange}
											/>
										</div>
									</div>
            <div className="hr mb-32"></div>
            <Link to={url} style={{ textDecoration: "none" }}>
              <button type="submit" className="primary-btn right">
                Done
              </button>
            </Link>
          </div>

          <Modal
            aria-labelledby="contained-modal-title-vcenter"
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
            <div className="mb-16">
              <span className="f-20 fw-500">
                Remove Student {""}‘
                {studentList[removeIndex] &&
                  studentList[removeIndex].user &&
                  (studentList[removeIndex].user.name
                    ? studentList[removeIndex].user.name
                    : studentList[removeIndex].user.email)}{" "}
                ’?
              </span>
            </div>
            <div className="mb-16">
              <span className="f-16">
                This action cannot be undone. This action will only remove the
                coach from this class, not your school.
              </span>
            </div>
            <div className="flex-center">
              <button
                type="submit"
                className="secondary-btn mr-8"
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
                type="submit"
                className="secondary-btn"
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
  studentList : any;
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
  getAllStudents
})(ManagerAddOldStudents);
