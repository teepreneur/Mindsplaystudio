// Shared helpers for the Xed family pages: the API, the parent's login, the picture PIN, prices and the funnel.
const API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') && !new URLSearchParams(location.search).has('live')
  ? 'http://localhost:8787' : 'https://api.mindsplaystudiogh.com';
const PICTURES = ['lion', 'mango', 'star', 'drum', 'fish', 'ball', 'sun', 'boat', 'tree'];

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

const auth = {
  get token() { return store.get('xed.parent'); },
  set token(v) { store.set('xed.parent', v); },
  out() { store.set('xed.parent', null); location.href = 'account.html'; },
};

async function api(path, { method = 'GET', body, token = auth.token, admin } = {}) {
  const headers = {};
  if (body !== undefined) headers['content-type'] = 'application/json';
  const t = admin || token;
  if (t) headers.authorization = 'Bearer ' + t;
  let res;
  try {
    res = await fetch(API + path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch {
    throw new Error('We can’t reach MindsPlay right now. Check your internet connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error(data.error || 'Something went wrong. Please try again.');
    e.status = res.status;
    if (res.status === 401 && !admin && token) auth.token = null;
    throw e;
  }
  return data;
}

/** Anonymous visitor id for the website funnel (no personal data). */
function anon() {
  let a = store.get('xed.anon');
  if (!a) { a = Math.random().toString(36).slice(2, 12); store.set('xed.anon', a); }
  return a;
}
function track(type, detail) {
  fetch(API + '/v1/funnel', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type, detail, anon: anon() }), keepalive: true }).catch(() => {});
}

const cedis = p => 'GH₵' + (p / 100).toLocaleString('en-GH', { minimumFractionDigits: p % 100 ? 2 : 0, maximumFractionDigits: 2 });
const day = iso => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const pic = i => `img/pin/${i}.png`;

function classLabel(grade, arm) { return (grade <= 6 ? `Class ${grade}` : `JHS ${grade - 6}`) + (arm ? ' ' + arm : ''); }

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg; t.setAttribute('role', 'status');
  document.body.append(t);
  setTimeout(() => t.remove(), 3500);
}

/** Runs an async action from a button: disables it, shows errors in `errEl`. */
async function busy(btn, errEl, fn) {
  if (errEl) errEl.textContent = '';
  const label = btn?.textContent;
  if (btn) { btn.disabled = true; btn.textContent = 'Please wait…'; }
  try { return await fn(); }
  catch (e) { if (errEl) errEl.textContent = e.message; else alert(e.message); }
  finally { if (btn) { btn.disabled = false; btn.textContent = label; } }
}

/** A picture-PIN picker in `el`. Calls onChange(pin array). */
function pinPicker(el, onChange) {
  let pin = [];
  el.innerHTML = `<div class="pinslots" aria-live="polite">${'<span></span>'.repeat(4)}</div>
    <div class="pinpad" role="group" aria-label="Pictures">${PICTURES.map((n, i) => `<button type="button" data-i="${i}" aria-label="${n}"><img src="${pic(i)}" alt=""></button>`).join('')}</div>
    <button type="button" class="btn ghost small" data-clear style="justify-self:start">Clear</button>`;
  const draw = () => {
    $$('.pinslots span', el).forEach((s, i) => {
      s.className = i < pin.length ? 'full' : '';
      s.innerHTML = i < pin.length ? `<img src="${pic(pin[i])}" alt="${PICTURES[pin[i]]}">` : '';
    });
    onChange(pin.slice());
  };
  el.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-clear')) pin = [];
    else if (pin.length < 4) pin.push(+b.dataset.i);
    draw();
  });
  draw();
  return { clear() { pin = []; draw(); } };
}

const pinHtml = pin => `<span class="pinshow">${pin.map(i => `<img src="${pic(i)}" alt="${PICTURES[i]}">`).join('')}</span>`;

const LOGO = `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="60" fill="#2E9E57"/><rect x="52" y="18" width="16" height="84" rx="8" fill="#F5B700" transform="rotate(45 60 60)"/><rect x="52" y="18" width="16" height="84" rx="8" fill="#F5B700" transform="rotate(-45 60 60)"/><rect x="80" y="14" width="18" height="18" rx="3" fill="#4CB7E8" transform="rotate(45 89 23)"/><circle cx="60" cy="60" r="7" fill="#2B2A7A"/></svg>`;
function topBar(links = '') {
  document.body.insertAdjacentHTML('afterbegin', `<header class="top"><div class="wrap">
    <a class="logo" href="xed.html">${LOGO}<span>Xed<small>by MindsPlay</small></span></a>
    <nav aria-label="Main">${links}</nav></div></header>`);
}
