import React from "react";

// import csss
import "../admin/AdminDashboard.css";
import "./ManagerDashboard.css";

import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signIn } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputFormAtom from "../../atoms/InputFormAtom";
import "./tabs.scss";
interface IStates {
  event: any;
  isCompleted: boolean;
  EventNameMsg: string;
  isEventNameEmpty: boolean;
  isStrokeEmpty: boolean;
  isLengthEmpty: boolean;
  isGenderClassEmpty: boolean;
  isAgeClassFromEmpty: boolean;
  isAgeClassToEmpty: boolean;
  selectedTab: string;
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
}

type IProps = UserSignInPage;

class AddEventPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      event: {
        name: "",
        stroke: "",
        length: "",
        genderClass: "",
        ageClassFrom: 0,
        ageClassTo: 0,
      },
      isCompleted: false,
      EventNameMsg: "",
      isEventNameEmpty: false,
      isStrokeEmpty: false,
      isLengthEmpty: false,
      isGenderClassEmpty: false,
      isAgeClassFromEmpty: false,
      isAgeClassToEmpty: false,
      selectedTab: "Male",
    };
  }

  componentDidMount() {
    //loading
  }

  isValid = () => {
    if (
      this.state.event.name === "" ||
      this.state.event.stroke === "" ||
      this.state.event.length === "" ||
      this.state.event.genderClass === "" ||
      this.state.event.ageClassFrom === 0 ||
      this.state.event.ageClassTo === 0
    )
      return false;
    else return true;
  };

  handleChange = (newValue: string) => {
    let temp = this.state.event;
    temp.genderClass = newValue;
    this.setState({
      event: temp,
    });
  };

  submit = () => {
	if(this.isValid()){
		this.setState({
			isCompleted: true,
		});
	}
  }

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
            <Navigate to="/manager/assign-student" replace={true} />
          )}
          <button type="submit" className="primary-btn" onClick={this.submit}>
            Done
          </button>
        </>
      );
  };

  setTab = async (tab : string) => {
	let temp = this.state.event;
	temp.genderClass = tab;
	await this.setState({ 
		selectedTab: tab,
		event : temp
	 });
	console.log('selectedTab',this.state.selectedTab);
  }

  renderTabs = () => {
    switch (this.state.selectedTab.toLowerCase()) {
      case "male": {
        return (
          <div className="tab">
            <div
              className="tab-item-selected"
              onClick={()=> this.setTab('Male')}
            >
              <span>Male</span>
            </div>
            <div className="tab-item"
			 onClick={()=> this.setTab('Female')}>
              <span>Female</span>
            </div>
            <div className="tab-item"
			onClick={()=> this.setTab('Mixed')}>
              <span>Mixed</span>
            </div>
          </div>
        );
      }
	  case "female": {
        return (
          <div className="tab">
            <div
              className="tab-item-selected"
              onClick={()=> this.setTab('Male')}
            >
              <span>Male</span>
            </div>
            <div className="tab-item"
			 onClick={()=> this.setTab('Female')}>
              <span>Female</span>
            </div>
            <div className="tab-item"
			onClick={()=> this.setTab('Mixed')}>
              <span>Mixed</span>
            </div>
          </div>
        );
      }
	  case "mixed": {
        return (
          <div className="tab">
            <div
              className="tab-item-selected"
              onClick={()=> this.setTab('Male')}
            >
              <span>Male</span>
            </div>
            <div className="tab-item"
			 onClick={()=> this.setTab('Female')}>
              <span>Female</span>
            </div>
            <div className="tab-item"
			onClick={()=> this.setTab('Mixed')}>
              <span>Mixed</span>
            </div>
          </div>
        );
      }
    }
  };

  render() {
    const {
      event,
      EventNameMsg
    } = this.state;

    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content col-6 col-md-6 col-sm-12">
              <div className="f-14 mb-32">
                <Link
                  to="/manager/event-list"
                  style={{ textDecoration: "none" }}
                >
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                </Link>
              </div>

              <div className="f-32 fw-500 mb-16">
                <span>Create an event.</span>
              </div>
              <div className="f-16 mb-32 fw-400">
                <span>Create an event to assign to students.</span>
              </div>
              <div className="fw-400 mb-16 f-12">
                <InputFormAtom
                  label="Event Name"
                  placeholder={"Enter name of Event"}
                  warning={EventNameMsg}
                  type="text"
                  showWarning={false}
                  isDropdown={false}
                  callback={(value: string) => {
                    let temp = event;
                    temp.name = value;
                    this.setState({
                      event: temp,
                    });
                  }}
                  id="addEventName"
                  name="addEventName"
                  value={event.name}
                  required={true}
                  maxLength={200}
                  className=""
                  clickCallback={() => {}}
                  focusCallback={() => {
                    this.setState({
                      isEventNameEmpty: false,
                    });
                  }}
                />
              </div>

              <div className="flex">
                <div className="fw-400 mb-16 f-12 mr-16">
                  <InputFormAtom
                    label="Stroke"
                    placeholder={"Enter Stroke of Event"}
                    warning={EventNameMsg}
                    type="text"
                    showWarning={false}
                    isDropdown={false}
                    callback={(value: string) => {
                      let temp = event;
                      temp.stroke = value;
                      this.setState({
                        event: temp,
                      });
                    }}
                    id="addStroke"
                    name="addStroke"
                    value={event.stroke}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isStrokeEmpty: false,
                      });
                    }}
                  />
                </div>
                <div className="fw-400 mb-16 f-12">
                  <InputFormAtom
                    label="Length"
                    placeholder={"Enter Length of Event"}
                    warning={EventNameMsg}
                    type="text"
                    showWarning={false}
                    isDropdown={false}
                    callback={(value: string) => {
                      let temp = event;
                      temp.length = value;
                      this.setState({
                        event: temp,
                      });
                    }}
                    id="addLength"
                    name="addLength"
                    value={event.length}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isLengthEmpty: false,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="fw-400 mb-8 f-12">
                <span>Age Class</span>
              </div>
              <div className="flex">
                <div className="fw-400 mb-16 f-12 mr-16">
                  <InputFormAtom
                    label=""
                    placeholder={"Enter From"}
                    warning={EventNameMsg}
                    type="text"
                    showWarning={false}
                    isDropdown={false}
                    callback={(value: string) => {
                      let temp = event;
                      temp.ageClassFrom = value;
                      this.setState({
                        event: temp,
                      });
                    }}
                    id="addFrom"
                    name="addFrom"
                    value={event.ageClassFrom}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isAgeClassFromEmpty: false,
                      });
                    }}
                  />
                </div>
                <div className="fw-400 mb-16 f-12">
                  <InputFormAtom
                    label=""
                    placeholder={"Enter To"}
                    warning={EventNameMsg}
                    type="text"
                    showWarning={false}
                    isDropdown={false}
                    callback={(value: string) => {
                      let temp = event;
                      temp.ageClassTo = value;
                      this.setState({
                        event: temp,
                      });
                    }}
                    id="addTo"
                    name="addTo"
                    value={event.ageClassTo}
                    required={true}
                    maxLength={200}
                    className=""
                    clickCallback={() => {}}
                    focusCallback={() => {
                      this.setState({
                        isAgeClassToEmpty: false,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="fw-400 mb-8 f-12">
                <span>Gender Class</span>
              </div>
              <div className="mb-32">{this.renderTabs()}</div>

			  <div className="right flex-center">
                <span className="secondary mr-8">1 of 2</span>
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
  authUser,
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, { signIn })(AddEventPage);
