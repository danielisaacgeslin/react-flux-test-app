import React from "react";

export default class Header extends React.Component {

	render() {
		return (
      <div>
  			<header>App: {this.props.title}</header>
        <input type="text" value={this.props.title} onChange={ (e)=>this.props.updateTitle(e.target.value) } />
      </div>
		);
	}

}
