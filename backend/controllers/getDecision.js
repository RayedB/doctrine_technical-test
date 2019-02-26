const { db } = require("./../models/dbInit");

module.exports = async function getDecision(req, res, next) {
  try{
    let doc_id = req.query.doc_id;
    const decision = await findDecisionInDB(doc_id);
    res.status(200).json(decision)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Something went wrong", message: error})
  }
};
  const findDecisionInDB = async (decision_id) => {
    const DecisionSQLQuery = `
        SELECT title, html_content, solution, dec_date
        FROM decisions
        WHERE doc_id = ?
        `;
      return new Promise((resolve,reject)=>{
        db.get(DecisionSQLQuery,decision_id,(err,row) => {
          if (err) {reject (err) }
          resolve(row)
        })
      })
  }

