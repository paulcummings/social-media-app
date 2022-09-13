import Post from "../post/Post";
import "./posts.css";
import CreatePost from "../createPost/CreatePost";

export default function Posts({ posts }) {
	return (
		<div className="posts">
			<CreatePost />
			{posts.map((p) => (
				<Post post={p} key={p._id} />
			))}
		</div>
	);
}
