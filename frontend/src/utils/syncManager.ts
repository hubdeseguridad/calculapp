import { getPendingOperations, removePendingOperation } from "@/utils/db";
import { createQuotation } from "@/api/client";

// Sincroniza operaciones pendientes guardadas en IndexedDB
export async function syncPendingOperations() {
  const pending = await getPendingOperations();
  if (!pending || pending.length === 0) {
    console.log("No hay operaciones pendientes para sincronizar.");
    return;
  }

  console.log(`Sincronizando ${pending.length} operaciones pendientes...`);

  for (const op of pending) {
    try {
      switch (op.entity) {
        case "quotation":
          if (op.type === "CREATE") {
            await createQuotation(op.payload);
            console.log("Cotización sincronizada:", op.payload);
          }
          break;

        // Aquí puedes manejar otras entidades en el futuro:
        // case "course":
        //   ...
        //   break;
      }
      await removePendingOperation(op.timestamp);
    } catch (error) {
      console.error("Error al sincronizar operación", op, error);
      // Nota: no se elimina la operación si falla para intentar después
    }
  }
}

// Escucha el evento "online" para iniciar la sincronización automática
export function initSyncListener() {
  window.addEventListener("online", () => {
    console.log("Conexión restaurada, iniciando sincronización...");
    syncPendingOperations();
  });
}
