import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListItem, { IListItem } from "../../atoms/ListItem";
import InputFormAtom from "../../atoms/InputFormAtom";
interface IStates {
  id: number;
  image: any;
  logo: string;
  profile_details: any;
  contact_details: any;
  parent_details: any;
}

interface IProps {
  authUser: AuthInterface;
}

class StudentEditProfilePage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      image: { preview: "", raw: "" },
      logo: "",
      profile_details: {
        name: "",
        age: 0,
        gender: "male",
        favourite_stroke: "",
      },
      contact_details: {
        student_email: "",
        student_mobile: "",
      },
      parent_details: {
        parent_name: "",
        parent_email: "",
        parent_mobile: "",
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
              <div
                className="primary f-14 cursor"
              >
                &nbsp; Change Image
              </div>
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
                <div
                  className="primary f-14 cursor"
                >
                  &nbsp; Upload Image
                </div>
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
    const { profile_details, contact_details, parent_details  } = this.state;

    let profile: IProfile = {
      title: "Azlan Razali",
      isLogo: true,
      display_item: [
        { title: "AGE", value: "28" },
        { title: "GENDER", value: "28" },
        { title: "FAVOURITE STROKE", value: "28" },
        { title: "PERSONAL BEST", value: "28" },
      ],
    };

    let item: IListItem = {
      text: "Pro Youth Morning",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      secondryText: true,
      isBigIcon: false,
    };

    let item2: IListItem = {
      text: "100m Freestyle",
      callback: () => console.log("log click item"),
      smallText: "Male, 9-10 y/o, 64.42s",
      icon: <></>,
      secondryText: false,
      isBigIcon: false,
    };

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <button type="submit" className="back-btn">
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
              </button>
            </div>
            <div className="mb-8 center f-12">
              <span>PHOTO</span>
            </div>
            <div className="mb-8 center">{this.renderImageUpload()}</div>
            <div className="row mb-16">
              <div className="mb-8">
                <InputFormAtom
                  label="Name"
                  placeholder={"Enter your name"}
                  warning={''}
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
            </div>
            <div className="row mb-16">
              <div className="col-6">
              <div className="mb-8">
                <InputFormAtom
                  label="Age"
                  placeholder={"Enter your age"}
                  warning={''}
                  type="text"
                  showWarning={false}
                  isDropdown={false}
                  callback={(value: string) => {
                    let temp = profile_details;
                    temp.age = value;
                    this.setState({
                      profile_details: temp,
                    });
                  }}
                  id="age"
                  name="age"
                  value={profile_details.age}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                />
              </div>
              </div>
              <div className="col-6">
              <div className="mb-8">
                <InputFormAtom
                  label="Gender"
                  placeholder={"Enter your gender"}
                  warning={''}
                  type="text"
                  showWarning={false}
                  isDropdown={false}
                  callback={(value: string) => {
                    let temp = profile_details;
                    temp.gender = value;
                    this.setState({
                      profile_details: temp,
                    });
                  }}
                  id="gender"
                  name="gender"
                  value={profile_details.gender}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                />
              </div>
              </div>
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

export default connect(mapStateToProps, {})(StudentEditProfilePage);
