const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Public
router.get('/me', auth, 
    async(req, res) => {
        try {
            const profile = await Profile.findOne({user: req.user.id}).populate('user',
            ['name', 'avatar']);

            if(!profile){
                return res.status(400).json({msg : 'No Profile For User!'});
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Profile
router.post('/', [auth, [
    check('status', 'Status is required')
        .not().isEmpty()
] ], 
    async(req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            employment,
            bio,
            status,
            location,
            youtube,
            instagram,
            twitter,
            facebook,
            linkedin
        } = req.body

        const profileFields = {};
        profileFields.user = req.user.id;
        if(employment) profileFields.employment = employment;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(location) profileFields.location = location;

        profileFields.social = {}; 
        if(youtube) profileFields.social.youtube = youtube;
        if(instagram) profileFields.social.instagram = instagram;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        
        try {
            let profile = await Profile.findOne({user: req.user.id})
            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true}
                );
                return res.json(profile)
            } else {
                profile = new Profile(profileFields);

                await profile.save();
                return res.json(profile);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    }    
);

//@route GET api/profile
//@desc Get all profiles
//@access Public
router.get('/', async (req, res) => {
    try {

        const profiles = await Profile.find().populate('user', ['name','avatar']);
        console.log(profiles);
        res.json(profiles);

    } catch (error) {
        console.log(error);
        res.status(500).send(' Server Error ')
    }
});

//@route GET api/profile/user/:user_id
//@desc Get profile by user ID 
//@access Public
router.get('/user/:user_id', async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name','avatar']);

        if(!profile) {
            res.status(400).json( {msg: "Profile Not Found" });
        }
        res.json(profiles);

    } catch (error) {
        console.log(error);
        if(err.kind == 'ObjectId') {
            res.status(400).json( {msg: "Profile Not Found" });
        }
        res.status(500).send(' Server Error ')
    }
});

//@route DELETE api/profile
//@desc  Delete profile, user & posts 
//@access Private
router.delete('/', auth,  async (req, res) => {
    try {
        // @todo - remove users posts
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'User deleted'});

    } catch (error) {
        console.log(error);
        res.status(500).send(' Server Error ')
    }
});

module.exports = router;