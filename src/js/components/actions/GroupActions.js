import dispatcher from "../../dispatcher";

export function addUserToGroup(groupId, userId){
  dispatcher.dispatch({
    type:'ADD_USER',
    groupId,
    userId
  });
}
