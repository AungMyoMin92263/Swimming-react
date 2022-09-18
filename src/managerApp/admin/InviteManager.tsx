import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { SchoolInterface } from "../../stores/model/school-interface";
import { inviteManager } from "../../stores/actions/school-action";
import { LoadingActionFunc,getSchoolObj } from "../../stores/actions";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";
import { getItem, removeItem, setItemWithObject } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
interface IStates {
  emails: string[];
  isCompleted: boolean;
  errorMsg: string;
  url: string;
  managerUrl : string;
  goBack: boolean;
  goBackManager : boolean;
  name: string;
  school_id: number;
  image: any;
  logo: string;
}

interface IProps {
  emails: string[];
  schools: any;
  inviteManager: Function;
  LoadingActionFunc: Function;
  getSchoolObj : Function;
}

class InviteManagerPage extends React.Component<IProps, IStates> {
  schoolImage: string | undefined;
  url = "/admin/add-school/";
id : any;
  constructor(props: any) {
    super(props);
	let path = window.location.pathname.split("/");
    this.id = path[3];

    this.state = {
      emails: [],
      isCompleted: false,
      errorMsg: "",
      url: "",
	  managerUrl : this.id? "/admin/invite-manager-summary/"+ this.id : "",
      goBack: false,
	  goBackManager : false,
      school_id: -1,
      image: "",
      logo: "",
      name: "",
    };
  }
  componentDidMount() {
	if (this.id) this.getSchool();
	else {
		
		let school = getItem("school");
		if (school) {
		  let school1 = JSON.parse(school);
		  if (school1) {
			this.setState({
			  logo: school1.logo,
			  school_id: school1.id,
			  name: school1.name,
			});
		  }
		}
		this.props.LoadingActionFunc(false);
	}
  }

  getSchool = async () => {
    await this.props.getSchoolObj("schools/" + this.id);

    if (this.props.schools.result) {
      if (this.props.schools.error) {
        this.setState({
          errorMsg: this.props.schools.error,
        });
      } else {
        let school1 = this.props.schools.result;
        if (school1) {
			this.setState({
				logo: school1.logo,
				school_id: school1.id,
				name: school1.name,
			});
		  setItemWithObject("school", school1);
        }

      }
      this.props.LoadingActionFunc(false);
    }
  };

  handleChange = (tags: string[]) => {
    this.setState({
      emails: tags,
    });
  };

  isValid = () => {
    // return true;
    if (this.state.emails.length === 0) return false;
    else return true;
  };

  submit = async () => {
    if (this.isValid()) {
      if (this.props.schools.result) {
        this.props.LoadingActionFunc(true);
        await this.props.inviteManager({
          user_email: this.state.emails,
          schoold_id: this.state.school_id,
        });
      }
      console.log(this.props.schools);
      if (!this.props.schools.error) {
        this.setState({
          isCompleted: true,
        });

      } else {
        this.setState({
          isCompleted: false,
          errorMsg: this.props.schools.error.message[0],
        });
		this.props.LoadingActionFunc(false);

      }
    }
  };

  back = () => {
    this.setState({
      url: this.url + this.state.school_id,
      goBack: true,
	  goBackManager : true
    });
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button
          type="submit"
          className="idle-btn fw-600 ml-16"
          onClick={() => removeItem("school")}
        >
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

  render() {
    const { errorMsg, url, goBack,managerUrl,goBackManager } = this.state;
    return (
      <>
        {goBack && <Navigate to={url} replace={true} />}
		{goBackManager && <Navigate to={managerUrl} replace={true} />}

		
        <div className="wrapper">
          {this.state.isCompleted && !this.id && (
            <Navigate to="/admin/add-more-school" replace={true} />
          )}
		   {this.state.isCompleted && this.id && (
            <Navigate to={managerUrl} replace={true} />
          )}

          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content col-lg-6">
              <div className="f-14 mb-32 primary cursor" onClick={this.back}>
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
                <span>Back</span>
              </div>

              <div className="mb-16 align-center">
                <img
                  src={
                    this.state.logo !== ""
                      ? process.env.REACT_APP_API_ENDPOINT +
                        "/" +
                        this.state.logo
                      : placeholder
                  }
                  alt="logo"
                  id="logo"
                  className={`${this.state.logo ? "item-icon" : "w-48"}`}
                />

                <span className="f-16">{this.state.name}</span>
              </div>
              <div className="hr mb-32"></div>
              <div className="f-32 fw-500">
                <span>Invite a Manager.</span>
              </div>
              <div className="f-16 mb-32">
                <span>Invite a manager to help you run your operations.</span>
              </div>
              <div className="f-12">
                <span>School Manager(s)</span>
              </div>
              <div className="fw-400 mb-16">
                <TagInput
                  onInputChange={this.handleChange}
                  callback={(tags: string[]) => {
                    this.setState({
                      emails: tags,
                    });
                  }}
                />
              </div>
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
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

export default connect(mapStateToProps, { inviteManager, LoadingActionFunc, getSchoolObj })(
  InviteManagerPage
);
