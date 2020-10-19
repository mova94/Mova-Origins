const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },

    experience: [
        {
            title: {
                type:String,
                required:true
            },
            company: {
                type:String,
                required:true
            },
            location: {
                type:String
            },
            from: {
                type:String,
                required:true
            },
            to: {
                type:String
            },
            current:{
                type: Boolean,
                default:false
            },
            description: {
                type:String
            }
        }
    ],

    education: [
        {
            name: {
                type:String,
                required:true
            },
            degree: {
                type:String,
                required:true
            },
            location: {
                type:String,
                required:true
            },
            from: {
                type:String,
                required:true
            },
            to: {
                type:String
            },
            current:{
                type: Boolean,
                default:false
            }
        }
    ],

    gender:{
        type:String,
        required:true
    },
    
    bio: {
        type: String
    },

    relationshipStatus: {
        type: String
    },

    currentStatus: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    interests:{
        type:[String],
        required:true
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