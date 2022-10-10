const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE USER
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}
		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(401).json("You can only update your account");
	}
});

//DELETE USER
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			if (user) {
				try {
					await User.findByIdAndDelete(req.params.id);
					res.status(200).json("User has been deleted");
				} catch (err) {
					res.status(500).json(err);
				}
			}
		} catch (err) {
			res.status(404).json("User not found");
		}
	} else {
		res.status(401).json("You can only update your account");
	}
});

//GET USER
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

//FRIEND USER

//UNFRIEND USER

//FOLLOW USER
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { following: req.params.id } });
				res.status(200).json("User has been followed");
			} else {
				res.status(403).json("You are already following this user");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You cannot follow yourself");
	}
});

//UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { following: req.params.id } });
				res.status(200).json("User has been unfollowed");
			} else {
				res.status(403).json("You are not following this user");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You cannot unfollow yourself");
	}
});

module.exports = router;
