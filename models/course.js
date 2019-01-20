var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: String,
    desc: String,
    wistiaId: String,
    price: Number,
    notes: {
        type: String,
        default: null
    },
    thumbnail: {
        type: String,
        unique: true,
        default: "https://steemitimages.com/DQmX4sRvLQ2oBN7HNWYKXseAph1q6a9QA5LJcaF5ronsxyD/33.jpg"
    },
    ownByTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ownByStudent: [{
        // type: Schema.Types.ObjectId,
        // ref: 'User'
        // _id: mongoose.Schema.Types.ObjectId,
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],


    totalStudents: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});



module.exports = mongoose.model('Course', courseSchema);