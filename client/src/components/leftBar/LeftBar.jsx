import "./leftbar.css";

export default function LeftBar() {
	return (
		<div className="leftbar">
			<div className="leftBarWrapper">
				<div className="leftBarIconCol">
					<ul>
						<li>
							<div className="leftBarRow">
								<div className="leftBarCol">
									<i className="fa-solid fa-user-group"></i>
								</div>
								<div className="leftBarCol">Friends</div>
							</div>
						</li>
						<li>
							<div className="leftBarRow">
								<div className="leftBarCol">
									<i className="fa-solid fa-people-group"></i>
								</div>
								<div className="leftBarCol">Groups</div>
							</div>
						</li>
						<li>
							<div className="leftBarRow">
								<div className="leftBarCol">
									<i className="fa-solid fa-calendar"></i>
								</div>
								<div className="leftBarCol">Events</div>
							</div>
						</li>
						<li>
							<div className="leftBarRow">
								<div className="leftBarCol">
									<i className="fa-solid fa-newspaper"></i>
								</div>
								<div className="leftBarCol">News</div>
							</div>
						</li>
						<li>
							<div className="leftBarRow">
								<div className="leftBarCol">
									<i className="fa-solid fa-video"></i>
								</div>
								<div className="leftBarCol">Videos</div>
							</div>
						</li>
						<li>
							<div className="leftBarRow">
								<div className="leftBarCol">
									<i className="fa-solid fa-gamepad"></i>
								</div>
								<div className="leftBarCol">Games</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
