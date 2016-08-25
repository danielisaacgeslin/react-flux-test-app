import React from "react";
import UserListItem from "./UserList/UserListItem";
import UserCreator from "./UserList/UserCreator";
import UserStore from "../stores/UserStore";
import * as UserActions from '../actions/UserActions';

export default class UserList extends React.Component {
  constructor(){
    super();

    this.getAllUsers = this.getAllUsers.bind(this);

    this.state = {
      users:[],
      creation: {}
    }
  }

  componentWillMount(){
    this.getAllUsers();
    UserStore.on('updateUsers', this.getAllUsers);
  }

  componentWillUnmount(){
    UserStore.removeListener('updateUsers', this.getAllUsers);
  }

  updateCreationUsername(e){
    this.state.creation.username = e.target.value;
  }

  updateCreationAge(e){
    this.state.creation.age = e.target.value;
  }

  createUser(){
    const username = this.state.creation.username;
    const age = this.state.creation.age;
    UserActions.createUser(username, age);
  }

  getAllUsers(){
    const users = UserStore.getAll();
    this.setState(
      Object.assign({}, this.state, {users})
    );
  }

  render(){

    const userListItems = this.state.users.map((user) =>{
      return <UserListItem username={user.username} id={user.id} key={user.id} />;
    });

    return (
      <div>
        <UserCreator
          updateCreationUsername={this.updateCreationUsername.bind(this)}
          updateCreationAge={this.updateCreationAge.bind(this)}
          createUser={this.createUser.bind(this)} />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USERNAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userListItems}
          </tbody>
        </table>
      </div>
    );
  }
}
