const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});
console.log('modal is working');

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;

