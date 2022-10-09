import React from "react";

// import css
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
  getClassObject,
  getAll,
  getClassProgram,
  postClassProgram,
  getAssignUserByClass,
} from "../../stores/actions";
import { connect } from "react-redux";
import { signOut, LoadingActionFunc } from "../../stores/actions";
import { Link } from "react-router-dom";
import { Class } from "../../stores/model/class";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AuthInterface } from "../../stores/model/auth-interface";
import ListItem, { IListItem } from "../../atoms/ListItem";
import { InitialIcon } from "../../atoms/InitialIcon";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ClassInterface } from "../../stores/model/class-interface";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { profile } from "console";
import ListBoxUI from "../../molecules/ListBox";
import CommentItem from "../../atoms/Comment";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CommentDashItem from "../../atoms/CommentDash";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "react-bootstrap";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface IStates {
  email: string;
  logo: string;
  school_name: string;
  dropdown: boolean;
  isLogout: boolean;
  step: number;
  url: string;
  image: any;
  schoolId: any;
  id: any;
  classe: any;
  coaches: any[];
  attendances: any[];
  comments: any[];
  goAllComments: boolean;
  goEnterComment: boolean;
  profile: IProfile;
  classProgram: any;
  isPreview: boolean;
}
interface IProps {
  authUser: AuthInterface;
  LoadingActionFunc: Function;
  signOut: Function;
  getClassObject: Function;
  postClassProgram: Function;
  getClassProgram: Function;
  getAssignUserByClass: Function;
  classes: any;
  getAll: Function;
  response: any;
  history: any;
}

class ManagerClassDetailPage extends React.Component<IProps, IStates> {
  id: any;
  urlClassAllComments: any;
  urlClassAllAttendances: any;
  url = "/manager/edit-class/";
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[3];
    this.urlClassAllComments = "/manager/all-comments/class/" + this.id;
    this.urlClassAllAttendances = "/manager/all-attendances/class/" + this.id
    this.state = {
      email: "",
      logo: "",
      school_name: "",
      dropdown: false,
      isLogout: false,
      step: 0,
      url: this.url + this.id,
      image: { preview: "", raw: "" },
      schoolId: -1,
      id: this.id ? this.id : -1,
      classe: { start_date: null },
      coaches: [],
      attendances: [],
      comments: [],
      classProgram: null,
      goAllComments: false,
      goEnterComment: false,
      profile: { title: "Dummy" },
      isPreview: false,
    };
  }
  componentDidMount() {
    this.authFromLocal();
    console.log("authUser", this.props.authUser);
    //loading
  }
  authFromLocal = async () => {
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      this.setState({
        email: user.userInfo.email,
        logo: user.userInfo.assign_school
          ? user.userInfo.assign_school.school.logo
          : "",
        school_name: user.userInfo.assign_school
          ? user.userInfo.assign_school.school.name
          : "",
        schoolId: user.userInfo.assign_school
          ? user.userInfo.assign_school.school_id
          : -1,
      });

      await this.getCoachesByClass();
      await this.getAttendancesByClass();
      await this.getClassProgram();
      await this.getClass();
    }
  };

  getClass = async () => {
    let url = "school/" + this.state.schoolId + "/class/" + this.state.id;
    await this.props.getClassObject(url, true);
    if (this.props.classes && this.props.classes.viewClass) {
      let comment = [];
      let profile: IProfile = {
        isLogo: true,
        logo: this.props.classes.viewClass.logo,
        title: this.props.classes.viewClass.name,
        display_item: [
          {
            title: "Date",
            value: moment(new Date).format("D MMM YYYY"),
          },
          {
            title: "Time",
            value: moment(
              this.props.classes.viewClass.start_time,
              "hh:mm"
            ).format("hh:mm A"),
          },
          {
            title: "No. Student",
            value: this.props.classes.viewClass.studentCount,
          },
        ],
      };
      // if(this.props.classes.viewClass.comments){
      //   comment
      // }
      this.setState({
        ...this.state,
        classe: this.props.classes.viewClass,
        profile: profile,
      });
    }
  };

  getCoachesByClass = async () => {
    let url = "assigned/class/by-class/" + this.state.id;
    await this.props.getAssignUserByClass(url);
  };

  getAttendancesByClass = async () => {
    let url = "attendance/byClass/" + this.state.id;
    await this.props.getAll(url);
    if (
      this.props.response &&
      this.props.response.result &&
      this.props.response.result.length > 0
    ) {
      let tempAttendances = this.props.response.result;
      let res = [];
      for (let i = 0; i < tempAttendances.length; i++) {
        res.push({
					text: tempAttendances[i].user.name
						? tempAttendances[i].user.name
						: tempAttendances[i].user.email,
					callback: () => console.log("log click item"),
					smallText: "",
					icon: tempAttendances[i].user.avatar ? (
						<img
							src={
								process.env.REACT_APP_API_ENDPOINT +
								"/" +
								tempAttendances[i].user.avatar
							}
							className='logo-icon'
						/>
					) : (
						<InitialIcon
							initials={(
								tempAttendances[i].user.name ||
								tempAttendances[i].user.email ||
								"User"
							)
								.substr(0, 1)
								.toUpperCase()}
							isFooterMenu={true}
						/>
					),
					secondryText: true,
					isBigIcon: true,
					selectable: true,
					student_id: tempAttendances[i].user_id,
					checked: tempAttendances[i].attend,
				});
      }
      this.setState({
        ...this.state,
        attendances: res,
      });
    }
  };
  getClassProgram = async () => {
    let date = new Date().toISOString();
    let url = "class-daily/" + this.state.id + "/program?req_date=" + date;
    await this.props.getClassProgram(url);
    if (this.props.classes && this.props.classes.dailyProgram) {
      this.setState({
        ...this.state,
        classProgram: this.props.classes.dailyProgram,
      });
    }
  };
  goToAllComments = (id: any) => {
    // this.setState({ goAllComments: true });
    let cmdUrl = "/coach/dashboard/all-comments/" + id;
    this.props.history.push(cmdUrl);
  };

  goCoachDetail = (user_id: number) => {
    let coachDetailUrl =
      "/manager/coach-detail/" + user_id + "/class/" + this.id;
    this.props.history.push(coachDetailUrl);
  };
  goStudentDetail = (user_id: number) => {
    let studentDetailUrl =
      "/manager/student-detail/" + user_id + "/class/" + this.id;
    this.props.history.push(studentDetailUrl);
  };

  createProfile = (image_url: string, name: string) => {
    if (image_url) {
      return (
				<img
					src={
						image_url
							? process.env.REACT_APP_API_ENDPOINT + "/" + image_url
							: ""
					}
					className='logo-icon'
					alt=''
				/>
			);
    } else {
      return (
        <InitialIcon
          initials={name.substr(0, 1).toUpperCase()}
          isFooterMenu={true}
        />
      );
    }
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

  toggleOpen = () => {
    let dropdownVal = !this.state.dropdown;
    this.setState({
      dropdown: dropdownVal,
    });
  };

  largePic = (src : string) => {
    window.open(src);
  };

  renderClassDaily = () => {
    const {
      classe,
      attendances,
      coaches,
      goAllComments,
      goEnterComment,
      profile,
      classProgram,
    } = this.state;
    return (
      <div className="mt-24 class-daily">
        <div className="class-detail col-8">
          <div className="mr-24">
            <span className="fc-second">Class Detail</span>

            <div className="mt-16 class-detail-content">
              <div className="class-detail-date-time">
                <div className="col-6 flex-column">
                  <span className="f-10 fc-second">
                    {profile &&
                      profile.display_item &&
                      profile.display_item[0].title}
                  </span>
                  <span className="f-16 fw-500">
                    {profile &&
                      profile.display_item &&
                      profile.display_item[0].value}
                  </span>
                </div>
                <div className="col-6 flex-column">
                  <span className="f-10 fc-second">
                    {profile &&
                      profile.display_item &&
                      profile.display_item[1].title}
                  </span>
                  <span className="f-16 fw-500">
                    {profile &&
                      profile.display_item &&
                      profile.display_item[1].value}
                  </span>
                </div>
              </div>
              <div className="coach-no-students">
                <div className="col-6 flex-column">
                  <span className="f-10 fc-second">
                    {profile &&
                      profile.display_item &&
                      profile.display_item[2].title}
                  </span>
                  <span className="f-16 fw-500">
                    {profile &&
                      profile.display_item &&
                      profile.display_item[2].value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="class-detail col-4">
          <span className="fc-second">Daily programme</span>
          <div className="class-detail-img-content">
            {classProgram && classProgram.image_url !== "" ? (
              <>
                <Button
                  className="preview-icon-btn"
                  onClick={() => this.largePic(process.env.REACT_APP_API_ENDPOINT +"/" +classProgram.image_url)}
                >
                  <OpenInFullIcon
                    sx={{ color: "#FFF", fontSize: 24, m: "auto" }}
                  ></OpenInFullIcon>
                </Button>
                <img
                  src={
                    process.env.REACT_APP_API_ENDPOINT +
                    "/" +
                    classProgram.image_url
                  }
                  id="preview"
                  alt="preview"
                  className="daily-programme-image-dash"
                />
                {/* <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={this.handleChange} /> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  };
  renderCoaches = () => {
    let editAddCoachUrl = "/manager/invite-coach-summary/" + this.state.id;

    return (
      <>
        <div className="class-attendance-header mt-24 fc-second">
          <span>Coaches</span>
        </div>
        <div className="class-attendance-body mt-16 ">
          <div className="class-attendance-content flex align-center">
            <div className="student-content col-10 flex align-center">
              <div className="plus flex-center ml-16 cursor">
                <AddIcon />
              </div>
              <Link to={editAddCoachUrl}>
                <span className="f-16 ml-16 fc-primary fw-500">
                  Add/Edit Coach
                </span>
              </Link>
            </div>
          </div>
          {this.props.classes.assignUser?.map((coach: any, index: any) => {
            return (
							<>
								{coach.type === "coache" && (
									<div
										className='class-attendance-content flex align-center cursor p-16'
										onClick={() => this.goCoachDetail(coach.user.id)}
									>
										<div className='student-content flex align-center col-10'>
											<div className='plus flex-center'>
												<InitialIcon
													isFooterMenu={true}
													initials={(coach.user
														? coach.user.name || coach.user.email
														: "User"
													)
														.substr(0, 1)
														.toUpperCase()}
												/>
											</div>

											<span className='f-16 ml-16'>
												{coach.user ? coach.user.name || coach.user.email : ""}
											</span>
										</div>
										<div className='col-2'>
											<div className='justify-end'>
												<ArrowForwardIosIcon></ArrowForwardIosIcon>
											</div>
										</div>
									</div>
								)}
							</>
						);
          })}
        </div>
      </>
    );
  };
  renderComment = () => {
    let commentDetailUrl = ""
    return (
			<div className='mt-24'>
				<div className='class-comment-header flex justify-space-between '>
					<span className='fc-second'>Class Comments</span>
					<Link to={this.urlClassAllComments}>
						<span className='fc-primary'>View All</span>
					</Link>
				</div>
				<div className='class-attendance-body mt-16'>
					<div className="ml-8">
						{this.state.classe.comments ? (
							<>
								{this.state.classe.comments.map((res: any, index: number) => {
									return (
										<CommentDashItem
											profile={this.createProfile(
												res.user_info ? res.user_info.avatar : "",
												res.user_info ? res.user_info.name : ""
											)}
											message={res.message}
											callback={() => {
												this.props.history.push(
													"/manager/class/" +
														this.id +
														"/comment-detail/" +
														res.id
												);
											}}
											timeString={
												res.user_info &&
												res.user_info.name +
													" at " +
													moment(res.created_at).format("DD MMM, h:mm a")
											}
											showReply={true}
											reply={res.children.length}
											showRightArr={true}
											key={`cmd-${index}`}
										></CommentDashItem>
									);
								})}
							</>
						) : (
							<CommentDashItem
								profile={this.createProfile("", "")}
								message={"There is no comment"}
								callback={() => {}}
								timeString={""}
								key={""}
								showRightArr={true}
							></CommentDashItem>
						)}
					</div>
				</div>
			</div>
		);
  };
  renderAttendance = () => {
    let editAddStudentUrl = "/manager/invite-student-summary/" + this.state.id;
    return (
      <>
      <div className='mt-24'>
      <div className='class-comment-header flex justify-space-between '>
					<span className='fc-second'>Attendances</span>
					<Link to={this.urlClassAllAttendances}>
						<span className='fc-primary'>View All</span>
					</Link>
				</div>
        <div className="class-attendance-body mt-16 ">
          <div className="class-attendance-sub-header flex mt-16 ml-16">
            <div className="col-10 f-10">
              <span className="ml-56">Students</span>
            </div>
            <div className="col-2 f-10">
              <span className="ml-16">Attendace</span>
            </div>
          </div>
          <div className="class-attendance-content flex align-center">
            <div className="student-content col-10 flex align-center">
              <div className="plus flex-center ml-16 cursor">
                <AddIcon />
              </div>
              <Link to={editAddStudentUrl}>
                <span className="f-16 ml-16 fc-primary fw-500">
                  Add/Edit Student
                </span>
              </Link>
            </div>
          </div>
          {this.state.attendances.slice(0, 5).map((attend, index) => {
            return (
              <>
                <div
                  className="class-attendance-content flex align-center cursor"
                  onClick={() => this.goStudentDetail(attend.student_id)}
                >
                  <div className="student-content col-10 flex align-center">
                    <div className="plus flex-center ml-16">{attend.icon}</div>

                    <span className="f-16 ml-16">{attend.text}</span>
                  </div>

                  <div className="attendance-content col-2 align-center justify-space-around">
                    {attend.checked}
                    <Checkbox
                      disabled
                      checked={attend.checked}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    <div className="justify-end">
                      <></>
                      <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        
      </div>
        
      </>
    );
  };

  render() {
    const { email, logo, school_name, step, isPreview, classProgram } =
      this.state;

    return (
      <>
        <div className="container-cus">
          <div className="dashboard">
            <div className="dashboard-header">
              <div className="justify-center justify-space-between">
                <Link
                  to="/manager/dashboard"
                  style={{ textDecoration: "none" }}
                >
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                  <span className="ml-16 fc-second">
                    {this.state.school_name} {"		"}
                  </span>
                </Link>
                <div className="justify-end">
                  <div className="dropdown">
                    <div className="email-div cursor" onClick={this.toggleOpen}>
                      <InitialIcon
                        initials={email.substr(0, 1).toUpperCase()}
                        isFooterMenu={false}
                      />
                      <span>{email} </span>
                    </div>
                    <div
                      className={`dropdown-menu dropdown-menu-right ${
                        this.state.dropdown ? "show" : ""
                      }`}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div
                        className="dropdown-item cursor"
                        onClick={this.logout}
                      >
                        <LogoutOutlinedIcon
                          sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
                        ></LogoutOutlinedIcon>
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="justify-center">
                <div className="col-8 col-md-8 justify-start align-center">
                  <div className="mr-16">
                    <img
                      src={
                        this.state.profile.logo
                          ? process.env.REACT_APP_API_ENDPOINT +
                            "/" +
                            this.state.profile.logo
                          : placeholder
                      }
                      alt="logo"
                      className="big-logo"
                    />
                  </div>

                  <div className="f-40 fw-500">
                    <span>{this.state.profile.title}</span>
                  </div>
                </div>
                <div className="col-4 col-md-4 justify-end">
                  <Link to={this.state.url}>
                    <button
                      type="submit"
                      className="secondary-btn"
                      // style={{ width: "140px" }}
                    >
                      Edit Class
                      <AddIcon
                        sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
                      ></AddIcon>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="class-detail-body">
              <>
                {this.renderClassDaily()}
                {this.renderCoaches()}
                {this.renderComment()}
                {this.renderAttendance()}
              </>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({
  authUser,
  classes,
  response,
}: StoreState): {
  authUser: AuthInterface;
  classes: any;
  response: any;
} => {
  return {
    authUser,
    classes,
    response,
  };
};

export default connect(mapStateToProps, {
  getClassObject,
  getAll,
  postClassProgram,
  getClassProgram,
  getAssignUserByClass,
  signOut,
  LoadingActionFunc,
})(ManagerClassDetailPage);
