import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Browse from './Components/Browse';
import MyCourts from './Components/MyCourts';
import Header from './Components/Header';
import './App.css';

class App extends Component {
    constructor(props){
    super(props);
    this.checkIsLoggedIn = this.checkIsLoggedIn.bind(this);
    this.state = {
      userSession: [],
      sessions: [],
    }
  };

  checkIsLoggedIn(){
    if(this.state.userSession.length > 0){
      return true;
    }
    return false;
  }

  //logged in vs not-logged in routes
  //Look into if redux can fix this

  switchBrowseRoute(){
    let route = [];
    if(this.checkIsLoggedIn()){
      route.push(<Route
        key='a001' exact path='/browse'
        render={()=><Browse isLoggedIn={true} 
        userEmail={this.state.userSession[0].userEmail}
        sessions={this.state.sessions} 
        locations={this.state.locations}/>}
      />);
    }
    else{
      route.push(<Route
        key='a001' exact path='/browse' render={()=>
        <Browse isLoggedIn={false} 
        userEmail={'noEmail'} 
        sessions={this.state.sessions} 
        locations={this.state.locations} />}
      />);
    }
    return route;
  }

  switchLandingRoute(){
    let route = [];
    if(this.checkIsLoggedIn()){
      route.push(<Route
        key='a002'
        exact path="/" render={()=>
        <Landing 
          userSession={this.state.userSession}  
          sessions={this.state.sessions} 
          locations={this.state.locations}
        />}
      />);
    }
    else{
      route.push(<Route
        key='a002' exact path='/' render={()=>
        <Landing 
        sessions={this.state.sessions} 
        locations={this.state.locations} 
        />}
      />);
    }
    return route;
  }

  protecedCourtRoute(){
    let route = [];
    if(this.checkIsLoggedIn()){
      route.push(<Route 
        key="a003" exact path="/MyCourts" render={()=>
        <MyCourts 
          userSession={this.state.userSession} 
          sessions={this.state.sessions} 
          locations={this.state.locations} 
        />}
      />);
    }
    else{
      route.push(<Route key="a003" exact path="/MyCourts" component={NotLoggedInWarning}/>);
    }
    return route;
  }



  componentDidMount() {
    fetch('/api/users').then(res => res.json())
    then(userSession => this.setState({ userSession }));

    let pageLimit = '100';
    let sessionsAPICall = '/api/sessions?num=' + pageLimit + '&loc=All&sort=date';
   
    fetch(sessionsAPICall).then(res => res.json())
      .then(sessions => this.setState({ sessions }));

     fetch('/api/locations').then(res => res.json())
      .then(locations => this.setState({ locations }));

  }

  render() {
    return (
      <Router>
        <div>
          <Header 
          userSession={this.state.userSession}/>
          {this.switchBrowseRoute()}
          {this.protecedCourtRoute()}
          {this.switchLandingRoute()}
        </div>
      </Router>
    );
  }
}


class NotLoggedInWarning extends Component {
  render() {
    return (
         <div>
            <span>You must be logged in to view this page! </span>
         </div>
    );
  }
}



export default App;