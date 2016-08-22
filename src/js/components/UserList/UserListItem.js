import React from 'react';
import {Link} from 'react-router';

export default class UserListItem extends React.Component {
  render(){
    const link = "userDetail/" + this.props.id;
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.username}</td>
        <td><Link to={link}>details</Link></td>
      </tr>
    );
  }
}
