import { Context } from "../../context/Context";
import { useRef, useContext } from "react";
import axios from "axios";
import "./login.css";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("/auth/login", {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					type="text"
					className="loginInput"
					placeholder=""
					ref={emailRef}
				/>
				<label>Password</label>
				<input
					type="password"
					className="loginInput"
					placeholder=""
					ref={passwordRef}
				/>
				<button className="loginButton" type="submit" disabled={isFetching}>
					Login
				</button>
			</form>
		</div>
	);
}
