
// === Config & helpers ===
const fmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 2 });
const $ = sel => document.querySelector(sel);

// === Fallback data (used only if cursos.json can't be fetched) ===
const defaultCursos = [
  { id: "c-001", nombre: "Prevención de Incendios", precio: 1499.00 },
  { id: "c-002", nombre: "Trabajo en Alturas", precio: 1999.00 },
  { id: "c-003", nombre: "Primeros Auxilios", precio: 1299.00 },
];

// === App state ===
let cursos = [];
const items = []; // { id, idCurso, nombre, precio, cantidad, subtotal }

// === Data loading ===
async function initCursos() {
  try {
    const res = await fetch('cursos.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar cursos.json');
    const data = await res.json();
    cursos = (data && (data.cursos || data)) || [];
  } catch (err) {
    cursos = defaultCursos;
  }
  const select = $('#curso');
  if (!select) return;
  select.innerHTML = '<option value=\"\" disabled selected>— Selecciona un curso —</option>' +
    cursos.map(c => `<option value=\"${c.id}\" data-precio=\"${c.precio}\">${c.nombre}</option>`).join('');
}

// === Logic ===
function addItem(idCurso, cantidad) {
  const curso = cursos.find(c => c.id === idCurso);
  if (!curso) return;
  const cantidadInt = Math.max(1, Math.floor(Number(cantidad) || 0));
  const existing = items.find(i => i.idCurso === curso.id);
  if (existing) {
    existing.cantidad += cantidadInt;
    existing.subtotal = existing.cantidad * existing.precio;
  } else {
    const subtotal = curso.precio * cantidadInt;
    const item = { id: crypto.randomUUID(), idCurso: curso.id, nombre: curso.nombre, precio: curso.precio, cantidad: cantidadInt, subtotal };
    items.push(item);
  }
  renderRows();
  renderTotals();
}

function removeItem(id) {
  const idx = items.findIndex(i => i.id === id);
  if (idx !== -1) items.splice(idx, 1);
  renderRows();
  renderTotals();
}

// === Discount rule ===
// Excel-like: =IF(n<=0,0,IF(n>=10000,0.6,MIN(LOG10(n)*0.075,0.6)))
function discountRateForLicenses(n) {
  if (n <= 0) return 0;
  if (n >= 10000) return 0.6;
  const rate = Math.log10(n) * 0.075;
  return Math.min(rate, 0.6);
}

// === Render ===
function renderRows() {
  const tbody = document.querySelector('#tabla tbody');
  if (!tbody) return;
  tbody.innerHTML = items.map(i => `
    <tr data-id="${i.id}">
      <td class="t-content">${i.nombre}</td>
      <td class="t-content">
        <input data-action="qty" type="number" min="1" step="1" value="${i.cantidad}" class="input num" />
      </td>
      <td class="t-content price">${fmt.format(i.precio)}</td>
      <td class="t-content price">${fmt.format(i.subtotal)}</td>
      <td class="t-content actions"><button data-action="remove" class="remove"><img src="./src/icons/delete.svg"/></button></td>
    </tr>`).join('');
}

function renderTotals() {
  const sumTotal = items.reduce((acc, i) => acc + i.subtotal, 0);
  const licTotal = items.reduce((acc, i) => acc + i.cantidad, 0);
  const rate = discountRateForLicenses(licTotal); // 0..0.6
  const discountAmount = sumTotal * rate;
  const grand = sumTotal - discountAmount;
  const perUser = licTotal > 0 ? (grand / licTotal) : 0;

  const elSum = document.getElementById('total');
  const elLic = document.getElementById('lic-total');
  const elRate = document.getElementById('discount-rate');
  const elDisc = document.getElementById('discount-amount');
  const elGrand = document.getElementById('grand-total');
  const elPerUser = document.getElementById('per-user');

  if (elSum) elSum.textContent = fmt.format(sumTotal);
  if (elLic) elLic.textContent = licTotal.toString();
  if (elRate) elRate.textContent = `${(rate * 100).toFixed(2)}%`;
  if (elDisc) elDisc.textContent = fmt.format(discountAmount);
  if (elGrand) elGrand.textContent = fmt.format(grand);
  if (elPerUser) elPerUser.textContent = fmt.format(perUser);
}

// === Events ===
function bindEvents() {
  const form = document.getElementById('calculadora');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const idCurso = document.getElementById('curso').value;
      const cantidad = document.getElementById('cantidad').value;
      if (!idCurso || !cantidad) return;
      addItem(idCurso, cantidad);
      form.reset();
      document.getElementById('curso').focus();
    });
  }

  const tabla = document.getElementById('tabla');
  if (tabla) {
    tabla.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action="remove"]');
      if (!btn) return;
      const tr = btn.closest('tr');
      const id = tr?.dataset.id;
      if (id) removeItem(id);
    });

    tabla.addEventListener('input', (e) => {
      const input = e.target.closest('input[data-action="qty"]');
      if (!input) return;
      const tr = input.closest('tr');
      const id = tr?.dataset.id;
      const item = items.find(i => i.id === id);
      if (!item) return;
      const nueva = Math.max(1, Math.floor(Number(input.value) || 0));
      item.cantidad = nueva;
      item.subtotal = item.cantidad * item.precio;
      renderRows();
      renderTotals();
    });
  }
}

// === Init ===
document.addEventListener('DOMContentLoaded', async () => {
  await initCursos();
  bindEvents();
  renderTotals();
});
