import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GroupStore extends EventEmitter {
  constructor(){
    super();
    this.groups = [
      {id:1, name: 'group 1', description: 'this is one group'},
      {id:2, name: 'group 2', description: 'this is another group'}
    ];
  }

  getAll(){
    return this.groups;
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
    this.groups.push({id, name, description});
  }

  deleteGroup(id){
    for(var i=0; i<this.groups.length; i++){
      if(id == this.groups[i].id){
        this.groups.splice(i,1);
        break;
      }
    }
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_GROUP": {
        this.createGroup(action.name, action.description);
        this.emit('updateGroups');
        break;
      }
      case "DELETE_GROUP": {
        this.deleteGroup(action.id);
        this.emit('updateGroups');
        break;
      }
    }
  }

}

const groupStore = new GroupStore();

dispatcher.register(groupStore.handleActions.bind(groupStore));

export default groupStore;
