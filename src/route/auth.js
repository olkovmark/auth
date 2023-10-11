const express = require('express')
const router = express.Router()

const { User } = require('../class/User')

router.get('/signup', function (req, res) {
  return res.render('signup', {
    name: 'signup',
    component: ['back-button', 'field', 'field-password', 'field-checkbox', 'field-select'],
    style: 'signup',
    title: 'Signup page',
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'User' },
        { value: User.USER_ROLE.ADMIN, text: 'Admin' },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Develop',
        },
      ],
    },
  })
})
module.exports = router
