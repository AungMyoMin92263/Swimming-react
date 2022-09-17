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
interface IStates {
  id: number;
  image: any;
  logo: string;
  profile_details: any;
  contact_details: any;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachEditProfilePage extends React.Component<IProps, IStates> {
  backUrl = "/coach/me";

  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      image: { preview: "", raw: "" },
      logo: "",
      profile_details: {
        name: "",
        bio: "",
      },
      contact_details: {
        mobile: "",
        email: "",
      },
    };
  }

  renderImageUpload = () => {
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
                <img
                  id="logo"
                  src="../../../assets/icons/upload.png"
                  alt="upload"
                  className="big-icon cursor mb-8"
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
          image: temp,
          logo: temp.raw,
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

  render() {
    const { profile_details, contact_details } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to={this.backUrl}>
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button>
              </Link>
            </div>
            <div className="mb-8 center f-12">
              <span>PHOTO</span>
            </div>
            <div className="mb-8 center">{this.renderImageUpload()}</div>
            <div className="mb-16">
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
                    let temp = profile_details;
                    temp.name = value;
                    this.setState({
                      profile_details: temp,
                    });
                  }}
                  id="name"
                  name="name"
                  value={profile_details.name}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
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
                    let temp = profile_details;
                    temp.bio = value;
                    this.setState({
                      profile_details: temp,
                    });
                  }}
                  id="bio"
                  name="bio"
                  value={profile_details.bio}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                />
            </div>
            <div className="mb-16">
              <span className="f-16 fw-500">Contact Details</span>
            </div>
            <div className="mb-16">
                <InputFormAtom
                  label="Mobile"
                  placeholder={"Enter your mobile"}
                  warning={""}
                  type="text"
                  showWarning={false}
                  isDropdown={false}
                  callback={(value: string) => {
                    let temp = profile_details;
                    temp.mobile = value;
                    this.setState({
                      profile_details: temp,
                    });
                  }}
                  id="mobile"
                  name="mobile"
                  value={profile_details.mobile}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                />
            </div>

            <div className="mb-16">
                <InputFormAtom
                  label="email"
                  placeholder={"Enter your email"}
                  warning={""}
                  type="text"
                  showWarning={false}
                  isDropdown={false}
                  callback={(value: string) => {
                    let temp = profile_details;
                    temp.email = value;
                    this.setState({
                      profile_details: temp,
                    });
                  }}
                  id="name"
                  name="name"
                  value={profile_details.email}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                />
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

export default connect(mapStateToProps, {})(CoachEditProfilePage);
