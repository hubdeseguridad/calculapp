import { useState, useEffect } from "react";
import { updateCourse } from "@/api/client";
import { Course } from "@/types/course";

interface EditCourseModalProps {
  course: Course | null;
  onClose: () => void;
  onCourseUpdated: (course: Course) => void;
}

export default function EditCourseModal({
    course,
    onClose,
    onCourseUpdated,
    }: EditCourseModalProps) {
    const [name, setName] = useState(course?.name || "");
    const [price, setPrice] = useState(course?.price || 0);

    useEffect(() => {
        if (course) {
            setName(course.name);
            setPrice(course.price);
        }
    }, [course]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!course) return;

        const updated = await updateCourse(course.id, name, price);
        onCourseUpdated(updated);
        onClose();
    };

    if (!course) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3 style={{ marginBottom: "1rem", color: "#171A1C", textTransform: "uppercase" }}>Editar Curso</h3>

                <p className="modal-close"></p>

                <form
                    onSubmit={handleSubmit}
                    className="form-section"
                >
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
                            Precio:
                            <input
                                type="number"
                                min={1}
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </label>
                    </div>
                <div className="gp-buttons">
                    <button
                        type="button"
                        onClick={onClose}
                        className="button secondary"
                    >
                        Cancelar edición
                    </button>
                    <button
                        type="submit"
                        className="button"
                    >
                        Actualizar curso
                    </button>
                </div>

                </form>
            </div>
        </div>
    );
}
