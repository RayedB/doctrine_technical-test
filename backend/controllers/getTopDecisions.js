const { db } = require("./../models/dbInit");

module.exports = async function getTopDecisions(req, res, next) {
    try {
      if (isCourDeCassation(req.query.jurisdiction_id)){
        const decisions = await findDecisionsInDB();
        res.status(200).json(decisions)
      }
    } catch (err) {
      res.status(500).json({error: "Something went wrong", message: err})
    }
  }

  const isCourDeCassation = (jurisdiction_identifier) => {
    return jurisdiction_identifier == "JUR359D88F9B71718E7F4A6"  ? true : false
  }

  const findDecisionsInDB = async () => {
    const DecisionsSQLQuery = `
      SELECT title, 'localhost:8080/decision/' || doc_id AS url, formation, solution, dec_date
      FROM decisions
      WHERE formation = "CHAMBRE_CRIMINELLE"
      AND solution LIKE "Cassation%"
      AND dec_date > "1980-01-01"
      ORDER BY dec_date 
      DESC
      LIMIT 10
      `;
      return new Promise((resolve,reject)=>{
        db.all(DecisionsSQLQuery,(err,row) => {
          if (err) {reject (err) }
          resolve(row)
        })
      })

  }