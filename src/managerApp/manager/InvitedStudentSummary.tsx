import React from "react";

// icon
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";

import { IPageProp } from "../../pagePropsInterface";
import { getItem } from "../../auth/LocalStorage";

interface IStates {
  students: any[];
}

class InvitedStudentSummaryPage extends React.Component<IPageProp, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    const student = JSON.parse(getItem("students") || "null");
    if (student) {
      this.setState({
        students: student,
      });
    }
  }

  render() {
    const { students } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content col-lg-6 col-md-6 col-sm-12">
              <div className="mb-16 flex">
                <img
                  src={"/assets/icons/logo.png"}
                  alt="right-arrow"
                  className="item-icon"
                />
                <span className="f-16">Dolphin Swimming School</span>
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
                <button type="submit" className="primary-btn right">
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

export default InvitedStudentSummaryPage;
