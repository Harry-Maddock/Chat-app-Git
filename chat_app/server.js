const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000
const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'ChatApp';


const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server,  {
    cors: {
        origin: 'http://localhost:4200', 
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true 
    }
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.use(cors());
app.use(bodyParser.json());

let db;


MongoClient.connect(mongoUrl, {})
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(err => console.error(err));


io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chatMessage', (data) => {
        const { roomName, message, sender } = data;
        console.log('message: ' + message);
        io.to(roomName).emit('message', { message, sender });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
    });
});

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
    var newSubgroup = {}
    db.collection('chatrooms').updateOne(
        { name },
        { $addToSet: { subgroups: subgroup } }
    ).then(
        newSubgroup = {
            groupname: name,
            name: subgroup,
            last_5: []
        },
        db.collection('subgroups').insertOne(newSubgroup).then(
        result => res.send(result))
        .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err));
});

app.post('/updateLastFive', (req, res) => {
    const { chatName, subgroup, message } = req.body;
    db.collection('subgroups').updateOne(
        { groupname: chatName, 
            name: subgroup[0] },
        { $addToSet: { last_5: message }}
    )
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

app.get('/getLastFive/:chatName/:subgroup', (req, res) => {
    const { chatName, subgroup } = req.params;

    db.collection('subgroups').findOne(
        { groupname: chatName, name: subgroup }
    )
    .then(result => res.send(result))
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


app.get('/getRoom/:name', (req, res) => {
    const name = req.params.name;
    db.collection('chatrooms').findOne({ name })
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});


app.get('/getAll', (req, res) => {
    db.collection('chatrooms').find({}).toArray()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});


app.post('/addRequest', (req, res) => {
    const roomName = req.body.name;
    const user = req.body.user;
    db.collection('chatrooms').updateOne(
        { name: roomName },
        { $addToSet: { requests: user } } 
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});


app.delete('/DeleteRoom/:name', (req, res) => {
    const name = req.params.name;
    db.collection('chatrooms').deleteOne({ name })
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

app.delete('/RemoveSubgroup/:name/:SubgroupName', (req, res) => {
    const roomName = req.params.name;
    const subgroupToRemove = req.params.SubgroupName; 
    db.collection('chatrooms').updateOne(
        { name: roomName },
        { $pull: { subgroups: subgroupToRemove } }
    )
    .then(result => { 
        if (result.modifiedCount > 0) {
            res.send({ message: 'Subgroup removed successfully' });
        } else {
            res.status(404).send({ message: 'Chatroom not found or subgroup does not exist' });
        }
    })
    .catch(err => res.status(500).send(err));
});

app.get('/getAllUsers', (req, res) => {
    db.collection('users').find({}).toArray()
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

app.get('/promote/:username/:role', (req, res) => {
    const username = req.params.username;
    const role = req.params.role;
    db.collection('users').updateOne(
        { username },
        { $set: { role: role } }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

app.post('/user/addGroup', (req, res) => {
    const username = req.body.username;
    const group = req.body.group;
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

server.listen(PORT, () => 
    console.log(`Listening on port ${PORT}`));