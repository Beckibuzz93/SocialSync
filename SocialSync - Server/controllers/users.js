const User = require('../models/User');

const bcrypt = require('bcrypt')

const Token = require('../models/Token')

async function index (req, res) {
  try {
    const users = await User.getAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

async function show (req, res) {
  try {
    const id = req.params.id
    const user = await User.getOneById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

async function register (req, res) {
  try {
    const data = req.body

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

    data['password'] = await bcrypt.hash(data['password'], salt)

    const result = await User.create(data)

    res.status(201).send(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function login (req, res) {
  const data = req.body

  try {
    const user = await User.getOneByUsername(data.username)
    const authenticated = await bcrypt.compare(data.password, user["password"])

    if (!authenticated) {
      throw new Error("Incorrect credentials")
    } else {
      const token = await Token.create(user["id"])
      res.status(200).json({ authenticated:true, token: token.token })
    }
  } catch (error) {
    res.status(403).json({ error: error.message })
  }
}


module.exports = {
  index, show, register, login
}
