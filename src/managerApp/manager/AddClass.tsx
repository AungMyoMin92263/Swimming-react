import React from "react";
import { IPageProp } from "../../pagePropsInterface";

// import csss
import styles from "./../../css/pages.module.css";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";

interface IStates {
  logo: string;
  isClassNameEmpty: boolean;
  className: string;
  classNameMsg : string
}

class AddClass extends React.Component<IPageProp, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      logo: "",
      isClassNameEmpty: true,
      className: "",
	  classNameMsg : ''
    };
  }
  componentDidMount() {
    //loading
  }

  renderBtn = () => {
	if(this.state.isClassNameEmpty){
		return <button type="submit" className="idle-btn fw-600 ml-16">
                    Continue
                  </button>;
	}else return <Link to="/manager/set-date-time">
	<button
		  type="submit"
		  className="primary-btn"
		>
		  Continue
		</button></Link>;
  }

  render() {
    const { logo, isClassNameEmpty, className, classNameMsg } = this.state;
	
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container">
            <div className="content col-6 col-md-6 col-sm-12">
              <div className="f-14 mb-32">
                <Link to="/admin/welcome" style={{ textDecoration: "none" }}>
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                </Link>
              </div>
              <div className="mb-16 flex">
                <img
                  src={"/assets/icons/logo.png"}
                  alt="right-arrow"
                  className="item-icon"
                />
                <span className="f-16">Dolphin Swimming School</span>
              </div>
              <div className="hr mb-16"></div>
              <div className="f-32 fw-500">
                <span>Create a class</span>
              </div>
              <div className="f-16 mb-16 fw-400">
                <span>
                  Create a class to add students, parents and coaches.
                </span>
              </div>
              <div className="mb-16 align-center">
                <div className="flex-column">
                  <span className="f-12 fw-400 mb-16">
                    Class Logo (Optional)
                  </span>
                  <img
                    src="../../../assets/icons/upload.png"
                    alt="upload"
                    className="big-icon"
                  />
                </div>

                <span className="primary f-14" style={{ marginLeft: "18px" }}>
                  {" "}
                  &nbsp; Upload Image
                </span>
              </div>
              <div className="fw-400 mb-16 f-12">
                <InputFormAtom
                  label="Class Name"
                  placeholder={"Enter name of class"}
                  warning={classNameMsg}
                  type="text"
                  showWarning={isClassNameEmpty}
                  isDropdown={false}
                  callback={(value: string) => {
                    this.setState({
                      className: value,
                    });
                  }}
                  id="addClassName"
                  name="addClassName"
                  value={className}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                  focusCallback={() => {
                    this.setState({
                      isClassNameEmpty: false,
                    });
                  }}
                />
              </div>

              <div className="right">
                <span className="secondary">1 of 4</span>
                  {this.renderBtn()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddClass;
