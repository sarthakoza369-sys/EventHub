const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
   joiningYear: {
        type: Number,
        required: true,
        min: 2020, // Prevents accidental typos or unrealistic inputs
        max: new Date().getFullYear() // Dynamically restricts the max year to the current year
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
