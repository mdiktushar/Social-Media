const express = require('express')
const mongoose = require('mongoose')

// routs
const users = require('./routes/api/user')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express()

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'))

// User Routs
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Server is up on post '+port);
})

// Run the code by: npm run server
