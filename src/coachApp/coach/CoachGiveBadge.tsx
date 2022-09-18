import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import BadgesPage from "../../molecules/BadgesPage";
import CommentListPage from "../../molecules/CommentPage"
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
interface IStates {
  receiverId: number;
  userInfo: any
}

interface IProps {
  history: any;
  authUser: any
}

class CocahGiveBadgePage extends React.Component<IProps, IStates> {
  id: any;
  urlDailyProgram = '';
  urlEnterComment = '';
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      receiverId: this.id ? this.id : -1,
      userInfo: null
    };
  }

  componentDidMount() {
    if (!this.props.authUser.otherUserinfo)
      this.props.history.back()
    this.setState({
      ...this.state,
      userInfo: this.props.authUser.otherUserinfo
    })
  }

  render() {
    const { receiverId, userInfo } = this.state
    return (
      <div className="wrapper-mobile bg-w">
        <div className="content-mobile-cus-space col-sm-12 rm-padding">
          <div className="pl-16 pr-16">
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <div className="mini-profile pt-24">
              <div className="img-profile">
                <CreateProfile image_url={userInfo?.avatar} name={userInfo?.name || "User"} />
              </div>
              <div className="profile-name">
                {userInfo?.name || userInfo?.email}
              </div>
            </div>
            <div className='page-tile pt-16 pb-40'>
              Select Badge <br />
              to Send
            </div>
          </div>
          <BadgesPage receiverId={receiverId} defaultPath={'/coach'} history={this.props.history}></BadgesPage>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  authUser,
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, {})(CocahGiveBadgePage);

// export default CocahGiveBadgePage;