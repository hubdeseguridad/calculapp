import { Routes, Route, Link } from "react-router-dom";

function Home() {
	return (
		<div style={{ padding: "20px" }}>
			<h1>CalculAPP</h1>
			<Link to="/sales"><button>Ir a Calculadora</button></Link>
			<Link to="/admin"><button>Ir a Admin</button></Link>
		</div>
	);
}

function Sales() {
  	return <h2>Página de Calculadora (Sales)</h2>;
}

function Admin() {
  	return <h2>Página de Administración</h2>;
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sales" element={<Sales />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}
