const { db } = require("./../models/dbInit");

module.exports = async function getJurisdictionContactInfos(req, res, next) {
  try {
    let jurisdiction_id = req.query.jurisdiction_id;
    const rawData = await getJurisdictionInfo(jurisdiction_id)
    await res.json({ contactInfos: rawData })
  } catch (err) {
    res.status(500).json({error: "Something went wrong", message: err})
  }
}

const getJurisdictionInfo = async (jurisdiction_id) => {
  const results = await findJurisdictionInDB(jurisdiction_id)
  const contact_infos = serializeJurisdiction(results)
  return contact_infos
}

const findJurisdictionInDB = async (jurisdiction_id) => {
  const SQLQuery = `
  SELECT jurisdictions.jurisdiction_id, jurisdictions.telephone, jurisdictions.fax, jurisdictions.email,jurisdictions_verified_contact_infos.type, jurisdictions_verified_contact_infos.data
  FROM jurisdictions
  LEFT JOIN jurisdictions_verified_contact_infos
  ON jurisdictions.jurisdiction_id = jurisdictions_verified_contact_infos.jurisdiction_id
  WHERE jurisdictions.jurisdiction_id = ?
  `
  return new Promise((resolve,reject)=>{
    db.all(SQLQuery,jurisdiction_id,(err,row) => {
      if (err) {reject (err) }
      resolve(row)
    })
  })
  
}

const serializeJurisdiction = (allJurisdictions) => {
  const serializedJurisdiction = {}
  serializedJurisdiction.telephone = []
  serializedJurisdiction.email = []
  serializedJurisdiction.fax = []

  const verifiedContacts = {}
  verifiedContacts.telephone = false
  verifiedContacts.fax = false
  verifiedContacts.email = false
  for (let i = 0; i < allJurisdictions.length; i++){
    const jurisdictionVerifiedData = processVerifiedData(allJurisdictions[i])
    serializedJurisdiction[jurisdictionVerifiedData.type].push({data: jurisdictionVerifiedData.data, verified: jurisdictionVerifiedData.verified})
    if (emailIsDuplicate(allJurisdictions[i])) {
      verifiedContacts.email = true
    }
    if (faxIsDuplicate(allJurisdictions[i])){
      verifiedContacts.fax = true
    }
    if (telephoneIsDuplicate(allJurisdictions[i])){
      verifiedContacts.telephone = true
    }      
  }
  if (verifiedContacts.telephone == false && allJurisdictions[0].telephone != null) {
    serializedJurisdiction.telephone.push({data: allJurisdictions[0].telephone, verified: false})
  }  
  if (verifiedContacts.fax == false && allJurisdictions[0].fax != null) {
    serializedJurisdiction.fax.push({data: allJurisdictions[0].fax, verified: false})
  }  
  if (verifiedContacts.email == false && allJurisdictions[0].email != null) {
    serializedJurisdiction.email.push({data: allJurisdictions[0].email, verified: false})
  }  
  return serializedJurisdiction
}

const processVerifiedData = (verifiedData) => {
  const dataType = Object.values(verifiedData)[4]
  const dataValue = Object.values(verifiedData)[5]
  const verifiedContactDetails = {type: dataType, data: dataValue, verified: true}
  return verifiedContactDetails
}

const emailIsDuplicate = (jurisdictionData) => {
  if (jurisdictionData.type == 'email' && jurisdictionData.email == jurisdictionData.data) {
    return true
  }
  return false
}

const telephoneIsDuplicate = (jurisdictionData) => {
  if (jurisdictionData.type == 'telephone' && jurisdictionData.telephone == jurisdictionData.data) {
    return true
  }
  return false
}

const faxIsDuplicate = (jurisdictionData) => {
  if (jurisdictionData.type == 'fax' && jurisdictionData.fax == jurisdictionData.data) {
    return true
  }
  return false
}