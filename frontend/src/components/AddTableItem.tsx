import { useEffect, useState } from "react";
import { getCourses } from "@/api/client";
import { Course } from "@/types/course";

interface AddTableItemProps {
    onAddItem: (item: { course: Course; quantity: number }) => void;
}

export default function AddTableItem({ onAddItem }: AddTableItemProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | "">("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    console.error("Respuesta inesperada:", data);
                    setCourses([]);
                }
            } catch (err) {
                console.error("Error al obtener cursos:", err);
                setCourses([]);
            }
        };
        fetchCourses();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCourseId || quantity < 1) return;

        const course = courses.find((c) => c.id === Number(selectedCourseId));
        if (!course) return;

        onAddItem({ course, quantity });
        setSelectedCourseId("");
        setQuantity(1);
    };

    return (
        <form
            id="formAddCourse"
            className="add-item-form"
            onSubmit={handleSubmit}
        >
            <label className="label">
                Número de estudiantes:
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="estudiantes"
                />
            </label>
            <label className="label">
                Curso:
                <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                >
                    <option value="">Selecciona un curso</option>
                    {courses.map((c: Course) => (
                        <option key={c.id} value={c.id}>
                            {c.name} - ${c.price}
                        </option>
                    ))}
                </select>
            </label>
            <button
                type="submit"
                className="button"
            >
                Agregar
            </button>
        </form>
    );
}
