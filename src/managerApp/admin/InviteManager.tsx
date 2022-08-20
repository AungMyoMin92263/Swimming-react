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
  isCompleted : boolean;
}

interface IProps {
  schools: any;
  inviteManager: Function;
}

class InviteManagerPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    console.log("props", props);
    this.state = {
      emails: [],
	  isCompleted : false
    };
  }
  componentDidMount() {}

  handleChange = (tags : string[]) => {
	console.log('tags',tags)
	this.setState({
		emails : tags
	});
  }

  isValid = () => {
	return true;
    // if (this.state.emails.length === 0)
    //   return false;
    // else return true;
  };

  submit = async () => {
    if (this.isValid()) {
	await this.props.inviteManager({user_email : this.state.emails,schoold_id : this.props.schools.result.data.id});

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
            <Navigate to="/admin/add-more-school" replace={true} />
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
    const { emails } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container">
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
                    this.props.schools.result? "http://localhost:3000/api/" + this.props.schools.result.data.logo : '../../../assets/icons/logo.png'
                  }
                  alt="right-arrow"
                  className="item-icon"
                />
                <span className="f-16">
                  {this.props.schools.result? this.props.schools.result.data.name : ''}
                </span>
              </div>
              <div className="hr mb-32"></div>
              <div className="f-32 fw-500">
                <span>Invite a Manager.</span>
              </div>
              <div className="f-16 mb-16">
                <span>Invite a manager to help you run your operations.</span>
              </div>
              <div className="fw-400 mb-16">
                <TagInput onInputChange={this.handleChange}/>
                {/* <InputFormAtom
									label='School Manager(s)'
									placeholder={"Enter email(s), comma separated"}
									warning={emailMsg}
									type='text'
									showWarning={isEmailEmpty || !isEmailValid}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											email: value,
										});
									}}
									id='inviteManager'
									name='inviteManager'
									value={email}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										this.setState({
											isEmailEmpty: false,
											isEmailValid: true,
										});
									}}
								/> */}
              </div>
              {/* <div className="flex-center justify-space-between">
                <div className="flex-center">
                  <div
                    style={{
                      transform: " rotate(-45deg)",
                      marginBottom: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    <LinkIcon
                      sx={{ color: "#0070F8", fontSize: 22, mr: 0.5 }}
                    ></LinkIcon>
                  </div>

                  <span className="primary f-14 cursor">Copy invite link</span>
                </div>

                <div className="flex-center">
                  <span>2 of 2</span>
                  <Link to="/admin/add-more-school">
                    <button type="submit" className="idle-btn ml-16">
                      Done
                    </button>
                  </Link>
                </div>
              </div> */}

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

export default connect(mapStateToProps, {inviteManager})(InviteManagerPage);
