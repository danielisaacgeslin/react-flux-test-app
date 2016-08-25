import dispatcher from "../dispatcher";

export function addUserToGroup(groupId, userId){
  dispatcher.dispatch({
    type:'ADD_USER',
    groupId,
    userId
  });
}

export function createGroup(name, description){
  dispatcher.dispatch({
    type:'CREATE_GROUP',
    name,
    description
  });
}

export function deleteGroup(id){
  dispatcher.dispatch({
    type:'DELETE_GROUP',
    id
  });
}
