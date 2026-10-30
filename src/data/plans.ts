export interface Plan {
  id: 'Básico' | 'Profesional' | 'Concesionario';
  tagline: string;
  monthly: number;
  listings: string;
  highlight?: boolean;
  features: string[];
  cta: string;
}

export const plans: Plan[] = [
  {
    id: 'Básico',
    tagline: 'Para vender tu vehículo particular.',
    monthly: 0,
    listings: '1 publicación activa',
    features: ['Publicación por 60 días', 'Hasta 10 fotos', 'Contacto por WhatsApp y teléfono', 'Estadísticas básicas'],
    cta: 'Empezar gratis',
  },
  {
    id: 'Profesional',
    tagline: 'Para vendedores frecuentes y lotes pequeños.',
    monthly: 790,
    listings: 'Hasta 25 publicaciones',
    highlight: true,
    features: ['Todo lo del plan Básico', '3 anuncios destacados al mes', 'Estados: negociación, permuta, vendido', 'Reportes de vistas y consultas', 'Inventario compartible', 'Soporte por correo y chat'],
    cta: 'Elegir Profesional',
  },
  {
    id: 'Concesionario',
    tagline: 'Para agencias con inventario grande.',
    monthly: 2490,
    listings: 'Publicaciones ilimitadas',
    features: ['Todo lo del plan Profesional', '15 anuncios destacados al mes', 'Perfil de concesionario verificado', 'Hasta 10 usuarios del equipo', 'Exportación de reportes', 'Gerente de cuenta dedicado'],
    cta: 'Hablar con ventas',
  },
];

export const comparison: [string, string | boolean, string | boolean, string | boolean][] = [
  ['Publicaciones activas', '1', '25', 'Ilimitadas'],
  ['Fotos por vehículo', '10', '25', '40'],
  ['Anuncios destacados / mes', false, '3', '15'],
  ['Estados de inventario', false, true, true],
  ['Reportes y analíticas', 'Básicas', 'Completas', 'Completas + exportación'],
  ['Inventario compartible', false, true, true],
  ['Usuarios del equipo', '1', '2', '10'],
  ['Insignia de verificado', false, false, true],
  ['Soporte', 'Centro de ayuda', 'Correo y chat', 'Gerente dedicado'],
];

export const faqs: [string, string][] = [
  ['¿Puedo cambiar de plan en cualquier momento?', 'Sí. Al subir de plan el cambio es inmediato y se cobra la diferencia prorrateada. Si bajas de plan, el cambio aplica en tu siguiente ciclo.'],
  ['¿Qué métodos de pago aceptan?', 'Tarjetas de crédito y débito Visa y Mastercard, transferencias bancarias locales y pagos en agencias bancarias.'],
  ['¿Qué pasa con mis publicaciones si cancelo?', 'Tus publicaciones se conservan como borrador por 90 días para que puedas reactivarlas cuando quieras.'],
  ['¿Cobran comisión por venta?', 'No. Automarket no cobra comisiones: el trato es directamente entre comprador y vendedor.'],
  ['¿Cómo funcionan los anuncios destacados?', 'Aparecen primero en los resultados y en la portada durante 7 días, con una insignia que aumenta en promedio 3 veces las consultas.'],
];
