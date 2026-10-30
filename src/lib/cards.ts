import type { Vehicle } from '../data/vehicles';
import { sellerById } from '../data/vehicles';
import { money, km, ago } from './format';
import { iconSvg } from './icons';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const vehicleHref = (v: Pick<Vehicle, 'id'> & { local?: boolean }) =>
  v.local ? `/vehiculos/detalle/?id=${encodeURIComponent(v.id)}` : `/vehiculos/${v.id}/`;

export function statusChip(status: Vehicle['status']) {
  const map: Record<string, string> = {
    Disponible: 'bg-teal-50 text-teal-deep',
    'En negociación': 'bg-amber-50 text-amber-700',
    'Disponible para permuta': 'bg-navy-50 text-navy',
    Vendido: 'bg-fuchsia-50 text-fuchsia-deep',
    Borrador: 'bg-gray-100 text-gray-600',
  };
  return `<span class="chip ${map[status] ?? ''}">${esc(status)}</span>`;
}

/** Tarjeta de vehículo. Es una función de texto para usarla igual en el servidor y en el navegador. */
export function vehicleCard(v: Vehicle & { local?: boolean }, opts: { layout?: 'grid' | 'list'; fav?: boolean } = {}) {
  const { layout = 'grid', fav = false } = opts;
  const seller = v.local ? null : sellerById(v.sellerId);
  const href = vehicleHref(v);
  const title = `${esc(v.brand)} ${esc(v.model)}`;
  const badges = [
    v.condition === 'Nuevo' ? '<span class="chip bg-teal text-white">0 km</span>' : '',
    v.featured ? `<span class="chip bg-fuchsia text-white">${iconSvg('sparkles', 'size-3')}Destacado</span>` : '',
    v.status === 'En negociación' ? '<span class="chip bg-white/95 text-amber-700">En negociación</span>' : '',
    v.status === 'Disponible para permuta' ? `<span class="chip bg-white/95 text-navy">${iconSvg('repeat', 'size-3')}Acepta permuta</span>` : '',
  ].join('');
  const specs = [
    [iconSvg('calendar', 'size-4 text-teal'), String(v.year)],
    [iconSvg('gauge', 'size-4 text-teal'), km(v.km)],
    [iconSvg('gearbox', 'size-4 text-teal'), v.transmission === 'Automática' ? 'Automático' : 'Manual'],
    [iconSvg('fuel', 'size-4 text-teal'), v.fuel],
  ]
    .map(([i, t]) => `<li class="flex items-center gap-1.5">${i}<span class="truncate">${esc(t)}</span></li>`)
    .join('');

  const heart = `<button type="button" data-fav="${esc(v.id)}" aria-pressed="${fav}" aria-label="${fav ? 'Quitar de' : 'Guardar en'} favoritos"
      class="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 ${fav ? 'text-fuchsia' : 'text-ink'}">
      ${iconSvg('heart', `size-[18px] ${fav ? 'fill-current' : ''}`)}</button>`;

  const media = `<div class="relative ${layout === 'list' ? 'aspect-[3/2] sm:aspect-auto sm:w-72 sm:shrink-0' : 'aspect-[3/2]'} overflow-hidden bg-surface">
      <img src="${esc(v.image)}" alt="${title} ${v.year}" loading="lazy" decoding="async" class="size-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      <div class="absolute left-3 top-3 flex flex-wrap gap-1.5">${badges}</div>
    </div>`;

  const meta = `<div class="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 text-xs text-muted">
      <span class="flex min-w-0 items-center gap-1">${iconSvg('pin', 'size-3.5 shrink-0')}<span class="truncate">${esc(v.city)}</span></span>
      <span class="flex shrink-0 items-center gap-1">${seller?.verified ? `${iconSvg('badge', 'size-3.5 text-teal')}<span class="hidden sm:inline">${seller.kind}</span> ·` : ''} ${ago(v.postedDaysAgo)}</span>
    </div>`;

  return `<article class="group relative flex ${layout === 'list' ? 'flex-col sm:flex-row' : 'flex-col'} overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
    ${heart}
    ${media}
    <div class="flex flex-1 flex-col gap-3 p-4">
      <div>
        <h3 class="font-display text-[17px] font-bold leading-snug text-navy"><a href="${href}" class="after:absolute after:inset-0 focus:outline-none">${title}</a></h3>
        <p class="truncate text-sm text-muted">${esc(v.version)} · ${v.year}</p>
      </div>
      <p class="font-display text-xl font-extrabold text-ink">${money(v.price)}</p>
      <ul class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px] text-ink">${specs}</ul>
      ${meta}
    </div>
  </article>`;
}
