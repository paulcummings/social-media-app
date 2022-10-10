import { useContext, useState } from "react";
import "./createPost.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function CreatePost() {
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);
	const PF = "http://localhost:5000/images/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			desc,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			newPost.photo = filename;
			try {
				await axios.post("/upload", data);
			} catch (err) {}
		}
		try {
			await axios.post("/posts", newPost);
			window.location.reload(false);
		} catch (err) {}
	};

	return (
		<div className="createPost">
			<form className="postForm" onSubmit={handleSubmit}>
				<div className="postFormGroup">
					<Link className="link" to="/profile">
						<img className="profilePic" src={PF + user.profilePic} alt="" />
					</Link>
				</div>
				<div className="postFormGroup">
					<textarea
						className="postInput"
						placeholder="What's on your mind?"
						type="text"
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<div className="postFormGroup">
					<label htmlFor="fileInput">
						<i className="postIcon fa-solid fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				{file && (
					<img src={URL.createObjectURL(file)} alt="" className="postImg" />
				)}
				<button className="postSubmit" type="submit">
					Post
				</button>
			</form>
		</div>
	);
}
