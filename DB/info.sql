INSERT INTO author (username, password, display_name) VALUES
('jess2397', 'pass', 'Jessica'),
('bridge4', 'pass', 'Kaladin');

INSERT INTO post (content, author_id, date) VALUES
('This is an awesome post', 1, '2019-02-05'),
('But not as cool as this one', 1, '2019-02-05'),
('yall', 2, '2019-02-05');

 INSERT INTO comment (author_id, post_id, content, date) VALUES
 (1, 4, 'this is a comment', '2019-02-05');
