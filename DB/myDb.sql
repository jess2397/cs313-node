
CREATE TABLE author
(
    id SERIAL       PRIMARY KEY,
    username        VARCHAR(100) NOT NULL UNIQUE,
    password        VARCHAR(100) NOT NULL,
    description     TEXT,
    pic_file        VARCHAR(100),
    display_name    VARCHAR(100) NOT NULL
);

CREATE TABLE post (
    id serial   PRIMARY KEY,
    author_id   int REFERENCES author(id) NOT NULL,
    content     TEXT NOT NULL,
    date        timestamp NOT NULL
);

CREATE TABLE comment (
    id serial   PRIMARY KEY,
    author_id   int REFERENCES author(id) NOT NULL,
    post_id     int REFERENCES post (id)  NOT NULL,
    content     TEXT NOT NULL,
    date        timestamp NOT NULL
);
