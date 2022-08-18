import React from "react";
import { connect } from "react-redux";
import InputFormAtom from "../../atoms/InputFormAtom";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signOut, signIn } from "../../stores/actions";
import { Navigate } from "react-router-dom";

interface IStates {
	email: string;
	password: string;
	isEmailValid: boolean;
	isEmailEmpty: boolean;
	isPasswordEmpty: boolean;
	emailMsg: string;
	passwordMsg: string;
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
}

type IProps = UserSignInPage;

class AdminLoginPage extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props);
		console.log("props", props);
		this.state = {
			email: "",
			password: "",
			isEmailValid: true,
			isEmailEmpty: false,
			isPasswordEmpty: false,
			emailMsg: "",
			passwordMsg: "",
		};
	}

	submit = () => {
		this.setState({
			isEmailValid: true,
			isEmailEmpty: false,
			isPasswordEmpty: false,
		});
		const { email, password }: IStates = this.state;

		if (email === "") {
			this.setState({
				emailMsg: "Email can not be empty",
				isEmailEmpty: true,
			});
			return;
		}

		if (!this.validateEmail(email)) {
			this.setState({
				emailMsg: "Email is invalid",
				isEmailValid: false,
			});
			return;
		}

		if (password === "") {
			this.setState({
				passwordMsg: "Email can not be empty",
				isPasswordEmpty: true,
			});
			return;
		}

		this.callback();
	};

	callback = () => {
		const { email, password }: IStates = this.state;
		this.props.signIn(email, password);
	};

	validateEmail = (email: string) => {
		return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
	};
	render(): React.ReactNode {
		const {
			email,
			password,
			emailMsg,
			isEmailEmpty,
			isEmailValid,
			isPasswordEmpty,
			passwordMsg,
		} = this.state;
		let { authUser } = this.props;
		return (
			<div className='wrapper'>
				{authUser.isSignedIn && <Navigate to='/admin/welcome' replace={true} />}
				<div className='primary f-16 project-header'>
					<span>My Report Cards</span>
				</div>

				<div className='container'>
					<div className='content col-lg-6 col-md-8 col-12'>
						<div className='title mb-16'>
							<span>Login</span>
						</div>
						<div className='mb-16'>
							<InputFormAtom
								label='Email Address'
								placeholder={"Enter your email address"}
								warning={emailMsg}
								type='email'
								showWarning={isEmailEmpty || !isEmailValid}
								isDropdown={false}
								callback={(value: string) => {
									this.setState({
										email: value,
									});
								}}
								id='signupEmail'
								name='signupEmail'
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
							/>
						</div>
						<div className='mb-32'>
							<InputFormAtom
								label='Password'
								placeholder={"Enter your password"}
								warning={passwordMsg}
								type='password'
								showWarning={isPasswordEmpty}
								isDropdown={false}
								callback={(value: string) => {
									this.setState({
										password: value,
									});
								}}
								id='signupPassword'
								name='signupPassword'
								value={password}
								required={true}
								maxLength={200}
								className=''
								clickCallback={() => {}}
							/>
						</div>
						{authUser.error && <p className='text-danger'>{authUser.error}</p>}
						<div className='form-footer'>
							<span>Forgot password?</span>
							<button
								type='submit'
								className='btn btn-primary right'
								onClick={() => this.submit()}
							>
								Login
							</button>
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

export default connect(mapStateToProps, { signIn })(AdminLoginPage);
