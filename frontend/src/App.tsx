import { Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import Sales from "@/pages/Sales";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/sales" element={<Sales />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}
