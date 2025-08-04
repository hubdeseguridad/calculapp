import { useState, useEffect } from "react";
import { updateCourse } from "@/api/client";
import { Course } from "@/types/course";

interface EditCourseModalProps {
  course: Course | null;
  adminToken: string;
  onClose: () => void;
  onCourseUpdated: (course: Course) => void;
}

export default function EditCourseModal({
    course,
    adminToken,
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
        const updated = await updateCourse(course.id, name, price, adminToken);
        onCourseUpdated(updated);
        onClose();
    };

    if (!course) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Editar Curso</h3>
                <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <label>Precio</label>
                <input
                    type="number"
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <div className="modal-actions">
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
                </form>
            </div>
        </div>
    );
}
