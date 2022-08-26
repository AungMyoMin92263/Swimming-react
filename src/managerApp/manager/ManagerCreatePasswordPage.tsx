import React from "react";
import { connect } from "react-redux";
import InputFormAtom from "../../atoms/InputFormAtom";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signIn } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";

interface IStates {
	isReEnter: boolean;
	firstPassword: string;
	secondPassword: string;
	isFirstPasswordEmpty: boolean;
	isSecondPasswordEmpty: boolean;
	passwordMsg: string;
	passwordMatchMsg: string;
	isCompleted: boolean;
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
}

type IProps = UserSignInPage;

class ManagerCreatePasswordPage extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props);
		console.log("props", props);
		this.state = {
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
			this.setState({
				isReEnter: false,
				isCompleted: true,
			});
		}
		this.callback();
	};

	callback = () => {
		console.log("Call back", this.state.isCompleted);
		// const { email, password }: IStates = this.state;
		// this.props.signIn({ email: email, password: password });
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
				<Link to='/manager/login'>
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
			firstPassword,
			secondPassword,
			isReEnter,
			isFirstPasswordEmpty,
			isSecondPasswordEmpty,
			passwordMsg,
			isCompleted,
		} = this.state;
		let { authUser } = this.props;
		return (
			<div className='wrapper'>
				{authUser.isSignedIn && <Navigate to='/admin/welcome' replace={true} />}
				<div className='primary f-16 project-header'>
					<span>My Report Cards</span>
				</div>

				<div className='container-cus'>
					<div className='content'>
						<div className='title mb-32'>{this.renderTitle()}</div>
						<div className='mb-32'>
							{!isCompleted ? (
								<span className='emailWrapper fw-500 f-14'>
									azlan@gmail.com
								</span>
							) : (
								<span className='fw-400 f-16'>Welcome to My Report Cards!</span>
							)}
						</div>
						<div className='mb-32'>{this.renderPasswordInput()}</div>
						{<p className='text-danger'>{this.state.passwordMatchMsg}</p>}
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
	authUser,
}: StoreState): {
	authUser: AuthInterface;
} => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps, { signIn })(ManagerCreatePasswordPage);
