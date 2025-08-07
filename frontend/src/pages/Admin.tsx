import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "@/api/client";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
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
		<>
			<Navbar />
			
			<div className="container">
				
				<PageTitle>
				Administración de cursos
				</PageTitle>

				<AddCourse onCourseAdded={handleCourseAdded} />

				<h3>Lista de cursos</h3>
				<div className="tableContainer">
					<table className="table">
						<thead>
							<tr className="tableHeader">
								<th className="--item" style={{ minWidth: '240px' }}>Nombre</th>
								<th className="--item" style={{ minWidth: '112px' }}>Precio</th>
								<th className="--item" style={{ minWidth: '112px', textAlign: 'center' }}>Acciones</th>
							</tr>
						</thead>
						<tbody>
						{courses.map((course) => (
							<tr
								key={course.id}
								className="tableBody"
							>
								<td className="--item" style={{ minWidth: '240px' }}>{course.name}</td>
								<td className="--item" style={{ minWidth: '112px' }}>${course.price}</td>
								<td className="--item" style={{ minWidth: '112px', textAlign: 'center' }}>
									<button
										onClick={() => setEditingCourse(course)}
										className="icon-button"
										style={{ marginRight: "5px" }}
									>
										<img src="/icons/icon__edit.svg" alt="" />
									</button>
									<button
										onClick={() => handleDelete(course.id)}
										className="icon-button"
									>
										<img src="/icons/icon__trash.svg" alt="" />
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>

				{editingCourse && (
					<EditCourseModal
						course={editingCourse}
						onClose={() => setEditingCourse(null)}
						onCourseUpdated={handleCourseUpdated}
					/>
				)}
			</div>
		</>
	);
}
