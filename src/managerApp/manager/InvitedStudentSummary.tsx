import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";

import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { InitialIcon } from "../../atoms/InitialIcon";
import { LoadingActionFunc } from "../../stores/actions";
interface IStates {
	students: any[];
	school_name: string;
	classObj:any;
}

interface IProps {
  classes: any;
  LoadingActionFunc : Function;
}
class InvitedStudentSummaryPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
			students: [],
			school_name: "",
			classObj:''
		};
  }
  componentDidMount() {
    const student = JSON.parse(getItem("students") || "null");
    if (student) {
      this.setState({
        students: student,
      });
    }
	const classObject = JSON.parse(getItem("class") || "null");
	this.setState({
		classObj: classObject,
	});

    const user = JSON.parse(getItem("authUser") || "null");
    if(user && user.userInfo && user.userInfo.assign_school) {
       this.setState({
        school_name : user.userInfo.assign_school.school.name,
       });
    }
	this.props.LoadingActionFunc(false);

  }

  render() {
    const { students, school_name, classObj } = this.state;
    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
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
								<span className='f-16'>
									{classObj && classObj.name} ({school_name})
								</span>
							</div>

							<div className='f-32 fw-500'>
								<span>Invite Students.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Invite students to your class.</span>
							</div>

							<div className='hr mb-16'></div>

							{students &&
								students.length > 0 &&
								students.map((student: any) => (
									<>
										<div className='f-16 mb-32 align-center'>
											<InitialIcon
												initials={student.studentEmail
													.substr(0, 1)
													.toUpperCase()}
													isFooterMenu={false}
											/>
											<span className='ml-16'>{student.studentName}</span>
										</div>

										<div className='hr mb-16'></div>
									</>
								))}
							<Link
								to='/manager/invite-student'
								style={{ textDecoration: "none" }}
							>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another student</span>
								</div>
							</Link>

							<div className='hr mb-32'></div>
							<Link to='/manager/dashboard' style={{ textDecoration: "none" }}>
								<button
									type='submit'
									className='primary-btn right'
									onClick={() => removeItem("class")}
								>
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

export default connect(mapStateToProps, { LoadingActionFunc })(InvitedStudentSummaryPage);
