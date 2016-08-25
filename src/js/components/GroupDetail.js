import React from 'react';
import GroupStore from '../stores/GroupStore';
import UserStore from '../stores/UserStore';
import UserOption from './GroupDetail/UserOption';
import * as GroupActions from '../actions/GroupActions';

export default class GroupDetail extends React.Component {
  constructor(props){
    super(props);

    this.updateData = this.updateData.bind(this);

    this.state = {
      allUsers: UserStore.getAll()
    };
  }

  componentWillMount(){
    GroupStore.on('updateGroupUsers', this.updateData);
    this.updateData();
  }

  componentWillUnmount(){
    GroupStore.removeListener('updateGroupUsers', this.updateData);
  }

  addUserToGroup(){
    const groupId = Number(this.state.groupData.id);
    const userId = Number(this.refs.selectedUser.value);
    GroupActions.addUserToGroup(groupId, userId);
  }

  updateData(){
    const groupData = GroupStore.getGroup(this.props.params.id);
    let user;
    let users = []; //saving users
    let userList = []; //saving usernames string
    let userOptions = []; //options for the user dropdown
    groupData.users.forEach(function(fullUser){
      user = UserStore.getUser(fullUser);
      users.push(user);
      userList.push(user.username);
    });
    userList = userList.toString().replace(',',', ');

    this.state.allUsers.forEach(function(user){
      if(groupData.users.indexOf(user.id) === -1){
        userOptions.push(user);
      }
    }.bind(this));

    this.setState(
      Object.assign({}, this.state, {users, userList, groupData, userOptions})
    );
  }

  render(){
    let selectList = [];
    const userOptions = this.state.userOptions.map(function(user){
      return <UserOption description={user.username} key={user.id} value={user.id} />;
    }.bind(this));

    return (
      <div>
        <h4>details of group id <strong>{this.state.groupData.id}</strong></h4>
        <ul>
          <li><strong>id: </strong> {this.state.groupData.id}</li>
          <li><strong>name: </strong> {this.state.groupData.name}</li>
          <li><strong>description: </strong> {this.state.groupData.description}</li>
          <li><strong>users: </strong> {this.state.userList}</li>
        </ul>
        <select ref="selectedUser">
          {userOptions}
        </select>
        <button onClick={()=>{this.addUserToGroup()}}>add user to group</button>
      </div>
    );
  }
}
