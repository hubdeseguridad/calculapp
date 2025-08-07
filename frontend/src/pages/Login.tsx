import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "@/api/client";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

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
        <>
            <Navbar />
            <div className="container">
				<PageTitle>
					Acceso restringido
				</PageTitle>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleLogin} className="form-group">
                    <label className="label">
                        Contraseña:
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="button">Acceder</button>
                </form>
            </div>
        </>
    );
}
