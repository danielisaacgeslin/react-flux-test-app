import React from 'react';

export default class GroupCreator extends React.Component {
  render(){
    return (
      <div>
        <br />
      <strong>create new group: </strong><br />
        <label>name: </label>
        <input onChange={(e)=>{this.props.updateCreationName(e)}} type="text" /><br />
        <label>description: </label>
        <input onChange={(e)=>{this.props.updateCreationDescription(e)}} type="text" /><br />
        <button onClick={()=>{this.props.createGroup()}}>Create</button><br /><br />
      </div>
    );
  }
}
