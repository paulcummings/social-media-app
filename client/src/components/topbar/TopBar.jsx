import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "react-dropdown/style.css";
import "./topbar.css";

export default function Topbar() {
	const { user, dispatch } = useContext(Context);
	const PF = "http://localhost:5000/images/";

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<div className="top">
			<div className="topLeft">
				<Link className="link" to="/">
					<i class="fa-solid fa-house"></i>
				</Link>
			</div>

			{user ? (
				<div className="topCenter">
					<Link className="link" to="/login" onClick={handleLogout}>
						Logout
					</Link>
				</div>
			) : (
				<div className="topCenter"></div>
			)}

			<div className="topRight">
				{user ? (
					<div className="topIcon">
						<Link className="link" to="/settings">
							<img className="topImg" src={PF + user.profilePic} alt="" />
						</Link>
					</div>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">
								Login
							</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to="/register">
								Register
							</Link>
						</li>
					</ul>
				)}
				<div className="topIcon">
					<i className="topSearchIcon fas fa-search"></i>
				</div>
				<div className="topIcon">
					<i class="fa-solid fa-gear"></i>
				</div>
			</div>
		</div>
	);
}
