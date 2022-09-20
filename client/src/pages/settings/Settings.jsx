import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./settings.css";
import axios from "axios";
import RightBar from "../../components/rightBar/RightBar";
import LeftBar from "../../components/leftBar/LeftBar";

export default function Settings() {
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const PF = "http://localhost:5000/images/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username,
			email,
			password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profilePic = filename;
			try {
				await axios.post("/upload", data);
			} catch (err) {}
		}
		try {
			const res = await axios.put("/users/" + user._id, updatedUser);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};

	return (
		<div className="settings">
			<LeftBar />
			<div className="settingsWrapper">
				<form className="settingsForm" onSubmit={handleSubmit}>
					<div className="settingsPP">
						<label htmlFor="fileInput" className="settingsPP">
							<img
								src={file ? URL.createObjectURL(file) : PF + user.profilePic}
								alt=""
							/>
						</label>
						<input
							type="file"
							id="fileInput"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<label>Username</label>
					<input
						type="text"
						placeholder={user.username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email</label>
					<input
						type="email"
						placeholder={user.email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="settingsSubmit" type="submit">
						Update
					</button>
					{success && <span>Profile has been updated</span>}
				</form>
			</div>
			<RightBar />
		</div>
	);
}
