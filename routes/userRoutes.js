const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/register", async (req, res) => {
	try {
		userControllers.registerUser(req, res);
	} catch (error) {
		res.status(500).send({
			message: "Error occurred",
			error,
		});
	}
});

router.get("/getAllUsers", async (req, res) => {
	try {
		userControllers.getAllUsers(req, res);
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "Server error" });
	}
});
router.post("/login", async (req, res) => {
	try {
		userControllers.login(req, res);
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "Server error" });
	}
});

router.get("/user/:userId", async (req, res) => {
	try {
		userControllers.getUser(req, res);
	} catch (error) {
		// console.error(error);
		res.status(400).send({
			message: "Server error",
			error,
		});
	}
});

module.exports = router;
