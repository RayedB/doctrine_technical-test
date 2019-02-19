const { db } = require("./../models/dbInit");

module.exports = function getDecision(req, res, next) {
  let doc_id = req.query.doc_id;
  let decision = Object.create(null);



  //INSERT YOUR CODE HERE
  return res.json({
    decision
  });
};
