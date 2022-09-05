import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";

import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";

interface IStates {
  students: any[];
  school_name : string
}

interface IProps {
  classes: any;
}
class InvitedStudentSummaryPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      students: [],
      school_name : ''
    };
  }
  componentDidMount() {
    const student = JSON.parse(getItem("students") || "null");
    if (student) {
      this.setState({
        students: student,
      });
    }

    const user = JSON.parse(getItem("authUser") || "null");
    if(user && user.userInfo && user.userInfo.data.assign_school.length > 0) {
       this.setState({
        school_name : user.userInfo.data.assign_school[0].school.name,
       });
    }
  }

  render() {
    const { students, school_name } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content col-lg-6 col-md-6 col-sm-12">
              <div className="mb-16 align-center">

              <img
                  src={
                    this.props.classes.result && this.props.classes.result.data.logo
                      ? process.env.REACT_APP_API_ENDPOINT +
                        "/" +
                        this.props.classes.result.data.logo
                      : placeholder
                  }
                  alt="logo"
                  className={`${
                    this.props.classes.result &&  this.props.classes.result.data.logo ? "item-icon" : "w-48"
                  }`}
                />
                <span className="f-16">{  this.props.classes.result && this.props.classes.result.data.name } ({school_name})</span>
              </div>

              <div className="f-32 fw-500">
                <span>Invite Students.</span>
              </div>
              <div className="f-16 mb-32">
                <span>Invite students to your class.</span>
              </div>

              <div className="hr mb-16"></div>

              {students &&
                students.length > 0 &&
                students.map((student: any) => (
                  <>
                    <div className="f-16 mb-32">
                      <img
                        src="../../../assets/icons/alpha.png"
                        alt="alpha"
                        className="icon mr-8"
                      />
                      <span>{student.studentName}</span>
                    </div>

                    <div className="hr mb-16"></div>
                  </>
                ))}
              <Link
                to="/manager/invite-student"
                style={{ textDecoration: "none" }}
              >
                <div className="mb-16 align-center">
                  <AddIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></AddIcon>
                  <span className="primary">Add another student</span>
                </div>
              </Link>

              <div className="hr mb-32"></div>
              <Link to="/manager/dashboard" style={{ textDecoration: "none" }}>
                <button type="submit" className="primary-btn right" onClick={()=>removeItem("class")}>
                  Done
                </button>
              </Link>
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

export default connect(mapStateToProps, {})(InvitedStudentSummaryPage);
