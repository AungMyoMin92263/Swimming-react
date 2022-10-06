import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { inviteCoach, LoadingActionFunc } from "../../stores/actions";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import { getItem } from "../../auth/LocalStorage";
import TagInput from "../../components/TagInput";
import placeholder from "./../../assets/images/place-holder.png";
import InputFormAtom from "../../atoms/InputFormAtom";

interface IStates {
  email: string;
  isCompleted: boolean;
  school_name: string;
  errorMsg: string;
  classObj: any;
}

interface IProps {
  emails: string[];
  classes: any;
  inviteCoach: Function;
  LoadingActionFunc: Function;
}
class InviteCoachPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      isCompleted: false,
      school_name: "",
      errorMsg: "",
      classObj: null,
    };
  }
  componentDidMount() {
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo && user.userInfo.assign_school) {
      this.setState({
        school_name: user.userInfo.assign_school.school.name,
      });
    }
    const classObject = JSON.parse(getItem("class") || "null");
    this.setState({
      classObj: classObject,
    });
    this.props.LoadingActionFunc(false);
  }

  handleChange = (tags: string) => {
    this.setState({
      email: tags,
    });
  };

  isValid = () => {
    if (this.state.email === "") return false;
    else return true;
  };

  submit = async () => {
    console.log("Clicked");
    if (this.isValid()) {
      if (this.state.classObj) {
        this.props.LoadingActionFunc(true);
		let temp = [];
        temp.push(this.state.email);
        await this.props.inviteCoach({
          user_email: temp,
          class_id: this.state.classObj.id,
        });

        if (this.props.classes.error) {
          this.setState({
            isCompleted: false,
            errorMsg: this.props.classes.error,
          });
          this.props.LoadingActionFunc(false);
        } else {
          this.setState({
            isCompleted: true,
          });
        }
      }
    }
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Done
        </button>
      );
    } else
      return (
        <>
          {this.state.isCompleted && (
            <Navigate to="/manager/invite-student" replace={true} />
          )}
          <button
            type="submit"
            className="primary-btn fw-600 ml-16"
            onClick={this.submit}
          >
            Done
          </button>
        </>
      );
  };

  render() {
    const { errorMsg, classObj, email } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <Link to="/manager/dashboard">
              <span>My Report Cards</span>
            </Link>
          </div>
          <div className="container-cus">
            <div className="content col-lg-6">
              <div className="f-14 mb-32">
                <Link
                  to="/manager/set-date-time"
                  style={{ textDecoration: "none" }}
                >
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                </Link>
              </div>

              <div className="mb-16 align-center">
                <img
                  src={
                    classObj && classObj.logo
                      ? process.env.REACT_APP_API_ENDPOINT + "/" + classObj.logo
                      : placeholder
                  }
                  alt="logo"
                  className={`${
                    classObj && classObj.logo ? "item-icon" : "w-48"
                  }`}
                />
                <span className="f-16">
                  {classObj && classObj.name} ({this.state.school_name})
                </span>
              </div>
              <div className="hr mb-32"></div>
              <div className="f-32 fw-500">
                <span>Invite a Coach.</span>
              </div>
              <div className="f-16 mb-32">
                <span>Invite a coach to your class.</span>
              </div>

              <div className="f-16 fw-500 mb-16">
                <span>Coach #1</span>
              </div>
              <div className="fw-400 mb-16">
                {/* <TagInput
									onInputChange={this.handleChange}
									callback={(tags: string[]) => {
										this.setState({
											emails: tags,
										});
									}}
								/> */}

                <InputFormAtom
                  label="Coach Email"
                  placeholder={"Enter Email"}
                  warning={""}
                  type="text"
                  showWarning={false}
                  isDropdown={false}
                  callback={(value: string) => {
                    this.setState({
                      email: value,
                    });
                  }}
                  id="email"
                  name="email"
                  value={email}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                  focusCallback={() => {}}
                />
              </div>
              {/* {this.isValid() && <p className='text-danger'>At least on manager invite</p>} */}
              <div>{errorMsg && <p className="text-danger">{errorMsg}</p>}</div>

              <div className="right flex align-center">
                <span className="secondary mr-16">3 of 4</span>
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
  classes,
}: StoreState): {
  classes: any;
} => {
  return {
    classes,
  };
};

export default connect(mapStateToProps, { inviteCoach, LoadingActionFunc })(
  InviteCoachPage
);