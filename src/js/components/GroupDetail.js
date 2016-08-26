import React from 'react';
import GroupStore from '../stores/GroupStore';
import UserStore from '../stores/UserStore';
import UserOption from './GroupDetail/UserOption';
import * as GroupActions from '../actions/GroupActions';
import * as UserActions from '../actions/UserActions';

export default class GroupDetail extends React.Component {
  constructor(props){
    super(props);

    this.updateData = this.updateData.bind(this);
    this.updateLoading = this.updateLoading.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.groupsLoaded = this.groupsLoaded.bind(this);

    this.state = {
      allUsers: [],
      groupData: {
        id: null,
        name: null,
        description: null,
        users: []
      },
      userOptions: [],
      userList: '',
      loading: false,
      groupsLoaded: false
    };
  }

  componentWillMount(){
    GroupStore.on('updateGroupUsers', this.updateData);
    GroupStore.on('updateLoading', this.updateLoading);
    UserStore.on('updateUsers', this.getAllUsers);
    GroupStore.on('updateGroups', this.groupsLoaded);
  }

  componentWillUnmount(){
    GroupStore.removeListener('updateGroupUsers', this.updateData);
    GroupStore.removeListener('updateLoading', this.updateLoading);
    UserStore.removeListener('updateUsers', this.getAllUsers);
    GroupStore.removeListener('updateGroups', this.groupsLoaded);
  }

  componentDidMount(){
    this.reloadUsers();
    this.reloadGroups();
  }

  reloadGroups(){
    GroupActions.reloadGroups();
  }

  reloadUsers(){
    UserActions.reloadUsers();
  }

  groupsLoaded(){
    const groupsLoaded = true;
    this.setState(
      Object.assign({}, this.state, {groupsLoaded})
    );
    this.updateData();
  }

  getAllUsers(){
    const allUsers = UserStore.getAll();
    this.setState(
      Object.assign({}, this.state, {allUsers})
    );
    this.updateData();
  }

  updateLoading(){
    const loading = GroupStore.getLoading();
    this.setState(Object.assign({}, this.state, {loading}));
  }

  addUserToGroup(){
    const groupId = Number(this.state.groupData.id);
    const userId = Number(this.refs.selectedUser.value);
    GroupActions.addUserToGroup(groupId, userId);
  }

  updateData(){
    if(!this.state.groupsLoaded){
      return false;
    }
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
    let loading = this.state.loading ? 'updating...' : '';
    const userOptions = this.state.userOptions.map(function(user){
      return <UserOption description={user.username} key={user.id} value={user.id} />;
    }.bind(this));


    return (
      <div>
        <h4>details of group id <strong>{this.state.groupData.id}</strong></h4>
        <p>{loading}</p>
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
