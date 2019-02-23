const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

// router.get('/getJurisdictionContactInfos/:jurisdiction_id', require('./controllers/getJurisdictionContactInfos'))
// router.get('/decision/:doc_id', require('./controllers/getDecision'))

module.exports = router

router.get('/',
  asyncHandler(require('./controllers/index')))
router.get('/jurisdiction/:jurisdiction_id',
  asyncHandler(require('./controllers/jurisdiction')))
router.get('/getJurisdictionContactInfos',
  asyncHandler(require('./controllers/getJurisdictionContactInfos')))
router.get('/getDecision',
  asyncHandler(require('./controllers/getDecision')))
router.get('/getJurisdictionTopDecisions',
  asyncHandler(require('./controllers/getTopDecisions')))

module.exports = router