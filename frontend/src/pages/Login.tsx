import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "@/api/client";

export default function Login() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await loginAdmin(password);
            navigate("/admin");
        } catch (err) {
            console.error("Error en login:", err);
            setError("Contraseña incorrecta o error del servidor");
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
