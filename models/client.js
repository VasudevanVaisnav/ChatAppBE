const mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);
var clientSchema = new mongoose.Schema({
    address:String,
    token:String,
    userid:Number
});
clientSchema.plugin(AutoIncrement, { inc_field: 'userid' });
module.exports = mongoose.model("client", clientSchema);
