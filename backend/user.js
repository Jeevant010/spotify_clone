const moongoose = require("moongoose");

const User = new moongoose.Schema({
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
    }


});

const UserModel = moongoose.model("User",User);

module.exports = UserModel;