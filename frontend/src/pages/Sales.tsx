import { useState } from "react";
import { Course } from "@/types/course";
import AddTableItem from "@/components/AddTableItem";
import QuotationTable from "@/components/QuotationTable";
import ResultViewer from "@/components/ResultViewer";
import { addQuotation } from "@/services/quotationService";
import { Link } from "react-router-dom";

export default function Sales() {
  const [items, setItems] = useState<{ course: Course; quantity: number }[]>([]);

  const handleAddItem = async (newItem: { course: Course; quantity: number }) => {
    // Guardar cotización en backend o cola offline
    await addQuotation({
      course_id: newItem.course.id,
      quantity: newItem.quantity,
    });

    // Actualizar UI local
    setItems((prev) => {
      const index = prev.findIndex((i) => i.course.id === newItem.course.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updated = [...items];
    updated[index].quantity = quantity > 0 ? quantity : 1;
    setItems(updated);
  };

  return (
    <div className="sales-page">
      <h2>Calculadora de Cursos</h2>
      <Link to="/admin">
        Ir a administrador
      </Link>
      <AddTableItem onAddItem={handleAddItem} />
      <QuotationTable
        items={items}
        onRemoveItem={handleRemoveItem}
        onQuantityChange={handleQuantityChange}
      />
      <ResultViewer items={items} />
    </div>
  );
}
