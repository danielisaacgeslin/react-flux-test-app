import React from "react";
import UserListItem from "./UserList/UserListItem";
import UserCreator from "./UserList/UserCreator";
import UserStore from "../stores/UserStore";
import dispatcher from '../dispatcher';

export default class UserList extends React.Component {
  constructor(){
    super();
    this.state = {
      users: UserStore.getAll(),
      creation: {}
    }
  }

  componentWillMount(){
    UserStore.on('updateUsers', this.getAllUsers.bind(this));
  }

  componentWillUnmount(){
    UserStore.removeListener('updateUsers', this.getAllUsers.bind(this));
  }

  updateCreationUsername(e){
    this.state.creation.username = e.target.value;
  }

  updateCreationAge(e){
    this.state.creation.age = e.target.value;
  }

  createUser(){
    dispatcher.dispatch({
      type:'CREATE_USER',
      username:this.state.creation.username,
      age:this.state.creation.age
    });
  }

  getAllUsers(){
    this.setState(
      Object.assign({}, UserStore.getAll())
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
