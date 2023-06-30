const app = require('../app')
const request = require('supertest')
const bcrypt = require('bcrypt')

const db = require('../database/connect')
const Event = require('../models/Event')
const User = require('../models/User')

describe('api server', () => {
  let api

  beforeAll(async () => {
    api = app.listen(3000, () => {
      console.log('Test server running on port 3000')
    })

  //   const passwordHash = await bcrypt.hash('sekret', 10)
  //   const user = { username: 'testUser', passwordHash}

  //  await db.query("DROP TABLE IF EXISTS users;")
  //  await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;",[user.username, user.passwordHash]);
  })

  afterAll((done) => {
    console.log('Gracefully stopping test server')
    // await db.query("DROP TABLE IF EXISTS users;")
    api.close(done)
  })

  test('responds to GET / with status 200', async () => {
    const testData = {
      name: "SocialSync",
      description: "View and post events in your local community"
    }

    await request(api)
    .get('/')
    .expect(200)
    .expect(testData)
  })

  test('responds to GET /events with status 200 and at seeded event to be there', async () => {

    const response = await request(api).get("/events")
    const bodyLength = response.body.length

    expect(response.status).toBe(200)
    expect(bodyLength).toBeGreaterThan(0)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { "about": "An event on Monday"}
        )
      ])
    )
  })

  test('responds to GET /events:id with status 200 and expected object', async () => {
    const response = await request(api).get("/events/1")

    const event = {
      id: 1,
      category_name: 'General',
      event_name: 'First Entry',
      about: 'An event on Monday',
      creator: "admin",
      place: 'London',
      userId: 1
    }

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining(event))
  })

  test('responds to POST /events with status 201 and returns event created', async() => {
    const response = await request(api).post('/users/login').send({
      "username": "testUser",
      "password": "sekret"
    })

    const token = response.body.token

    const newEvent = {
      category_name: 'General',
      event_name: 'Jest party',
      about: 'A incredible expertience',
      place: 'London',
      event_date: "2023-05-04T11:36:00.000Z",
      token: token
    }

    await request(api)
      .post('/events')
      .set('Accept', 'application/json')
      .send(newEvent)
      .expect(201)
  })

  test('responds to GET /events/search/:query', async () => {
    const query = 'issue'

    const object = {
      category_name: "Issues"
    }

    const response = await request(api).get(`/events/search/${query}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          object
        )
      ]))

  })
})
