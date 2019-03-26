const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var session = require('express-session');
require('dotenv').config();
const controller = require("./controller/controller.js");
var bodyParser = require('body-parser');

express()
  .use(express.static(path.join(__dirname, 'public')))
    .use( bodyParser.json() )
    .use(bodyParser.urlencoded({extended: true}))
    .use(express.json())
    .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
    }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', mailCalc)
  .get('/social', controller.getPosts)
  .post('/createPost', controller.createPost)
  .post('/login', controller.login)
    .post('/logout', controller.logout)
    .post('/createUser', controller.createUser)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))























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
