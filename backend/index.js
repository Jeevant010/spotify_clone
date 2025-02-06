const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("/models/User")


const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


require("dotenv").config();

mongoose.connect(
        "mongodb+srv://Jeevant:" +
        process.env.MONGO_PASSWORD +
        "@cluster0.afxf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((x) => {
        console.log("connected to mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to mongo",err);
    });


    
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "supposedtobesecret";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));




const port = 8000;
app.get("/",(req,res) => {
    res.send("Hello , World!");

});


app.listen(port , () => {
    console.log("App is running on port : " + port);
});