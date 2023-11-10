const mongoose = require("mongoose");
// {
// 	"name":"Abc",
// 	"email":"abc@abc.com",
// 	"username":"abc12",
// 	"password":"abc"
// }

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;