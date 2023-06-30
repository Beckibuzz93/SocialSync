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


  test('responds to GET / with status 200 and a list of users', async () => {
     const response = await request(api).get('/users')

     const bodyLength = response.body.length

     expect(response.status).toBe(200)
     expect(bodyLength).toBeGreaterThan(0)
     expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { "username": "testUser"}
        )
      ])
    )
  })

  test('responds to GET /users:id with status 200 and expected object', async () => {
    const response = await request(api).get("/users/2")

    const user = {
      username: "testUser"
    }

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining(user))
  })

  // please change username for every test
  xtest('responds to POST /users/register with status 201 and the user created', async() => {
    const user = {
      username: "test102",
      password: "test"
    }

    const response = await request(api).post("/users/register").send(user)
    console.log(response.body)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining( { "username": "test102" }))
  })

  test('responds to POST /users/login with status 200 and the token is sent back', async() => {
    const user = {
      username: "test101",
      password: "test"
    }


    const response = await request(api).post("/users/login").send(user)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining( { "authenticated": true }))
  })




})
