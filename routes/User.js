const router = require('express').Router()
const userContoller = require('../controller/user')

router.post('/register', (req, res) => {
  userContoller.register(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post('/login', (req, res) => {
  userContoller.login(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getalluser', (req, res) => {
  userContoller.getAllUser()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router