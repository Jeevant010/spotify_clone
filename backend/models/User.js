const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
        type : String,
        required: true,
    },
    lastName : {
        type: String,
    },
    email : {
        type: String,
        required : true,
    },
    username : {
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

const UserModel = mongoose.model("User",User);

module.exports = UserModel;