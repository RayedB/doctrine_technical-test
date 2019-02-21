const { db } = require("./../models/dbInit");

module.exports = function getDecision(req, res, next) {
  try{
    

  } catch (error) {
    res.status(500).json({error: "Something went wrong", message: err})
  }
  let doc_id = req.params.doc_id;
  let decision = Object.create(null);

};
