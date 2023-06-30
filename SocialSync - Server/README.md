# SocialSync - Backend
<img src="https://github.com/diegorramos84/socialSync-BE/assets/17050237/5a2b3389-7709-4265-a642-2dc40d7bb93d">

# Description

This is the backend of the socialSync project developed during the Lap 2 of the LFA training - Avgerou Virtual cohort

The objective of this project is to build a platform for people living in the same area where they can share local events, look for help or discuss local issues

# Installation 

1. clone this repo
```bash
git clone git@github.com:diegorramos84/socialSync-BE.git
```
2. navigate to the app folder
```bash
cd diegorramos84/socialSync-BE
```
3. install the packages
```bash
npm install
```
4. in the app root folder, create and add the following to your .env file
```bash
# create file
touch .env

# add DB_URL link (postgress)
DB_URL: postgress://yourlink

# add PORT
PORT: 3000

# add BCRYPT_SALT_ROUNDS
BCRYPT_SALT_ROUNDS=10
```
5. run the setup-db script to get your database ready
```js
npm run setup-db
```
6. start the server
```js
npm run start

# or for development (auto server refreshes)

npm run dev
```

# Usage

With the server running, you can know interact with the API using a platform like Postman
    
1. Users Endpoint
```js
# create user
POST http://localhost:3000/users/register
{
 "username":  "username",
 "password": "password"
}

# login
POST http://localhost:3000/users/login
 {
  "username":  "username",
  "password": "password"
 }
```
2. Events Endpoint
```js
# Get all events
GET http://localhost:3000/events

# Get one event by id
GET http://localhost:3000/events/:id

# Create new event
POST http://localhost:3000/events
{
    "category_name": "Issues",
    "event_name": "test",
    "about": "testing this",
    "place": "Brazil",
    "category_name": "Other",
    "event_date": "2023-05-04T11:36",
    "token": "yourtoken"
}

# Search events
GET http://localhost:3000/events/search/:query

:query => word you are looking for

e.g.:

GET http://localhost:3000/events/search/issues

[
    {
        "id": 2,
        "category_name": "Issues",
        "event_name": "Second Entry",
        "about": "An issue found on Tuesday",
        "place": "London",
        "even_date": "2023-05-11T10:56:40.997Z",
        "userId": 1,
        "creator": "admin"
    }
]

```
# Credits
## This project was created by: 

[Diego: diegorramos84](https://github.com/diegorramos84)

[Daniel: danteoguns11](https://github.com/danteoguns11)

[Becki: Beckibuzz93](https://github.com/Beckibuzz93)
