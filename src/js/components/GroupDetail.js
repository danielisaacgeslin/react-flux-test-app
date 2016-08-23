import React from 'react';
import GroupStore from '../stores/GroupStore';
import UserStore from '../stores/UserStore';
import UserOption from './GroupDetail/UserOption';
import dispatcher from  '../dispatcher';

export default class GroupDetail extends React.Component {
  constructor(props){
    super(props);

    const groupData = GroupStore.getGroup(this.props.params.id);
    const allUsers = UserStore.getAll();
    let user;
    let users = []; //saving users
    let userList = []; //saving usernames string
    let selectedUser = 0;
    groupData.users.forEach(function(fullUser){
      user = UserStore.getUser(fullUser);
      users.push(user);
      userList.push(user.username);
    });
    userList = userList.toString().replace(',',', ');

    for(var i=0; i<allUsers.length; i++){
      if(groupData.users.indexOf(allUsers[i].id) === -1){
        selectedUser = allUsers[i].id;
        break;
      }
    }
    
    this.state = {
      allUsers,
      groupData,
      selectedUser,
      users,
      userList
    };
  }

  componentWillMount(){
    GroupStore.on('updateGroupUsers', this.updateData.bind(this));
  }

  componentWillUnmount(){
    GroupStore.removeListener('updateGroupUsers', this.updateData.bind(this));
  }

  updateSelectedUser(e){
    const selectedUser = e.target.value;
    this.setState(Object.assign({}, this.state, {selectedUser}));
  }

  addUser(groupId){
    dispatcher.dispatch({
      type:'ADD_USER',
      groupId: Number(this.state.groupData.id),
      userId: Number(this.state.selectedUser)
    });
  }

  updateData(){
    const groupData = GroupStore.getGroup(this.props.params.id);
    let user;
    let users = []; //saving users
    let userList = []; //saving usernames string
    groupData.users.forEach(function(fullUser){
      user = UserStore.getUser(fullUser);
      users.push(user);
      userList.push(user.username);
    });
    userList = userList.toString().replace(',',', ');
    this.setState(
      Object.assign({}, this.state, {users, userList, groupData})
    );
  }

  render(){
    const userOptions = this.state.allUsers.map(function(user){
      if(this.state.groupData.users.indexOf(user.id) === -1){
        return <UserOption value={user.id} description={user.username} key={user.id} />;
      }
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
        <select onChange={(e)=>{this.updateSelectedUser(e)}}>
          {userOptions}
        </select>
        <button onClick={()=>{this.addUser()}}>add user</button>
      </div>
    );
  }
}
