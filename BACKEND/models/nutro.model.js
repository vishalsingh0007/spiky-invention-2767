const mongoose = require('mongoose');

const nutroschema = mongoose.Schema({
    Serving_size: Number,
    category: String,
    Calories_from_fat: Number,
    Total_fat: Number,
    Saturated_fat: Number,
    Trans_fat: Number,
    Cholesterol: Number,
    Protein: Number,
    Carbohydrates: Number,
    Sodium: Number,
    title: String,
    userID: String
})

const nutroModel = mongoose.model('nutros', nutroschema);

module.exports = { nutroModel };