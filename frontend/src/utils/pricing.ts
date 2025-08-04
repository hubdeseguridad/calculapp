import { Course } from "@/types/course";

export function calculateDiscount(totalLicenses: number): number {
    if (totalLicenses <= 0) return 0;
    return Math.min(0.075 * Math.log10(totalLicenses), 0.6);
}

export function calculatePricingOffline(items: { price: number; quantity: number }[]) {
    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const totalLicenses = items.reduce((acc, i) => acc + i.quantity, 0);
    const discountRate = calculateDiscount(totalLicenses);
    const total = subtotal * (1 - discountRate);
    const unitPrice = totalLicenses > 0 ? total / totalLicenses : 0;
    
    return {
        totalLicenses,
        discountRate,
        subtotal,
        total,
        unitPrice,
    };
}
