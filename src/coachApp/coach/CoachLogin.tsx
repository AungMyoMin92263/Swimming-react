import React from "react";
import { connect } from "react-redux";
import InputFormAtom from "../../atoms/InputFormAtom";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signIn } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { removeItem, setItemWithObject } from "../../auth/LocalStorage";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";

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

class CoachLoginPage extends React.Component<IProps, IStates> {
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

	callback = async () => {
		const { email, password }: IStates = this.state;
		await this.props.signIn({
			email: email,
			role: "coache",
			password: password,
		});
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
			<div className='wrapper-mobile'>
				<div className='content-mobile-cus center col-sm-12'>
					{authUser.isSignedIn && (
						<Navigate to='/coach/welcome' replace={true} />
					)}
					<CoachMobileHeader title={true}></CoachMobileHeader>
					<span className='f-10 pt-40'>Coach's</span>
					<div className='fw-500 f-32  pb-40'>
						<span>Log In</span>
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

					<div className='center mb-16 mt-120 fw-500'>
						<Link
							to='/coach/recover-password'
							style={{ textDecoration: "none" }}
						>
							<span className='f-14 primary'>Forgot password?</span>
						</Link>
					</div>

					<button
						type='submit'
						className='btn btn-primary mobile-btn cus-primay-btn-m'
						onClick={() => this.submit()}
					>
						Login
					</button>
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

export default connect(mapStateToProps, { signIn })(CoachLoginPage);
