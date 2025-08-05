import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "@/api/client";
import AddCourse from "@/components/AddCourse";
import EditCourseModal from "@/components/EditCourseModal";
import { Course } from "@/types/course";
import Button from "@/components/Button";

export default function Admin() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			const data = await getCourses();
			setCourses(data);
		};
		fetchCourses();
	}, []);

	const handleCourseAdded = (course: Course) => {
		setCourses((prev) => [...prev, course]);
	};

	const handleCourseUpdated = (course: Course) => {
		setCourses((prev) => prev.map((c) => (c.id === course.id ? course : c)));
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm("¿Seguro de eliminar este curso?")) return;
		await deleteCourse(id);
		setCourses((prev) => prev.filter((c) => c.id !== id));
	};

	return (
		<div className="admin-page">
		<h2>Administrador de Cursos</h2>
		<Link to="/sales">
			<Button text="Ir a calculadora" />
		</Link>
		<AddCourse onCourseAdded={handleCourseAdded} />

		<h3>Lista de cursos</h3>
		<table>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Precio</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
			{courses.map((course) => (
				<tr key={course.id}>
				<td>{course.name}</td>
				<td>{course.price}</td>
				<td>
					<button onClick={() => setEditingCourse(course)}>Editar</button>
					<button onClick={() => handleDelete(course.id)}>Eliminar</button>
				</td>
				</tr>
			))}
			</tbody>
		</table>

		{editingCourse && (
			<EditCourseModal
				course={editingCourse}
				onClose={() => setEditingCourse(null)}
				onCourseUpdated={handleCourseUpdated}
			/>
		)}
		</div>
	);
}
