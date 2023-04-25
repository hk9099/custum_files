const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://hkbitcoding:harsh9099@cluster0.c4q3bhx.mongodb.net/reactLoginAndSignup?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Connected to MongoDB');
}
);

// Export the connection
module.exports = db;
