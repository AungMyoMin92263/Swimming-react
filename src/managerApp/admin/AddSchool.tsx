import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { postSchool } from "../../stores/actions/school-action";
import { SchoolInterface } from "../../stores/model/school-interface";
import { getItem, setItem } from "../../auth/LocalStorage";

interface IStates {
	name: string;
	isSchoolNameValid: boolean;
	isSchoolNameEmpty: boolean;
	nameMsg: string;
	image: any;
	isCompleted: boolean;
}

interface IProps {
	schools: SchoolInterface;
	postSchool: Function;
}
class AddSchoolPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			name: "",
			isSchoolNameValid: true,
			isSchoolNameEmpty: false,
			nameMsg: "",
			image: { preview: "", raw: "" },
			isCompleted: false,
		};
	}
	componentDidMount() {
		var schoolobj = JSON.parse(getItem("school") || "null");
		var schoolImage = getItem("school_img");
		var schoolImg = document.getElementById("logo") as HTMLImageElement;
		if (schoolImg != null) {
			// ⛔️ Property 'src' does not exist on type 'HTMLElement'.ts(2339)
			schoolImg.src = schoolImage || "logo.png";
		}
    // if (schoolobj.result) var school = schoolobj.result.data ;
    
		// if (school) {
		// 	this.setState({
		// 		name: school.name,
		// 		image: school.logo,
		// 	});
		// }
	}

	uploadImage = () => {};

	handleChange = (e: any) => {
		var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		if (!allowedExtensions.exec(e.target.files[0].name)) {
			alert("Invalid file type");
		} else {
			if (e.target.files.length) {
				let temp = this.state.image;
				temp.preview = URL.createObjectURL(e.target.files[0]);
				temp.raw = e.target.files[0];
				this.setState({
					image: temp,
				});
			}
		}
	};

	isValid = () => {
		if (this.state.name.length === 0 || this.state.image.raw === "")
			return false;
		else return true;
	};

	submit = async () => {
		if (this.isValid()) {	
			const formData = new FormData();
			formData.append("name", this.state.name);
			formData.append("logo", this.state.image.raw);
			await this.props.postSchool(formData);		
			setItem("schools_name", this.state.name);
			setItem("school_img", this.state.image.preview);
			setItem('school_img_file', this.state.image.raw)
			
			this.setState({
				isCompleted: true,
			});
		}
	};

	renderBtn = () => {
		if (!this.isValid()) {
			return (
				<button type='submit' className='idle-btn fw-600 ml-16'>
					Continue
				</button>
			);
		} else
			return (
				<>
					{this.state.isCompleted && (
						<Navigate to='/admin/invite-manager' replace={true} />
					)}
					<button
						type='submit'
						className='primary-btn fw-600 ml-16'
						onClick={this.submit}
					>
						Continue
					</button>
				</>
			);
	};

	render() {
		const { name, isSchoolNameEmpty, isSchoolNameValid, nameMsg } = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container'>
						<div className='content col-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-16'>
								<Link to='/admin/welcome' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='f-32 fw-500'>
								<span>Add a school.</span>
							</div>
							<div className='f-16 mb-16 fw-400'>
								<span>Get started by adding a school you manage.</span>
							</div>
							<div className='mb-16 align-center'>
								<label htmlFor='upload-button'>
									{this.state.image.preview ? (
										<>
											<img
												src={this.state.image.preview}
												alt='preview'
												className='preview-icon cursor'
											/>
											<span
												className='primary f-14 cursor'
												style={{ marginLeft: "18px" }}
											>
												&nbsp; Change Image
											</span>
										</>
									) : (
										<>
											<>
												<img
													id="logo"
													src='../../../assets/icons/upload.png'
													alt='upload'
													className='big-icon cursor'
												/>
												<span
													className='primary f-14 cursor'
													style={{ marginLeft: "18px" }}
												>
													&nbsp; Upload Image
												</span>
											</>
										</>
									)}
								</label>
								<input
									type='file'
									id='upload-button'
									style={{ display: "none" }}
									onChange={this.handleChange}
								/>
							</div>

							<div className='fw-400 mb-16'>
								<InputFormAtom
									label='School Name'
									placeholder={"Enter name of school"}
									warning={nameMsg}
									type='text'
									showWarning={isSchoolNameEmpty || !isSchoolNameValid}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											name: value,
										});
									}}
									id='addSchoolName'
									name='addSchoolName'
									value={name}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										// this.setState({
										//   isSchoolNameEmpty: false,
										//   isSchoolNameValid: true,
										// });
									}}
								/>
							</div>

							<div className='right flex-center'>
								<span className='secondary'>1 of 2</span>
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

export default connect(mapStateToProps, { postSchool })(AddSchoolPage);
