const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let partySchema = new Schema({
    name: {
        type: String
    },
    attendance: {
        type: Number
    },
    remainingPeople: {
        type: Number
    },
    picture: {
        type: String
    }
}, {
    collection: "parties"
})

module.exports = mongoose.model('party', partySchema);