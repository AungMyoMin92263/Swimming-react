import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IListItem } from "../../atoms/ListItem";
import InputFormAtom from "../../atoms/InputFormAtom";
import { InitialIcon } from "../../atoms/InitialIcon";

interface IStates {
  id: number;
  image: any;
  logo: string;
  name: string;
  isNameValid: boolean;
  isNameEmpty: boolean;
  NameMsg: string;
  description: string;
  DesMsg: string;
  isDesValid: boolean;
  isDesEmpty: boolean;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachBadgeSentPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      image: { preview: "", raw: "" },
      logo: "",
      name: "",
      isNameValid: true,
      isNameEmpty: false,
      NameMsg: "",
      description: "",
      DesMsg: "",
      isDesValid: true,
      isDesEmpty: false,
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
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
          image: temp,
          logo: temp.raw,
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

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
                    : "http://localhost:3000/api/" + this.state.logo
                }
                alt="preview"
                className="preview-icon cursor"
              />
              <span
                className="primary f-14 cursor"
                style={{ marginLeft: "18px" }}
              >
                &nbsp; Tap to edit Icon
              </span>
            </>
          ) : (
            <>
              <>
                <img
                  id="logo"
                  src="../../../assets/icons/upload.png"
                  alt="upload"
                  className="big-icon cursor mb-16"
                />
                <div
                  className="primary f-14 cursor"
                  style={{ marginLeft: "18px" }}
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

  render() {
    let item: IListItem = {
      text: "Create a new badge",
      callback: () => console.log("log click item"),
      smallText: "Reward your students.",
      icon: <img src={"/assets/icons/upload.png"} />,
      secondryText: false,
      isBigIcon: true,
    };

    const {
      id,
      image,
      logo,
      name,
      isNameValid,
      isNameEmpty,
      NameMsg,
      description,
      DesMsg,
      isDesValid,
      isDesEmpty,
    } = this.state;

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
            <div className="text-center">
              <div className="f-32 fw-500 mt-16 mb-32">
                <span>Confirm send?</span>
              </div>
              <img
                src={"/assets/icons/logo.png"}
                alt="home"
                className="w-120-icon mb-16"
              />
              <div className="mb-16 f-14 fw-500">
                <span>Safe Swimmer</span>
              </div>
              <div className="mb-16 f-14">
                <span>Lorem ipsum sit dolor sanataria.</span>
              </div>
              <div className="flex-center mb-32">
                <div className="email-div" style={{ width: "181px" }}>
                  <InitialIcon initials={"AR"} />
                  <span>Azlan Razali</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary right w-100">
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
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, {})(CoachBadgeSentPage);
