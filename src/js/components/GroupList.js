import React from 'react';
import GroupStore from '../stores/GroupStore';
import GroupListItem from './GroupList/GroupListItem';
import GroupCreator from './GroupList/GroupCreator';
import * as GroupActions from './actions/GroupActions';

export default class GroupList extends React.Component {
  constructor(){
    super();
    this.state = {
      groups: GroupStore.getAll(),
      creation: {}
    }
  }

  componentWillMount(){
    GroupStore.on('updateGroups', this.getAllGroups.bind(this));
  }

  componentWillUnmount(){
    GroupStore.removeListener('updateGroups', this.getAllGroups.bind(this));
  }

  updateCreationName(e){
    this.state.creation.name = e.target.value;
  }

  updateCreationDescription(e){
    this.state.creation.description = e.target.value;
  }

  createGroup(){
    const name = this.state.creation.name;
    const description = this.state.creation.description;
    GroupActions.createGroup(name, description);
  }

  getAllGroups(){
    this.setState(
      Object.assign({}, this.state, GroupStore.getAll())
    );
  }

  render(){
    const groupListItems = this.state.groups.map((group) =>{
      return <GroupListItem name={group.name} id={group.id} key={group.id} />;
    });

    return (
      <div>
      <GroupCreator
        updateCreationName={this.updateCreationName.bind(this)}
        updateCreationDescription={this.updateCreationDescription.bind(this)}
        createGroup={this.createGroup.bind(this)} />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>
            {groupListItems}
          </tbody>
        </table>
      </div>
    );
  }
}
