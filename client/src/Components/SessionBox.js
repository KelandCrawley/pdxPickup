import React, { Component } from 'react';
import { getLocationImg, formatTime } from './Utility'
import '../Style/Sessions.css';

class SessionBox extends Component {
  render() {
    return (
      <div key={this.props.keyValue}>
        <div className="sessionImg">{getLocationImg(this.props.locationID)} </div>
        <span className="sessionInfo">
          <div className="sessionName"> {this.props.sessions[this.props.keyValue].sessionName}  </div>
          <div className="sessionLocation">{this.props.locations[this.props.locationID - 1].locationName} </div>
          <div className="sessionDate text-info"> {formatTime(this.props.sessions[this.props.keyValue].sessionDate)} </div>
        </span>
        <span className="sessionPop text-secondary"> # of Players: {this.props.sessions[this.props.keyValue].sessionPop} </span>
      </div>
    );
  }
}

export default SessionBox;
