import React from "react";
import Header from './Header';
import Footer from './Footer';

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
				<Footer title={this.state.title} />
			</div>
		);
	}

}
