const express = require('express')
const mongoose = require('mongoose')

// routs
const Users = require('./routes/api/user')
const Profile = require('./routes/api/profile')
const Posts = require('./routes/api/posts')


const app = express()

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'))

// User Routs
app.use('/api/users', Users);
app.use('/api/profile', Profile);
app.use('/api/posts', Posts);


const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log('Server is up on post '+port);
})

// Run the code by: npm run server
