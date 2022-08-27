import "./rightbar.css";

export default function RightBar() {
	return (
		<div className="rightBar">
			<div className="rightBarItem">
				<span className="rightBarTitle">FOLLOW US</span>
				<div className="rightBarSocial">
					<i className="rightBarIcon fa-brands fa-square-facebook"></i>
					<i className="rightBarIcon fa-brands fa-square-twitter"></i>
					<i className="rightBarIcon fa-brands fa-square-instagram"></i>
					<i className="rightBarIcon fa-brands fa-square-pinterest"></i>
				</div>
			</div>
		</div>
	);
}
