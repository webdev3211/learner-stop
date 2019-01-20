var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    facebook: {
        type: String,
        // unique: true
    },

    tokens: Array,

    role: String,
    channel_name: String,

    profile: {
        name: {
            type: String, default: ''
        },
        picture: {
            type: String, default: ''
        }
    },

    coursesTeach: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    }],

    coursesTaken: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    }],

    revenue: [{
        money: Number
    }],

    revenue_total: {
        type: Number
    }


});


module.exports = mongoose.model('User', userSchema);