import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GroupStore extends EventEmitter {
  constructor(){
    super();
    this.loading = false;
    this.groups = [];
  }

  getAll(){
    return this.groups;
  }

  getLoading(){
    return this.loading;
  }

  getGroup(id){
    for(var i=0; i<this.groups.length; i++){
      if(id == this.groups[i].id){
        return this.groups[i];
      }
    }
    return {};
  }

  createGroup(name, description){
    const id = Date.now();
    const users = [];
    return new Promise((resolve, reject)=>{
      this.groups.push({id, name, description, users});
      resolve(true);
    });
  }

  deleteGroup(id){
    for(var i=0; i<this.groups.length; i++){
      if(id == this.groups[i].id){
        this.groups.splice(i,1);
        break;
      }
    }
  }

  addUser(groupId, userId){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        this.getGroup(groupId).users.push(userId);
        resolve(true);
      },500);
    });
  }

  mergeGroups(newGroups){
    let flag;
    newGroups.forEach(function(newGroup){
      flag = true;
      for(var i=0; i<this.groups.length; i++){
        if(this.groups[i].id === newGroup.id){
          flag = false;
          break;
        }
      }
      if(flag){
        this.groups.push(newGroup);
      }
    }.bind(this));
  }

  reloadGroups(){
    return new Promise((resolve, reject)=>{
      /*simulation ajax*/
      setTimeout(()=>{
        const data = [
          {id:1, name: 'group 1', description: 'this is one group', users: [1,2]},
          {id:2, name: 'group 2', description: 'this is another group', users: []}
        ];
        resolve({data});
      },1000);
    });
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_GROUP": {
        this.loading = true;
        this.emit('updateLoading');
        this.createGroup(action.name, action.description).then(()=>{
          this.loading = false;
          this.emit('updateLoading');
          this.emit('updateGroups');
        });
        break;
      }
      case "DELETE_GROUP": {
        this.deleteGroup(action.id);
        this.emit('updateGroups');
        break;
      }
      case "ADD_USER": {
        this.loading = true;
        this.emit('updateLoading');
        this.addUser(action.groupId, action.userId).then(()=>{
          this.loading = false;
          this.emit('updateLoading');
          this.emit('updateGroupUsers');
        });
        break;
      }
      case "RELOAD_GROUPS": {
        this.loading = true;
        this.emit('updateLoading');
        this.reloadGroups().then((response)=>{
          this.mergeGroups(response.data);
          this.loading = false;
          this.emit('updateLoading');
          this.emit('updateGroups');
        });
        break;
      }
    }
  }

}

const groupStore = new GroupStore();

dispatcher.register(groupStore.handleActions.bind(groupStore));

export default groupStore;
