import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import { StoreState } from "../../stores/reducers";
import ListItem from "../../atoms/ListItem";
import moment from "moment";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListBoxUI from "../../molecules/ListBox";
import { createAttendance, getAll, getClassAttend } from "../../stores/actions";
import Modal from 'react-bootstrap/Modal';
import InputFormAtom from "../../atoms/InputFormAtom";
import { AuthInterface } from "../../stores/model/auth-interface";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
interface IStates {
  classId: number,
  attendances: any[]
  modalShow: boolean
  filterDate: string
  isfilterDateValid: boolean,
  isfilterDateEmpty: boolean,
  filterDateMsg: string,
}

interface IProps {
  authUser: AuthInterface;
  history: any;
}

class CoacheProfile extends React.Component<IProps, IStates> {
  id: any;
  urlDailyProgram = '';
  urlEnterComment = '';
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      classId: this.id ? this.id : -1,
      attendances: [],
      modalShow: false,
      filterDate: moment().format("D MMM YYYY"),
      isfilterDateValid: true,
      isfilterDateEmpty: false,
      filterDateMsg: "",
    };
  }
  componentDidMount() {

    
  }

  render() {
    const { userInfo } = this.props.authUser
    let profile: IProfile = {
      isLogo: true,
      logo: userInfo?.avatar,
      title: userInfo?.name || "",
      display_item: [
        {
          title: 'Bio',
          value: userInfo?.favorite || "-"
        },
      ]
    }
    return (
      <>
        <div className="wrapper-mobile ">
          <div className="content-mobile-cus-space bg-w col-sm-12">
            <CoachMobileHeader backBtn={true} editBtn={true} callback={() => {
              this.setState({
                ...this.state,
                modalShow: true
              })

            }}></CoachMobileHeader>
            <ProfileContainer {...profile}></ProfileContainer>
            <div className="mb-8">
              <ListBoxUI title={"Contact Card"} callback={() => { }} more={false} noBtn={true}>
                <>
                <div className="p-16">
                  <div className="f-14 mb-16">
                    <LocalPhoneOutlinedIcon className="mr-8"/>
                    <label>+6012-8824696</label>
                  </div>
                  <div className="f-14">
                    <EmailOutlinedIcon className="mr-8"/>
                    <label>joseph@gmail.com</label>
                  </div>
                </div>
                </>
              </ListBoxUI>
            </div>
          </div>
        </div>
      </>
    )
  }

}
const mapStateToProps = ({
  authUser
}: StoreState): {
  authUser: AuthInterface,
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, {})(CoacheProfile)