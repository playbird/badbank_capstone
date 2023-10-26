require('dotenv').config()
const { MongoClient } = require('mongodb');
const password = process.env.MONGODB_PWD;
const username = process.env.MONGO_USERNAME;

let uri =
`mongodb+srv://bornonthefirstofmay:CBzdpqLDzXXndj1X@cluster0.yloiqev.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;
// let uri =  `mongodb+srv://${username}:${password}@cluster0.yloiqev.mongodb.net/`;
let db = null;
 
// Connect to MongoDB using promises
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected successfully to db server");
    // Set the 'db' variable after the connection is established
    db = client.db('myproject');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

  function create(name, email, password) {
    return new Promise(async (resolve, reject) => {
      const auth = getAuth(app); // Ensure you get the Firebase auth instance from the initialized app
  
      // First, create the user in Firebase Authentication
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        reject('Firebase Error: ' + error.message);
        return;
      }
  
      // If Firebase user creation is successful, insert the user into MongoDB
      const collection = db.collection('users');
      const doc = { name, email, password, balance: 0 };
  
      collection.insertOne(doc, { w: 1 }, function (err, result) {
        if (err) {
          console.error('MongoDB Insert Error:', err); // Log MongoDB error
          reject('MongoDB Error: ' + err.message);
        } else {
          // If both Firebase and MongoDB operations are successful, resolve with the user document
          resolve(result.ops[0]);
        }
      });
    });
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
function findOne(email){
    return new Promise((resolve, reject) => {    
        db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
    db
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
        db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, updateUser, all};