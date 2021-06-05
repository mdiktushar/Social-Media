const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Loda Profile Model
const Profile = require('../../models/Profile')
// Load User Profile
const User = require('../../models/Users')

// @route  GET api/profile/test
// @des    Test profile route
// @access Public
router.get('/test', (req, res) => {
    res.json({
        msg: "Profile Works"
    })
})

// @route  GET api/profile
// @des    Get current user prifile
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors ={}

    Profile.findOne({ user: req.user.id }).then(profile => {
        if(!profile){
            errors.noprofile = 'There is no account for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    }).catch(err => res.status(404).json(err))
})

module.exports = router;