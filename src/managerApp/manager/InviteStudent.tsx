import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { inviteStudent } from "../../stores/actions/class-action";
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
  student: any[];
  isCompleted: boolean;
  isValid: boolean;
  students: StudentViewModel[];
  studentNameMsg: string;
  parentNameMsg: string;
  studentEmailMsg: string;
  parentEmailMsg: string;
  school_name: string;
  classObj: any;
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
      student: [],
      isCompleted: false,
      students: [
        {
          studentName: "",
          isStudentNameValid: false,
          isStudentNameEmpty: true,
          studentNameMsg: "",
          parentName: "",
          isParentNameValid: false,
          isParentNameEmpty: true,
          parentNameMsg: "",

          studentEmail: "",
          isStudentEmailValid: false,
          isStudentEmailEmpty: true,
          studentEmailMsg: "",
          parentEmail: "",
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
      classObj: null,
      isValid: false,
    };
  }
  componentDidMount() {
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo && user.userInfo.data.assign_school.length > 0) {
      this.setState({
        school_name: user.userInfo.data.assign_school[0].school.name,
      });
    }

    const classObject = JSON.parse(getItem("class") || "null");
    if (classObject) {
      this.setState({
        classObj: classObject,
      });
    }
  }

  addStudent = () => {
    let temp = this.state.students;
    temp.push({
      studentName: "",
      isStudentNameValid: false,
      isStudentNameEmpty: true,
      studentNameMsg: "",
      parentName: "",
      isParentNameValid: false,
      isParentNameEmpty: true,
      parentNameMsg: "",

      studentEmail: "",
      isStudentEmailValid: false,
      isStudentEmailEmpty: true,
      studentEmailMsg: "",
      parentEmail: "",
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
          studentObject.isStudentNameEmpty ||
          !studentObject.isStudentNameValid ||
          studentObject.isStudentEmailEmpty ||
          !studentObject.isStudentEmailValid ||
          studentObject.isParentNameEmpty ||
          !studentObject.isParentNameValid ||
          studentObject.isParentEmailEmpty ||
          !studentObject.isParentEmailValid
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
        temp.push(this.state.students[i].studentEmail);
        tempStu.push({
          name: this.state.students[i].studentName,
          email: this.state.students[i].studentEmail,
          parent_name: this.state.students[i].parentName,
          parent_email: this.state.students[i].parentEmail,
          avatar: null,
        });
      }
      await this.setState({
        emails: temp,
        student: tempStu,
      });
      if (this.state.classObj) {
        await this.props.inviteStudent({
          user_email: this.state.emails,
          student: this.state.student,
          class_id: this.state.classObj.id,
        });

        if (this.props.classes.error) {
          console.log(this.props.classes.error);
          this.setState({
            isCompleted: false,
          });
        } else {
          const student = JSON.parse(getItem("students") || "null");
          if (student) {
            setItemWithObject("students", student.concat(this.state.students));
          } else setItemWithObject("students", this.state.students);

          this.setState({
            isCompleted: true,
          });
        }
      }
    }
  };

  renderBtn = () => {
    if (!this.state.isValid) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Done
        </button>
      );
    } else
      return (
        <>
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

  removeStudent = (index: number) => {
    let temp = this.state.students;
    temp.splice(index, 1);
    this.setState({
      students: temp,
    });
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
				{this.state.isCompleted && (
					<Navigate to='/manager/invite-student-summary' replace={true} />
				)}
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
									to='/manager/invite-coach'
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
							{students.map((student: any, index) => (
								<>
									<div>
										<div className='f-16 mb-16 fw-500 flex justify-space-between'>
											<span>Student #{index + 1}</span>
											{index > 0 && (
												<div
													onClick={() => {
														this.removeStudent(index);
														this.isValidated();
													}}
													className='fc-primary cursor'
												>
													Clear
												</div>
											)}
										</div>
										<div className='fw-400 mb-16'>
											<InputFormAtom
												label='Student Name'
												placeholder={"Enter name of Student"}
												warning={studentNameMsg}
												type='text'
												// showWarning={
												// 	student.isStudentNameEmpty ||
												// 	!student.isStudentNameValid
												// }
												showWarning={false}
												isDropdown={false}
												callback={(value: string) => {
													this.isValidated();
													let temp = students;
													temp[index].studentName = value;
													this.setState({
														students: temp,
													});
												}}
												id='inviteStudentName'
												name='inviteStudentName'
												value={student.studentName}
												required={true}
												maxLength={200}
												className=''
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
										<div className='fw-400 mb-16'>
											<InputFormAtom
												label='Student Email'
												placeholder={"Enter email of Student"}
												warning={studentEmailMsg}
												type='text'
												// showWarning={
												// 	student.isStudentEmailEmpty ||
												// 	!student.isStudentEmailValid
												// }
												showWarning={false}
												isDropdown={false}
												callback={(value: string) => {
													this.isValidated();
													let temp = students;
													temp[index].studentEmail = value;
													this.setState({
														students: temp,
													});
												}}
												id='inviteStudentEmail'
												name='inviteStudentEmail'
												value={student.studentEmail}
												required={true}
												maxLength={200}
												className=''
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

										<div className='fw-400 mb-16'>
											<InputFormAtom
												label='Parent Name'
												placeholder={"Enter name of parent"}
												warning={parentNameMsg}
												type='text'
												// showWarning={
												// 	student.isParentNameEmpty ||
												// 	!student.isParentNameValid
												// }
												showWarning={false}
												isDropdown={false}
												callback={(value: string) => {
													this.isValidated();
													let temp = students;
													temp[index].parentName = value;
													this.setState({
														students: temp,
													});
												}}
												id='inviteParentName'
												name='inviteParentName'
												value={student.parentName}
												required={true}
												maxLength={200}
												className=''
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
										<div className='fw-400 mb-16'>
											<InputFormAtom
												label='Parent Email'
												placeholder={"Enter email of parent"}
												warning={parentEmailMsg}
												type='text'
												// showWarning={
												// 	student.isParentEmailEmpty ||
												// 	!student.isParentEmailValid
												// }
												showWarning={false}
												isDropdown={false}
												callback={(value: string) => {
													this.isValidated();
													let temp = students;
													temp[index].parentEmail = value;
													this.setState({
														students: temp,
													});
												}}
												id='inviteParentEmail'
												name='inviteParentEmail'
												value={student.parentEmail}
												required={true}
												maxLength={200}
												className=''
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
							{this.props.classes.error && (
								<p className='text-danger'>{this.props.classes.error}</p>
							)}
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
