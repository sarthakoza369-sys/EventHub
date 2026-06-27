const mongoose = require('mongoose');
const {Schema} = mongoose;

const EventSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique: false
    },
    host:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;