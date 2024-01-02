var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema 객체 생성
const personSchema = new Schema({
    name: String,
    age: Number,
    email: { type: String, required: true},
});

// model 객체 생성
module.exports = mongoose.model('Person', personSchema);
