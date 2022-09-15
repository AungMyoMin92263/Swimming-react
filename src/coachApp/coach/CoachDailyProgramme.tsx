import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { getClassObject, getAll } from "../../stores/actions";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link, Navigate } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { getItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
interface IStates {
  step: number;
  image: any;
  schoolId: any;
  id: any;
  classe: any;
  coaches: any[];
  attendances: any[];
  comments: any[];
  goAllComments : boolean;
  goEnterComment:boolean;
}

interface IProps {
  authUser: AuthInterface;
  getClassObject: Function;
  classes: any;
  getAll: Function;
  response: any;
}

class CoachDailyProgramPage extends React.Component<IProps, IStates> {
  id: any;
  urlComments: any;
  urlEnterComment:any;

  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      step: 0,
      image: { preview: "", raw: "" },
      schoolId: -1,
      id: this.id ? this.id : -1,
      classe: { start_date: null },
      coaches: [],
      attendances: [],
      comments: [],
      goAllComments : false,
      goEnterComment: false
    };
  }
  componentDidMount() {
    this.authFromLocal();
  }

  authFromLocal = async () => {
    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      if (
        user.userInfo.data.assign_class &&
        user.userInfo.data.assign_class.length > 0
      ) {
        await this.setState({
          schoolId: user.userInfo.data.assign_class[0].classes.school_id,
        });

        this.getClass();
        this.getCoachesByClass();
        this.getAttendancesByClass();
      }
    }
  };

  getClass = async () => {
    let url = "school/" + this.state.schoolId + "/class/" + this.state.id;
    await this.props.getClassObject(url);
    if (this.props.classes && this.props.classes.result)
      this.setState({
        classe: this.props.classes.result,
      });
  };

  getCoachesByClass = async () => {
    let url = "assigned/class/by-users/" + this.state.id;
    await this.props.getAll(url);
    if (this.props.response && this.props.response.result)
      if (
        this.props.response &&
        this.props.response.result &&
        this.props.response.result.length > 0
      ) {
        let tempCoaches = this.props.response.result;
        let res = [];
        for (let i = 0; i < tempCoaches.length; i++) {
          res.push({
            text: tempCoaches[i].coach.name,
            callback: () => console.log("log click item"),
            smallText: "",
            icon: (
              <>
                <InitialIcon
                  initials={tempCoaches[i].coach.email
                    .substr(0, 1)
                    .toUpperCase()}
                    isFooterMenu={false}
                />
              </>
            ),
            secondryText: false,
            isBigIcon: false,
          });
        }

        this.setState({
          coaches: res,
        });
      }
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
          text: tempAttendances[i].class.name,
          callback: () => console.log("log click item"),
          smallText: "",
          icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
          secondryText: true,
          isBigIcon: false,
          selectable: true,
        });
      }

      this.setState({
        attendances: res,
      });
    }
  };

  upload = () => {
    console.log("upload", this.state.image);
  };

  handleChange = (e: any) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length) {
        let temp = this.state.image;
        temp.preview = URL.createObjectURL(e.target.files[0]);
        temp.raw = e.target.files[0];
        this.setState({
          image: temp,
        });
      }
    }
  };

  goToAllComments = (id: any) => {
    this.setState({ goAllComments : true });
    this.urlComments = "/coache/dashboard/all-comments/" + id;
  };

  goToEnterComments = (id: any) => {
    this.setState({ goEnterComment : true });
    this.urlEnterComment = "/coache/dashboard/enter-comments/" + id;
  };

  render() {
    let item: IListItem = {
      text: "Joseph",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: (
        <>
          <InitialIcon initials={"J"} isFooterMenu={false}/>
        </>
      ),
      secondryText: false,
      isBigIcon: false,
    };

    let comment: ICommentItem = {
      message: "Hello Testing Comment",
      profile: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      callback: () => {},
      timeString: "You at 00:00 PM",
      showReply: true,
      reply: 0,
    };

    const { classe, attendances, coaches, goAllComments,goEnterComment } = this.state;

    return (
      <>
        {goAllComments && <Navigate to={this.urlComments} replace={true} />}
        {goEnterComment && <Navigate to={this.urlEnterComment} replace={true} />}

        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to="/coache/dashboard">
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button>
              </Link>
            </div>

            <div className="mb-32">
              
              <img
									src={
										classe.logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + classe.logo
											: placeholder
									}
									alt='logo'
									className={`${
										classe && classe.logo ? "item-icon" : "w-48"
									}`}
								/>
            </div>
            <div className="row f-32 fw-500 mt-16 mb-32">
              <span>{classe.name}</span>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">Date</span>
                </div>
                <div>
                  <span className="f-16 fw-500">
                    {/* {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(classe.start_date)} */}
                    {classe.start_date}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <span className="f-10">TIME</span>
                </div>
                <div>
                  <span className="f-16 fw-500">{classe.start_time}</span>
                </div>
              </div>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">No. Students</span>
                </div>
                <div>
                  <span className="f-16 fw-500">10</span>
                </div>
              </div>
              <div className="col-6"></div>
            </div>

            <div className="row mb-8">
              <ListBoxUI
                title="Daily Program"
                callback={() => {}}
                callback2={() => {}}
                noBtn={true}
              >
                <div className="file-upload">
                  <label htmlFor="fileUpload">
                    {this.state.image && this.state.image.preview !== "" ? (
                      <>
                        <img
                          src={this.state.image.preview}
                          alt="preview"
                          className="daily-programme-image"
                        />
                      </>
                    ) : (
                      <>
                        <span>Tap to Upload</span> <FileUploadOutlinedIcon />
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }}
                    onChange={this.handleChange}
                  />
                </div>
              </ListBoxUI>
            </div>

            <div className="row mb-8">
              <button
                type="submit"
                className="primary-btn"
                onClick={this.upload}
              >
                Upload
              </button>
            </div>

            <div className="row mb-8">
              <ListBoxUI title="Coaches" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    <div className="second-text "></div>
                  </ListItem>
                  <ListItem {...item}>
                    <div className="second-text "></div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>
            <div className="row mb-8">
              <ListBoxUI
                title="Class Comments"
                callback={() => this.goToAllComments(this.state.classe.id)}
                callback2={() => this.goToEnterComments(this.state.classe.id)}
                more={true}
                more2={true}
                moreText2="Add Comment"
              >
                <CommentItem {...comment}></CommentItem>
              </ListBoxUI>
            </div>

            <div className="row mb-8">
              {attendances && attendances.length > 0 && (
                <ListBoxUI
                  title="Attendance"
                  callback={() => {}}
                  more={true}
                  moreText="View All"
                >
                  <>
                    {attendances.map((attendance: any, index: any) => (
                      <ListItem {...attendance}>
                        <WatchLaterIcon />
                        <label>14 Jul, 9:00 AM</label>
                      </ListItem>
                    ))}
                  </>
                </ListBoxUI>
              )}
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

export default connect(mapStateToProps, { getClassObject, getAll })(
  CoachDailyProgramPage
);
