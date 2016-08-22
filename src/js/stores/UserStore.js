import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor(){
    super();
    this.users = [
      {id:1, username: 'pepe', groups: [1,5,8,3,2]},
      {id:2, username: 'juan', groups: [7,3]},
      {id:3, username: 'pepito', groups: [1]},
      {id:4, username: 'juancho', groups: [7,4,1,2]},
      {id:5, username: 'juan pepe del castillo', groups: [1,3,9,4]},
      {id:6, username: 'pejuan', groups: [2,3,5,6,7,9,4,2]}
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

  createUser(data){
    this.users.push(data);
  }

  deleteUser(){

  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_USER": {
        this.createUser(action.data);
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
