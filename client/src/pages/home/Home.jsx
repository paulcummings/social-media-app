import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/RightBar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();

	// LOAD POSTS
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get("/posts" + search);
			setPosts(res.data);
		};
		fetchPosts();
	}, [search]);

	return (
		<>
			<div className="home">
				<Posts posts={posts} />
				<RightBar />
			</div>
		</>
	);
}
