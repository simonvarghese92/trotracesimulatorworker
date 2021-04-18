const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    event: {type:String},
    horse: {
        id: {type:Number},
        name: {type:String}
    },
    time: {type:Number}
});

module.exports = mongoose.model("Event", eventSchema);