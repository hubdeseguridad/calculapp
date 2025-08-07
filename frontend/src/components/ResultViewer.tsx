import { useEffect, useState } from "react";
import { calculatePricingOffline } from "@/utils/pricing";
import { calculatePricing as apiCalculatePricing } from "@/api/client";
import { Course } from "@/types/course";

interface Item {
  course: Course;
  quantity: number;
}

export default function ResultViewer({ items }: { items: Item[] }) {
  const [result, setResult] = useState<null | any>(null);

  useEffect(() => {
    async function calculate() {
      if (!items || items.length === 0) {
        setResult(null);
        return;
      }

      const validItems = items.filter((i) => i.course && i.course.id);

      // --- MODO ONLINE ---
      if (navigator.onLine && validItems.length > 0) {
        try {
          const payload = {
            items: validItems.map((i) => ({
              course_id: i.course.id,
              quantity: i.quantity,
            })),
          };

          const response = await apiCalculatePricing(payload);

          // Soporte para response directo o con .data
          const data =
            response?.data?.total_licenses !== undefined
              ? response.data
              : response;

          if (data?.total_licenses !== undefined) {
            setResult({
              totalLicenses: data.total_licenses,
              discountRate: data.discount_rate,
              subtotal: data.subtotal,
              total: data.total,
              unitPrice: data.unit_price,
            });
            return;
          } else {
            console.warn("Respuesta inesperada del backend:", response);
          }
        } catch (error) {
          console.error("Error online, usando cálculo offline", error);
        }
      }

      // --- MODO OFFLINE ---
      const offlineItems = validItems.map((i) => ({
        price: i.course.price,
        quantity: i.quantity,
      }));

      const offlineResult = calculatePricingOffline(offlineItems);
      setResult(offlineResult);
    }

    calculate();
  }, [items]);

  if (!result || !result.totalLicenses) return <div>No hay resultados todavía</div>;

  return (
    <>
    <table className="table">
      <tbody>
        <tr className="tableBody">
          <td className="--item" style={{ backgroundColor: '#F2F2F3', minWidth: '240px' }}><b>Licencias</b></td>
          <td className="--item" style={{ width: '100%' }}>
            {result.totalLicenses}
          </td>
        </tr>
        <tr className="tableBody">
          <td className="--item" style={{ backgroundColor: '#F2F2F3', minWidth: '240px' }}><b>Subtotal</b></td>
          <td className="--item" style={{ width: '100%' }}>
            ${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result.subtotal)}
          </td>
        </tr>
        <tr className="tableBody">
          <td className="--item" style={{ backgroundColor: '#F2F2F3', minWidth: '240px' }}><b>Descuento</b></td>
          <td className="--item" style={{ width: '100%' }}>{(result.discountRate * 100).toFixed(2)}%</td>
        </tr>
        <tr className="tableBody">
          <td className="--item" style={{ backgroundColor: '#F2F2F3', minWidth: '240px' }}><b>PVP Total</b></td>
          <td className="--item" style={{ width: '100%' }}>
            ${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result.unitPrice)}
          </td>
        </tr>
      </tbody>
    </table>
    <p style={{ marginTop: '1.5rem', display: 'block', textAlign: 'center', color: '#60809F' }}>El costo de curso por usuario es de ${result.unitPrice.toFixed(2)} MXN.</p>
    </>
  );
}
