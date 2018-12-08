  import React from 'react';
  import Moment from 'react-moment';

  export function getLocationImg(locationID, height="80", width="120"){
  let image = [];
  let imageAdress =  require('../ParkPics/ArgayDefault.jpg');
	switch (locationID) {
	  case 1: imageAdress = require('../ParkPics/AlbertaBball.jpg'); break;
	  case 2: imageAdress = require('../ParkPics/ArgayDefault.jpg'); break;
	  case 3: imageAdress =  require('../ParkPics/BloomingtonBball.jpg'); break;
	  case 4: imageAdress =  require('../ParkPics/BrooklynBball.jpg'); break;
	  case 5: imageAdress =  require('../ParkPics/ClintonDefault.jpg'); break;
	  case 6: imageAdress =  require('../ParkPics/ColonelSummersBball.jpg'); break;
	  case 7: imageAdress =  require('../ParkPics/CouchDefault.jpg'); break;
	  case 8: imageAdress =  require('../ParkPics/DawsonBball.jpg'); break;
	  case 9: imageAdress =  require('../ParkPics/eastridgeDefault.jpg'); break;
	  case 10: imageAdress =  require('../ParkPics/edBenedictDefault.jpg'); break;
	  default: imageAdress = require('../ParkPics/AlbertaBball.jpg');
	}

  image.push(<img key="y001" src={imageAdress} alt="" height={height} width={width} />);
  return image;
}

export function formatTime(time) {

  return <Moment format="YYYY/MM/DD hh:mm a" date={time} />;
}