import React from 'react';

export default class UserOption extends React.Component {
  render(){
    return (
      <option value={this.props.value}>{this.props.description}</option>
    );
  }
}
