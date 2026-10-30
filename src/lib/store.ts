/**
 * Persistencia simulada en el navegador. Mientras no exista backend,
 * sesión, favoritos e inventario del vendedor viven en localStorage.
 */
import { vehicles, type Vehicle, type ListingStatus } from '../data/vehicles';

export interface Session {
  name: string;
  email: string;
  role: 'Vendedor' | 'Comprador';
  plan: 'Básico' | 'Profesional' | 'Concesionario';
  company?: string;
}

const KEYS = { session: 'am.session', favorites: 'am.favorites', inventory: 'am.inventory', inquiries: 'am.inquiries' };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Sin espacio: se informa a quien guarda. Otros fallos (modo privado) se ignoran.
    if (e instanceof DOMException && e.name === 'QuotaExceededError') throw e;
  }
  window.dispatchEvent(new CustomEvent('am:store', { detail: key }));
}

export const DEMO_USER: Session = {
  name: 'Dimas Rodríguez',
  email: 'demo@automarket.hn',
  role: 'Vendedor',
  plan: 'Profesional',
  company: 'Motores del Valle',
};

export const session = {
  get: () => read<Session | null>(KEYS.session, null),
  set: (s: Session) => write(KEYS.session, s),
  clear: () => {
    try { localStorage.removeItem(KEYS.session); } catch {}
    window.dispatchEvent(new CustomEvent('am:store', { detail: KEYS.session }));
  },
};

export const favorites = {
  all: () => read<string[]>(KEYS.favorites, []),
  has: (id: string) => favorites.all().includes(id),
  toggle(id: string) {
    const list = favorites.all();
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    write(KEYS.favorites, next);
    return next.includes(id);
  },
};

/* ---------- Inventario del vendedor (panel) ---------- */
export interface InventoryItem extends Vehicle {
  published: boolean;
  createdAt: number;
  local?: boolean;
}

const seedIds = [
  'toyota-camry-se-2020', 'ford-expedition-xlt-2020', 'mercedes-gle-coupe-2021', 'bmw-m4-competition-2019',
  'ford-mustang-v6-2014', 'nissan-gt-r-premium-2017', 'porsche-911-gt3-2019',
];
const seedStatus: Record<string, ListingStatus> = {
  'ford-mustang-v6-2014': 'Disponible para permuta',
  'porsche-911-gt3-2019': 'En negociación',
};

function seedInventory(): InventoryItem[] {
  const now = Date.now();
  const items: InventoryItem[] = seedIds.map((id, i) => {
    const v = vehicles.find((x) => x.id === id)!;
    return { ...v, status: seedStatus[id] ?? 'Disponible', published: true, createdAt: now - v.postedDaysAgo * 864e5 - i };
  });
  items.push({
    ...vehicles.find((x) => x.id === 'audi-q5-premium-2021')!,
    id: 'kia-sportage-2019-vendido', brand: 'Kia', model: 'Sportage', version: 'EX', year: 2019, price: 455000, km: 58200,
    status: 'Vendido', published: false, createdAt: now - 40 * 864e5, views: 1320, leads: 26,
  });
  return items;
}

export const inventory = {
  all(): InventoryItem[] {
    const stored = read<InventoryItem[] | null>(KEYS.inventory, null);
    if (stored) return stored;
    const seeded = seedInventory();
    write(KEYS.inventory, seeded);
    return seeded;
  },
  save: (items: InventoryItem[]) => write(KEYS.inventory, items),
  get: (id: string) => inventory.all().find((v) => v.id === id),
  upsert(item: InventoryItem) {
    const items = inventory.all();
    const i = items.findIndex((v) => v.id === item.id);
    if (i >= 0) items[i] = item; else items.unshift(item);
    inventory.save(items);
  },
  patch(id: string, patch: Partial<InventoryItem>) {
    inventory.save(inventory.all().map((v) => (v.id === id ? { ...v, ...patch } : v)));
  },
  remove: (id: string) => inventory.save(inventory.all().filter((v) => v.id !== id)),
  reset: () => inventory.save(seedInventory()),
  /** Publicaciones creadas desde el panel que deben aparecer en el catálogo público. */
  publishedLocal: () => inventory.all().filter((v) => v.local && v.published && v.status !== 'Vendido' && v.status !== 'Borrador'),
};

export interface Inquiry { id: string; vehicleId: string; name: string; phone: string; message: string; at: number }
export const inquiries = {
  all: () => read<Inquiry[]>(KEYS.inquiries, []),
  add(q: Omit<Inquiry, 'id' | 'at'>) {
    write(KEYS.inquiries, [{ ...q, id: crypto.randomUUID(), at: Date.now() }, ...inquiries.all()]);
  },
};

/* ---------- Notificaciones ---------- */
export function toast(message: string, tone: 'ok' | 'info' | 'warn' = 'ok') {
  let host = document.getElementById('toasts');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toasts';
    host.className = 'pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-end gap-2 sm:left-auto sm:right-6';
    host.setAttribute('role', 'status');
    host.setAttribute('aria-live', 'polite');
    document.body.appendChild(host);
  }
  const color = tone === 'ok' ? 'bg-teal' : tone === 'warn' ? 'bg-fuchsia' : 'bg-navy';
  const el = document.createElement('div');
  el.className = 'toast w-full sm:w-auto sm:max-w-sm';
  el.innerHTML = `<span class="mt-1.5 size-2 shrink-0 rounded-full ${color}"></span><span></span>`;
  el.lastElementChild!.textContent = message;
  host.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .3s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
