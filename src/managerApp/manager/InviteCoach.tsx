import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import {
  inviteCoach,
  LoadingActionFunc,
  getClassObject,
} from "../../stores/actions";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import {
  getItem,
  setItemWithObject,
} from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";

interface CoachViewModel {
  coachEmail: string;
  iscoachEmailValid: boolean;
  iscoachEmailEmpty: boolean;
  coachEmailMsg: string;
  status: string;
  errorMsg : string;
}

interface IStates {
  isCompleted: boolean;
  isValid: boolean;
  coaches: CoachViewModel[];
  coachEmailMsg: string;
  school_name: string;
  school_id: any;
  classObj: any;
}

interface IProps {
  classes: any;
  inviteCoach: Function;
  LoadingActionFunc: Function;
  getClassObject: Function;
}

class InviteCoachPage extends React.Component<IProps, IStates> {
  backUrl: any;
  url: any;
  id: any;
  constructor(props: any) {
    super(props);

    this.state = {
      isCompleted: false,
      coaches: [
        {
          coachEmail: "",
          iscoachEmailValid: false,
          iscoachEmailEmpty: true,
          coachEmailMsg: "",
          status: "init",
          errorMsg : '',
        },
      ],
      coachEmailMsg: "",
      school_name: "",
      school_id: null,
      classObj: null,
      isValid: false,
    };
  }
  componentDidMount() {
    let path = window.location.pathname.split("/");
    this.id = path[3];
    this.authFromLocal();
  }

  authFromLocal = async () => {
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo && user.userInfo.assign_school) {
      await this.setState({
        school_name: user.userInfo.assign_school.school.name,
        school_id: user.userInfo.assign_school.school.id,
      });

      if (!this.id) {
        const classObject = JSON.parse(getItem("class") || "null");
        if (classObject) {
          this.id = classObject.id;
          this.setState({
            classObj: classObject,
          });
          this.url = "/manager/invite-coach-summary/new/" + classObject.id;
        }
        this.backUrl = "/manager/set-date-time";
      } else {
        this.url = "/manager/invite-coach-summary/" + this.id;
        this.backUrl = "/manager/invite-coach-summary/" + this.id;
        this.getClass();
      }
      this.props.LoadingActionFunc(false);
    } else this.props.LoadingActionFunc(false);
  };

  getClass = async () => {
    if (this.state.school_id && this.id) {
      let url = "school/" + this.state.school_id + "/class/" + this.id;
      await this.props.getClassObject(url);
      if (this.props.classes && this.props.classes.result)
        this.setState({
          classObj: this.props.classes.result,
        });
    }
  };

  addCoach = () => {
    let temp = this.state.coaches;
    temp.push({
      coachEmail: "",
      iscoachEmailValid: false,
      iscoachEmailEmpty: true,
      coachEmailMsg: "",
      status: "init",
      errorMsg : '',
    });
    this.setState({
      coaches: temp,
      isValid: false,
    });
  };

  isValidated = () => {
    if (this.state.coaches.length > 0) {
      this.setState({ isValid: true });
      this.state.coaches.map((coach: any) => {
        if (
          coach.email === "" ||
          !coach.iscoachEmailValid ||
          coach.status === 'error'
        ) {
          this.setState({ isValid: false });
        }
      });
    } else {
      this.setState({ isValid: false });
    }
  };

  submit = async () => {
    if (this.state.isValid) {
      if (this.id) {
        if (this.state.coaches.length === 0){
          this.setState({isCompleted:true})
        }
        this.props.LoadingActionFunc(true);
        for (let i = 0; i < this.state.coaches.length; i++) {
          if (this.state.coaches[i].status === "init") {
            await this.props.inviteCoach({
              user_email: this.state.coaches[i].coachEmail,
              class_id: this.id,
            });
            if (this.props.classes && this.props.classes.error) {
              let temp = this.state.coaches;
              temp[i].status = "error";
              temp[i].errorMsg = this.props.classes.error;
              this.setState({
                isCompleted: false,
                coaches: temp,
                isValid: false,
              });
            } else {
              const coach = JSON.parse(getItem("coaches") || "null");
              let temp = this.state.coaches;
              temp[i].status = "success";
              temp[i].errorMsg = "";
              if (coach) {
                setItemWithObject("coaches", coach.concat(temp));
              } else setItemWithObject("coaches", temp);

              this.setState({
                coaches: temp,
              });
            }
            if(i === this.state.coaches.length - 1)this.checkBack();
          }
          if (i === this.state.coaches.length - 1) this.checkBack();
        }
        this.props.LoadingActionFunc(false);
      }
    }
  };

  checkBack = () => {
    if(this.state.coaches.length > 0){
      for (let i = 0; i < this.state.coaches.length; i++) {
        if(this.state.coaches[i].status === 'error')return;
        else if(this.state.coaches[i].status !== 'error' && i === this.state.coaches.length - 1){
          this.setState({
            isCompleted: true,
          });
          this.props.LoadingActionFunc(false);
        }
      }
    }
  }


  renderBtn = () => {
    if (!this.state.isValid) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Done
        </button>
      );
    } else
      return (
        <>
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

  removeCoach = async (index: number) => {
    let temp = this.state.coaches;
    temp.splice(index, 1);
    await this.setState({
      coaches: temp,
    });
    this.isValidated();
    this.getClass();
  };

  render() {
    const { coaches, coachEmailMsg, school_name, classObj } = this.state;
    return (
			<>
				{this.state.isCompleted && <Navigate to={this.url} replace={true} />}
				<div className='wrapper scroll-y'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6'>
							<div className='f-14 mb-32'>
								<Link
									to={
										this.id
											? "/manager/invite-coach-summary/" + this.id
											: "/manager/set-date-time"
									}
									style={{ textDecoration: "none" }}
								>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>

							<div className='mb-16 align-center'>
								<img
									src={
										classObj && classObj.logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + classObj.logo
											: placeholder
									}
									alt='logo'
									className={`${
										classObj && classObj.logo ? "item-icon" : "w-48"
									}`}
								/>
								
								<span className='f-16 mr-8'>{classObj && classObj.name}</span>
								<span className='fc-second'>({school_name})</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite a Coach.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Invite a coach to your class.</span>
							</div>
							{coaches &&
								coaches.length > 0 &&
								coaches.map((coach: any, index) => (
									<>
										<div>
											<div className='f-16 mb-16 fw-500 flex justify-space-between'>
												<span>Coach #{index + 1}</span>
												{index >= 0 && (
													<div
														onClick={() => {
															this.removeCoach(index);
														}}
														className='fc-primary cursor'
													>
														Clear
													</div>
												)}
											</div>

											<div className='fw-400 mb-16'>
												<InputFormAtom
													label='Coach Email'
													placeholder={"Enter Email"}
													warning={coach.errorMsg}
													type='text'
													disabled={coach.status === "success"}
													showWarning={false}
													isDropdown={false}
													callback={(value: string) => {
														this.isValidated();
														let temp = coaches;
														temp[index].coachEmail = value;
														this.setState({
															coaches: temp,
														});
													}}
													id='inviteCoachEmail'
													name='inviteCoachEmail'
													value={coach.coachEmail}
													required={true}
													maxLength={200}
													className=''
													clickCallback={() => {}}
													focusCallback={() => {
														let temp = coaches;
														temp[index].iscoachEmailEmpty = false;
														temp[index].iscoachEmailValid = true;
														temp[index].status = "init";
														this.setState({
															coaches: temp,
														});
													}}
													status={coach.status}
												/>
											</div>
											{coach && coach.errorMsg !== "" && (
												<p className='text-danger'>{coach.errorMsg}</p>
											)}
										</div>
									</>
								))}

							<div className='flex-center justify-space-between'>
								<div className='flex-center'>
									<div onClick={this.addCoach} className='cursor'>
										<AddIcon
											sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
										></AddIcon>
										<span className='primary'>Add another coach</span>
									</div>
								</div>

								<div className='flex-center'>
									<span className='secondary'>3 of 4</span>
									{this.renderBtn()}
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
  classes,
}: StoreState): {
  classes: any;
} => {
  return {
    classes,
  };
};

export default connect(mapStateToProps, {
  inviteCoach,
  LoadingActionFunc,
  getClassObject,
})(InviteCoachPage);
