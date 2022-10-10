import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { putUser, LoadingActionFunc, getUserInfo } from "../../stores/actions";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import { InputPhoneNumber } from "../../atoms/InputPhoneNumber";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { putStudent } from "./../../stores/actions/student-action";
import StudentMobileHeader from "../../atoms/StudentMobileHeader";

interface IStates {
  id: number;
  name: string;
  isStudentNameValid: boolean;
  isManagerNameEmpty: boolean;
  nameMsg: string;
  image: any;
  logo: string;
  mobile: string;
  age: string;
  gender: string;
  favourite: string;
  email: string;
  parentEmail: string;
  parentMobile: string;
  isCompleted: boolean;
  isChangeLogo: boolean;
  errorMsg: string;
}

interface IProps {
	history:any;
	match: any;
	user: any;
	putStudent: Function;
	LoadingActionFunc: Function;
	getUserInfo: Function;
}

class StudentEditProfilePage extends React.Component<IProps, IStates> {
  id: any;
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      id: this.id ? this.id : -1,
      name: "",
      isStudentNameValid: true,
      isManagerNameEmpty: false,
      nameMsg: "",
      image: { preview: "", raw: "" },
      logo: "",
      mobile: "",
      age: "",
      email: "User",
      gender: "Male",
      favourite: "",
      parentEmail: "",
      parentMobile: "",
      isCompleted: false,
      isChangeLogo: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    if(this.state.id === -1)this.authFromLocal();
    else this.getUserInfo();
  }

  authFromLocal = async () => {
    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      await this.setState({
        id: user.userInfo.id,
        email : user.userInfo.email
      });
      this.getUserInfo();
    }
  };

  getUserInfo = async () => {
    await this.props.getUserInfo(this.state.id);
    if (this.props.user && this.props.user.otherUserinfo) {
      let userObj = this.props.user.otherUserinfo;
      this.setState({
				id: userObj.student.id,
        age:userObj.student.age,
        favourite: userObj.favorite || '',
				name: userObj.name,
				logo: userObj.avatar,
				mobile: userObj.phone ? userObj.phone : "",
				email: userObj.email,
				parentEmail: userObj.parent_email,
        parentMobile: userObj.student.parent_phone,
			});
    }
  };

  handleChange = (e: any) => {
    console.log('handleChange',e)
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length > 0) {
        let temp = this.state.image;
        temp.preview = URL.createObjectURL(e.target.files[0]);
        temp.raw = e.target.files[0];
        temp.fileName = e.target.files[0].name;
        this.setState({
          image: temp,
          logo: temp.raw,
          isChangeLogo: this.state.id === -1 ? false : true,
        });
      }
    }
  };

  isValid = () => {
    if (this.state.name === "" || this.state.logo === "") return false;
    else return true;
  };
  handleChangeAge = (event: SelectChangeEvent) => {
    this.setState({
      age: event.target.value,
    });
  };

  submit = async () => {
    if (this.isValid()) {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("phone", this.state.mobile);
      formData.append("email", this.state.email);
      formData.append("parent_email", this.state.parentEmail);
      formData.append("parent_phone", this.state.parentMobile);
      formData.append("age", this.state.age);
      formData.append("gender", this.state.gender);
      formData.append("favorite", this.state.favourite);
      // formData.append("password", this.state.password);
      if (this.state.logo) formData.append("avatar", this.state.logo);
      this.props.LoadingActionFunc(true);

      await this.props.putStudent(formData, "student", this.state.id);

      if (this.props.user.error) {
        this.setState({
          isCompleted: false,
          errorMsg: this.props.user.error,
        });
        this.props.LoadingActionFunc(false);
      } else {
          this.props.LoadingActionFunc(false);
          this.props.history.back()
      }
    }
  };
  renderBtn = () => {
    return (
      <>
        <button
          type="submit"
          className="btn btn-primary cus-primay-btn-m w-100 mt-32 mb-32"
          onClick={() => this.submit()}
        >
          Done
        </button>
      </>
    );
  };

  renderImageUpload = () => {
    return (
      <div>
        <label htmlFor="upload-button">
          {this.state.image.preview ||
          (this.state.logo && this.state.logo !== "") ? (
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
              className="preview-icon cursor"
            />
            <div className="primary f-14 cursor">
              &nbsp; Change Image
            </div>
            </>
          ) : (
            <>
                {/* <img
                  id="logo"
                  src="../../../assets/icons/upload.png"
                  alt="upload"
                  className="big-icon cursor"
                /> */}
                  <InitialIcon
                    initials={
                      this.state.email
                        ? this.state.email.substring(0, 1).toUpperCase()
                        : ""
                    }
                    isFooterMenu={false}
                    isInitialIcon={true}
                  />

                  <div className="primary f-14 cursor  mb-8">
                    &nbsp; Upload Image
                  </div>
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
    const {
      name,
      isManagerNameEmpty,
      isStudentNameValid,
      nameMsg,
      errorMsg,
      mobile,
      email,
    } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <StudentMobileHeader backBtn={true} />
            <div className="f-32 fw-500 mb-32">
              <span>Edit Profile</span>
            </div>
            <div className="mb-8 center f-12">
              <span>PHOTO</span>
            </div>
            <div className="mb-16 center">{this.renderImageUpload()}</div>

            <div className="fw-400 mb-16">
              <InputFormAtom
                label="Name"
                placeholder={"Enter your name"}
                warning={nameMsg}
                type="text"
                showWarning={isManagerNameEmpty || !isStudentNameValid}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    name: value,
                  });
                }}
                id="addManagerName"
                name="addManagerName"
                value={name}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => {}}
                focusCallback={() => {
                  // this.setState({
                  //   isManagerNameEmpty: false,
                  //   isStudentNameValid: true,
                  // });
                }}
              />
            </div>

            <div className="flex mb-16">
              <div className="col-5">
                <InputFormAtom
                  label="Age"
                  placeholder={"Age"}
                  warning={nameMsg}
                  type="text"
                  showWarning={isManagerNameEmpty || !isStudentNameValid}
                  isDropdown={false}
                  callback={(value: string) => {
                    this.setState({
                      age: value,
                    });
                  }}
                  id="age"
                  name="age"
                  value={this.state.age}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                  focusCallback={() => {
                    // this.setState({
                    //   isManagerNameEmpty: false,
                    //   isStudentNameValid: true,
                    // });
                  }}
                />
              </div>
              <div className="col-2"></div>
              <div className="col-5">
                <div className={`input-form-atom`}>
                  <div className="label-con">
                    <label>Gender</label>
                  </div>
                  <div className="dropdown-box cursor">
                    <select
                      name="filter-class"
                      id="filterClass"
                      value={this.state.gender}
                      onChange={(e) => {
                        this.setState({
                          gender: e.currentTarget.value,
                        });
                      }}
                    >
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="fw-400 mb-16">
              <InputFormAtom
                label="Favourite Stroke"
                placeholder={"Favourite Stroke"}
                warning={""}
                type="text"
                showWarning={false}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    favourite: value,
                  });
                }}
                id="favaourite"
                name="favaourite"
                value={this.state.favourite}
                required={false}
                maxLength={200}
                className=""
                clickCallback={() => {}}
                focusCallback={() => {
                  // this.setState({
                  //   isManagerNameEmpty: false,
                  //   isStudentNameValid: true,
                  // });
                }}
              />
            </div>

            <div className="mb-16">
              <span className="f-16 fw-500">Contact Details</span>
            </div>

            <div className="pb-16">
              <InputFormAtom
                label="Email"
                placeholder={"Enter your email"}
                warning={""}
                type="text"
                showWarning={false}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    email: value,
                  });
                }}
                id="name"
                name="name"
                value={email}
                required={true}
                maxLength={200}
                className=""
                disabled={true}
                clickCallback={() => {}}
              />
            </div>

            <div className="mb-16">
              <InputPhoneNumber
                label="Student Mobile"
                placeholder={"Enter mobile number"}
                warning={""}
                showWarning={false}
                callback={(value: string) => {
                  this.setState({
                    mobile: value,
                  });
                }}
                id="mobile"
                name="mobile"
                value={this.state.mobile}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => {}}
              />
            </div>
            <div className="mb-16">
              <span className="f-16 fw-500">Parent Details</span>
            </div>

            <div className="pb-16">
              <InputFormAtom
                label="Parent Email"
                placeholder={"Enter email"}
                warning={""}
                type="text"
                showWarning={false}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    parentEmail: value,
                  });
                }}
                id="name"
                name="name"
                value={this.state.parentEmail}
                required={true}
                maxLength={200}
                className=""
                disabled={true}
                clickCallback={() => {}}
              />
            </div>

            <div className="mb-16">
              <InputPhoneNumber
                label="Parent Mobile"
                placeholder={"Enter mobile number"}
                warning={""}
                showWarning={false}
                callback={(value: string) => {
                  this.setState({
                    parentMobile: value,
                  });
                }}
                id="mobile"
                name="mobile"
                value={this.state.parentMobile}
                required={true}
                maxLength={200}
                className=""
                // disabled={true}
                clickCallback={() => {}}
              />
            </div>

            {errorMsg && <p className="text-danger">{errorMsg}</p>}
            <div className="">{this.renderBtn()}</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  schools,
  user,
}: StoreState): {
  schools: any;
  user: any;
} => {
  return {
    schools,
    user,
  };
};

export default connect(mapStateToProps, {
	putStudent,
	getUserInfo,
	LoadingActionFunc,
})(StudentEditProfilePage);
