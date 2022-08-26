import React from "react";

// icon
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import { School } from "../../stores/model/school";

import { connect } from "react-redux";
import { SchoolInterface } from "../../stores/model/school-interface";
import { StoreState } from "../../stores/reducers";
interface IStates {
	schools: School[];
	name:string;
	image:any
}
interface IProps {
	schools: any;
	school:School
}

class AddMoreSchoolPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			name:'',
			image:{},
			schools: [],
		};
	}
	componentDidMount() {
		// var schoolobj = JSON.parse(getItem("school") || "null");
		// if (schoolobj.result) var school = schoolobj.result.data;

		// if (school) {
		// 	this.setState({
		// 		name: school.name,
		// 		image: school.logo,
		// 	});
		// }
		console.log("props",this.props)
	}


	render() {
		// const {school} = this.props.schools;

		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
							<div className='f-32 fw-500'>
								<span>Your Schools.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Get started by adding a school you manage.</span>
							</div>
							<div className='mb-16 flex'>
								<img
									src={
										this.props.schools.result
											? "http://localhost:3000/api/" +
											  this.props.schools.result.data.logo
											: "../../../assets/icons/logo.png"
									}
									alt='right-arrow'
									className='item-icon'
								/>
								<span className='f-16'>
									{this.props.schools.result
										? this.props.schools.result.data.name
										: ""}
								</span>
							</div>
							{/* <div className='mb-16 flex'>
								<img
									src={"/assets/icons/logo.png"}
									alt='right-arrow'
									className='item-icon'
								/>
								<span className='f-16'>{school && school.name}</span>
							</div> */}
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


const mapStateToProps = ({
	schools,
}: StoreState): {
	schools: SchoolInterface;
} => {
	return {
		schools,
	};
};

export default connect(mapStateToProps, {  })(AddMoreSchoolPage);

