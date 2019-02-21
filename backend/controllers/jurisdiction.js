const { db } = require('../models/dbInit')


module.exports = async function(req, res, next) {
  try {
    const jurisdiction_id = req.params.jurisdiction_id
    const jurisdiction = await getJurisdictionData(jurisdiction_id)
    res.status(200).json({jurisdiction_infos: jurisdiction})
  } catch(err) {
    res.status(500).json({error: "Something went wrong", message: err})
  }
}
  const getJurisdictionData = async (jurisdiction_identifier) => {
    const jurisdictionData = await findJurisdictionInDB(jurisdiction_identifier)
    if (isCourDeCassation(jurisdiction_identifier)){
      const decisions = await findDecisionsInDB();
      jurisdictionData.decisions = decisions
    }
    return jurisdictionData
  }

  const isCourDeCassation = (jurisdiction_identifier) => {
    return jurisdiction_identifier == "JUR359D88F9B71718E7F4A6"  ? true : false
  }

  const findJurisdictionInDB = async (jurisdiction_identifier) => {
      const JurisdictionSQLQuery = `
        SELECT *
        FROM jurisdictions
        WHERE jurisdiction_id = ?
        `;
      return new Promise((resolve,reject)=>{
        db.get(JurisdictionSQLQuery,jurisdiction_identifier,(err,row) => {
          if (err) {reject (err) }
          resolve(row)
        })
      })
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
  
