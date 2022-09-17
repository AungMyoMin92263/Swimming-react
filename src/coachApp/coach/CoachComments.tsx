import React from "react";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import CommentListPage from "../../molecules/CommentPage"
interface IStates {
  classId: number;
  schoolId: number;
  comments: any[]
}

interface IProps {
  history: any;
}

class CoachCommentsPage extends React.Component<IProps, IStates> {
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
      comments: []
    };
  }
  componentDidMount() {

  }

  render() {
    const { classId } = this.state
    return (
      <div className="wrapper-mobile bg-w">
        <div className="content-mobile-cus-space col-sm-12">
          <CoachMobileHeader backBtn={true}></CoachMobileHeader>
          <CommentListPage receiverId={classId} isClass={true}></CommentListPage>
        </div>
      </div>
    )
  }
}

export default CoachCommentsPage;