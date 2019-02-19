const { db } = require('../models/dbInit')


module.exports = function(req, res, next) {
  let jurisdiction_id = req.params.jurisdiction_id

  db.get(`
    SELECT *
    FROM jurisdictions
    WHERE jurisdiction_id = ?
    `
  , [jurisdiction_id], (err, row) => {
    if (err) return next(err)

    if (row == null) return next(new Error('Could not find jurisdiction'))

    res.json({ jurisdiction_infos: row })
  })
}
