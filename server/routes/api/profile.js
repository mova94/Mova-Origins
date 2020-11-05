const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

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

            return res.json(profile);

        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Profile
router.post('/', [auth, [
    check('interests', 'Interests is required')
        .not().isEmpty(),
    check('currentStatus', 'Status is required')
        .not().isEmpty()
] ], 
    async(req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            gender,
            interests,
            currentStatus,
            bio,
            relationshipStatus,
            location,
            youtube,
            instagram,
            twitter,
            facebook,
            linkedin
        } = req.body

        const profileFields = {};
        profileFields.user = req.user.id;
        if(bio) profileFields.bio = bio;
        if(relationshipStatus) profileFields.relationshipStatus = relationshipStatus;
        if(location) profileFields.location = location;
        if(currentStatus) profileFields.currentStatus = currentStatus;
        if(gender) profileFields.gender = gender;
        if(interests) profileFields.interests = interests;

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

//@route PUT api/profile/experience
//@desc Add profile experience 
//@access Private
router.put('/experience', [auth,[
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty()
    ]
], 
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id});

            profile.experience.unshift(newExp);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});

//@route DELETE api/profile/experience/:id
//@desc Delete profile experience 
//@access Private
router.delete('/experience/:id',[auth], 
    async(req, res) =>{
        try {
            const profile = await Profile.findOne({ user: req.user.id});
            profile.experience = profile.experience.filter(exp => exp.id !== req.params.id);
            await profile.save();
            return res.json(profile);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }    
});

//@route PUT api/profile/education
//@desc Add profile education
//@access Private
router.put('/education', [auth,[
    check('name', 'Name is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty()
]
], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {
        name,
        degree,
        location,
        from,
        to,
        current
    } = req.body;

    const newEdu = {
        name,
        degree,
        location,
        from,
        to,
        current
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id});

        profile.education.unshift(newEdu);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile/education/:id
//@desc Delete profile education 
//@access Private
router.delete('/education/:id',[auth], 
    async(req, res) =>{
        try {
            const profile = await Profile.findOne({ user: req.user.id});
            profile.education = profile.education.filter(edu => edu.id !== req.params.id);
            await profile.save();
            return res.json(profile);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
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
        await Post.deleteMany({user: req.user.id});
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'User deleted'});

    } catch (error) {
        console.log(error);
        res.status(500).send(' Server Error ')
    }
});

module.exports = router;