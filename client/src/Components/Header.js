import React, { Component } from 'react';
import GoogleButton from './GoogleButton';
import '../Style/Header.css';

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
  let sessionInfo = [];
  if(this.props.userSession.length > 0){
    sessionInfo.push(<span key="z002"> Welcome {this.props.userSession[0].userName}! </span>);
    sessionInfo.push(<span key="z003"><button className="logoutButton text-danger" 
    onClick={this.handleLogout}><small>sign out</small></button></span>);
  }
  else{
    sessionInfo.push(<GoogleButton key='z001'/>);
  }
  return sessionInfo;
}

getTabs(){
  let tabs = [];
  let activeHome = false;
  let activeBrowse = false;
  let activeMyCourts = false;
  switch(this.props.activeTab){
    case 0:
      activeHome = true;
      break;
    case 1:
      activeBrowse = true;
      break;
    case 2:
      activeMyCourts = true;
      break;
  }

  tabs.push(<li className={(activeHome ? 'activeTab' : '')}><a href="/">Home</a></li>);
  tabs.push(<li className={(activeBrowse ? 'activeTab' : '')}><a href="/Browse">Browse</a></li>);
  tabs.push(<li className={(activeMyCourts ? 'activeTab' : '')}><a href="/MyCourts">My Courts</a></li>);

  return tabs;
}

   render() {
      return (
         <div>
           <header className="App-header fixed-top">
              <ul id="horizontal-list">
                {this.getTabs()}
                <li>{this.getSessionInfo()}</li>
              </ul>

          </header>


         </div>
      );
   }
}

export default Header;