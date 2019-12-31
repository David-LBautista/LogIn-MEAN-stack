const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: String,
    password: String
},{
    timestamps: true  //para crear automaticamente los campos createdAt Y updatedAt
});

module.exports = model('User', userSchema);