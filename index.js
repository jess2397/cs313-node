const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
require('dotenv').config();
const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
var bodyParser = require('body-parser')

express()
  .use(express.static(path.join(__dirname, 'public')))
    .use( bodyParser.json() )
    .use(bodyParser.urlencoded({extended: true}))
    .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', mailCalc)
  .get('/social', social)
  .post('/createPost', createPost)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function social(req,res){

    var sql = 'SELECT p.id, p.content, p.date, a.display_name FROM post AS p JOIN author AS a ON p.author_id = a.id ORDER BY p.date DESC';

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);

        res.send(result.rows);
    });
}

function createPost(req, res){
    const text = 'INSERT INTO post(author_id, content, date) VALUES($1, $2, $3) RETURNING *';
    const values = [req.body.userId, req.body.content, "2019-02-05 00:00:00"];

    // callback
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send(result.rows);
        }
    })
}






















function mailCalc(req, res){

    var type = req.query.type;
    var weight = req.query.weight;

    var typeName;
    var result;
    switch(type){
        case 'S':
            result = .55 + ((weight -1) * .15);
            if(result > 1)
                result = 1;
            typeName = "Letters (Stamped)";
            break;
        case 'M':
            result = .50 + ((weight -1) * .15);
            if(result > .95)
                result = 1;
            typeName = "Letters (Metered)";
            break;
        case 'F':
            result = 1.00 + ((weight - 1) *.15);
            typeName = "Large Envelopes (Flats)";
            break;
        case 'R':
            if(weight < 4)
                result = 3.66;
            else if(weight < 8)
                result = 4.39;
            else if (weight < 12)
                result = 5.19;
            else
                result = 5.71;

            typeName = "First-Class Package Service --Retail";
            break;
    }

    const params = {rate: result, weight: weight, type: typeName};

    res.render("pages/getRate", params);
}
