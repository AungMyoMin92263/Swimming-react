import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { getItem } from "../../auth/LocalStorage";
import CommentListPage from "../../molecules/CommentPage"
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
interface IStates {
  classId: number;
  schoolId: number;
  commentType: string;
  comments: any[]
}

interface IProps {
  authUser: AuthInterface;
  history: any;
  classes: any
}

class StudentCommentsPage extends React.Component<IProps, IStates> {
  id: any;
  urlDailyProgram = '';
  urlEnterComment = '';
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      classId: this.id ? this.id : -1,
      schoolId: -1,
      commentType: path[5] ? path[5] : "",
      comments: []
    };
  }
  componentDidMount() {
    if (!this.props.classes?.viewClass && !this.props.authUser.otherUserinfo) {
      this.props.history.back()
    }
  }

  commentBack = () => {
    let comment = JSON.parse(getItem("comment") || "null");
    if(comment){
      this.props.history.push("/student/dashboard/enter-comments/" + this.state.classId + "/" + this.state.commentType+'/'+ comment.id)
    }
  }

  render() {
    const { classId } = this.state
    return (
      <div className="wrapper-mobile bg-w">
        <div className="content-mobile-cus-space col-sm-12">
          <CoachMobileHeader backBtn={true} addBtn={false} callback={() => {
            this.props.history.push("/student/dashboard/enter-comments/" + classId + "/" + this.state.commentType)
          }}></CoachMobileHeader>
          <div className='page-tile pt-24 pb-40'>All Comments</div>
          <CommentListPage receiverId={classId} isClass={this.state.commentType === 'class'} showRightArr={true} callback={() => this.commentBack()}></CommentListPage>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({
  authUser,
  classes,
}: StoreState): {
  authUser: AuthInterface,
  classes: any;
} => {
  return {
    authUser,
    classes,
  };
};

export default connect(mapStateToProps, {})(StudentCommentsPage);
// export default CoachCommentsPage;