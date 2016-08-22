import React from "react";
import UserListItem from "./UserList/UserListItem";
import UserStore from "../stores/UserStore";

export default class UserList extends React.Component {
  constructor(){
    super();
    this.state = {
      users: UserStore.getAll()
    }
  }

  componentWillMount(){
    UserStore.on('updateUsers', this.getAllUsers.bind(this));
  }

  componentWillUnmount(){
    UserStore.removeListener('updateUsers', this.getAllUsers.bind(this));
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
    );
  }
}
