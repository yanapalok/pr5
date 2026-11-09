'use strict';


const timerEl = document.getElementById('session-time');
let seconds = 0;

function formatTime(total) {
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
}

window.setInterval(() => {
  seconds += 1;
  timerEl.textContent = formatTime(seconds);
}, 1000);


const DEFAULT_ROUTE = 'menu';
const sections = document.querySelectorAll('.page');
const links = document.querySelectorAll('.nav-link');
const routes = Array.from(sections, (section) => section.id);

function getRoute() {
  const name = window.location.hash.slice(1);
  return routes.includes(name) ? name : DEFAULT_ROUTE;
}

function render() {
  const route = getRoute();

  sections.forEach((section) => {
    section.classList.toggle('is-hidden', section.id !== route);
  });

  links.forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  const active = document.getElementById(route);
  document.title = `${active.dataset.title} | McDonald's`;
}

window.addEventListener('hashchange', render);
render(); 

const form = document.getElementById('feedback-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = Array.from(form.elements).filter((el) => el.required);
  let valid = true;

  fields.forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== '';
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });

  statusEl.classList.toggle('ok', valid);
  statusEl.classList.toggle('error', !valid);

  if (valid) {
    statusEl.textContent = 'Дякуємо! Повідомлення надіслано.';
    form.reset();
  } else {
    statusEl.textContent = 'Заповніть усі поля та перевірте адресу пошти.';
  }
});
