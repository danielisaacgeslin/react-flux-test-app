import React from "react";

export default class Footer extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<footer>footer de {this.props.title}</footer>
		);
	}

}
