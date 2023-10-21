const { MongoClient } = require('mongodb');
const password = encodeURIComponent("vkZRyPTce1DOuAGb");

let uri =
  `mongodb+srv://bornonthefirstofmay:${password}@cluster0.yloiqev.mongodb.net/`;
let db = null;
 
// connect to mongo
MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            // result.insertedId might be useful for future features
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
// returns one user record or undefined
function find(email){
    return new Promise((resolve, reject) => {    
        db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs[0]);
        });    
    })
}

// find user account
function findOne(email, password){
    return new Promise((resolve, reject) => {    
        db
            .collection('users')
            .findOne({email: email})
            .findOne({password: password})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}

// updates any parameter for a user -- returns the updated user
function updateUser(userId, params) {
    return new Promise((resolve, reject) => {    
        db
        .collection('users')            
        .findOneAndUpdate(
            {_id: userId},
            { $set: params},
            { returnOriginal: false },
            function (err, result) {
                console.log(result);
                if(err || result.ok !== 1) {
                    return reject(err);
                }
                resolve(result.value);
            }
        );            
    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, updateUser, all};