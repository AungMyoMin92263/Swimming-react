import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import CommentItem from "../atoms/Comment";
import { CreateProfile } from "../atoms/createProfile";
import { InitialIcon } from "../atoms/InitialIcon";
import ListItem from "../atoms/ListItem";
import ProfileContainer, { IProfile } from "../atoms/ProfileContainer";
import { getAllComment, getAllEvents, getDetailEvents, getMyAttendByRange, getUserInfo } from "../stores/actions";
import { StoreState } from "../stores/reducers";
import BadgeList from "./BadgeList";
import ListBoxUI from "./ListBox";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

interface IStates {

}
interface IProps {
  user_id: any;
  authUser: any;
  getUserInfo: Function
  getAllComment: Function
  byCoach?: boolean
  history: any,
  comments: any,
  eventList: any
  attendance: any
  getAllEvents: Function
  getDetailEvents: Function
  getMyAttendByRange: Function
  defaultPath: string
}

class StudentProfilePage extends React.Component<IProps, IStates> {

  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    this.getDetailAll()
  }

  getDetailAll = async () => {
    let cmdUrl = "comment/by-student/" + this.props.user_id;
    let eventUrl = "assigned/event/by-users/" + this.props.user_id;
    await Promise.all([this.props.getUserInfo(this.props.user_id, true), this.props.getAllComment(cmdUrl), this.props.getAllEvents(eventUrl), this.getAttendance()])
  }

  goGiveBadge = (id: number) => {
    this.props.history.push(this.props.defaultPath + '/dashboard/give-badges/' + id)
  }

  getAttendance = async () => {
    await this.props.getMyAttendByRange(this.props.user_id, "");
  }

  goToAllComments = (id: any) => {
    // this.setState({ goAllComments: true });
    let cmdUrl = this.props.defaultPath + "/dashboard/all-comments/" + id + "/user";
    this.props.history.push(cmdUrl)
  };

  goEventDetail = async (event: any) => {
    await this.props.getDetailEvents(event.school_id, event.id)
    this.props.history.push(this.props.defaultPath + "/event/detail/" + event.id)
  }

  render() {
    const profile: IProfile = {
      isLogo: true,
      logo: this.props.authUser.otherUserinfo?.avatar,
      title: this.props.authUser.otherUserinfo?.name,
      display_item: [
        {
          title: 'age',
          value: this.props.authUser.otherUserinfo?.student?.age
        },
        {
          title: 'Gender',
          value: (this.props.authUser.otherUserinfo?.student?.gender || "").toUpperCase()
        },
        {
          title: 'Favourite Stroke',
          value: this.props.authUser.otherUserinfo?.favorite || "-"
        },
        {
          title: 'Personal Best',
          value: this.props.authUser.otherUserinfo?.bestScore || 0
        }
      ]
    }
    console.log(this.props.authUser.otherUserinfo);

    const badgeData: any[] = this.props.authUser.otherUserinfo?.own_badges.map((res: any) => {
      return {
        text: res.badge.name,
        icon: res.badge.logo,
        callback: () => { },
        isActive: true,
      }
    }) || []

    const comments = this.props.comments?.result || []
    const events = this.props.eventList?.result || []
    const attendance = this.props.attendance?.attandance_list || []
    return (
      <>
        <ProfileContainer {...profile} key={"profile-box"}></ProfileContainer>
        <div className="mb-8" key={'badge_box_wapper'}>
          <ListBoxUI key={'badge_box'} title="BADGES"
            callback={() => {
              this.goGiveBadge(this.props.user_id);
            }}
            callback2={() => {
              this.goGiveBadge(this.props.user_id);
            }}
            more={this.props.byCoach}
            more2={this.props.byCoach}
            moreText2={"Give Badges"}
          >
            {/* {badges.length > 0 ? */}
            <BadgeList badges={badgeData} key="st_badge_list"></BadgeList>
            {/* :
              <></>
            } */}
          </ListBoxUI>
        </div>
        <div className="mb-8" key={'comments_box_wapper'}>
          <ListBoxUI
            title="Comments"
            callback={() => this.goToAllComments(this.props.user_id)}
            callback2={() => { }}
            more={true}
            key={'comments_box'}
          >
            {comments.length > 0 ?
              <>
                {comments.slice(0, 3).map((res: any, index: number) => {
                  return (
                    <CommentItem
                      key={`st_cmd-${index}`}
                      profile={<CreateProfile image_url={res.user_info.avatar} name={res.user_info.name} />}
                      message={res.message}
                      callback={() => { }}
                      timeString={res.user_info.name + " at " + moment(res.created_at).format("DD MMM, h:mm a")}
                    ></CommentItem>
                  )
                })}
              </>
              : <></>}

          </ListBoxUI>
        </div>
        <div className="mb-8" key={'attendance_wapper'}>
          <ListBoxUI
            title="Attendance"
            callback={() => {
              this.props.history.push(this.props.defaultPath + "/student/attendance/" + this.props.user_id)
            }}
            callback2={() => { }}
            more={true}
            key={'attendance_box'}
          >
            {attendance?.length > 0 ?
              <>
                {attendance.map((attend: any, index: any) => {
                  return (<ListItem
                    text={attend.classes?.name}
                    callback={() => { }}
                    icon={<CreateProfile image_url={attend.classes?.logo} name={attend.classes?.name || ""} />}
                    secondryText={true}
                    selectable={true}
                    checked={attend.attend}
                    key={`student${index}`} >
                    <>
                      <AccessTimeOutlinedIcon fontSize="small" />
                      <label>{moment(attend.record_date).format('D MMM')}</label>
                    </>
                  </ListItem>)
                })}
              </>
              :
              <></>}
          </ListBoxUI>
        </div>
        <div className="mb-8" key={'event_box_wapper'}>
          <ListBoxUI
            title="Events"
            callback={() => { }}
            callback2={() => { }}
            more={true}
            key={'event_box'}
          >
            {events.length > 0 ?
              <>
                {events.map((event: any, index: number) => {
                  return (
                    <ListItem key={`st_event${index}`} text={event?.event?.name} smallText={`${event?.event?.gender}, ${event?.event?.from_age}-${event?.event?.to_age} y/o`} callback={() => { this.goEventDetail(event?.event) }} arrowRight={true} />
                  )
                })}
              </>
              : <></>}

          </ListBoxUI>
        </div>
      </>
    )
  }
}


const mapStateToProps = ({
  authUser,
  comments,
  eventList,
  attendance
}: StoreState): {
  authUser: any;
  comments: any
  eventList: any
  attendance: any
} => {
  return {
    authUser,
    comments,
    eventList,
    attendance
  };
};

export default connect(mapStateToProps, { getUserInfo, getAllComment, getAllEvents, getDetailEvents, getMyAttendByRange })(StudentProfilePage)