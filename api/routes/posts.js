const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE POST
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await Post.updateOne({ $set: req.body });
			res.status(200).json("The post has been updated");
		} else {
			res.status(403).json("You can only update your own posts");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE POST
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await Post.deleteOne();
			res.status(200).json("The post has been deleted");
		} else {
			res.status(403).json("You can only update your own posts");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET POST
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL FEED POSTS
router.get("/feed/all", async (req, res) => {
	try {
		const currentUser = await User.findById(req.body._Id);
		const userPosts = await Post.find({ userId: currentUser._id });
		// const friendsPosts = await Promise.all(
		// 	currentUser.following.map((friendId) => {
		// 		Post.find({ userId: friendId });
		// 	})
		// );
		// res.json(userPosts.concat(...friendPosts));
		res.json(userPosts);
	} catch (err) {
		res.status(500).json(err);
	}
});

//LIKE/UNLIKE POST
router.put("/:id/like", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("Post has been liked");
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("Post has been disliked");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
