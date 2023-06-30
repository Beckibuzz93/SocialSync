DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS users;

-- Users
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);

-- Events
CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(100) NOT NULL,
    event_name VARCHAR (100) NOT NULL,
    about VARCHAR (500) NOT NULL,
    place VARCHAR (100) NOT NULL,
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    PRIMARY KEY (event_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);


INSERT INTO users (username, password)
VALUES ('admin', 'admin');

INSERT INTO events (category_name, event_name, about, place, user_id)
VALUES ('General', 'First Entry', 'An event on Monday', 'London', 1),
('Issues','Second Entry', 'An issue found on Tuesday', 'London', 1),
('Looking for work','Third Entry', 'Join Wednesday clean-up day', 'London', 1),
('Library','Fourth Entry', 'Volunteer at the library', 'London', 1);
