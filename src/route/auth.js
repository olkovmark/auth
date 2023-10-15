const express = require('express')
const router = express.Router()

const { User } = require('../class/User')

User.create({
  email: 'test@email.com',
  password: 123,
  role: 1,
})

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

router.post('/signup', function (reg, res) {
  console.log('req', reg.body)
  const { email, password, role } = reg.body

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Поля відсутні',
    })
  }

  try {
    User.create({ email, password, role })
    return res.status(200).json({
      message: 'Користувач створений',
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Помилка створення',
    })
  }
})
module.exports = router
