const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 1,
			max: 20,
		},
		lastName: {
			type: String,
			required: true,
			min: 1,
			max: 20,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			max: 50,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 50,
		},
		dob: {
			type: Date,
			required: true,
		},
		profilePic: {
			type: String,
			default: "user-solid.svg",
		},
		coverPic: {
			type: String,
			default: "",
		},
		friends: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
