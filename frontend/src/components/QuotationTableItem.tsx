import { Course } from "@/types/course";

interface QuotationTableItemProps {
    item: { course: Course; quantity: number };
    onRemove: () => void;
    onQuantityChange: (quantity: number) => void;
}

export default function QuotationTableItem({ item, onRemove, onQuantityChange }: QuotationTableItemProps) {
    const subtotal = item.course.price * item.quantity;

    return (
        <tr className="tableBody">
            <td className="--item" style={{ width: '100%', minWidth: '240px' }}>
                {item.course.name}
            </td>
            <td className="--item" style={{ minWidth: '120px' }}>
                <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(Number(e.target.value))}
                    style={{ width: "60px" }}
                />
            </td>
            <td className="--item" style={{ minWidth: '136px' }}>
                ${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.course.price)}
            </td>
            <td className="--item" style={{ minWidth: '136px' }}>
                ${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(subtotal)}
            </td>
            <td className="--item" style={{ minWidth: '100px', textAlign: 'center' }}>
                <button type="button" onClick={onRemove}>
                    <img src="/icons/icon__trash.svg" alt="" />
                </button>
            </td>
        </tr>
    );
}
