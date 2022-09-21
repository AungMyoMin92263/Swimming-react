import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { getClassObject, getAll, getClassProgram, postClassProgram, getAssignUserByClass } from "../../stores/actions";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ListItem, { IListItem } from "../../atoms/ListItem";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link, Navigate } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { getItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import { ClassProgramInterface } from "../../stores/model/class-interface";
import moment from "moment";
import ListBoxUI from "../../molecules/ListBox";
interface IStates {
  step: number;
  image: any;
  schoolId: any;
  id: any;
  classe: any;
  coaches: any[];
  attendances: any[];
  comments: any[];
  goAllComments: boolean;
  goEnterComment: boolean;
  profile: IProfile
  classProgram: any
}

interface IProps {
  authUser: AuthInterface;
  getClassObject: Function;
  postClassProgram: Function
  getClassProgram: Function;
  getAssignUserByClass: Function;
  classes: any;
  getAll: Function;
  response: any;
  history: any;
}

class StudentDailyProgramPage extends React.Component<IProps, IStates> {
  id: any;
  urlComments: any;
  urlEnterComment: any;

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
      classProgram: null,
      goAllComments: false,
      goEnterComment: false,
      profile: { title: "Dummy" },
    };
  }
  componentDidMount() {
    this.authFromLocal();
  }

  authFromLocal = async () => {
    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      if (
        user.userInfo.assign_class &&
        user.userInfo.assign_class.length > 0
      ) {
        await this.setState({
          ...this.state,
          schoolId: user.userInfo.assign_class[0].classes.school_id,
        });

        await this.getClass();
        await this.getCoachesByClass();
        await this.getClassProgram()
      }
    }
  };

  getClass = async () => {
    let url = "school/" + this.state.schoolId + "/class/" + this.state.id;
    await this.props.getClassObject(url, true);
    if (this.props.classes && this.props.classes.viewClass) {
      let comment = []
      let profile: IProfile = {
        isLogo: true,
        logo: this.props.classes.viewClass.logo,
        title: this.props.classes.viewClass.name,
        display_item: [
          {
            title: 'Date',
            value: moment(this.props.classes.viewClass.start_date).format("D MMM YYYY")
          },
          {
            title: 'Time',
            value: this.props.classes.viewClass.start_time
          },
          {
            title: 'No. Student',
            value: this.props.classes.viewClass.studentCount
          }
        ]
      }
      // if(this.props.classes.viewClass.comments){
      //   comment
      // }
      this.setState({
        ...this.state,
        classe: this.props.classes.viewClass,
        profile: profile
      });
    }


  };

  getCoachesByClass = async () => {
    let url = "assigned/class/by-class/" + this.state.id;
    await this.props.getAssignUserByClass(url);

  };

  upload = () => {
    console.log("upload", this.state.image);
  };

  handleChange = async (e: any) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length) {
        let temp = this.state.image;
        temp.preview = URL.createObjectURL(e.target.files[0]);
        temp.raw = e.target.files[0];
        await this.postClassProgram(this.state.id, temp.raw)
        // this.setState({
        //   image: temp,
        // });
      }
    }
  };

  postClassProgram = async (id: number, file: any) => {
    let url = "class-daily/" + id + "/program"
    let date = new Date().toISOString();
    let oldId = this.state.classProgram ? this.state.classProgram.id : 0
    let postData: ClassProgramInterface = {
      logo: file,
      upload_date: date,
      id: oldId
    }

    await this.props.postClassProgram(postData, url)
    this.setState({
      ...this.state,
      classProgram: this.props.classes.dailyProgram
    })
  }

  getClassProgram = async () => {
    let date = new Date().toISOString();
    let url = "class-daily/" + this.state.id + "/program?req_date=" + date
    await this.props.getClassProgram(url)
    if (this.props.classes && this.props.classes.dailyProgram) {
      this.setState({
        ...this.state,
        classProgram: this.props.classes.dailyProgram
      })
    }
  }

  goToAllComments = (id: any) => {
    // this.setState({ goAllComments: true });
    let cmdUrl = "/student/dashboard/all-comments/" + id + "/class";
    this.props.history.push(cmdUrl)
  };

  goToEnterComments = (id: any) => {
    this.setState({ goEnterComment: true });
    this.urlEnterComment = "/student/dashboard/enter-comments/" + id + "/class";
  };


  createProfile = (image_url: string, name: string) => {
    if (image_url) {
      return <img src={"/assets/icons/logo.png"} className="logo-icon" />
    } else {
      return <InitialIcon
        initials={name.substr(0, 1).toUpperCase()}
        isFooterMenu={true}
      />
    }
  }

  

  goToCoachProfile = (id: any) => {
    // this.setState({ goAllComments: true });
    console.log('id....',id)
    let cmdUrl = "/student/coach/profile/" + id;
    this.props.history.push(cmdUrl)
  };

  render() {
    let item: IListItem = {
      text: "Joseph",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: (
        <>
          <InitialIcon initials={"J"} isFooterMenu={false} />
        </>
      ),
      secondryText: false,
      isBigIcon: false,
    };

    let comment: ICommentItem = {
      message: "Hello Testing Comment",
      profile: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      callback: () => { },
      timeString: "You at 00:00 PM",
      showReply: true,
      reply: 0,
    };

    const { classe, attendances, coaches, goAllComments, goEnterComment, profile, classProgram } = this.state;

    return (
      <>
        {goAllComments && <Navigate to={this.urlComments} replace={true} />}
        {goEnterComment && <Navigate to={this.urlEnterComment} replace={true} />}

        <div className="wrapper-mobile bg-w">
          <div className="content-mobile-cus-space col-sm-12">
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <ProfileContainer {...profile}></ProfileContainer>
            <div className="mb-8">
              <ListBoxUI title="Daily Program" callback={() => { }} callback2={() => { }} noBtn={true}>
                {classProgram && classProgram.image_url !== "" ? (
                  <>
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <img
                        src={process.env.REACT_APP_API_ENDPOINT + "/" + classProgram.image_url}
                        alt="preview"
                        className="daily-programme-image"
                      />
                      <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={this.handleChange} />
                    </label>
                  </>
                ) :
                  <div className="file-upload">
                   
                  </div>
                }
              </ListBoxUI>
            </div>
            {
              this.props.classes.assignUser.length > 0 ?
                <div className="mb-8">
                  <ListBoxUI title="Coaches" callback={() => { }} callback2={() => { }} noBtn={true}>
                    <>
                      {this.props.classes.assignUser?.filter((coach:any) => coach.type === 'coache').map((coach: any, index: any) => {
                        return (<ListItem text={coach.user.name || coach.user.email} 
                        callback={() => this.goToCoachProfile(coach.user.id)}
                        key={`coache${index}`} icon={<>
                          <InitialIcon isFooterMenu={true}
                            initials={(coach.user.name || coach.user.email || "User")
                              .substr(0, 1)
                              .toUpperCase()}

                          />
                        </>} arrowRight={true} />)
                      })}
                    </>
                  </ListBoxUI>
                </div>
                : <></>
            }
            <div className="mb-8">
              <ListBoxUI
                title="Class Comments"
                callback={() => this.goToAllComments(this.state.classe.id)}
                callback2={() => { }}
                more={true}
                // more2={true}
                moreText2="Add Comment"
              >
                {classe.comments ? <>
                  {classe.comments.slice(0, 3).map((res: any, index: number) => {
                    return (
                      <CommentItem
                        profile={this.createProfile(res.user_info.avatar, res.user_info.name)}
                        message={res.message}
                        callback={() => { }}
                        timeString={res.user_info.name + " at " + moment(res.created_at).format("DD MMM, h:mm a")}
                        key={`cmd-${index}`}></CommentItem>
                    )
                  })}
                </> : <></>}
              </ListBoxUI>
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

export default connect(mapStateToProps, { getClassObject, getAll, postClassProgram, getClassProgram, getAssignUserByClass })(
  StudentDailyProgramPage
);
