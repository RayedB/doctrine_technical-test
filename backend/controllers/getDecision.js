const { db } = require("./../models/dbInit");

module.exports = function getDecision(req, res, next) {
  let doc_id = req.query.doc_id;
  let decision = Object.create(null);

  db.all('SELECT * FROM decisions WHERE formation = "CHAMBRE_CRIMINELLE" AND solution LIKE "Cassation%" AND dec_date > "1980-01-01"ORDER BY dec_date DESC LIMIT 10'
  , (err, row) => {
    if (err) return next(err)

    if (row == null) return next(new Error('Could not find jurisdiction'))

    res.json({ jurisdiction_infos: row })
  })

  //INSERT YOUR CODE HERE
  // return res.json({
  //   decision
  // });
};
