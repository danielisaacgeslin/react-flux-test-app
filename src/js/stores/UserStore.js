import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor(){
    super();
    this.users = [
      {id:1, username: 'pepe', age: 15},
      {id:2, username: 'juan', age: 25},
      {id:3, username: 'pepito', age: 10},
      {id:4, username: 'juancho', age: 45},
      {id:5, username: 'juan pepe del castillo', age: 40},
      {id:6, username: 'pejuan', age: 28}
    ];
  }

  getAll(){
    return this.users;
  }

  getUser(id){
    for(var i=0; i<this.users.length; i++){
      if(id == this.users[i].id){
        return this.users[i];
      }
    }
    return {};
  }

  createUser(username, age){
    const id = Date.now();
    this.users.push({id, username, age});
  }

  deleteUser(id){
    for(var i=0; i<this.users.length; i++){
      if(id == this.users[i].id){
        this.users.splice(i,1);
        break;
      }
    }
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_USER": {
        this.createUser(action.username, action.age);
        this.emit('updateUsers');
        break;
      }
      case "DELETE_USER": {
        this.deleteUser(action.id);
        this.emit('updateUsers');
        break;
      }
    }
  }

}

const userStore = new UserStore();

dispatcher.register(userStore.handleActions.bind(userStore));

//console.log(dispatcher);
//dispatcher.dispatch({type:'CREATE_USER', data:{id:10, username:'asdasdasd'}})

export default userStore;
