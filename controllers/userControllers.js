const User = require("../models/userModel");


/**
 * Handles the registration of a new user by saving their name, email, and password to a database.
 */

const registerUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		// console.log(name, email, password);

		if (name && email && username && password) {
			const newUser = new User({ name, email, username, password });
			const dbResponse = await newUser.save();
			res.status(201).send({
				status: true,
				message: "User created successfully",
				data: dbResponse,
			});
		} else {
			res.status(400).send({
				status: false,
				message: " All  fields are mandatory. (username, email and password)",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: false,
			message: "Bad request",
			duplicateUser: error.keyValue,
		});
	}
};

/**
 * Retrieves all users from the database and sends a JSON response with the users' data.
 */
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({
			success: true,
			status: "success",
			data: {
				users,
			},
		});
	} catch (error) {
		res.send({
			success: false,
			error,
		});
	}
};

const login = async (req, res) => {
	try {
		const { identifier, password } = req.body;
		const user = await User.findOne({
			$or: [{ username: identifier }, { email: identifier }],
		});

		if (!user) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		if (user.password === password) {
			return res.status(200).json({
				success: true,
				status: "success",
				message: "Login successful",
				data: {
					user,
				},
			});
		} else {
			return res.status(401).json({
				message: "Invalid username or password",
			});
		}
	} catch (error) {
		res.send({
			success: false,
			error,
		});
	}
};
/**
 * Retrieves a user from the database based on the provided userId and returns it
 */
const getUser = async (req, res) => {
	try {
		const { userId } = req.params;

		const dbResponse = await User.findOne({ _id: userId });

		if (!dbResponse) {
			return res.status(404).json({
				message: `no user found, id : ${userId}`,
				status: "not found",
			});
		}
		res.status(200).json({
			success: true,
			status: "success",
			data: {
				user: dbResponse,
			},
		});
	} catch (error) {
		res.send({
			success: false,
			error,
		});
	}
};

module.exports = {
	registerUser,
	getAllUsers,
	login,
	getUser,
};
