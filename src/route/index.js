const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
    name: 'index',
    title: 'index',
  })
})
router.get('/home', function (req, res) {
  res.render('home', {
    style: 'home',
    name: 'home',
    title: 'Home',
  })
})

const auth = require('./auth')
router.use('/', auth)

module.exports = router
