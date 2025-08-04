import { addPendingOperation } from "@/utils/db";
import { createQuotation } from "@/api/client";

export async function addQuotation(quotation: { course_id: number; quantity: number }) {
  if (navigator.onLine) {
    await createQuotation(quotation);
  } else {
    await addPendingOperation({
      type: "CREATE",
      entity: "quotation",
      payload: quotation,
      timestamp: Date.now(),
    });
    console.log("Cotización guardada offline y pendiente de sincronización.");
  }
}
