import { useState } from "react";
import { createCourse } from "@/api/client";

interface AddCourseProps {
    onCourseAdded: (course: any) => void;
    adminToken: string;
}

export default function AddCourse({ onCourseAdded, adminToken }: AddCourseProps) {
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
            const newCourse = await createCourse(name, price, adminToken);
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
        <form onSubmit={handleSubmit} className="add-course-form">
        <h3>Agregar Curso</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
            <label>Nombre del curso</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Curso de React"
            />
        </div>
        <div>
            <label>Precio</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                min={1}
            />
        </div>
        <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Agregar"}
        </button>
        </form>
    );
}
