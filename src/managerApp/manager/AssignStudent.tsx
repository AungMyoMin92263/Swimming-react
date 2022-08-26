import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { SchoolInterface } from "../../stores/model/school-interface";
import { inviteManager } from "../../stores/actions/school-action";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";

interface IStates {
  emails: string[];
  isCompleted: boolean;
}

interface IProps {
  schools: any;
  inviteManager: Function;
}

class AssignStudentPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    console.log("props", props);
    this.state = {
      emails: [],
      isCompleted: false,
    };
  }
  componentDidMount() {}

  handleChange = (tags: string[]) => {
    console.log("tags", tags);
    this.setState({
      emails: tags,
    });
  };

  isValid = () => {
    if (this.state.emails.length === 0)
      return false;
    else return true;
  };

  submit = async () => {
    if (this.isValid()) {
      // await this.props.inviteManager({
      //   user_email: this.state.emails,
      //   schoold_id: this.props.schools.result.data.id,
      // });

      this.setState({
        isCompleted: true,
      });
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
            <Navigate to="/manager/event-list" replace={true} />
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
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content col-lg-6">
              <div className="f-14 mb-32">
                <Link to="/admin/add-school" style={{ textDecoration: "none" }}>
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                </Link>
              </div>

              <div className="mb-16 flex">
                <img
                  src={
                    this.props.schools.result
                      ? "http://localhost:3000/api/" +
                        this.props.schools.result.data.logo
                      : "../../../assets/icons/logo.png"
                  }
                  alt="right-arrow"
                  className="item-icon"
                />
                <span className="f-16">
                100m Freestyle (Male 9-10 y/o)
                </span>
              </div>
              <div className="hr mb-32"></div>
              <div className="f-32 fw-500">
                <span>Assign Students.</span>
              </div>
              <div className="f-16 mb-32">
                <span>Assign students to your event.</span>
              </div>
              <div className="f-12 mb-16">
                <span>Student(s)</span>
              </div>
              <div className="fw-400 mb-16">
                <TagInput onInputChange={this.handleChange} />
              </div>

              <div className="right flex-center">
                <span className="secondary">2 of 2</span>
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
  schools: SchoolInterface;
} => {
  return {
    schools,
  };
};

export default connect(mapStateToProps, { inviteManager })(AssignStudentPage);
