import React, { Component } from 'react';
import GoogleButton from './GoogleButton';

class Header extends Component {
constructor(props){
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
    }


  handleLogout(){
        fetch('/api/logout', {
        method: 'post'
        });

        window.location.reload();
    return true;
  }


getSessionInfo(){
  let test = [];
  if(this.props.userSession.length > 0)
  {
    test.push(<span key="z002"> Welcome {this.props.userSession[0].userName}! </span>);
    test.push(<span key="z003"><button className="logoutButton" onClick={this.handleLogout}>sign out</button></span>);
  }
  else
  {
    test.push(<GoogleButton key='z001'/>);
  }
  return test;
}

   render() {
      return (
         <div>
           <header className="App-header">
              <ul id="horizontal-list">
                <li><a href="/">Home</a></li>
                <li><a href="/Browse">Browse</a></li>
                <li><a href="/MyCourts">My Courts</a></li>
                <li>{this.getSessionInfo()}</li>
              </ul>

          </header>


         </div>
      );
   }
}

export default Header;