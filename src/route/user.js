const express = require('express')
const router = express.Router()

const { User } = require('../class/User')

router.get('/user-list', function (req, res) {
  return res.render('user-list', {
    name: 'user-list',
    component: ['back-button'],
    title: 'User list page',
    style: 'user-list',
    data: {},
  })
})

router.get('/user-list-data', function (reg, res) {
  const list = User.getList()

  if (list.length === 0) return res.status(400).json({ message: 'Not users' })

  return res.status(200).json({
    list: list.map((item) => ({
      id: item.id,
      email: item.email,
      role: item.role,
    })),
  })
})

router.get('/user-item', function (req, res) {
  return res.render('user-item', {
    name: 'user-item',
    component: ['back-button'],
    title: 'User item page',
    style: 'user-item',
    data: {},
  })
})
router.get('/user-item-data', function (req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      message: 'Not id',
    })
  }

  const user = User.getById(Number(id))

  if (!user) {
    return res.status(400).json({
      message: 'Not user',
    })
  }
  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isConfirm: user.isConfirm,
    },
  })
})

module.exports = router
