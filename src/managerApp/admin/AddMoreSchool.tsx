import React from "react";

// icon
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { School } from "../../interfaces/School";
import { IPageProp } from "../../pagePropsInterface";

interface IStates {
  schools: School[];
}

class AddMoreSchoolPage extends React.Component<IPageProp, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      schools: [],
    };
  }
  componentDidMount() {
    //loading
  }

  render() {
    const { schools } = this.state;
    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
							<div className='f-32 fw-500'>
								<span>Your Schools.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Get started by adding a school you manage.</span>
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
							<div className='hr mb-16'></div>
							<Link to='/admin/add-school' style={{ textDecoration: "none" }}>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another school</span>
								</div>
							</Link>

							<div className='hr mb-32'></div>
							<Link to='/admin/dashboard' style={{ textDecoration: "none" }}>
								<button type='submit' className='primary-btn right'>
									Done
								</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
  }
}

export default AddMoreSchoolPage;
