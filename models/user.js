const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});

// It adds a username and password field to the user schema , and also adds a unique index to the email field , which ensures that each email is unique.
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);