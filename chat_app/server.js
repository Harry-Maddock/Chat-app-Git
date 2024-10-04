// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;  
const mongoUrl = 'mongodb://localhost:27017';  // Change this to your MongoDB connection string
const dbName = 'ChatApp';  // Your database name

app.use(cors());
app.use(bodyParser.json());

let db;
 

MongoClient.connect(mongoUrl, { })
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(err => console.error(err));


app.post('/setItem', (req, res) => {
    const { admin, name } = req.body;
    db.collection('chatrooms').updateOne(
        { name },
        { $set: { admin, members: [admin], subgroups: [], requests: [] } },
        { upsert: true }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.post('/addUser', (req, res) => {
    const { name, username } = req.body;
    db.collection('chatrooms').updateOne(
        { name },
        { $addToSet: { members: username } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.post('/removeRequest', (req, res) => {
    const { name, member } = req.body;
    db.collection('chatrooms').updateOne(
        { name },
        { $pull: { requests: member } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.post('/addSubgroup', (req, res) => {
    const { name, subgroup } = req.body;
    db.collection('chatrooms').updateOne(
        { name },
        { $addToSet: { subgroups: subgroup } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.post('/removeMember', (req, res) => {
    const { name, member } = req.body;
    db.collection('chatrooms').updateOne(
        { name },
        { $pull: { members: member } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.get('/getItem/:name', (req, res) => {
    const name = req.params.name;
    db.collection('chatrooms').findOne({ name })
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});


app.post('/addRequest', (req, res) => {
    const { name, user } = req.body;
    db.collection('chatrooms').updateOne(
        { name },
        { $addToSet: { requests: user } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.delete('/removeItem/:name', (req, res) => {
    const name = req.params.name;
    db.collection('chatrooms').deleteOne({ name })
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const newUser = {
        username,
        password,
        email,
        id: Date.now(), 
        role: "Chat User",
        groups: []
    };
    db.collection('users').insertOne(newUser)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    db.collection('users').findOne({ username })
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

app.delete('/user/:username', (req, res) => {
    const username = req.params.username;
    db.collection('users').deleteOne({ username })
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

app.post('/user/addGroup', (req, res) => {
    const { username, group } = req.body;
    db.collection('users').updateOne(
        { username },
        { $addToSet: { groups: group } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

app.get('/user/groups/:username', (req, res) => {
    const username = req.params.username;
    db.collection('users').findOne({ username }, { projection: { groups: 1 } })
        .then(user => res.send(user.groups))
        .catch(err => res.status(500).send(err));
});

app.post('/user/removeGroup', (req, res) => {
    const { username, group } = req.body;
    db.collection('users').updateOne(
        { username },
        { $pull: { groups: group } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});