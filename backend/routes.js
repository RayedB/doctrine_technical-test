const express = require('express')
const router = express.Router()

router.get('/', require('./controllers/index'))
router.get('/jurisdiction/:jurisdiction_id', require('./controllers/jurisdiction'))
router.get('/getJurisdictionContactInfos/:jurisdiction_id', require('./controllers/getJurisdictionContactInfos'))
router.get('/decision/:doc_id', require('./controllers/getDecision'))

module.exports = router
