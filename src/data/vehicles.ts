export type VehicleType = 'Sedán' | 'SUV' | 'Hatchback' | 'Coupé' | 'Deportivo' | 'Moto';
export type Transmission = 'Automática' | 'Manual';
export type Fuel = 'Gasolina' | 'Diésel' | 'Híbrido' | 'Eléctrico';
export type Condition = 'Nuevo' | 'Usado';
export type ListingStatus = 'Disponible' | 'En negociación' | 'Disponible para permuta' | 'Vendido' | 'Borrador';

export interface Seller {
  id: string;
  name: string;
  kind: 'Concesionario' | 'Particular';
  verified: boolean;
  phone: string;
  city: string;
  rating: number;
  listings: number;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  km: number;
  type: VehicleType;
  transmission: Transmission;
  fuel: Fuel;
  color: string;
  condition: Condition;
  status: ListingStatus;
  city: string;
  engine: string;
  drivetrain: string;
  doors: number;
  seats: number;
  image: string;
  sellerId: string;
  featured?: boolean;
  postedDaysAgo: number;
  views: number;
  leads: number;
  features: string[];
  description: string;
}

export const cities = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choluteca', 'Comayagua', 'Roatán'];

export const sellers: Seller[] = [
  { id: 'motores-del-valle', name: 'Motores del Valle', kind: 'Concesionario', verified: true, phone: '+504 2235-4410', city: 'Tegucigalpa', rating: 4.8, listings: 42 },
  { id: 'autos-sula', name: 'Autos Sula Premium', kind: 'Concesionario', verified: true, phone: '+504 2552-8890', city: 'San Pedro Sula', rating: 4.9, listings: 67 },
  { id: 'costa-norte', name: 'Costa Norte Motors', kind: 'Concesionario', verified: true, phone: '+504 2440-1123', city: 'La Ceiba', rating: 4.6, listings: 18 },
  { id: 'carlos-mejia', name: 'Carlos Mejía', kind: 'Particular', verified: true, phone: '+504 9876-2210', city: 'Tegucigalpa', rating: 4.7, listings: 2 },
  { id: 'andrea-pineda', name: 'Andrea Pineda', kind: 'Particular', verified: false, phone: '+504 3345-9087', city: 'Comayagua', rating: 4.5, listings: 1 },
];

const img = (id: string) => `/img/cars/${id}.webp`;

const base = (v: Omit<Vehicle, 'status'> & { status?: ListingStatus }): Vehicle => ({ status: 'Disponible', ...v });

export const vehicles: Vehicle[] = [
  base({
    id: 'toyota-camry-se-2020', brand: 'Toyota', model: 'Camry', version: 'SE 2.5', year: 2020, price: 640000, km: 38500,
    type: 'Sedán', transmission: 'Automática', fuel: 'Gasolina', color: 'Gris', condition: 'Usado', city: 'Tegucigalpa',
    engine: '2.5 L 4 cil. · 203 hp', drivetrain: 'Delantera', doors: 4, seats: 5, image: img('photo-1621007947382-bb3c3994e3fb'),
    sellerId: 'motores-del-valle', featured: true, postedDaysAgo: 2, views: 1840, leads: 23,
    features: ['Cámara de reversa', 'Apple CarPlay', 'Control crucero adaptativo', 'Sensor de punto ciego', 'Asientos en cuero'],
    description: 'Único dueño, mantenimientos en agencia y llantas nuevas. Ideal para uso familiar o ejecutivo, con excelente rendimiento de combustible.',
  }),
  base({
    id: 'hyundai-accent-gls-2024', brand: 'Hyundai', model: 'Accent', version: 'GLS 1.6', year: 2024, price: 489000, km: 0,
    type: 'Sedán', transmission: 'Automática', fuel: 'Gasolina', color: 'Negro', condition: 'Nuevo', city: 'San Pedro Sula',
    engine: '1.6 L 4 cil. · 120 hp', drivetrain: 'Delantera', doors: 4, seats: 5, image: img('photo-1619767886558-efdc259cde1a'),
    sellerId: 'autos-sula', featured: true, postedDaysAgo: 1, views: 2210, leads: 41,
    features: ['0 km', 'Garantía 5 años', 'Apple CarPlay', 'Cámara de reversa', 'Bolsas de aire frontales y laterales'],
    description: 'Unidad 0 km con garantía de fábrica de 5 años. Económico, confiable y con financiamiento disponible desde 20% de prima.',
  }),
  base({
    id: 'ford-expedition-xlt-2020', brand: 'Ford', model: 'Expedition', version: 'XLT 4x4', year: 2020, price: 1250000, km: 54000,
    type: 'SUV', transmission: 'Automática', fuel: 'Gasolina', color: 'Blanco', condition: 'Usado', city: 'Tegucigalpa',
    engine: '3.5 L V6 EcoBoost · 375 hp', drivetrain: '4x4', doors: 5, seats: 8, image: img('photo-1533473359331-0135ef1b58bf'),
    sellerId: 'motores-del-valle', featured: true, postedDaysAgo: 4, views: 1320, leads: 17,
    features: ['Tercera fila', 'Tracción 4x4', 'Pantalla 8"', 'Sensores de parqueo', 'Remolque integrado'],
    description: 'Espacio para toda la familia y capacidad de remolque. Revisión de 150 puntos completada.',
  }),
  base({
    id: 'audi-q5-premium-2021', brand: 'Audi', model: 'Q5', version: '45 TFSI quattro', year: 2021, price: 1180000, km: 22100,
    type: 'SUV', transmission: 'Automática', fuel: 'Gasolina', color: 'Blanco', condition: 'Usado', city: 'San Pedro Sula',
    engine: '2.0 L Turbo · 261 hp', drivetrain: 'AWD', doors: 5, seats: 5, image: img('photo-1517524008697-84bbe3c3fd98'),
    sellerId: 'autos-sula', featured: true, postedDaysAgo: 3, views: 980, leads: 12,
    features: ['Virtual cockpit', 'Techo panorámico', 'Faros LED Matrix', 'Asientos calefactables', 'Tracción quattro'],
    description: 'Versión Premium Plus con todos los extras. Aún con garantía de fábrica.',
  }),
  base({
    id: 'mercedes-gle-coupe-2021', brand: 'Mercedes-Benz', model: 'GLE Coupé', version: '450 4MATIC', year: 2021, price: 2350000, km: 18700,
    type: 'SUV', transmission: 'Automática', fuel: 'Híbrido', color: 'Blanco', condition: 'Usado', city: 'Tegucigalpa',
    engine: '3.0 L I6 EQ Boost · 362 hp', drivetrain: 'AWD', doors: 5, seats: 5, image: img('photo-1590362891991-f776e747a588'),
    sellerId: 'motores-del-valle', postedDaysAgo: 6, views: 760, leads: 9,
    features: ['MBUX', 'Suspensión neumática', 'Sonido Burmester', 'Asistente de estacionamiento'],
    description: 'Diseño coupé con tecnología mild-hybrid. Mantenimientos documentados.',
  }),
  base({
    id: 'range-rover-sport-hse-2019', brand: 'Land Rover', model: 'Range Rover Sport', version: 'HSE', year: 2019, price: 1890000, km: 47300,
    type: 'SUV', transmission: 'Automática', fuel: 'Diésel', color: 'Negro', condition: 'Usado', city: 'San Pedro Sula',
    engine: '3.0 L V6 Turbo diésel · 254 hp', drivetrain: '4x4', doors: 5, seats: 5, image: img('photo-1563720223185-11003d516935'),
    sellerId: 'autos-sula', postedDaysAgo: 9, views: 1105, leads: 14,
    features: ['Terrain Response', 'Techo panorámico', 'Asientos con masaje', 'Cámara 360°'],
    description: 'Lujo y capacidad todoterreno. Llantas y frenos nuevos.',
  }),
  base({
    id: 'nissan-juke-sv-2020', brand: 'Nissan', model: 'Juke', version: 'SV', year: 2020, price: 495000, km: 31200,
    type: 'SUV', transmission: 'Automática', fuel: 'Gasolina', color: 'Gris', condition: 'Usado', city: 'La Ceiba',
    engine: '1.0 L Turbo · 117 hp', drivetrain: 'Delantera', doors: 5, seats: 5, image: img('photo-1609521263047-f8f205293f24'),
    sellerId: 'costa-norte', postedDaysAgo: 5, views: 640, leads: 8,
    features: ['Android Auto', 'Frenado autónomo', 'Faros LED', 'Arranque sin llave'],
    description: 'Crossover compacto y ágil para la ciudad. Excelente consumo.',
    status: 'Disponible para permuta',
  }),
  base({
    id: 'tesla-model-3-lr-2022', brand: 'Tesla', model: 'Model 3', version: 'Long Range', year: 2022, price: 1050000, km: 15400,
    type: 'Sedán', transmission: 'Automática', fuel: 'Eléctrico', color: 'Blanco', condition: 'Usado', city: 'Tegucigalpa',
    engine: 'Doble motor · 346 hp · 576 km', drivetrain: 'AWD', doors: 4, seats: 5, image: img('photo-1606016159991-dfe4f2746ad5'),
    sellerId: 'carlos-mejia', featured: true, postedDaysAgo: 2, views: 2560, leads: 37,
    features: ['Autopilot', 'Cargador de pared incluido', 'Techo de cristal', 'Actualizaciones OTA'],
    description: 'Cero gasolina, cero mantenimiento de aceite. Incluye cargador de pared instalado.',
  }),
  base({
    id: 'volkswagen-polo-comfortline-2018', brand: 'Volkswagen', model: 'Polo', version: 'Comfortline', year: 2018, price: 289000, km: 61000,
    type: 'Hatchback', transmission: 'Manual', fuel: 'Gasolina', color: 'Azul', condition: 'Usado', city: 'Comayagua',
    engine: '1.6 L 4 cil. · 110 hp', drivetrain: 'Delantera', doors: 5, seats: 5, image: img('photo-1541899481282-d53bffe3c35d'),
    sellerId: 'andrea-pineda', postedDaysAgo: 12, views: 410, leads: 6,
    features: ['Pantalla táctil', 'Bluetooth', 'Control de estabilidad', 'Rines de aluminio'],
    description: 'Primer carro perfecto. Papeles en regla y traspaso inmediato.',
  }),
  base({
    id: 'fiat-500-lounge-2017', brand: 'Fiat', model: '500', version: 'Lounge', year: 2017, price: 245000, km: 48900,
    type: 'Hatchback', transmission: 'Automática', fuel: 'Gasolina', color: 'Celeste', condition: 'Usado', city: 'Roatán',
    engine: '1.4 L 4 cil. · 101 hp', drivetrain: 'Delantera', doors: 3, seats: 4, image: img('photo-1549317661-bd32c8ce0db2'),
    sellerId: 'costa-norte', postedDaysAgo: 8, views: 530, leads: 5,
    features: ['Techo corredizo', 'Uconnect', 'Asientos bitono'],
    description: 'Icono italiano, ideal para la isla. Excelente estado de pintura.',
    status: 'En negociación',
  }),
  base({
    id: 'bmw-430i-coupe-2020', brand: 'BMW', model: 'Serie 4', version: '430i Coupé M Sport', year: 2020, price: 1090000, km: 27600,
    type: 'Coupé', transmission: 'Automática', fuel: 'Gasolina', color: 'Azul', condition: 'Usado', city: 'San Pedro Sula',
    engine: '2.0 L Turbo · 248 hp', drivetrain: 'Trasera', doors: 2, seats: 4, image: img('photo-1502877338535-766e1452684a'),
    sellerId: 'autos-sula', postedDaysAgo: 7, views: 870, leads: 10,
    features: ['Paquete M Sport', 'Harman Kardon', 'Head-up display', 'Asientos deportivos'],
    description: 'Azul Portimao con interior en cuero negro. Mantenimientos en BMW.',
  }),
  base({
    id: 'bmw-m4-competition-2019', brand: 'BMW', model: 'M4', version: 'Competition', year: 2019, price: 1650000, km: 24300,
    type: 'Deportivo', transmission: 'Automática', fuel: 'Gasolina', color: 'Gris', condition: 'Usado', city: 'Tegucigalpa',
    engine: '3.0 L I6 Biturbo · 444 hp', drivetrain: 'Trasera', doors: 2, seats: 4, image: img('photo-1580273916550-e323be2ae537'),
    sellerId: 'motores-del-valle', postedDaysAgo: 10, views: 1490, leads: 16,
    features: ['Escape deportivo', 'Frenos carbono-cerámicos', 'Launch control', 'Asientos de fibra de carbono'],
    description: 'Paquete Competition, sin modificaciones y sin historial de pista.',
  }),
  base({
    id: 'bmw-m5-2021', brand: 'BMW', model: 'M5', version: 'Competition xDrive', year: 2021, price: 2480000, km: 12800,
    type: 'Sedán', transmission: 'Automática', fuel: 'Gasolina', color: 'Blanco', condition: 'Usado', city: 'San Pedro Sula',
    engine: '4.4 L V8 Biturbo · 617 hp', drivetrain: 'AWD', doors: 4, seats: 5, image: img('photo-1555215695-3004980ad54e'),
    sellerId: 'autos-sula', postedDaysAgo: 11, views: 1220, leads: 11,
    features: ['M xDrive', 'Bowers & Wilkins', 'Night Vision', 'Asientos ventilados'],
    description: 'La berlina más rápida de su clase. Como nuevo.',
  }),
  base({
    id: 'ford-mustang-gt-2019', brand: 'Ford', model: 'Mustang', version: 'GT Premium 5.0', year: 2019, price: 960000, km: 33800,
    type: 'Deportivo', transmission: 'Manual', fuel: 'Gasolina', color: 'Gris', condition: 'Usado', city: 'Tegucigalpa',
    engine: '5.0 L V8 · 460 hp', drivetrain: 'Trasera', doors: 2, seats: 4, image: img('photo-1494976388531-d1058494cdd8'),
    sellerId: 'carlos-mejia', featured: true, postedDaysAgo: 3, views: 2980, leads: 44,
    features: ['Escape activo', 'Modos de manejo', 'SYNC 3', 'Asientos Recaro'],
    description: 'V8 manual de 6 velocidades. Llantas Michelin Pilot Sport nuevas.',
  }),
  base({
    id: 'ford-mustang-v6-2014', brand: 'Ford', model: 'Mustang', version: 'V6 Premium', year: 2014, price: 520000, km: 88400,
    type: 'Coupé', transmission: 'Automática', fuel: 'Gasolina', color: 'Negro', condition: 'Usado', city: 'Choluteca',
    engine: '3.7 L V6 · 305 hp', drivetrain: 'Trasera', doors: 2, seats: 4, image: img('photo-1494905998402-395d579af36f'),
    sellerId: 'motores-del-valle', postedDaysAgo: 15, views: 690, leads: 7,
    features: ['Asientos en cuero', 'Sonido Shaker', 'Rines 19"'],
    description: 'Clásico moderno en excelente estado. Acepto permuta por pickup.',
    status: 'Disponible para permuta',
  }),
  base({
    id: 'chevrolet-camaro-ss-2018', brand: 'Chevrolet', model: 'Camaro', version: 'SS 2SS', year: 2018, price: 870000, km: 41200,
    type: 'Deportivo', transmission: 'Automática', fuel: 'Gasolina', color: 'Azul', condition: 'Usado', city: 'San Pedro Sula',
    engine: '6.2 L V8 · 455 hp', drivetrain: 'Trasera', doors: 2, seats: 4, image: img('photo-1552519507-da3b142c6e3d'),
    sellerId: 'autos-sula', postedDaysAgo: 6, views: 1510, leads: 19,
    features: ['Magnetic Ride', 'Head-up display', 'Escape de doble modo', 'Brembo'],
    description: 'Hyper Blue, único en el país. Mantenimientos al día.',
  }),
  base({
    id: 'nissan-gt-r-premium-2017', brand: 'Nissan', model: 'GT-R', version: 'Premium', year: 2017, price: 2150000, km: 26500,
    type: 'Deportivo', transmission: 'Automática', fuel: 'Gasolina', color: 'Plata', condition: 'Usado', city: 'Tegucigalpa',
    engine: '3.8 L V6 Biturbo · 565 hp', drivetrain: 'AWD', doors: 2, seats: 4, image: img('photo-1568605117036-5fe5e7bab0b7'),
    sellerId: 'motores-del-valle', postedDaysAgo: 13, views: 1760, leads: 15,
    features: ['ATTESA E-TS', 'Bose', 'Launch control'],
    description: 'Godzilla en estado de colección. Nunca en pista.',
  }),
  base({
    id: 'porsche-panamera-4-2020', brand: 'Porsche', model: 'Panamera', version: '4 Sport Turismo', year: 2020, price: 2690000, km: 21900,
    type: 'Sedán', transmission: 'Automática', fuel: 'Gasolina', color: 'Negro', condition: 'Usado', city: 'San Pedro Sula',
    engine: '2.9 L V6 Biturbo · 325 hp', drivetrain: 'AWD', doors: 4, seats: 4, image: img('photo-1503376780353-7e6692767b70'),
    sellerId: 'autos-sula', postedDaysAgo: 14, views: 940, leads: 8,
    features: ['Sport Chrono', 'PASM', 'Bose Surround', 'Techo panorámico'],
    description: 'Deportividad y confort para cuatro pasajeros.',
  }),
  base({
    id: 'porsche-911-gt3-2019', brand: 'Porsche', model: '911', version: 'GT3', year: 2019, price: 4200000, km: 9800,
    type: 'Deportivo', transmission: 'Manual', fuel: 'Gasolina', color: 'Blanco', condition: 'Usado', city: 'Tegucigalpa',
    engine: '4.0 L Bóxer 6 · 500 hp', drivetrain: 'Trasera', doors: 2, seats: 2, image: img('photo-1614162692292-7ac56d7f7f1e'),
    sellerId: 'motores-del-valle', postedDaysAgo: 20, views: 2140, leads: 12,
    features: ['Club Sport', 'Caja manual 6 vel.', 'Elevador de eje delantero'],
    description: 'Atmosférico, manual y con menos de 10,000 km.',
    status: 'En negociación',
  }),
  base({
    id: 'mercedes-amg-gt-2018', brand: 'Mercedes-Benz', model: 'AMG GT', version: 'S', year: 2018, price: 2750000, km: 17600,
    type: 'Deportivo', transmission: 'Automática', fuel: 'Gasolina', color: 'Gris', condition: 'Usado', city: 'San Pedro Sula',
    engine: '4.0 L V8 Biturbo · 515 hp', drivetrain: 'Trasera', doors: 2, seats: 2, image: img('photo-1618843479313-40f8afb4b4d8'),
    sellerId: 'autos-sula', postedDaysAgo: 18, views: 1380, leads: 9,
    features: ['AMG Dynamic Plus', 'Burmester', 'Escape AMG Performance'],
    description: 'Gris Selenita magno, impecable.',
  }),
  base({
    id: 'audi-rs6-avant-2019', brand: 'Audi', model: 'RS6', version: 'Avant performance', year: 2019, price: 2300000, km: 35200,
    type: 'Deportivo', transmission: 'Automática', fuel: 'Gasolina', color: 'Negro', condition: 'Usado', city: 'Tegucigalpa',
    engine: '4.0 L V8 TFSI · 597 hp', drivetrain: 'AWD', doors: 5, seats: 5, image: img('photo-1606664515524-ed2f786a0bd6'),
    sellerId: 'carlos-mejia', postedDaysAgo: 16, views: 1010, leads: 10,
    features: ['Quattro Sport', 'Escape RS', 'Bang & Olufsen'],
    description: 'El familiar más rápido. Paquete negro óptico.',
  }),
  base({
    id: 'lamborghini-huracan-evo-2021', brand: 'Lamborghini', model: 'Huracán', version: 'EVO', year: 2021, price: 6900000, km: 5400,
    type: 'Deportivo', transmission: 'Automática', fuel: 'Gasolina', color: 'Naranja', condition: 'Usado', city: 'San Pedro Sula',
    engine: '5.2 L V10 · 631 hp', drivetrain: 'AWD', doors: 2, seats: 2, image: img('photo-1612825173281-9a193378527e'),
    sellerId: 'autos-sula', postedDaysAgo: 21, views: 4210, leads: 21,
    features: ['LDVI', 'Elevador frontal', 'Asientos de fibra de carbono', 'Escape deportivo'],
    description: 'Arancio Xanto. Una pieza única en Honduras.',
  }),
  base({
    id: 'harley-davidson-livewire-2020', brand: 'Harley-Davidson', model: 'LiveWire', version: 'One', year: 2020, price: 520000, km: 3200,
    type: 'Moto', transmission: 'Automática', fuel: 'Eléctrico', color: 'Naranja', condition: 'Usado', city: 'Tegucigalpa',
    engine: 'Motor eléctrico · 105 hp · 235 km', drivetrain: 'Trasera', doors: 0, seats: 2, image: img('photo-1558981403-c5f9899a28bc'),
    sellerId: 'carlos-mejia', postedDaysAgo: 9, views: 780, leads: 6,
    features: ['Carga rápida DC', 'Modos de manejo', 'Pantalla TFT'],
    description: 'La primera Harley eléctrica. Silenciosa y brutal.',
  }),
];


export const brands = [...new Set(vehicles.map((v) => v.brand))].sort();
export const types: VehicleType[] = ['Sedán', 'SUV', 'Hatchback', 'Coupé', 'Deportivo', 'Moto'];
export const fuels: Fuel[] = ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'];

export const sellerById = (id: string) => sellers.find((s) => s.id === id)!;
export const vehicleTitle = (v: Pick<Vehicle, 'brand' | 'model' | 'year'>) => `${v.brand} ${v.model} ${v.year}`;
