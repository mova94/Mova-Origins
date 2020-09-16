const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },

    employment: {
        type: String
    },

    bio: {
        type: String
    },

    status: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    social: {
        youtube: {
            type:String
        },

        twitter: {
            type:String
        },

        facebook: {
            type:String
        },

        instagram: {
            type:String
        },

        linkedin: {
            type:String
        }
    },

    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);