import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import ListItem from "../../atoms/ListItem";
import { getItem } from "../../auth/LocalStorage";
import { deleteSlot, getClassObject } from "./../../stores/actions";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import moment from "moment";

interface IStates {
  classId: any;
  userId: any;
  slot: any;
  classe: any;
  schoolId: number;
}

interface IProps {
  authUser: AuthInterface;
  history: any;
  student: any;
  deleteSlot: Function;
  classes: any;
  getClassObject: Function;
}

class ParentCancelBooking extends React.Component<IProps, IStates> {
  id: any;
  minuteObj: any = {
    first_slot: 0,
    second_slot: 10,
    third_slot: 20,
  };

  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[3];
    this.state = {
      classId: this.id ? this.id : -1,
      userId: -1,
      slot: null,
      classe: null,
      schoolId: -1,
    };
  }
  componentDidMount() {
    this.authFromLocal();
  }

  authFromLocal = async () => {
    let temp_slot = JSON.parse(getItem("selected-slot") || "null");
    if (temp_slot) {
      await this.setState({
        slot: temp_slot,
      });
    }

    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      if (user.userInfo.assign_class && user.userInfo.assign_class.length > 0) {
        await this.setState({
          ...this.state,
          schoolId: user.userInfo.assign_class[0].classes.school_id,
          userId: user.userInfo.id,
        });
        await this.getClass();
      }
    }
  };

  getClass = async () => {
    let url = "school/" + this.state.schoolId + "/class/" + this.state.classId;
    await this.props.getClassObject(url, true);
    if (this.props.classes && this.props.classes.viewClass) {
      await this.setState({
        ...this.state,
        classe: this.props.classes.viewClass,
      });
    }
  };

  cancel = async () => {
    await this.props.deleteSlot("class-slot", this.state.slot.id);
    this.props.history.go(-1);
  };

  render() {
    const receiver : any = this.props.authUser.userInfo;
    const { slot } = this.state;
    const classe = this.props.classes ? this.props.classes.viewClass : null;
    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile-cus-space bg-w col-sm-12">
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <div className="text-center">
              <div className="f-32 fw-500 pt-40 mb-32">
                <span>Confirm booking?</span>
              </div>
              {slot && classe && (
                <div className="mb-32">
                  <ListItem
                    callback={() => {}}
                    noMainText={true}
                    secondryText={true}
                    isSlot={true}
                    slot={slot}
                    isBooking={true}
                    arrowRight={false}
                  >
                    <>
                      <div className="slot-label">
                        <AccessTimeOutlinedIcon fontSize="small" />
                        <label>
                          {moment(`${classe.start_date} ${classe.end_time}`)
                            .add(
                              this.minuteObj[slot?.slot_type] || 0,
                              "minutes"
                            )
                            .format("hh:mm A")}
                          &nbsp;with Coach
                        </label>
                      </div>
                      <label>
                        This meeting will only last for 10 minutes to allow for
                        other parents and students.
                      </label>
                    </>
                  </ListItem>
                </div>
              )}
              <div className="flex-center mb-32">
                <div className="email-div-new">
                  <CreateProfile
                    image_url={receiver?.avatar || ""}
                    name={receiver?.parent_email || "Parent"}
                  />
                  <span className="email-div-name">{receiver?.parent_email}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="secondary-btn w-100"
              style={{ color: "#F80000", borderColor: "#F80000" }}
              onClick={this.cancel}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  authUser,
  badges,
  student,
  classes,
}: StoreState): {
  authUser: AuthInterface;
  badges: any;
  student: any;
  classes: any;
} => {
  return {
    authUser,
    badges,
    student,
    classes,
  };
};

export default connect(mapStateToProps, { deleteSlot, getClassObject })(
  ParentCancelBooking
);
