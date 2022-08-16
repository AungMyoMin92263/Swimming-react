import React from "react";

// import csss
import styles from "./../../css/pages.module.css";

import {School} from '../../interfaces/School';

class AdminDashboardPage extends React.Component {

	constructor(props: any) {
		super(props);

		this.state = {
            schools : []
		};
	}

	componentDidMount() {
		//loading
	}

	render() {
		return (
			<>
            <h1>Admin Dashboard Page</h1>
			</>
		);
	}
}

export default AdminDashboardPage;
