import "./post.css";

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

	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	var hours = date.getHours();
	const minutes = date.getMinutes();
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
		monthNames[month] +
		" " +
		day +
		", " +
		year +
		" at " +
		hours +
		":" +
		minutes +
		" " +
		amOrPm
	);
}

export default function Post({ post }) {
	const PF = "http://localhost:5000/images/";
	return (
		<div className="post">
			<p>{post.username}</p>
			{post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
			<div className="postInfo">
				<span className="postDate">{formatDate(new Date(post.createdAt))}</span>
			</div>
			<p className="postDesc">{post.desc}</p>
		</div>
	);
}
