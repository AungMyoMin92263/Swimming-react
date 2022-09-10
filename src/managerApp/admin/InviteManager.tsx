import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { SchoolInterface } from "../../stores/model/school-interface";
import { inviteManager } from "../../stores/actions/school-action";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from './../../assets/images/place-holder.png';
interface IStates {
	emails: string[];
	isCompleted: boolean;
	errorMsg:string;
	url : string;
}

interface IProps {
	emails: string[];
	schools: any;
	inviteManager: Function;
}

class InviteManagerPage extends React.Component<IProps, IStates> {
	schoolImage: string | undefined;
	url = '/admin/add-school/';

	constructor(props: any) {
		super(props);

		this.state = {
			emails: [],
			isCompleted: false,
			errorMsg:'',
			url : '',
		};
	}
	componentDidMount() {

	}

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
				await this.props.inviteManager({
					user_email: this.state.emails,
					schoold_id: this.props.schools.result.data.id,
				});
			}
			console.log(this.props.schools)
			if (!this.props.schools.error) {
				this.setState({
					isCompleted: true,
					
				});
				
			}else{
				this.setState({
					isCompleted:false,
					errorMsg: this.props.schools.error.message[0]
				})
				
			}
			}	
	};

	back = () => {
		this.setState({
			url : this.url + this.props.schools.result.data.id
		});
	  };

	renderBtn = () => {
		if (!this.isValid()) {
			return (
				<button type='submit' className='idle-btn fw-600 ml-16' onClick={() => removeItem("school")}>
					Done
				</button>
			);
		} else
			return (
				<>
					<button
						type='submit'
						className='primary-btn fw-600 ml-16'
						onClick={this.submit}
					>
						Done
					</button>
				</>
			);
	};

	render() {
		const {errorMsg,url} = this.state;
		return (
			<>
				<div className='wrapper'>
				{this.state.isCompleted && (
						<Navigate to='/admin/add-more-school' replace={true} />
					)}
					{url !== '' && <Navigate to={url} replace={true} />}

					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6'>
							<div className='f-14 mb-32' onClick={this.back}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
							</div>

							<div className='mb-16 align-center'>
								<img
									src={
										this.props.schools.result
											? process.env.REACT_APP_API_ENDPOINT +
											  "/" +
											  this.props.schools.result.data.logo
											: placeholder
									}
									alt='logo'
									id='logo'
									className={`${
										this.props.schools.result ? "item-icon" : "w-48"
									}`}
								/>

								<span className='f-16'>
									{this.props.schools.result &&
										this.props.schools.result.data.name}
								</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite a Manager.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Invite a manager to help you run your operations.</span>
							</div>
							<div className='f-12'>
								<span>School Manager(s)</span>
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
							{errorMsg && (
								<p className='text-danger'>
									{errorMsg}
								</p>
							)}
							<div className='right flex-center'>
								<span className='secondary'>2 of 2</span>
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

export default connect(mapStateToProps, { inviteManager })(
	InviteManagerPage
);
