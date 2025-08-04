import { Course } from "@/types/course";
import QuotationTableItem from "@/components/QuotationTableItem";

interface QuotationTableProps {
    items: { course: Course; quantity: number }[];
    onRemoveItem: (index: number) => void;
    onQuantityChange: (index: number, quantity: number) => void;
}

export default function QuotationTable({ items, onRemoveItem, onQuantityChange }: QuotationTableProps) {
    return (
        <table className="quotation-table">
            <thead>
                <tr>
                <th>Curso</th>
                <th>Cantidad</th>
                <th>Precio Lista</th>
                <th>Subtotal</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <QuotationTableItem
                        key={index}
                        item={item}
                        onRemove={() => onRemoveItem(index)}
                        onQuantityChange={(quantity) => onQuantityChange(index, quantity)}
                    />
                ))}
            </tbody>
        </table>
    );
}
