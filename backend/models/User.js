const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let userSchema = new Schema({
    titleName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    parties: [
        { 
            type: ObjectId,
            ref: 'Party'
        }
    ]
}, {
    collection: "users"
})

module.exports = mongoose.model('user', userSchema);