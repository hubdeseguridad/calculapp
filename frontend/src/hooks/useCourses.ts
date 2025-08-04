import { useEffect, useState } from "react";
import { openDB } from "idb";
import { getCourses as apiGetCourses } from "@/api/client";
import { Course } from "@/types/course";

async function getDB() {
    return openDB("calculapp-db", 1, {
        upgrade(db) {
        if (!db.objectStoreNames.contains("courses")) {
            db.createObjectStore("courses", { keyPath: "id" });
        }
        },
    });
}

async function saveCoursesToDB(courses: Course[]) {
    const db = await getDB();
    const tx = db.transaction("courses", "readwrite");
    for (const course of courses) {
        await tx.store.put(course);
    }
    await tx.done;
}

async function getCoursesFromDB(): Promise<Course[]> {
    const db = await getDB();
    return db.getAll("courses");
}

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
        if (navigator.onLine) {
            try {
            const data = await apiGetCourses();
            setCourses(data);
            await saveCoursesToDB(data); // actualiza datos locales
            } catch (error) {
            console.error("Error obteniendo cursos online:", error);
            const cached = await getCoursesFromDB();
            setCourses(cached);
            }
        } else {
            const cached = await getCoursesFromDB();
            setCourses(cached);
        }
        setLoading(false);
        }
        fetchCourses();
    }, []);

    return { courses, loading };
}
