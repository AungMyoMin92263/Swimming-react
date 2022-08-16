import React from "react";


// import csss
import styles from "./../../css/pages.module.css";

class AdminWelcomePage extends React.Component {

	constructor(props: any) {
		super(props);

		this.state = {
            email : '',
            password : ''
		};
	}

	componentDidMount() {
		//loading
	}

	render() {
		return (
			<>
                        <h1>Admin Welcome Page</h1>
			</>
		);
	}
}

export default AdminWelcomePage;
