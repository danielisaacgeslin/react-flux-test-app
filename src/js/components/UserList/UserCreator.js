import React from 'react';

export default class UserCreator extends React.Component {
  render(){
    return (
      <div>
        <br />
        <strong>create new user: </strong><br />
        <label>username: </label>
        <input onChange={(e)=>{this.props.updateCreationUsername(e)}} type="text" /><br />
        <label>age: </label>
        <input onChange={(e)=>{this.props.updateCreationAge(e)}} type="number" /><br />
        <button onClick={()=>{this.props.createUser()}}>Create</button><br /><br />
      </div>
    );
  }
}
