import React from "react";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import {Link} from 'react-router';

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Link to="userList" >go to user list</Link>
				<span> - </span>
				<Link to="groupList" >go to group list</Link>
				{this.props.children}
				<Footer />
			</div>
		);
	}

}
