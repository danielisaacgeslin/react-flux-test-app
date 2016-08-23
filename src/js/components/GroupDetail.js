import React from 'react';
import GroupStore from '../stores/GroupStore';

export default class GroupDetail extends React.Component {
  render(){
    const groupData = GroupStore.getGroup(this.props.params.id);

    return (
      <div>
        <h4>details of group id <strong>{groupData.id}</strong></h4>
        <ul>
          <li><strong>id:</strong> {groupData.id}</li>
          <li><strong>name:</strong> {groupData.name}</li>
          <li><strong>description:</strong> {groupData.description}</li>
        </ul>
      </div>
    );
  }
}
