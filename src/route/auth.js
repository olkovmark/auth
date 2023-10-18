const express = require('express')
const router = express.Router()

const { User } = require('../class/User')
const { Session } = require('../class/Session')
const { Confirm } = require('../class/Confirm')

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
  const { email, password, role } = reg.body

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Поля відсутні',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'User already',
      })
    }
    const newUser = User.create({ email, password, role })

    const session = Session.create(newUser)

    Confirm.create(newUser.email)
    return res.status(200).json({
      message: 'Користувач створений',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Помилка створення',
    })
  }
})

router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: ['back-button', 'field'],
    style: 'recovery',
    title: 'Recovery page',
    data: {},
  })
})

router.post('/recovery', function (req, res) {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({
      message: 'Not email',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Відправлено',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: ['back-button', 'field', 'field-password'],
    style: 'recovery-confirm',
    title: 'Recovery-confirm page',
    data: {},
  })
})

router.post('/recovery-confirm', (req, res) => {
  const { password, code } = req.body

  if (!code || !password) {
    return res.status(400).json({
      message: 'No data',
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Code not found',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    user.password = password

    console.log(user)

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Password change',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

router.get('/signup-confirm', function (req, res) {
  return res.render('signup-confirm', {
    name: 'signup-confirm',
    component: ['back-button', 'field'],
    title: 'Signup-confirm page',
    data: {},
  })
})

router.post('/signup-confirm', (req, res) => {
  console.log(req.body)
  const { code, token } = req.body
  if (!code || !token) {
    return res.status(400).json({
      message: 'Помилка',
    })
  }

  try {
    const session = Session.get(token)
    if (!session) {
      return res.status(400).json({
        message: 'Нема сесії',
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'Код не існуе',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }
    session.user.isConfirm = true

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true

    return res.status(200).json({
      message: 'Submit',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

module.exports = router
