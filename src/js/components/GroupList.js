import React from 'react';
import GroupStore from '../stores/GroupStore';
import GroupListItem from './GroupList/GroupListItem';
import GroupCreator from './GroupList/GroupCreator';
import * as GroupActions from '../actions/GroupActions';

export default class GroupList extends React.Component {
  constructor(){
    super();

    this.getAllGroups = this.getAllGroups.bind(this);
    this.updateLoading = this.updateLoading.bind(this);

    this.state = {
      groups: [],
      creation: {},
      loading: false
    }
  }

  componentWillMount(){
    GroupStore.on('updateGroups', this.getAllGroups);
    GroupStore.on('updateLoading', this.updateLoading);
  }

  componentWillUnmount(){
    GroupStore.removeListener('updateGroups', this.getAllGroups);
    GroupStore.removeListener('updateLoading', this.updateLoading);
  }

  componentDidMount(){
    /*initial async load*/
    this.reloadGroups();
  }

  updateLoading(){
    const loading = GroupStore.getLoading();
    this.setState(Object.assign({}, this.state, {loading}));
  }

  reloadGroups(){
    GroupActions.reloadGroups();
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
    const groups = GroupStore.getAll();
    this.setState(
      Object.assign({}, this.state, {groups})
    );
  }

  render(){
    const groupListItems = this.state.groups.map((group) =>{
      return <GroupListItem name={group.name} id={group.id} key={group.id} />;
    });

    let loading = this.state.loading ? 'updating...' : '';
    return (
      <div>
        <GroupCreator
          updateCreationName={this.updateCreationName.bind(this)}
          updateCreationDescription={this.updateCreationDescription.bind(this)}
          createGroup={this.createGroup.bind(this)} />
        <p>{loading}</p>
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
