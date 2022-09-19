import "./post.css";
import { useState } from "react";

function formatDate(date) {
	var monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	var hours = date.getHours();
	var amOrPm = "AM";

	// Convert to 12-hour clock
	if (hours >= 12) {
		hours -= 12;
		amOrPm = "PM";
	}
	if (hours === 0) {
		hours = 12;
	}

	return (
		monthNames[date.getMonth()] +
		" " +
		date.getDate() +
		", " +
		date.getFullYear() +
		" at " +
		hours +
		":" +
		date.getMinutes() +
		" " +
		amOrPm
	);
}

export default function Post({ post }) {
	const PF = "http://localhost:5000/images/";

	const [postSettingsDropdownOpen, setPostSettingsDropdownOpen] =
		useState(false);

	const handleToggle = () => {
		setPostSettingsDropdownOpen((prev) => !prev);
	};

	return (
		<div className="post">
			<div className="postSettingsIcon">
				<i className="fa-solid fa-ellipsis-vertical" onClick={handleToggle}></i>
				<div className="postSettingsDropdown">
					<ul
						className={`postSettingsDropdown ${
							postSettingsDropdownOpen ? " showMenu" : ""
						}`}
					>
						<li onClick={handleToggle}>Edit</li>
						<li onClick={handleToggle}>Delete</li>
					</ul>
				</div>
			</div>
			<div className="postHeader">
				<p>{post.username}</p>
				<span className="postDate">{formatDate(new Date(post.createdAt))}</span>
			</div>

			<p className="postDesc">{post.desc}</p>
			{post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
		</div>
	);
}
