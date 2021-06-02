const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// Load User model
const User = require('../../models/Users')

// @route  GET api/users/test
// @des    Test users route
// @access Public
router.get('/test', (req, res) => res.json({
        msg: "User Works"
    })
)

// @route  GET api/users/register
// @des    Register route
// @access Public
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already user for an account'})
        }
        const avatar = gravatar.url(req.body.email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default
        })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
        });
        bcrypt.genSalt(8, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(
                    user => res.json(user)
                ).catch(err => console.log(err))
            })
        })
    })
})

// @route  GET api/users/login
// @des    Login User/Returning Token
// @access Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by Email
    User.findOne({email}).then(user => {
        if(!user) { //Chek for user
            return res.status(404).json({email: 'Email not found'})
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) {
                return res.status(400).json({password: 'Incorrect Passowrd '})
            }
            return res.json({msg: 'Success'})
        })

    })
})

module.exports = router;