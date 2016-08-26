import React from 'react';
import UserStore from '../stores/UserStore';
import * as UserActions from '../actions/UserActions';

export default class UserDetail extends React.Component {
  constructor(props){
    super(props);

    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateLoading = this.updateLoading.bind(this);

    this.state = {
      id: null,
      username: null,
      age: null,
      loading: false
    };
  }

  componentWillMount(){
    UserStore.on('updateUsers', this.getAllUsers);
    UserStore.on('updateLoading', this.updateLoading);
  }

  componentWillUnmount(){
    UserStore.removeListener('updateUsers', this.getAllUsers);
    UserStore.removeListener('updateLoading', this.updateLoading);
  }

  componentDidMount(){
    /*initial async load*/
    this.reloadUsers();
  }

  updateLoading(){
    const loading = UserStore.getLoading();
    this.setState(Object.assign({}, this.state, {loading}));
  }

  reloadUsers(){
    UserActions.reloadUsers();
  }

  getAllUsers(){
    const users = UserStore.getAll();
    this.setState(
      Object.assign({}, this.state, {users})
    );
  }

  render(){
    const userData = UserStore.getUser(this.props.params.id);
    let loading = this.state.loading ? 'updating...' : '';
    return (
      <div>
        <h4>details of user id <strong>{userData.id}</strong></h4>
        <p>{loading}</p>
        <ul>
          <li><strong>id:</strong> {userData.id}</li>
          <li><strong>username:</strong> {userData.username}</li>
          <li><strong>age:</strong> {userData.age}</li>
        </ul>
      </div>
    );
  }
}
