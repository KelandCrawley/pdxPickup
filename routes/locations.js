var express = require("express");
var locationModel = require("../models/locations");
var router = express.Router();

router.get('/api/locations', (req, res) => {
		locationModel.find({}, function(err, locations){
          if(err){
              var err = new  Error("Error: locationModel.find() ");
              err.statusCode = 500;
              next(err);
            }
  	res.send(locations);
 	});
});

module.exports = router;