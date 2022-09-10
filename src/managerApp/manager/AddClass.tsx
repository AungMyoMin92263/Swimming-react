import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import { postClass, putClass, getClassObject } from "../../stores/actions/class-action";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
interface IStates {
	classObj: any;
	isClassNameEmpty: boolean;
	classNameMsg: string;
	isCompleted: boolean;
	image: any;
	schoolId: any;
	school_name: string;
	school_logo: string;
	errorMsg: string;
	isChangeLogo: boolean;
}
interface IProps {
	classes: any;
	postClass: Function;
	putClass: Function;
	getClassObject : Function;
}

class AddClass extends React.Component<IProps, IStates> {
	id : any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3];
		this.state = {
			classObj: {
				id: this.id? this.id : -1,
				created_by: null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: new Date(),
				name: "",
				school_id: null,
				school_name: "",
				type: "one-day",
				open_days: ["mon"],
				start_time: "09:00",
				end_time: "10:00",
				start_date: null,
				logo: "",
				assign_user: [],
				studnetCount: 0,
			},
			isClassNameEmpty: true,
			classNameMsg: "",
			isCompleted: false,
			image: { preview: "", raw: "" },
			schoolId: -1,
			school_name: "",
			school_logo: "",
			errorMsg: "",
			isChangeLogo: false,
		};
	}

	componentDidMount() {
		
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo && user.userInfo.data.assign_school.length > 0) {
			this.setState({
				schoolId: user.userInfo.data.assign_school[0].school.id,
				school_name: user.userInfo.data.assign_school[0].school.name,
				school_logo: user.userInfo.data.assign_school[0].school.logo,
			});
		}

		if(this.state.classObj.id === -1){ 
			const classObject = JSON.parse(getItem("class") || "null");
		if (classObject) {
			this.setState({
				classObj: classObject,
			});
		}
		}else{
			this.getClass();
		}
	}

	getClass = async () => {
		await this.props.getClassObject('school/'+this.state.schoolId + '/class/'+ this.state.classObj.id);
		if(this.props.classes.result){
		  if (this.props.classes.error) {
			this.setState({
			  errorMsg:this.props.classes.error
			});
		  }else{
			let classe = this.props.classes.result;
			if (classe){
			  setItemWithObject("class", classe);
			this.setState({
			  classObj : classe
			});
			}
		  }
		}
	  }

	isValid = () => {
		if (
			this.state.classObj.name === "" ||
			(this.state.image.raw === "" && this.state.classObj.logo === "")
		)
			return false;
		else return true;
	};

	submit = async () => {
		const formData = new FormData();
		formData.append("name", this.state.classObj.name);
		formData.append("school_id", this.state.schoolId);
		formData.append("type", this.state.classObj.type);
		formData.append("start_time", this.state.classObj.start_time);
		formData.append("end_time", this.state.classObj.end_time);
		formData.append("open_days", this.state.classObj.open_days);
		// formData.append("start_date", this.state.classObj.start_date);
		formData.append(
			"start_date",
			this.state.classObj.start_date
				? this.state.classObj.start_date
				: new Date().toISOString()
		);

		if (this.state.classObj.id < 0) {
			formData.append("logo", this.state.image.raw);
		} else if (this.state.isChangeLogo) {
			formData.append("logo", this.state.image.raw);
		}

		if (this.isValid()) {
			let url = "school/" + this.state.schoolId + "/class";
			if (this.state.classObj.id < 0) {
				await this.props.postClass(formData, url);
				console.log("PROPS", this.props.classes.error);
				if (this.props.classes.error) {
					this.setState({
						isCompleted: false,
						errorMsg: this.props.classes.error,
					});
				} else {
					if (this.props.classes.result && this.props.classes.result.data) {
						setItemWithObject("class", this.props.classes.result.data);
						this.setState({
							isCompleted: true,
						});
					}
				}
			} else {
				await this.props.putClass(formData, url, this.state.classObj.id);
				if (this.props.classes.result && this.props.classes.result.data) {
					setItemWithObject("class", this.props.classes.result.data);
					this.setState({
						isCompleted: true,
					});
				}
			}
		}
	};

	// submit = async () => {
	//   if (this.isValid()) {
	//     await setItemWithObject("class", {
	// 			id: -1,
	// 			created_by: null,
	// 			created_at: new Date(),
	// 			updated_at: new Date(),
	// 			deleted_at: new Date(),
	// 			name: this.state.name,
	// 			school_id: this.state.schoolId,
	// 			school_name: this.state.school_name,
	// 			type: "",
	// 			open_days: [],
	// 			start_time: "",
	// 			end_time: "",
	// 			start_date: null,
	// 			logo: "",
	// 			assign_user: [],
	// 			studnetCount: 0,
	// 		});
	//     await setItemWithObject('image',this.state.image);
	//     this.setState({
	//       isCompleted : true
	//     })
	//   }
	// };

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
						<Navigate to='/manager/set-date-time' replace={true} />
					)}
					<button type='submit' className='primary-btn' onClick={this.submit}>
						Continue
					</button>
				</>
			);
	};

	renderImageUpload = () => {
		return (
			<div>
				<label htmlFor='upload-button'>
					{this.state.image.preview || this.state.classObj.logo !== "" ? (
						<>
							<img
								src={
									this.state.classObj.id === -1
										? this.state.image.preview
										: this.state.isChangeLogo
										? this.state.image.preview
										: process.env.REACT_APP_API_ENDPOINT +
										  "/" +
										  this.state.classObj.logo
								}
								alt='logo'
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
									id='logo'
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
		);
	};

	handleChange = (e: any) => {
		var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		if (!allowedExtensions.exec(e.target.files[0].name)) {
			alert("Invalid file type");
		} else {
			if (e.target.files.length) {
				let temp = this.state.image;
				temp.preview = URL.createObjectURL(e.target.files[0]);
				temp.raw = e.target.files[0];
				temp.fileName = e.target.files[0].name;
				this.setState({
					image: temp,
					isChangeLogo: this.state.classObj.id === -1 ? false : true,
				});
			}
		}
	};

	render() {
		const { classObj, school_name, school_logo, errorMsg } =
			this.state;

		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-32'>
								<Link
									to='/manager/dashboard'
									style={{ textDecoration: "none" }}
								>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='mb-16 align-center'>
								<img
									src={
										school_logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + school_logo
											: placeholder
									}
									alt='logo'
									className={`${school_logo ? "item-icon" : "w-48"}`}
								/>
								<span className='f-16'>{school_name}</span>
							</div>
							<div className='hr mb-16'></div>
							<div className='f-32 fw-500'>
								<span>Create a class</span>
							</div>
							<div className='f-16 mb-16 fw-400'>
								<span>
									Create a class to add students, parents and coaches.
								</span>
							</div>
							<div className='mb-16 align-center'>
								{this.renderImageUpload()}
							</div>
							<div className='fw-400 mb-16 f-12'>
								<InputFormAtom
									label='Class Name'
									placeholder={"Enter name of class"}
									warning={""}
									type='text'
									showWarning={false}
									isDropdown={false}
									callback={(value: string) => {
										let temp = this.state.classObj;
										temp.name = value;
										this.setState({
											classObj: temp,
										});
									}}
									id='addClassName'
									name='addClassName'
									value={classObj.name}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										this.setState({
											isClassNameEmpty: false,
										});
									}}
								/>
							</div>
							<div>{errorMsg && <p className='text-danger'>{errorMsg}</p>}</div>

							<div className='right flex align-center'>
								<span className='secondary mr-16'>1 of 4</span>
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

export default connect(mapStateToProps, { postClass, putClass, getClassObject })(AddClass);
