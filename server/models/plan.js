const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    insName: String,
    usualCoPay: String,
    docId: Array
    // Setting docId to Array is working in as much as the
    // MongoDB collection shows each docId as the first index
    // of an array, but need to figure out how to write the
    // mutation to accept an array of docId's in GraphiQL
});

module.exports = mongoose.model('Plan', planSchema);