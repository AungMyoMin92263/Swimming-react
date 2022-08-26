import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { inviteCoach } from "../../stores/actions/class-action";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import { removeItem } from "../../auth/LocalStorage";
import TagInput from "../../components/TagInput";

interface IStates {
	emails: string[];
	isCompleted: boolean;
}

interface IProps {
	emails: string[];
	classes : any;
	inviteCoach : Function;
}
class InviteCoachPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      emails : [],
	  isCompleted : false
    };
  }
  componentDidMount() {
    //loading
  }

  handleChange = (tags: string[]) => {
	this.setState({
		emails: tags,
	});
};

isValid = () => {
	if (this.state.emails.length === 0) return false;
	else return true;
};

  submit = async () => {
	if (this.isValid()) {
		if(this.props.classes.result){
		await this.props.inviteCoach({
			user_email: this.state.emails,
			class_id: this.props.classes.result.data.id,
		});

		this.setState({
			isCompleted: true,
		});
		removeItem('class');
		}
	}
};

renderBtn = () => {
	if (!this.isValid()) {
		return (
			<button type='submit' className='idle-btn fw-600 ml-16'>
				Done
			</button>
		);
	} else
		return (
			<>
				{this.state.isCompleted && (
					<Navigate to='/manager/invite-student' replace={true} />
				)}
				<button
					type='submit'
					className='primary-btn fw-600 ml-16'
					onClick={this.submit}
				>
					Done
				</button>
			</>
		);
}

  render() {
    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6'>
							<div className='f-14 mb-32'>
								<Link to='/admin/add-school' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>

							<div className='mb-16 flex'>
								<img
									src={"/assets/icons/logo.png"}
									alt='right-arrow'
									className='item-icon'
								/>
								<span className='f-16'>
									Dolphin Swimming School
								</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite a Coach.</span>
							</div>
							<div className='f-16 mb-16'>
								<span>Invite a coach to your class.</span>
							</div>

							<div className='fw-400 mb-16'>
								<TagInput
									onInputChange={this.handleChange}
									callback={(tags: string[]) => {
										this.setState({
											emails: tags,
										});
									}}
								/>
							</div>
							{/* {this.isValid() && <p className='text-danger'>At least on manager invite</p>} */}
							<div className='right flex-center'>
								<span className='secondary'>3 of 4</span>
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
	classes,
}: StoreState): {
	classes: any;
} => {
	return {
		classes,
	};
};

export default connect(mapStateToProps, { inviteCoach })(
	InviteCoachPage
);
