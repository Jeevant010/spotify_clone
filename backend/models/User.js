const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
        type : String,
        required: true,
    },
    password : {
        type: String,
        required : true,
        private : true,
    },
    lastName : {
        type: String,
    },
    email : {
        type: String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    likedsongs : {
        type : String,
        default : "",
    },
    subscribedArtists: {
        type : String,
        default : "",
    },
    likedPlaylists : {
        type : String,
        default : "",
    },
});

const UserModel = mongoose.model("user",User);

module.exports = UserModel;