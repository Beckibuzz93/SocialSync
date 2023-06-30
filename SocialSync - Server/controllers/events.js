const Event = require('../models/Event');
const Token = require('../models/Token')


async function index(req, res) {
  try {
    const events = await Event.getAll()
    res.status(200).json(events)
  } catch (error) {
      res.status(404).json({ error: error.message })
  }
}

async function show(req, res) {
  try {
    const id = req.params.id
    const event = await Event.getOneById(id)
    res.status(200).json(event)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

async function create(req, res) {
  try {
    const data = req.body
    const user = await Token.getOneByToken(data.token)
    const newEvent = await Event.create(data, user.user_id)
    res.status(201).json(newEvent)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// find/search
async function find(req, res) {
  try {
    const query = req.params
    const events = await Event.find(query)
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = {
  index, show, create, find
}
