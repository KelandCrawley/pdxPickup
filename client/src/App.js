import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './Components/Landing';
import Browse from './Components/Browse';
import MyCourts from './Components/MyCourts';
import SignInPrompt from './Components/SignInPrompt';
import Header from './Components/Header';
import SessionShow from './Components/SessionShow';

import './Style/App.css';


class App extends Component {
    constructor(props){
    super(props);
    this.checkIsLoggedIn = this.checkIsLoggedIn.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.state = {
      userSession: [],
      sessions: [],
      locations: [],
      currentTab: 0, //keeps track of active tab for style change in header
    }

  };

  setActiveTab(activeTab){
    this.setState({currentTab: activeTab});
  }

  checkIsLoggedIn(){
    if(this.state.userSession.length > 0){
      return true;
    }
    return false;
  }

  checkForServerData(){
    //locations always get sent over even if no sessions exist
    if(this.state.locations.length > 0){
      return true;
    }
    return false;
  }

  protecedCourtRoute(){
    let route = [];
    if(this.checkIsLoggedIn()){
      route.push(<Route 
        key="a002" exact path="/MyCourts" render={()=>
        <MyCourts 
          userSession={this.state.userSession} 
          sessions={this.state.sessions} 
          locations={this.state.locations}
          setActiveTab={this.setActiveTab} 
        />}
      />);
    }
    else{
      route.push(<Route key="a003" exact path="/MyCourts" component={SignInPrompt}/>);
    }
    return route;
  }


  componentDidMount() {
    fetch('/api/users').then(res => res.json())
    .then(userSession => this.setState({ userSession }));

    let pageLimit = '100';
    let sessionsAPICall = '/api/sessions?num=' + pageLimit + '&loc=All&sort=date';
   
    fetch(sessionsAPICall).then(res => res.json())
      .then(sessions => this.setState({ sessions }));

     fetch('/api/locations').then(res => res.json())
      .then(locations => this.setState({ locations }));

  }


  render() {
    let userEmail = (this.checkIsLoggedIn()) ? this.state.userSession[0].userEmail : "noEmail";

    //only show header while pages load server data
    if(this.checkForServerData() === false){
      return(
      <Header 
        userSession={this.state.userSession}
        activeTab={this.state.currentTab}
        />
      );
    }

    return (
      <Router>
        <div>
          <Header 
            userSession={this.state.userSession}
            activeTab={this.state.currentTab}
          />

          <Switch>
          <Route
              key='a001'
              exact path="/Browse" render={()=>
            <Browse 
              userEmail={userEmail} 
              sessions={this.state.sessions} 
              locations={this.state.locations}
              setActiveTab={this.setActiveTab}
            />}
          />
          <Route
              key='a004'
              path="/Browse/:sessionID" render={()=>
              <SessionShow 
                userEmail={userEmail} 
                sessions={this.state.sessions} 
                locations={this.state.locations}
                siteLocation={this.props.location}
                />
             }
          />
            {this.protecedCourtRoute()}
            <Route
              key='a003'
              exact path="/" render={()=>
                <Landing 
                userEmail={userEmail} 
                userSession={this.state.userSession}  
                sessions={this.state.sessions} 
                locations={this.state.locations}
                setActiveTab={this.setActiveTab}
              />}
            />
          </Switch>
        
        </div>
      </Router>
    );
  }
}




export default App;