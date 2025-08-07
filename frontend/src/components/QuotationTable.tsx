import { Course } from "@/types/course";
import QuotationTableItem from "@/components/QuotationTableItem";

interface QuotationTableProps {
    items: { course: Course; quantity: number }[];
    onRemoveItem: (index: number) => void;
    onQuantityChange: (index: number, quantity: number) => void;
}

export default function QuotationTable({ items, onRemoveItem, onQuantityChange }: QuotationTableProps) {
    return (
        <table className="table">
            <thead>
                <tr className="tableBody">
                    <th className="--item">Curso</th>
                    <th className="--item">Cantidad</th>
                    <th className="--item">Precio Lista</th>
                    <th className="--item">Subtotal</th>
                    <th className="--item" style={{ textAlign: 'center' }}>Acciones</th>
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
