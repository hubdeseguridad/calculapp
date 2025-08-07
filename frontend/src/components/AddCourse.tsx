import { useState } from "react";
import { createCourse } from "@/api/client";

interface AddCourseProps {
    onCourseAdded: (course: any) => void;
}

export default function AddCourse({ onCourseAdded }: AddCourseProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || price <= 0) {
            setError("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const newCourse = await createCourse(name, price);
            onCourseAdded(newCourse);
            setName("");
            setPrice(0);
        } catch (err) {
            console.error(err);
            setError("Error al crear el curso. Verifica tu token o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                
            {error && <p className="errorMessage">{error}</p>}

            <form onSubmit={handleSubmit} className="form-section">

                <h3 style={{ marginBottom: "1rem", color: "#171A1C", textTransform: "uppercase" }}>Agregar Curso</h3>

                <div className="form-group">
                    <label className="label">
                        Nombre del curso:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre del curso..."
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="label">
                        Precio
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            min={1}
                        />
                    </label>
                </div>
                <div className="gp-buttons">
                    <button
                        type="submit"
                        disabled={loading}
                        className="button"
                    >
                        {loading ? "Guardando..." : "Agregar"}
                    </button>
                </div>
            </form>
        </>
    );
}
