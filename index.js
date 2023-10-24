var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const PORT = process.env.PORT || 4000;
console.log(PORT);
console.log('--------------');

// used to serve static files from public directory
// app.use(express.static('public'));
// Use this line to serve ES6 module files with .mjs extension
app.use(express.static('public', { extensions: ['html', 'js', 'mjs'] }));

app.use(cors());

app.get("/",(req,res)=>{
    res.sendFile(path.join(""))
})
// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((user) => {

            // if user exists, return error message
            if(user > 0){
                console.log('User already exists');
                res.send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user){
                if (user.password === req.params.password){
                    console.log(user);
                    res.send(user);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
//`/account/findOne/${email}`
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email)
    .then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user's balance by email
app.get('/account/findOne/:balance', function (req, res) {

    dal.findOne(req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

app.listen(PORT, function() {
    console.log('Running on port: ' + PORT);   
   });
   