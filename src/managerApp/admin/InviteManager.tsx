import React from "react";
import { IPageProp } from "../../pagePropsInterface";

// import csss
import styles from "./../../css/pages.module.css";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from '@mui/icons-material/Link';

import { Link } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";

interface IStates {
  email: string;
  isEmailValid: boolean;
  isEmailEmpty: boolean;
  emailMsg: string;
}

class InviteManagerPage extends React.Component<IPageProp, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      isEmailValid: true,
      isEmailEmpty: false,
      emailMsg: "",
    };
  }
  componentDidMount() {
    //loading
  }

  render() {
    const { email, isEmailValid, isEmailEmpty, emailMsg } = this.state;
    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container'>
						<div className='content'>
							<div className='f-14 mb-32'>
								<Link to='/admin/add-school' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>

							<div className='mb-16 flex'>
								<img
									src={"/assets/icons/logo.png"}
									alt='right-arrow'
									className='item-icon'
								/>
								<span className='f-16 crop_text_cart'>
									Dolphin Swimming School
								</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Invite a Manager.</span>
							</div>
							<div className='f-16 mb-16'>
								<span>Invite a manager to help you run your operations.</span>
							</div>
							<div className='fw-400 mb-16'>
								<InputFormAtom
									label='School Manager(s)'
									placeholder={"Enter email(s), comma separated"}
									warning={emailMsg}
									type='text'
									showWarning={isEmailEmpty || !isEmailValid}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											email: value,
										});
									}}
									id='inviteManager'
									name='inviteManager'
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
							<div className='flex-center justify-space-between'>
								<div className='flex-center'>
									<div
										style={{
											transform: " rotate(-45deg)",
											marginBottom: "5px",
											marginLeft: "5px",
										}}
									>
										<LinkIcon
											sx={{ color: "#0070F8", fontSize: 22, mr: 0.5 }}
										></LinkIcon>
									</div>

									<span className='primary f-14 cursor'>Copy invite link</span>
								</div>

								<div className='flex-center'>
									<span>2 of 2</span>
									<Link to='/admin/add-more-school'>
										<button type='submit' className='idle-btn ml-16'>
											Continue
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
  }
}

export default InviteManagerPage;
