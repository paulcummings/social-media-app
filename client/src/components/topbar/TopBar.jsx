import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
	const { user, dispatch } = useContext(Context);
	const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
	const PF = "http://localhost:5000/images/";

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};
	const handleToggle = () => {
		setSettingsDropdownOpen((prev) => !prev);
	};

	return (
		<div className="top">
			<div className="topLeft">
				<Link className="topIcon" to="/">
					<i className="fa-solid fa-house"></i>
				</Link>
			</div>
			<div className="topCenter"></div>
			<div className="topRight">
				{user ? (
					<>
						<div className="topIcon">
							<i className="topSearchIcon fas fa-search"></i>
						</div>
						<div className="topIcon">
							<i className="fa-solid fa-gear" onClick={handleToggle}></i>
							<div className="settingsDropdown">
								<ul
									className={`settingsDropdown ${
										settingsDropdownOpen ? " showMenu" : ""
									}`}
								>
									<li>
										<Link
											className="link"
											to="/settings"
											activeclassname="active-link"
											onClick={handleToggle}
											exact="true"
										>
											Settings
										</Link>
									</li>
									<li>
										<Link
											className="link"
											to="/login"
											activeclassname="active-link"
											onClick={(handleToggle, handleLogout)}
											exact="true"
										>
											Logout
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="topIcon">
							<Link className="link" to="/profile">
								<img className="topImg" src={PF + user.profilePic} alt="" />
							</Link>
						</div>
					</>
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
			</div>
		</div>
	);
}
