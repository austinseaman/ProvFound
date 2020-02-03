const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    insName: String,
    usualCoPay: String,
    docId: Array
});

module.exports = mongoose.model('Plan', planSchema);