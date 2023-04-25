const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const db = require('./config/mogoose');



// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const loginRoutes = require('./routes/loginroutes');

// Cors 
const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

// Routes
app.use("/api/", loginRoutes);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));



app.listen(3001, () => {
    console.log('Server is running on port ' + 3001);
});

