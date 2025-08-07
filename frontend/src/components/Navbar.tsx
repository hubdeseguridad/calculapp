import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div className="navbar">
            <div className="--container">
                <Link to="/">
                    <img src="/img/logo.png" alt="Logo" className='logo' width={75} height={32} />
                </Link>
                <div className="--links">
                    <Link to="/sales">Calculadora</Link>
                    <Link to="/admin">Administrador</Link>
                </div>
            </div>
        </div>
    );
}