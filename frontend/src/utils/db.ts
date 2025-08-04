import { openDB } from "idb";

export const dbPromise = openDB("calculapp-db", 2, {
  upgrade(db, oldVersion) {
    if (!db.objectStoreNames.contains("courses")) {
      db.createObjectStore("courses", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("quotations")) {
      db.createObjectStore("quotations", { keyPath: "id", autoIncrement: true });
    }
    if (!db.objectStoreNames.contains("pending_operations")) {
      db.createObjectStore("pending_operations", { keyPath: "timestamp" });
    }
  },
});

// Guardar una operación pendiente (offline)
export async function addPendingOperation(operation: any) {
  const db = await dbPromise;
  await db.add("pending_operations", operation);
  console.log("Operación añadida a pending_operations:", operation);
}

// Obtener todas las operaciones pendientes
export async function getPendingOperations() {
  const db = await dbPromise;
  const ops = await db.getAll("pending_operations");
  console.log("Operaciones pendientes obtenidas:", ops);
  return ops;
}

// Borrar una operación de la cola
export async function removePendingOperation(timestamp: number) {
  const db = await dbPromise;
  await db.delete("pending_operations", timestamp);
  console.log(`Operación con timestamp ${timestamp} eliminada de pending_operations`);
}

// Guardar cursos en IndexedDB
export async function saveCourses(courses: any[]) {
  const db = await dbPromise;
  const tx = db.transaction("courses", "readwrite");
  for (const course of courses) {
    await tx.store.put(course);
  }
  await tx.done;
  console.log(`Se guardaron ${courses.length} cursos en IndexedDB`);
}

// Obtener todos los cursos desde IndexedDB
export async function getCourses() {
  const db = await dbPromise;
  const courses = await db.getAll("courses");
  console.log("Cursos obtenidos de IndexedDB:", courses);
  return courses;
}
