import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { postSchool } from "../../stores/actions/school-action";
import { SchoolInterface } from "../../stores/model/school-interface";

interface IStates {
  name: string;
  isSchoolNameValid: boolean;
  isSchoolNameEmpty: boolean;
  nameMsg: string;
  image: any;
  isCompleted: boolean;
}

interface IProps {
  school: SchoolInterface;
  postSchool : Function;
}
class AddSchoolPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      isSchoolNameValid: true,
      isSchoolNameEmpty: false,
      nameMsg: "",
      image: { preview: "", raw: "" },
      isCompleted: false,
    };
  }
  componentDidMount() {
    //loading
  }

  uploadImage = () => {};

  handleChange = (e: any) => {
    if (e.target.files.length) {
      let temp = this.state.image;
      temp.preview = URL.createObjectURL(e.target.files[0]);
      temp.raw = e.target.files[0];
      this.setState({
        image: temp,
      });
    }
  };

  isValid = () => {
    if(this.state.name.length === 0 ||
        this.state.image.raw  === ''
      )return false;
      else return true;
  }

  submit = () => {
    // if(this.isValid()){
    //   this.setState({
    //   isCompleted : true
    // });
    const { name, image }: IStates = this.state;
		this.props.postSchool({ name : name,logo : image.raw});
    console.log('props',this.props)
  //}
  }

  handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.image.raw);

    // await fetch("YOUR_URL", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   body: formData
    // });
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Continue
        </button>
      );
    } else
      return (
        <>
          {this.state.isCompleted && (
            <Navigate to="/admin/invite-manager" replace={true} />
          )}
          <button type="submit" className="primary-btn fw-600 ml-16" onClick={this.submit}>
            Continue
          </button>
        </>
      );
  };

  render() {
    const { name, isSchoolNameEmpty, isSchoolNameValid, nameMsg } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container">
            <div className="content col-6 col-md-6 col-sm-12">
              <div className="f-14 mb-16">
                <Link to="/admin/welcome" style={{ textDecoration: "none" }}>
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                </Link>
              </div>
              <div className="f-32 fw-500">
                <span>Add a school.</span>
              </div>
              <div className="f-16 mb-16 fw-400">
                <span>Get started by adding a school you manage.</span>
              </div>
              <div className="mb-16 align-center">
                <label htmlFor="upload-button">
                  {this.state.image.preview ? (
                    <>
                      <img
                        src={this.state.image.preview}
                        alt="preview"
                        className="preview-icon cursor"
                      />
                      <span
                        className="primary f-14 cursor"
                        style={{ marginLeft: "18px" }}
                      >
                        &nbsp; Change Image
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        src="../../../assets/icons/upload.png"
                        alt="upload"
                        className="big-icon cursor"
                      />
                      <span
                        className="primary f-14 cursor"
                        style={{ marginLeft: "18px" }}
                      >
                        &nbsp; Upload Image
                      </span>
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

              <div className="fw-400 mb-16">
                <InputFormAtom
                  label="School Name"
                  placeholder={"Enter name of school"}
                  warning={nameMsg}
                  type="text"
                  showWarning={isSchoolNameEmpty || !isSchoolNameValid}
                  isDropdown={false}
                  callback={(value: string) => {
                    this.setState({
                      name: value,
                    });
                  }}
                  id="addSchoolName"
                  name="addSchoolName"
                  value={name}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                  focusCallback={() => {
                    // this.setState({
                    //   isSchoolNameEmpty: false,
                    //   isSchoolNameValid: true,
                    // });
                  }}
                />
              </div>

              <div className="right flex-center">
                <span className="secondary">1 of 2</span>
                {this.renderBtn()}
              </div>

              {/* <div className="right">
                <span className="secondary">1 of 2</span>
                <Link to="/admin/invite-manager">
                  <button type="submit" className="idle-btn fw-600 ml-16">
                    Continue
                  </button>
                </Link>
              </div> */}
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

export default connect(mapStateToProps, {postSchool})(AddSchoolPage);
