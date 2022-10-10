import { useState } from "react";
import "./register.css";
import axios from "axios";

export default function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dob, setDob] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			const res = await axios.post("/auth/register", {
				firstName,
				lastName,
				email,
				dob,
				password,
			});
			res.data && window.location.replace("/login");
		} catch (err) {
			setError(true);
		}
	};

	return (
		<div className="register">
			<span className="registerTitle">Register</span>
			<form className="registerForm" onSubmit={handleSubmit}>
				<label>First Name</label>
				<input
					type="text"
					className="registerInput"
					placeholder=""
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<label>Last Name</label>
				<input
					type="text"
					className="registerInput"
					placeholder=""
					onChange={(e) => setLastName(e.target.value)}
				/>
				<label>Date of Birth</label>
				<input
					type="date"
					className="registerInput"
					placeholder=""
					onChange={(e) => setDob(e.target.value)}
				/>
				<label>Email</label>
				<input
					type="text"
					className="registerInput"
					placeholder=""
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password</label>
				<input
					type="password"
					className="registerInput"
					placeholder=""
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="registerButton" type="submit">
					Register
				</button>
			</form>
			{error && <span className="registerError">Something went wrong</span>}
		</div>
	);
}
