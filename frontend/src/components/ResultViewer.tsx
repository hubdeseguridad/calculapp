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
    <div>
      <p>Total licencias: {result.totalLicenses}</p>
      <p>Descuento aplicado: {(result.discountRate * 100).toFixed(2)}%</p>
      <p>Subtotal: ${result.subtotal.toFixed(2)}</p>
      <p>Total final: ${result.total.toFixed(2)}</p>
      <p>Precio unitario: ${result.unitPrice.toFixed(2)}</p>
    </div>
  );
}
