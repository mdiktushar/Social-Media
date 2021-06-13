const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')

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

    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no account for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    }).catch(err => res.status(404).json(err))
})

// @route  GET api/profile/all
// @des    Get all profile
// @access public

router.get('/all', (req, res) => {
    const errors = {}

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'There are no Profiles'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    }).catch(err => res.status(404).json({profile: 'There are no Profiles'}))
})

// @route  GET api/profile/handle/:handle
// @des    Get profile by handle
// @access public

router.get('/handle/:handle', (req, res) => {
    const errors = {};
  
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
  
        res.json(profile);
      }).catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
  });

// @route  GET api/profile/user/:user_id
// @des    Get profile by user ID
// @access public

router.get('/user/:user_id', (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    }).catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
})

// @route  POST api/profile
// @des    Create or Edit user prifile
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}),
(req, res) => {

    const {errors, isValid} = validateProfileInput(req.body)

    // Check Validation
    if(!isValid){
        // Returns any errors with 400 status
        return res.status(400).json(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.gitHubUserName) profileFields.gitHubUserName = req.body.gitHubUserName
     
    // Skills
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram
    
    Profile.findOne({ user: req.user.id}).then(profile => {
        if(profile) {
            // update 
            Profile.findOneAndUpdate(
                { user: req.user.id},
                { $set: profileFields },
                { new: true }
            ).then(profile => res.json(profile))
        } else {
            // Creat

            // Check if handle exist
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if(profile) {
                    errors.handle = 'That handle already exixt'
                    return res.status(400).json(errors)
                }
                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }

    })
    


})

module.exports = router;