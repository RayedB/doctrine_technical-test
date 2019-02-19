const { db } = require("./../models/dbInit");

module.exports = function getJurisdictionContactInfos(req, res, next) {
  let jurisdiction_id = req.query.jurisdiction_id;
  let contactInfos = Object.create(null);


  //INSERT YOUR CODE HERE
  return res.json({
    contactInfos : {
      telephone: []
    }
  });
};

