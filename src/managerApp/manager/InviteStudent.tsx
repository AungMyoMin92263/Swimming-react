import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { inviteStudent } from "../../stores/actions/class-action";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { getItem, removeItem, setItemWithObject } from "../../auth/LocalStorage";

interface StudentViewModel {
  studentName: string;
  isStudentNameValid: boolean;
  isStudentNameEmpty: boolean;
  studentNameMsg: string;
  parentName: string;
  isParentNameValid: boolean;
  isParentNameEmpty: boolean;
  parentNameMsg: string;

  studentEmail: string;
  isStudentEmailValid: boolean;
  isStudentEmailEmpty: boolean;
  studentEmailMsg: string;
  parentEmail: string;
  isParentEmailValid: boolean;
  isParentEmailEmpty: boolean;
  parentEmailMsg: string;
}

interface IStates {
  emails: string[];
  isCompleted: boolean;
  students: StudentViewModel[];
  studentNameMsg: string;
  parentNameMsg: string;
  studentEmailMsg: string;
  parentEmailMsg: string;
}

interface IProps {
  emails: string[];
  classes: any;
  inviteStudent: Function;
}

class InviteStudentPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      emails: [],
      isCompleted: false,
      students: [
        {
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
        },
      ],
      studentNameMsg: "",
      parentNameMsg: "",
      studentEmailMsg: "",
      parentEmailMsg: "",
    };
  }
  componentDidMount() {
    //loading
  }

  addStudent = () => {
    let temp = this.state.students;
    temp.push({
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
    });
    this.setState({
      students: temp,
    });
  };

  isValid = () => {
    if (this.state.students.length === 0) return false;
    else return true;
  };

  submit = async () => {
    if (this.isValid()) {
      let temp = this.state.emails;
      for(let i = 0;i < this.state.students.length;i++){
        temp.push(this.state.students[i].studentEmail);
      }
      await this.setState({
        emails: temp,
      });
      if (this.props.classes.result) {
        await this.props.inviteStudent({
          user_email: this.state.emails,
          class_id: this.props.classes.result.data.id,
        });

        this.setState({
          isCompleted: true,
        });

        const student = JSON.parse(getItem("students") || "null");
        if (student) {
          setItemWithObject("students", student.concat(this.state.students));
        }else setItemWithObject("students", this.state.students);

        removeItem("class");
      }
    }
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Done
        </button>
      );
    } else
      return (
        <>
          {this.state.isCompleted && (
            <Navigate to="/manager/invite-student-summary" replace={true} />
          )}
          <button
            type="submit"
            className="primary-btn fw-600 ml-16"
            onClick={this.submit}
          >
            Done
          </button>
        </>
      );
  };

  render() {
    const {
      students,
      studentNameMsg,
      parentNameMsg,
      studentEmailMsg,
      parentEmailMsg,
    } = this.state;
    return (
      <>
        <div className="wrapper scroll-y">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
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
              {students.map((student: any, index) => (
                <>
                  <div>
                    <div className="f-16 mb-16 fw-500">
                      <span>Student #{index + 1}</span>
                    </div>
                    <div className="fw-400 mb-16">
                      <InputFormAtom
                        label="Student Name"
                        placeholder={"Enter name of Student"}
                        warning={studentNameMsg}
                        type="text"
                        showWarning={
                          student.isStudentNameEmpty ||
                          !student.isStudentNameValid
                        }
                        isDropdown={false}
                        callback={(value: string) => {
                          let temp = students;
                          temp[index].studentName = value;
                          this.setState({
                            students: temp,
                          });
                        }}
                        id="inviteStudentName"
                        name="inviteStudentName"
                        value={student.studentName}
                        required={true}
                        maxLength={200}
                        className=""
                        clickCallback={() => {}}
                        focusCallback={() => {
                          let temp = students;
                          temp[index].isStudentNameEmpty = false;
                          temp[index].isStudentNameValid = true;
                          this.setState({
                            students: temp,
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
                        showWarning={
                          student.isStudentEmailEmpty ||
                          !student.isStudentEmailValid
                        }
                        isDropdown={false}
                        callback={(value: string) => {
                          let temp = students;
                          temp[index].studentEmail = value;
                          this.setState({
                            students: temp,
                          });
                        }}
                        id="inviteStudentEmail"
                        name="inviteStudentEmail"
                        value={student.studentEmail}
                        required={true}
                        maxLength={200}
                        className=""
                        clickCallback={() => {}}
                        focusCallback={() => {
                          let temp = students;
                          temp[index].isStudentEmailEmpty = false;
                          temp[index].isStudentEmailValid = true;

                          this.setState({
                            students: temp,
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
                        showWarning={
                          student.isParentNameEmpty ||
                          !student.isParentNameValid
                        }
                        isDropdown={false}
                        callback={(value: string) => {
                          let temp = students;
                          temp[index].parentName = value;
                          this.setState({
                            students: temp,
                          });
                        }}
                        id="inviteParentName"
                        name="inviteParentName"
                        value={student.parentName}
                        required={true}
                        maxLength={200}
                        className=""
                        clickCallback={() => {}}
                        focusCallback={() => {
                          let temp = students;
                          temp[index].isParentNameEmpty = false;
                          temp[index].isParentNameValid = true;

                          this.setState({
                            students: temp,
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
                        showWarning={
                          student.isParentEmailEmpty ||
                          !student.isParentEmailValid
                        }
                        isDropdown={false}
                        callback={(value: string) => {
                          let temp = students;
                          temp[index].parentEmail = value;
                          this.setState({
                            students: temp,
                          });
                        }}
                        id="inviteParentEmail"
                        name="inviteParentEmail"
                        value={student.parentEmail}
                        required={true}
                        maxLength={200}
                        className=""
                        clickCallback={() => {}}
                        focusCallback={() => {
                          let temp = students;
                          temp[index].isParentEmailEmpty = false;
                          temp[index].isParentEmailValid = true;

                          this.setState({
                            students: temp,
                          });
                        }}
                      />
                    </div>
                  </div>
                </>
              ))}

              <div className="flex-center justify-space-between">
                <div className="flex-center">
                  <div onClick={this.addStudent} className="cursor">
                    <AddIcon
                      sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                    ></AddIcon>
                    <span className="primary">Add another Student</span>
                  </div>
                </div>

                <div className="flex-center">
                  <span className="secondary">4 of 4</span>
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
}: StoreState): {
  classes: any;
} => {
  return {
    classes,
  };
};

export default connect(mapStateToProps, { inviteStudent })(InviteStudentPage);
