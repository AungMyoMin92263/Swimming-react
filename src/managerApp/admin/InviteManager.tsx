import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
import { SchoolInterface } from "../../stores/model/school-interface";
import { inviteManager } from "../../stores/actions/school-action";
import { postSchool } from "../../stores/actions/school-action";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";
import { getItem } from "../../auth/LocalStorage";

interface IStates {
	emails: string[];
	isCompleted: boolean;
}

interface IProps {
	emails: string[];
	schools: any;
	inviteManager: Function;
	postSchool: Function;
}

class InviteManagerPage extends React.Component<IProps, IStates> {
	schoolImage: string | undefined;
	constructor(props: any) {
		super(props);

		console.log("props", props);
		this.state = {
			emails: [],
			isCompleted: false,
		};
		// this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount() {

		console.log("PROPS",this.props.schools)
		this.schoolImage = getItem("school_img") || undefined;
		var schoolImg = document.getElementById("logo") as HTMLImageElement;
		if (schoolImg != null) {
			
			schoolImg.src = this.schoolImage || "logo.png";
		}
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
		console.log("click");
		if (this.isValid()) {


			let school_img_file : string | any = getItem("school_img_file") || new Blob();
			
			const formData = new FormData();
			var schoolName = getItem("schools_name");
			if (schoolName) formData.append("name", schoolName);
			formData.append("logo", school_img_file);

			await this.props.postSchool(formData);
			


			await this.props.inviteManager({
				user_email: this.state.emails,
				schoold_id: this.props.schools.result.data.id,
			});

			this.setState({
				isCompleted: true,
			});
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
						<Navigate to='/admin/add-more-school' replace={true} />
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
	};

	render() {
		const { emails } = this.state;

		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container'>
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
								<img src={this.schoolImage} alt='logo' id='logo' className='item-icon' />

								<span className='f-16'>{getItem("schools_name")}</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite a Manager.</span>
							</div>
							<div className='f-16 mb-16'>
								<span>Invite a manager to help you run your operations.</span>
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

export default connect(mapStateToProps, { inviteManager, postSchool })(
	InviteManagerPage
);
