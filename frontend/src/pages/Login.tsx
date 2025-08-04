import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/", {
                password
            });
            localStorage.setItem("adminToken", res.data.token);
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setError("Contraseña incorrecta");
        }
    };

    return (
        <div className="login-page">
            <h2>Acceso Administrador</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Acceder</button>
            </form>

        </div>
    );
}
