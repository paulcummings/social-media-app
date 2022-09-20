import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightBar/RightBar";
import LeftBar from "../../components/leftBar/LeftBar";
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
				<LeftBar />
				<Posts posts={posts} />
				<RightBar />
			</div>
		</>
	);
}
