import React from "react";
import { connect } from "react-redux";
import InputFormAtom from "../../atoms/InputFormAtom";
import {
	AuthInterface,
	SignedUpInterface,
} from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signUp } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";

interface IStates {
	signUptoken: string | null;
	email: string | null;
	isReEnter: boolean;
	firstPassword: string;
	secondPassword: string;
	isFirstPasswordEmpty: boolean;
	isSecondPasswordEmpty: boolean;
	passwordMsg: string;
	passwordMatchMsg: string;
	isCompleted: boolean;
}
interface ParentCreatePasswordPage {
	signUp: Function;
	signedUpUser: SignedUpInterface;
}

type IProps = ParentCreatePasswordPage;

class ParentCreatePasswordPage extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props);
		console.log("props", props);
		this.state = {
			signUptoken: "",
			email: "",
			isReEnter: false,
			firstPassword: "",
			secondPassword: "",
			isFirstPasswordEmpty: false,
			isSecondPasswordEmpty: false,
			passwordMsg: "",
			passwordMatchMsg: "",
			isCompleted: false,
		};
	}
	componentDidMount = () => {
		const params = new URLSearchParams(window.location.search);
		const email = params.get("email");
		const signUptoken = params.get("token");
		this.setState({
			email: email,
			signUptoken: signUptoken,
		});
		console.log(email, signUptoken);
	};

	submit = () => {
		if (!this.state.isReEnter) {
			this.firstsubmit();
		} else {
			this.secondSumit();
		}
	};

	firstsubmit = () => {
		console.log(this.state.firstPassword);
		const { firstPassword }: IStates = this.state;

		if (firstPassword === "") {
			this.setState({
				passwordMsg: "Password can not be empty",
				isFirstPasswordEmpty: true,
			});
			return;
		} else {
			this.setState({
				isReEnter: true,
				isFirstPasswordEmpty: false,
				passwordMatchMsg: "",
			});
		}
	};

	secondSumit = () => {
		const { firstPassword, secondPassword }: IStates = this.state;
		if (secondPassword === "") {
			this.setState({
				passwordMsg: "Password can not be empty",
				isSecondPasswordEmpty: true,
			});
			return;
		}

		if (firstPassword !== secondPassword) {
			this.setState({
				passwordMatchMsg: "Password do not match",
				isSecondPasswordEmpty: false,
				isFirstPasswordEmpty: false,
				isReEnter: false,
				firstPassword: "",
				secondPassword: "",
			});
		} else {
			this.callback();
		}
	};

	callback = async () => {
		console.log("Call back", this.state.isCompleted);
		const { email, secondPassword, signUptoken }: IStates = this.state;
		await this.props.signUp({
			
			sign_token: signUptoken,
			password: secondPassword,
			user_role: 'parent'
		});
		if (this.props.signedUpUser.isSignedUp) {
			this.setState({
				isReEnter: false,
				isCompleted: true,
			});
		} else {
			this.setState({
				isSecondPasswordEmpty: false,
				isFirstPasswordEmpty: false,
				isReEnter: false,
				firstPassword: "",
				secondPassword: "",
			});
		}
	};

	renderPasswordInput = () => {
		if (!this.state.isCompleted) {
			if (!this.state.isReEnter) {
				return (
					<InputFormAtom
						label='Password'
						placeholder={"Enter your password"}
						warning={this.state.passwordMsg}
						type='password'
						showWarning={this.state.isFirstPasswordEmpty}
						isDropdown={false}
						callback={(value: string) => {
							this.setState({
								firstPassword: value,
							});
						}}
						id='firstPassword'
						name='firstPassword'
						value={this.state.firstPassword}
						required={true}
						maxLength={200}
						className=''
						clickCallback={() => {}}
					/>
				);
			} else {
				return (
					<InputFormAtom
						label='Password'
						placeholder={"Enter a password"}
						warning={this.state.passwordMsg}
						type='password'
						showWarning={this.state.isSecondPasswordEmpty}
						isDropdown={false}
						callback={(value: string) => {
							this.setState({
								secondPassword: value,
							});
						}}
						id='secondPassword'
						name='secondPassword'
						value={this.state.secondPassword}
						required={true}
						maxLength={200}
						className=''
						clickCallback={() => {}}
					/>
				);
			}
		}
	};
	renderTitle = () => {
		if (this.state.isReEnter) {
			return <span>Re-enter Password</span>;
		} else if (!this.state.isCompleted) {
			return <span>Create Password</span>;
		} else {
			return <span>Your account has been created!</span>;
		}
	};

	renderBtn = () => {
		if (this.state.isCompleted) {
			return (
				<Link to='/parent/login'>
					<button
						type='submit'
						className='primary-btn'
						onClick={() => this.submit()}
					>
						Done
					</button>
				</Link>
			);
		} else {
			return (
				<button
					type='submit'
					className='primary-btn'
					onClick={() => this.submit()}
				>
					Continue
				</button>
			);
		}
	};
	render(): React.ReactNode {
		const {
			email,
			firstPassword,
			secondPassword,
			isReEnter,
			isFirstPasswordEmpty,
			isSecondPasswordEmpty,
			passwordMsg,
			isCompleted,
		} = this.state;
		let { signedUpUser } = this.props;
		return (
			<div className='wrapper'>
				<div className='primary f-16 project-header'>
					<span>My Report Cards</span>
				</div>

				<div className='container-cus'>
					<div className='content'>
						<div className='title mb-32'>{this.renderTitle()}</div>
						<div className='mb-32'>
							{!isCompleted ? (
								<span className='emailWrapper fw-500 f-14'>{email}</span>
							) : (
								<span className='fw-400 f-16'>Welcome to My Report Cards!</span>
							)}
						</div>
						<div className='mb-32'>{this.renderPasswordInput()}</div>
						{<p className='text-danger'>{this.state.passwordMatchMsg}</p>}
						{signedUpUser.error && (
							<p className='text-danger'>{signedUpUser.error}</p>
						)}
						<div className='form-footer'>
							<span></span>
							{this.renderBtn()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({
	signedUpUser,
}: StoreState): {
	signedUpUser: SignedUpInterface;
} => {
	return {
		signedUpUser,
	};
};

export default connect(mapStateToProps, { signUp })(ParentCreatePasswordPage);
