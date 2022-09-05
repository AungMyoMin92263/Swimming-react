import React from "react";
import { connect } from "react-redux";
import InputFormAtom from "../../atoms/InputFormAtom";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { recoverPassword } from "../../stores/actions/auth-action";
import { Link } from "react-router-dom";

interface IStates {
	isCompleted: boolean;
	email: string;
	isEmailValid: boolean;
	isEmailEmpty: boolean;
	emailMsg: string;
}
interface ManagerRecoverPasswordPage {
	recoverPassword: Function;
	authUser: AuthInterface;
}

type IProps = ManagerRecoverPasswordPage;

class ManagerRecoverPasswordPage extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props);
		console.log("props", props);
		this.state = {
			isCompleted: false,
			email: "",
			isEmailValid: true,
			isEmailEmpty: false,
			emailMsg: "",
		};
	}

	submit = () => {
		this.setState({
			isEmailValid: true,
			isEmailEmpty: false,
		});
		const { email }: IStates = this.state;

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

		this.callback();
	};

	callback = () => {
		this.setState({
			isCompleted: true,
		});
		const { email }: IStates = this.state;
		this.props.recoverPassword({ email: email });
	};

	validateEmail = (email: string) => {
		return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
	};

	renderTitle = () => {
		if (this.state.isCompleted) {
			return <span>An email has been sent!</span>;
		} else {
			return <span>Recover Password</span>;
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
		const { email, emailMsg, isEmailEmpty, isEmailValid, isCompleted } =
			this.state;
		// let { authUser } = this.props;
		return (
			<div className='wrapper'>
				{/* {this.state.isCompleted && (
					<Navigate to='/admin/welcome' replace={true} />
				)} */}
				<div className='primary f-16 project-header'>
					<span>My Report Cards</span>
				</div>

				<div className='container-cus'>
					<div className='content col-lg-6 col-md-8 col-12'>
						<div className='title mb-8'>
							<div className='title mb-3'>{this.renderTitle()}</div>
						</div>
						{isCompleted ? (
							<div className='mb-16'>
								<span className='fw-400 f-16'>
									Please click the link when you get it.
								</span>
							</div>
						) : (
							<>
								<div className='mb-16'>
									<span className='fw-400 f-16'>Enter your email address.</span>
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
							</>
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
	authUser,
}: StoreState): {
	authUser: AuthInterface;
} => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps, { recoverPassword })(
	ManagerRecoverPasswordPage
);
