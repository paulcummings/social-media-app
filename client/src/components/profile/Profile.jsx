import LeftBar from "../leftBar/LeftBar";
import RightBar from "../rightBar/RightBar";
import "./profile.css";

export default function Profile() {
	return (
		<div className="profile">
			<LeftBar />
			<div className="profileWrapper">profile page</div>
			<RightBar />
		</div>
	);
}
