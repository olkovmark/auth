const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
    name: 'index',
    title: 'index',
  })
})

const auth = require('./auth')
router.use('/', auth)

module.exports = router
