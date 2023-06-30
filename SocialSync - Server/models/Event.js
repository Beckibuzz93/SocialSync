const db = require('../database/connect');

class Event {
    constructor({ category_name, event_name, about, place, event_date, event_id, user_id, username}) {
        this.id = event_id
        this.category_name = category_name
        this.event_name = event_name
        this.about = about
        this.place = place
        this.even_date = event_date
        this.userId = user_id
        this.creator = username
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM events JOIN users ON events.user_id=users.user_id ORDER by event_id DESC");
        return response.rows.map(d => new Event(d));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM events JOIN users ON events.user_id=users.user_id WHERE event_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate entry.")
        }
        return new Event(response.rows[0]);
    }

    static async create(data, id) {
        const { event_name, about, place, category_name, event_date } = data;
        console.log(data)
        const user_id = id
        let response = await db.query("INSERT INTO events (category_name, event_name, about, place, event_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [category_name, event_name, about, place, event_date, user_id]);
        const newId = response.rows[0].event_id;
        const newPost = await Event.getOneById(newId);
        return newPost;
    }

    static async find(data) {
      let query = '%' + data.query + '%'
      let response = await db.query("SELECT * FROM events JOIN users ON events.user_id=users.user_id WHERE about ILIKE $1 OR event_name ILIKE $1 OR place ILIKE $1 OR category_name ILIKE $1", [query])
      if (response.rows.length === 0) {
        throw new Error("Unable to locate entry.")
      }
      if (response.rows.length != 0) {
        return (response.rows.map(e => new Event(e)))
      }
    }
}

module.exports = Event
