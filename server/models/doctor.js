const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    doctorName: String,
    city: String, 
    specialty: String,
    insId: Array
})

module.exports = mongoose.model('Doctor', doctorSchema);