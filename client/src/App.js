import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
	const { user } = useContext(Context);
	return (
		<Router>
			<TopBar />
			<Routes>
				<Route path="/" element={user ? <Home /> : <Login />} />
				<Route path="/register" element={user ? <Home /> : <Register />} />
				<Route path="/login" element={user ? <Home /> : <Login />} />
				<Route path="/settings" element={user ? <Settings /> : <Login />} />
				<Route path="/profile" element={user ? <Profile /> : <Login />} />
			</Routes>
		</Router>
	);
}

export default App;
