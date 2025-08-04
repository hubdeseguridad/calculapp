import { Course } from "@/types/course";

interface QuotationTableItemProps {
    item: { course: Course; quantity: number };
    onRemove: () => void;
    onQuantityChange: (quantity: number) => void;
}

export default function QuotationTableItem({ item, onRemove, onQuantityChange }: QuotationTableItemProps) {
    const subtotal = item.course.price * item.quantity;

    return (
        <tr>
            <td>{item.course.name}</td>
            <td>
                <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(Number(e.target.value))}
                    style={{ width: "60px" }}
                />
            </td>
            <td>{item.course.price.toFixed(2)}</td>
            <td>{subtotal.toFixed(2)}</td>
            <td>
                <button type="button" onClick={onRemove}>
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
