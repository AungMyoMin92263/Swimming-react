import React from "react";
import { connect } from "react-redux";
import InputFormAtom from "../../atoms/InputFormAtom";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signIn } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { setItemWithObject } from "../../auth/LocalStorage";
import { refreshToken } from "../../stores/actions/school-action";
import { getAllSchools } from "../../stores/actions/school-action";

interface IStates {
	email: string;
	password: string;
	isEmailValid: boolean;
	isEmailEmpty: boolean;
	isPasswordEmpty: boolean;
	emailMsg: string;
	passwordMsg: string;
	isNewUser : string;
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
	// refreshToken: Function;
	// getClasses: Function;
	// schoolList: any;
}

type IProps = UserSignInPage;

class ManagerLoginPage extends React.Component<IProps, IStates> {
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
			isNewUser : '',
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
	componentDidMount = () =>{
		console.log("ENV",process.env)
	}

	callback = async () => {
		const { email, password }: IStates = this.state;

		await this.props.signIn({ email : email,password : password});		
		setItemWithObject("authUser", this.props.authUser);
		
		// if(this.props.authUser.isSignedIn){
		// 	this.props.refreshToken();
		// 	await this.props.getClasses();
		// this.setState({
		// 	isNewUser : this.props.schoolList.result && this.props.schoolList.result.length > 0 ? 'f' : 't'
		// });
		// }
		// console.log('isNewUser',this.state.isNewUser)

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
				{/* { this.state.isNewUser === 't' && <Navigate to='/admin/welcome' replace={true} />}
				{ this.state.isNewUser === 'f' && <Navigate to='/admin/dashboard' replace={true} />} */}

				{ authUser.isSignedIn && <Navigate to='/manager/dashboard' replace={true} />}

				<div className='primary f-16 project-header'>
					<span>My Report Cards</span>
				</div>

				<div className="container-cus">
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
							<Link to='/manager/recover-password'>
								<span>Forgot password?</span>
							</Link>

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
	authUser,schoolList,
}: StoreState): {
	authUser: AuthInterface;
	schoolList : any;
} => {
	return {
		authUser,
		schoolList,
	};
};

export default connect(mapStateToProps, { signIn })(
	ManagerLoginPage
);
