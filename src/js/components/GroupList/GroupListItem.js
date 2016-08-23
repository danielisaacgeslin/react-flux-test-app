import React from 'react';
import {Link} from 'react-router';

export default class GroupListItem extends React.Component {
  render(){
    const link = "groupDetail/" + this.props.id;
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td><Link to={link}>details</Link></td>
      </tr>
    );
  }
}
