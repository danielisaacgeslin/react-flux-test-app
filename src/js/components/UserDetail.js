import React from 'react';
import UserStore from '../stores/UserStore';

export default class UserDetail extends React.Component {
  render(){
    const userData = UserStore.getUser(this.props.params.id);

    return (
      <div>
        <h4>details of user id <strong>{userData.id}</strong></h4>
        <ul>
          <li><strong>id:</strong> {userData.id}</li>
          <li><strong>username:</strong> {userData.username}</li>
        <li><strong>age:</strong> {userData.age}</li>
        </ul>
      </div>
    );
  }
}
