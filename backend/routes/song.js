const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song")


router.post("/create", passport.authenticate("jwt", {session : false}),
 async (req,res) => {

    const { name, thumbnail, track } = req.body;
    if(!name || !thumbnail || !track ){
        return res
        .status(301)
        .json({err : "Insufficient details to create song. "})
    }

    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong= await Song.create(songDetails);
    return res.status(200).json(createdSong);
});

router.get("/get/mysongs", passport.authenticate("jwt" , {session : false}) ,
async (req, res) => {
    const currentUser = req.user;
    const songs = await Song.find({ artist : req.user._id });
    return res.status(200).json({ data : songs })

});



module.exports = router;