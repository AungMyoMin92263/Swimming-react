import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { postSchool, putSchool } from "../../stores/actions/school-action";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";

interface IStates {
  id: number;
  name: string;
  isSchoolNameValid: boolean;
  isSchoolNameEmpty: boolean;
  nameMsg: string;
  image: any;
  logo: string;
  isCompleted: boolean;
}

interface IProps {
  schools: any;
  postSchool: Function;
  putSchool: Function;
}
class AddSchoolPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      name: "",
      isSchoolNameValid: true,
      isSchoolNameEmpty: false,
      nameMsg: "",
      image: { preview: "", raw: "" },
      logo: "",
      isCompleted: false,
    };
  }
  componentDidMount() {

    let school = JSON.parse(getItem("school") || "null");
    if (school) {
      this.setState({
        logo: school.logo,
        id: school.id,
        name: school.name,
      });
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
          image: temp,
          logo: temp.raw,
        });
		//setItem('school_img_file', temp.raw);
      }
    }
  };

  isValid = () => {
    if (this.state.name.length === 0 || this.state.logo === "") return false;
    else return true;
  };

  submit = async () => {
    if (this.isValid()) {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("logo", this.state.id < 0? this.state.image.raw : getItem('school_img_file'));
      if (this.state.id < 0) {
        await this.props.postSchool(formData);
        if(this.props.schools.result)setItemWithObject("school", this.props.schools.result.data);
        this.setState({
          isCompleted: true,
          name: this.props.schools.result.data.name,
          logo: this.props.schools.result.data.logo,
          id: this.props.schools.result.data.id,
        });
      } else {
        await this.props.putSchool(formData, this.state.id);
        if(this.props.schools.result)setItemWithObject("school", this.props.schools.result.data);
        this.setState({
          isCompleted: true,
          name: this.props.schools.result.data.name,
          logo: this.props.schools.result.data.logo,
          id: this.props.schools.result.data.id,
        });
      }
    }
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
          <button
            type="submit"
            className="primary-btn fw-600 ml-16"
            onClick={this.submit}
          >
            Continue
          </button>
        </>
      );
  };

  renderImageUpload = () => {
    return (
      <div>
        <label htmlFor="upload-button">
          {this.state.image.preview || this.state.logo !== '' ? (
            <>
              <img
                src={this.state.id === -1? this.state.image.preview : "http://localhost:3000/api/" + this.state.logo}
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
              <>
                <img
                  id="logo"
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
    const { name, isSchoolNameEmpty, isSchoolNameValid, nameMsg } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content col-6 col-md-6 col-sm-12">
              <div className="f-14 mb-16">
                <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
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
                {this.renderImageUpload()}
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  schools,
}: StoreState): {
  schools: any;
} => {
  return {
    schools,
  };
};

export default connect(mapStateToProps, { postSchool, putSchool })(
  AddSchoolPage
);
