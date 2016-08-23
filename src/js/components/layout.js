import React from "react";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import {Link} from 'react-router';

export default class Layout extends React.Component {

	constructor() {
		super();
		this.state = {
			title: 'placeholder'
		};
		this.updateTitle = this.updateTitle.bind(this);
	}

	updateTitle(title){
		let newState = Object.assign({}, this.state, {title});
		this.setState(newState);
	}

	render() {
		return (
			<div>
				<Header title={this.state.title} updateTitle={this.updateTitle} />
				<Link to="userList" >go to user list</Link>
				<span> - </span>
				<Link to="groupList" >go to group list</Link>
				{this.props.children}
				<Footer title={this.state.title} />
			</div>
		);
	}

}
