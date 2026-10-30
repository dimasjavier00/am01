const lps = new Intl.NumberFormat('es-HN', { maximumFractionDigits: 0 });

export const money = (n: number) => `L ${lps.format(Math.round(n))}`;
export const number = (n: number) => lps.format(n);
export const km = (n: number) => (n === 0 ? '0 km' : `${lps.format(n)} km`);
export const ago = (days: number) =>
  days <= 0 ? 'Hoy' : days === 1 ? 'Ayer' : days < 7 ? `Hace ${days} días` : days < 14 ? 'Hace 1 semana' : `Hace ${Math.floor(days / 7)} semanas`;

/** Cuota mensual con amortización francesa. */
export function monthlyPayment(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (principal <= 0 || months <= 0) return 0;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}
