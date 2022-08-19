import React from "react";
import { IPageProp } from "../../pagePropsInterface";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";

interface 


interface IStates {
	students : any[];
	parents : any[];
  studentName: string;
  isStudentNameValid: true;
  isStudentNameEmpty: false;
  studentNameMsg: string;
  parentName: string;
  isParentNameValid: true;
  isParentNameEmpty: false;
  parentNameMsg: string;

  studentEmail: string;
  isStudentEmailValid: true;
  isStudentEmailEmpty: false;
  studentEmailMsg: string;
  parentEmail: string;
  isParentEmailValid: true;
  isParentEmailEmpty: false;
  parentEmailMsg: string;
}

class InviteStudentPage extends React.Component<IPageProp, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
		students : [],
		parents : [],
      studentName: "",
      isStudentNameValid: true,
      isStudentNameEmpty: false,
      studentNameMsg: "",
      parentName: "",
      isParentNameValid: true,
      isParentNameEmpty: false,
      parentNameMsg: "",

      studentEmail: "",
      isStudentEmailValid: true,
      isStudentEmailEmpty: false,
      studentEmailMsg: "",
      parentEmail: "",
      isParentEmailValid: true,
      isParentEmailEmpty: false,
      parentEmailMsg: "",
    };
  }
  componentDidMount() {
    //loading
  }

  render() {
    const {
      studentName,
      isStudentNameValid,
      isStudentNameEmpty,
      studentNameMsg,
      parentName,
      isParentNameValid,
      isParentNameEmpty,
      parentNameMsg,

      studentEmail,
      isStudentEmailValid,
      isStudentEmailEmpty,
      studentEmailMsg,
      parentEmail,
      isParentEmailValid,
      isParentEmailEmpty,
      parentEmailMsg,
    } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container">
            <div className="content col-lg-6">
              <div className="f-14 mb-32">
                <Link to="/admin/add-school" style={{ textDecoration: "none" }}>
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                </Link>
              </div>

              <div className="mb-16 flex">
                <img
                  src={"/assets/icons/logo.png"}
                  alt="right-arrow"
                  className="item-icon"
                />
                <span className="f-16">Dolphin Swimming School</span>
              </div>
              <div className="hr mb-32"></div>
              <div className="f-32 fw-500">
                <span>Invite Students.</span>
              </div>
              <div className="f-16 mb-32">
                <span>
                  Invite students to your class. You can add more details in
                  their profiles later.
                </span>
              </div>

              <div>
                <div className="f-16 mb-16 fw-500">
                  <span>Student #1</span>
                </div>
                <div className="fw-400 mb-16">
                  <InputFormAtom
                    label="Student Name"
                    placeholder={"Enter name of Student"}
                    warning={studentNameMsg}
                    type="text"
                    showWarning={isStudentNameEmpty || !isStudentNameValid}
                    isDropdown={false}
                    callback={(value: string) => {
                      this.setState({
                        studentName: value,
                      });
                    }}
                    id="inviteCoach"
                    name="inviteCoach"
                    value={studentName}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isStudentNameEmpty: false,
                        isStudentNameValid: true,
                      });
                    }}
                  />
                </div>
                <div className="fw-400 mb-16">
                  <InputFormAtom
                    label="Student Email"
                    placeholder={"Enter email of Student"}
                    warning={studentEmailMsg}
                    type="text"
                    showWarning={isStudentEmailEmpty || !isStudentEmailValid}
                    isDropdown={false}
                    callback={(value: string) => {
                      this.setState({
                        studentEmail: value,
                      });
                    }}
                    id="inviteCoach"
                    name="inviteCoach"
                    value={studentEmail}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isStudentEmailEmpty: false,
                        isStudentEmailValid: true,
                      });
                    }}
                  />
                </div>

                <div className="fw-400 mb-16">
                  <InputFormAtom
                    label="Parent Name"
                    placeholder={"Enter name of parent"}
                    warning={parentNameMsg}
                    type="text"
                    showWarning={isParentNameEmpty || !isParentNameValid}
                    isDropdown={false}
                    callback={(value: string) => {
                      this.setState({
                        parentName: value,
                      });
                    }}
                    id="inviteCoach"
                    name="inviteCoach"
                    value={parentName}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isParentNameEmpty: false,
                        isParentNameValid: true,
                      });
                    }}
                  />
                </div>
                <div className="fw-400 mb-16">
                  <InputFormAtom
                    label="Parent Email"
                    placeholder={"Enter email of parent"}
                    warning={parentEmailMsg}
                    type="text"
                    showWarning={isParentEmailEmpty || !isParentEmailValid}
                    isDropdown={false}
                    callback={(value: string) => {
                      this.setState({
                        parentEmail: value,
                      });
                    }}
                    id="inviteCoach"
                    name="inviteCoach"
                    value={parentEmail}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isParentEmailEmpty: false,
                        isParentEmailValid: true,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="flex-center justify-space-between">
                <div className="flex-center">
                  <AddIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></AddIcon>
                  <span className="primary">Add another school</span>
                </div>

                <div className="flex-center">
                  <span>4 of 4</span>
                  <Link to="/admin/add-more-school">
                    <button type="submit" className="idle-btn ml-16">
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InviteStudentPage;
