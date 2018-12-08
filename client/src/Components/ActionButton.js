import React, { Component } from 'react';
import fetch from 'cross-fetch';


class ActionButton extends Component {
    constructor(props){
        super(props);
        this.handleAttend = this.handleAttend.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
handleAttend(event){
  event.stopPropagation();

    if(this.props.userEmail != null 
      && this.props.userEmail != "noEmail"){
      //tell server to add user to session
      let data = [];
      data.push(this.props.session);
      data.push(this.props.userEmail);
      console.log(JSON.stringify(data));

      fetch('/api/sessions/addUser', {
        method: 'put',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
      });
      window.location.reload();
    }
    else{
      //prompt to log in
      window.location.href = "http://pdxpickup.herokuapp.com/auth/google";
    }
  }
  //deletes session
  handleDelete(event){
    event.stopPropagation();
    
    let data = this.props.session;
    fetch('/api/sessions/delete', {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

  //remove user from session
  handleRemove(event){
    event.stopPropagation();

    let data = [];
    data.push(this.props.session);
    data.push(this.props.userEmail);
    fetch('/api/sessions/removeUser', {
      method: 'put',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

    render() {
        const userAction = [];

        //Add an action button based on user-session relationship
          // if: user owns the game, display delete button
          // elseif: user attened game, add un-attend session button
          // else: no user-session reletionship, display attend button
        if(this.props.session.sessionOwnerEmail === this.props.userEmail){ 
            userAction.push( <button className="btn btn-danger btn-sm" onClick={this.handleDelete}  >Delete! </button>)
          } 
          else if(this.props.session.sessionAttendes.indexOf(this.props.userEmail) > -1){
            userAction.push(<button className="btn btn-secondary btn-sm" onClick={this.handleRemove} > un-Attend! </button>
            )
          }
          else{ 
            userAction.push(<button className="btn btn-success btn-sm" onClick={this.handleAttend}> Attend! </button>)
          }

        return ( <div key="ab001"> {userAction}</div>);

    } 
}
export default ActionButton;