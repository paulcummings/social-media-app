import { useContext, useState } from "react";
import "./createPost.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function CreatePost() {
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

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
			{file && (
				<img src={URL.createObjectURL(file)} alt="" className="postImg" />
			)}
			<form className="postForm" onSubmit={handleSubmit}>
				<div className="postFormGroup">
					<label htmlFor="fileInput">
						<i className="postIcon fa-solid fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				<div className="postFormGroup">
					<textarea
						placeholder="What's on your mind?"
						type="text"
						className="postInput postText"
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<button className="postSubmit" type="submit">
					Post
				</button>
			</form>
		</div>
	);
}
