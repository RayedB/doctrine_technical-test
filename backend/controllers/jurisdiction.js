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
    return jurisdictionData
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
  
