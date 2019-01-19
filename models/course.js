var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ownByStudent: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    totalStudents: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }

});



module.exports = mongoose.model('Course', CourseSchema);