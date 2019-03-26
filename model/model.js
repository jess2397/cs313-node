const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');

function getPosts(callback){
    var sql = 'SELECT p.id, p.content, p.date, a.display_name FROM post AS p JOIN author AS a ON p.author_id = a.id ORDER BY p.date DESC';

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(err, null);
        }
        callback(null, result.rows);
    });
}

function createPost(userId, content, date, callback){
    const text = 'INSERT INTO post(author_id, content, date) VALUES($1, $2, $3) RETURNING *';
    const values = [userId, content, date];

    // callback
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)

            callback(err,null);
        } else {

            callback(null, result.rows);
        }
    })
}
function createUser(username, password, displayName, callback){

    bcrypt.hash(password, 10, (err, pass) => {


    const text = 'INSERT INTO author(username, password, display_name) VALUES($1, $2, $3) RETURNING *';
    const values = [username, pass, displayName];

    // callback
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)

            callback(err,null);
        } else {

            callback(null, result.rows);
        }
    });
    });
}

function login(username, password, callback){
    var sql = "SELECT username, password, display_name, id FROM author WHERE username = '" + username +"'";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(err, null);
        }
        const person = result.rows[0];
        bcrypt.compare(password, person.password, function (err, res) {
            if (res) {

                callback(null, result.rows); //ok
            } else {
                // Passwords don't match
                callback("incorrect", null);
            }
        });
    });
}

module.exports = {
    getPosts: getPosts,
    createPost: createPost,
    login: login,
    createUser: createUser
};
