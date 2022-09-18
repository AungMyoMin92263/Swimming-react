import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import { InputDecimal } from "../../atoms/InputDecimal";
import InputFormAtom from "../../atoms/InputFormAtom";
import { getEventsRecordDetail, postEventsRecord } from "../../stores/actions";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
interface IStates {
  studentId: number,
  name: string,
  isNameValid: boolean,
  isNameEmpty: boolean,
  NameMsg: string
}

interface IProps {
  authUser: AuthInterface
  events: any
  getEventsRecordDetail: Function
  postEventsRecord: Function
  history: any;
}

class CoachCreateStudentRecordPage extends React.Component<IProps, IStates> {
  id: any;
  urlDailyProgram = '';
  urlEnterComment = '';
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      studentId: this.id ? this.id : -1,
      name: "",
      isNameValid: true,
      isNameEmpty: false,
      NameMsg: "",
    };
  }
  componentDidMount() {
    if (!this.props.authUser.viewStudent && !this.props.events.eventDetail)
      this.props.history.back()
  }


  createRecord = async () => {
    const { name }: IStates = this.state;
    const { viewStudent } = this.props.authUser
    const { eventDetail } = this.props.events
    if (name === "") {
      this.setState({
        NameMsg: "Record can not be empty",
        isNameValid: false,
        isNameEmpty: true,
      });
      return;
    }
    let postData = {
      "user_id": viewStudent.id,
      "event_id": eventDetail.id,
      "record": this.state.name
    }
    await this.props.postEventsRecord(postData)
    this.props.history.back()
  }

  render() {
    const { viewStudent } = this.props.authUser
    const { eventDetail } = this.props.events
    const {
      name,
      isNameValid,
      isNameEmpty,
      NameMsg,
    } = this.state;
    return (
      <div className="wrapper-mobile bg-w">
        <div className="content-mobile-cus-space col-sm-12">
          <CoachMobileHeader backBtn={true} ></CoachMobileHeader>
          <div className="mini-profile pt-24">
            <div className="img-profile">
              <CreateProfile image_url={viewStudent?.avatar} name={viewStudent?.name || "User"} />
            </div>
            <div className="profile-name">
              {viewStudent?.name || viewStudent?.email}
            </div>
          </div>
          <div className='page-tile pt-16 pb-40'>
            <span>{eventDetail?.name}</span>
          </div>

          <div className="mb-16">
            <InputDecimal
              label="Timing"
              placeholder={"0.00"}
              warning={NameMsg}
              showWarning={isNameEmpty || !isNameValid}
              callback={(value: string) => {
                this.setState({
                  name: value,
                });
              }}
              id="badgeName"
              name="badgeName"
              value={name}
              required={true}
              maxLength={200}
              className=""
              clickCallback={() => { }}
              focusCallback={() => {
                this.setState({
                  isNameEmpty: false,
                  isNameValid: true,
                });
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary right w-100" onClick={() => this.createRecord()}>
            Done
          </button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({
  events,
  authUser
}: StoreState): {
  events: any
  authUser: AuthInterface
} => {
  return {
    events,
    authUser
  };
};

export default connect(mapStateToProps, { getEventsRecordDetail, postEventsRecord })(CoachCreateStudentRecordPage)