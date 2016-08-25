import dispatcher from "../dispatcher";

export function createUser(username, age){
  dispatcher.dispatch({
    type:'CREATE_USER',
    username,
    age
  });
}

export function deleteUser(id){
  dispatcher.dispatch({
    type:'DELETE_USER',
    id,
  });
}

export function reloadUsers(){
  dispatcher.dispatch({type: 'RELOAD_USERS'});
}
