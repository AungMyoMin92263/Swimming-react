import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { signOut } from "../../stores/actions/auth-action";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListItem, { IListItem } from "../../atoms/ListItem";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link, Navigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { removeItem } from "../../auth/LocalStorage";
import ListBoxUI from "../../molecules/ListBox";

interface IStates {
  step: number;
  dropdown: boolean;
  isLogout: boolean;
  isEdit: boolean;
}

interface IProps {
  authUser: AuthInterface;
  signOut: Function;
}

class CoachMePage extends React.Component<IProps, IStates> {
  backUrl = "/coach/dashboard";
  editUrl = "/coach/me/edit-profile";
  constructor(props: any) {
    super(props);

    this.state = {
      step: 0,
      dropdown: false,
      isLogout: false,
      isEdit: false,
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
  }

  toggleOpen = () => {
    let dropdownVal = !this.state.dropdown;
    this.setState({
      dropdown: dropdownVal,
    });
  };

  logout = async () => {
    await this.props.signOut();
    removeItem("authUser");
    this.setState({
      isLogout: true,
    });
  };

  edit = () => {
    this.setState({
      isEdit: true,
    });
  };

  render() {
    let profile: IProfile = {
      title: "Joseph",
      isLogo: true,
      display_item: [{ title: "BIO", value: "Head Coach" }],
    };

    let item: IListItem = {
      text: "",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <></>,
      secondryText: true,
      isBigIcon: false,
      selectable: true,
    };
    const { isEdit, dropdown, isLogout } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          {isLogout && <Navigate to="/coach/login" replace={true} />}
          {isEdit && <Navigate to={this.editUrl} replace={true} />}

          <div className="content-mobile col-sm-12">
            <div className="mb-32 form-footer ">
              <Link to={this.backUrl}>
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button>
              </Link>
              <div className="dropdown">
                <button
                  type="submit"
                  className="back-btn"
                  onClick={this.toggleOpen}
                >
                  <CreateOutlinedIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></CreateOutlinedIcon>
                </button>

                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    dropdown ? "show" : ""
                  }`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="dropdown-item cursor" onClick={this.edit}>
                    <EditOutlinedIcon
                      sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
                    ></EditOutlinedIcon>
                    <span>Edit</span>
                  </div>
                  <div className="dropdown-item cursor" onClick={this.logout}>
                    <LogoutOutlinedIcon
                      sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
                    ></LogoutOutlinedIcon>
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <ProfileContainer {...profile}></ProfileContainer>
            </div>
            <div className="mb-8">
              <ListBoxUI
                title="Contact Card"
                callback={() => {}}
                more={false}
                noBtn={true}
              >
                <div className="p-16">
                  <div className="f-14 mb-8">
                    <LocalPhoneOutlinedIcon className="mr-8"/>
                    <label>+6012-8824696</label>
                  </div>
                  <div className="f-14">
                    <EmailOutlinedIcon className="mr-8"/>
                    <label>joseph@gmail.com</label>
                  </div>
                </div>
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
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, { signOut })(CoachMePage);
