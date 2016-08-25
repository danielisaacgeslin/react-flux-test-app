import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor(){
    super();
    this.users = [];
    this.loading = false;
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

  getLoading(){
    return this.loading;
  }

  createUser(username, age){
    const id = Date.now();
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        this.users.push({id, username, age});
        resolve(true);
      },500);
    });
  }

  deleteUser(id){
    for(var i=0; i<this.users.length; i++){
      if(id == this.users[i].id){
        this.users.splice(i,1);
        break;
      }
    }
  }

  reloadUsers(){
    return new Promise((resolve, reject)=>{
      /*simulation ajax*/
      setTimeout(()=>{
        const data = [
          {id:1, username: 'pepe', age: 15},
          {id:2, username: 'juan', age: 25},
          {id:3, username: 'pepito', age: 10},
          {id:4, username: 'juancho', age: 45},
          {id:5, username: 'juan pepe del castillo', age: 40},
          {id:6, username: 'pejuan', age: 28}
        ];
        resolve({data});
      },1000);
    });
  }

  mergeUsers(newUsers){
    let flag;
    newUsers.forEach(function(newUser){
      flag = true;
      for(var i=0; i<this.users.length; i++){
        if(this.users[i].id === newUser.id){
          flag = false;
          break;
        }
      }
      if(flag){
        this.users.push(newUser);
      }
    }.bind(this));
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_USER": {
        this.loading = true;
        this.emit('updateLoading');
        this.createUser(action.username, action.age).then(()=>{
          this.loading = false;
          this.emit('updateLoading');
          this.emit('updateUsers');
        });
        break;
      }
      case "DELETE_USER": {
        this.deleteUser(action.id);
        this.emit('updateUsers');
        break;
      }
      case "RELOAD_USERS": {
        this.loading = true;
        this.emit('updateLoading');
        this.reloadUsers().then((response)=>{
          this.mergeUsers(response.data);
          this.loading = false;
          this.emit('updateLoading');
          this.emit('updateUsers');
        });
        break;
      }
    }
  }
}

const userStore = new UserStore();

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
