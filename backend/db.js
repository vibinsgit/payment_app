const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vibins:vibins@cluster0.yyqreuu.mongodb.net/paytmDB"); //paytmDB - Database name

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        minLength: 8,
        reqiured: true
    }
}, { collection: "UserData"});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Reference to User data-table
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        reqiured: true
    }
}, { collection: "AccountData"});

const User = mongoose.model("UserData", userSchema); //UserData - table name
const Account = mongoose.model("AccountData", accountSchema);

module.exports = {
    User,
    Account
}
