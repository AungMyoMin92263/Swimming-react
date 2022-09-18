import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import BadgeItem from "../../atoms/BadgeItem";
import { CreateProfile } from "../../atoms/createProfile";
import { giveBadgeToStudent } from "../../stores/actions/badge-action";

interface IStates {
  goProfile: boolean;
}

interface IProps {
  authUser: AuthInterface;
  giveBadgeToStudent: Function
  badges: any;
  history: any
}

class CoachBadgeSentPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      goProfile: false,
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.badges);
    //loading
    if (!this.props.authUser.otherUserinfo && !this.props.badges.selectedBadge) {
      this.props.history.back()
    }
  }

  sendBage = async () => {
    let postData = {
      user_id: this.props.authUser.otherUserinfo.id,
      badge_id: this.props.badges.selectedBadge.id
    }
    await this.props.giveBadgeToStudent(postData)
    this.props.history.go(-2)
  }
  render() {

    const badges = this.props.badges.selectedBadge
    const receiver = this.props.authUser.otherUserinfo

    return (
      <>
        <div className="wrapper-mobile">

          <div className="content-mobile-cus-space bg-w col-sm-12">
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <div className="text-center">
              <div className="f-32 fw-500 pt-40 mb-32">
                <span>Confirm send?</span>
              </div>
              <BadgeItem icon={badges.logo} callback={() => { }} isBig={true} color={badges.color} />
              <div className="mb-16 f-14 fw-500">
                <span>{badges.name}</span>
              </div>
              <div className="mb-16 f-14">
                <span>{badges.description}</span>
              </div>
              <div className="flex-center mb-32">
                <div className="email-div-new">
                  {/* <InitialIcon initials={"AR"} isFooterMenu={false} /> */}
                  <CreateProfile image_url={receiver.avatar} name={receiver?.name || "User"} />
                  <span className="email-div-name">{receiver.name}</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary right w-100" onClick={() => { this.sendBage() }}>
              Send Badge
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  authUser,
  badges
}: StoreState): {
  authUser: AuthInterface;
  badges: any
} => {
  return {
    authUser,
    badges
  };
};

export default connect(mapStateToProps, { giveBadgeToStudent })(CoachBadgeSentPage);
