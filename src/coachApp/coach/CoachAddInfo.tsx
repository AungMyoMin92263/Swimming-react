import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import "./CoachWelcome.css";
import InputFormAtom from "../../atoms/InputFormAtom";
import { putUser } from "../../stores/actions";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";
interface IStates {
  id: number;
  name: string;
  isNameValid: boolean;
  isNameEmpty: boolean;
  nameMsg: string;
  image: any;
  logo: string;
  isCompleted: boolean;
  isChangeLogo: boolean;
  errorMsg: string;
}

interface IProps {
  authUser: AuthInterface;
  putUser: Function;
  history: any;
}

class CoachAddInfoPage extends React.Component<IProps, IStates> {
  id: any;
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[3];
    this.state = {
      id: this.id ? this.id : -1,
      name: "",
      isNameValid: true,
      isNameEmpty: false,
      nameMsg: "",
      image: { preview: "", raw: "" },
      logo: "",
      isCompleted: false,
      isChangeLogo: false,
      errorMsg: "",
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

  isValid = () => {
    if (this.state.name.length === 0) return false;
    else return true;
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button
          type="submit"
          className="idle-btn  mobile-btn cus-primay-btn-m fw-600"
        >
          Done
        </button>
      );
    } else
      return (
        <>
          <button
            type="submit"
            onClick={() => this.updateUser()}
            className="btn btn-primary mobile-btn cus-primay-btn-m"
          >
            <span>Done</span>
          </button>
          {/* </Link> */}
        </>
      );
  };

  updateUser = async () => {
    let userData = {
      name: this.state.name,
      email: this.props.authUser.userInfo?.email,
      avatar: this.state.logo ? this.state.logo : null,
    };
    await this.props.putUser(
      userData,
      "users",
      this.props.authUser.userInfo?.id
    );
    if (!this.props.authUser.error) {
      let user = JSON.parse(getItem("authUser") || "null");
      if (user && user.userInfo) {
        let temp = user;
        temp.userInfo.name = this.props.authUser.userInfo?.name;
        setItemWithObject("authUser", temp);
      }
      this.props.history.push("/coach/dashboard");
    }
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
          isChangeLogo: this.state.id === -1 ? false : true,
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

  renderImageUpload = () => {
    return (
      <div>
        <div className="f-12 mb-8">Photo(Optional)</div>
        <label htmlFor="upload-button">
          {this.state.image.preview || this.state.logo !== "" ? (
            <>
              <img
                src={
                  this.state.id === -1
                    ? this.state.image.preview
                    : this.state.isChangeLogo
                    ? this.state.image.preview
                    : process.env.REACT_APP_API_ENDPOINT + "/" + this.state.logo
                }
                alt="preview"
                className="preview-icon cursor  mb-8"
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

  render() {
    const { name, isNameEmpty, isNameValid, nameMsg } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile-cus  col-sm-12">
            <div className="fw-500 f-32 pt-24 pb-24">
              <span>Tell us a bit about yourself!</span>
            </div>
            <div className="f-16 mb-16 fw-400 mb-32">
              <span>Welcome to My Report Cards!</span>
            </div>
            <div className="mt-16 mb-16 center">{this.renderImageUpload()}</div>

            <div className="fw-400 mb-16">
              <InputFormAtom
                label="Name"
                placeholder={"Enter your name"}
                warning={nameMsg}
                type="text"
                showWarning={isNameEmpty || !isNameValid}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    name: value,
                  });
                }}
                id="addName"
                name="addName"
                value={name}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => {}}
                focusCallback={() => {
                  // this.setState({
                  //   isNameEmpty: false,
                  //   isNameValid: true,
                  // });
                }}
              />
            </div>
            <div className="flex-center">{this.renderBtn()}</div>
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

export default connect(mapStateToProps, { putUser })(CoachAddInfoPage);
