// import module 'express' for working server
var express = require('express');

// import module 'controller' for adding, getting numbers from db
var controller = require('controller');

// import module 'body-parser' for parsing request
var bodyParser = require('body-parser');

// import module 'auth' for working with passportjs
var passport = require('auth');

// port for server listening
const PORT = 8080;

const unsuccessful_message = "New number is not added";

// create server
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize()); // initialization passportjs for express
app.use(passport.session()); // support session

// adding new number to db by get request
app.get('/api/add/:number', function (req, res)
{
    controller.addNumber(req.params.number, function (result_of_request)
    {
        if(result_of_request)
            res.send(result_of_request);
        else
            res.send();
    });

});

// adding new number to db by post request
app.post('/api/add/', function (req, res)
{
    controller.addNumber(req.body.number,
        function (result_of_request)
        {
            if(result_of_request)
                res.send(result_of_request);
            else
                res.send(unsuccessful_message);
        });
});

// login user
app.post('/api/login/',
    function (req, res, next)
    {
        controller.login(req, res, next);
    }
);

// add new user
app.post('/api/register/',
    function (req, res, next)
    {
        controller.register(req, res, next);
    }
);

// server listens on port
app.listen(PORT);
