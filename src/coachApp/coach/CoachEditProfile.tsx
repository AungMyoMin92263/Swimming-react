import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import InputFormAtom from "../../atoms/InputFormAtom";
import { Link } from "react-router-dom";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { InitialIcon } from "../../atoms/InitialIcon";
import { InputPhoneNumber } from "../../atoms/InputPhoneNumber";
import { putUser } from "../../stores/actions";
import { setItemWithObject } from "../../auth/LocalStorage";
interface IStates {
  id: number;
  image: any;
  logo: any;
  profile_details: any;
  contact_details: any;
  updatedLogo?: boolean
}

interface IProps {
  authUser: AuthInterface;
  putUser: Function
  history: any;
}

class CoachEditProfilePage extends React.Component<IProps, IStates> {
  backUrl = "/coach/me";

  constructor(props: any) {
    super(props);

    this.state = {
      id: this.props.authUser.userInfo?.id || 0,
      image: { preview: "", raw: "" },
      logo: this.props.authUser.userInfo?.avatar || "",
      profile_details: {
        name: this.props.authUser.userInfo?.name || "",
        bio: this.props.authUser.userInfo?.favorite || "",
      },
      contact_details: {
        mobile: this.props.authUser.userInfo?.phone || "",
        email: this.props.authUser.userInfo?.email || "",
      },
    };
  }


  renderImageUpload = () => {
    const { userInfo } = this.props.authUser
    return (
      <div>
        <label htmlFor="upload-button">
          {this.state.image.preview || this.state.logo !== "" ? (
            <>
              <img
                src={
                  this.state.id === -1
                    ? this.state.image.preview
                    : process.env.REACT_APP_API_ENDPOINT + this.state.logo
                }
                alt="preview"
                className="preview-icon cursor mb-8"
              />
              <div className="primary f-14 cursor">&nbsp; Change Image</div>
            </>
          ) : (
            <>
              <>
                {/* <img
                  id="logo"
                  src="../../../assets/icons/upload.png"
                  alt="upload"
                  className="big-icon cursor mb-8"
                /> */}
                <InitialIcon
                  initials={(userInfo?.name || "User").substr(0, 1).toUpperCase()}
                  isFooterMenu={false}
                  isInitialIcon={true}
                />
                <div className="primary f-14 cursor">&nbsp; Upload Image</div>
              </>
            </>
          )}
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={this.handleChange}
        />
      </div>
    );
  };

  updateUser = async () => {
    let userData = {
      name: this.state.profile_details.name,
      favorite: this.state.profile_details.bio,
      phone: this.state.contact_details.mobile,
      email: this.state.contact_details.email,
      avatar: this.state.updatedLogo ? this.state.logo : null,
    }
    await this.props.putUser(userData, "users", this.state.id)
    if(!this.props.authUser.error){
      setItemWithObject("authUser", this.props.authUser);
      this.props.history.back()
    }
  }

  handleChange = (e: any) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length) {
        let temp = this.state.image;
        temp.preview = URL.createObjectURL(e.target.files[0]);
        temp.raw = e.target.files[0];
        temp.fileName = e.target.files[0].name;
        this.setState({
          ...this.state,
          image: temp,
          logo: temp.raw,
          updatedLogo: true
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

  componentDidMount() {
    console.log("authUser", this.props.authUser);
    if (!this.props.authUser.userInfo) {
      this.props.history.back()
    }

    //loading
  }

  render() {
    const { profile_details, contact_details } = this.state;
    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile-cus-space bg-w col-sm-12">
            <CoachMobileHeader backBtn={true} />
            <div className="mb-16 center f-12">
              <span>PHOTO</span>
            </div>
            <div className="mb-40 center">{this.renderImageUpload()}</div>
            <div className="mb-24">
              <span className="f-16 fw-500">Profile Details</span>
            </div>
            <div className="mb-16">
              <InputFormAtom
                label="Name"
                placeholder={"Enter your name"}
                warning={""}
                type="text"
                showWarning={false}
                isDropdown={false}
                callback={(value: string) => {
                  let temp = profile_details
                  temp.name = value
                  this.setState({
                    ...this.state,
                    profile_details: temp
                  })
                }}
                id="name"
                name="name"
                value={profile_details.name}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => { }}
              />
            </div>
            <div className="mb-32">
              <InputFormAtom
                label="Bio"
                placeholder={"Enter your bio"}
                warning={""}
                type="text"
                showWarning={false}
                isDropdown={false}
                callback={(value: string) => {
                  let temp = profile_details
                  temp.bio = value
                  this.setState({
                    ...this.state,
                    profile_details: temp
                  })
                }}
                id="bio"
                name="bio"
                value={profile_details.bio}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => { }}
              />
            </div>
            <div className="mb-16">
              <span className="f-16 fw-500">Contact Details</span>
            </div>
            <div className="mb-16">
              <InputPhoneNumber
                label="Mobile"
                placeholder={"Enter your mobile"}
                warning={""}
                showWarning={false}
                callback={(value: string) => {
                  let temp = contact_details
                  temp.mobile = value
                  this.setState({
                    ...this.state,
                    contact_details: temp
                  })
                }}
                id="mobile"
                name="mobile"
                value={contact_details.mobile}
                required={true}
                maxLength={200}
                className=""
                // disabled={true}
                clickCallback={() => { }}
              />
            </div>

            <div className="pb-16">
              <InputFormAtom
                label="email"
                placeholder={"Enter your email"}
                warning={""}
                type="text"
                showWarning={false}
                isDropdown={false}
                callback={(value: string) => {
                  let temp = contact_details
                  temp.email = value
                  this.setState({
                    ...this.state,
                    contact_details: temp
                  })
                }}
                id="name"
                name="name"
                value={contact_details.email}
                required={true}
                maxLength={200}
                className=""
                disabled={true}
                clickCallback={() => { }}
              />
            </div>
            <button type="submit" className="btn btn-primary cus-primay-btn-m w-100 mt-32 mb-32" onClick={() => this.updateUser()}>
              Done
            </button>
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

export default connect(mapStateToProps, { putUser })(CoachEditProfilePage);
