/*
 * CONFIGURACIÓN DE CONSULTORÍA K Y J
 * 1) Reemplaza whatsappNumber por el número real, con código de país y sin + ni espacios.
 *    Ejemplo Chile: 56912345678
 * 2) Cambia contactEmail por el correo real.
 * 3) El formulario usa mailto: abre la aplicación de correo del visitante; no almacena datos.
 * 4) Para recibir formularios sin depender del correo local, integra un servicio como Formspree.
 * 5) Los pagos online NO están activos. Consulta README.md antes de vender o cobrar.
 */
const CONFIG = {
  whatsappNumber: "56900000000",
  contactEmail: "contacto@tudominio.cl"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const cart = new Map();
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function updateWhatsAppLinks() {
  $("#whatsappLink").href = whatsappUrl("Hola, Consultoría K y J. Me gustaría recibir información sobre sus servicios.");
}
function openCart() {
  $("#cartModal").hidden = false;
  document.body.style.overflow = "hidden";
  renderCart();
}
function closeCart() {
  $("#cartModal").hidden = true;
  document.body.style.overflow = "";
}
function addToCart(id) {
  const item = $(`[data-id="${id}"]`);
  if (!item) return;
  cart.set(id, { id, name: item.dataset.name });
  $("#cartCount").textContent = cart.size;
  renderCart();
  showToast("Servicio agregado a tu solicitud");
}
function renderCart() {
  const host = $("#cartItems");
  $("#cartCount").textContent = cart.size;
  if (!cart.size) {
    host.innerHTML = '<p class="empty-cart">Aún no has agregado servicios.</p>';
    return;
  }
  host.innerHTML = "";
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-row";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const remove = document.createElement("button");
    remove.className = "remove-item";
    remove.textContent = "Quitar ×";
    remove.type = "button";
    remove.addEventListener("click", () => {
      cart.delete(item.id);
      renderCart();
    });
    row.append(name, remove);
    host.append(row);
  });
}
$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  const isOpen = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
});
$$('#mainNav a').forEach(link => link.addEventListener("click", () => {
  $("#mainNav").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}));
$$("[data-add]").forEach(button => button.addEventListener("click", () => addToCart(button.dataset.add)));
$$("[data-service]").forEach(link => link.addEventListener("click", () => {
  $("#contactService").value = link.dataset.service;
}));
$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartModal").addEventListener("click", event => { if (event.target === $("#cartModal")) closeCart(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });
$("#clearCart").addEventListener("click", () => { cart.clear(); renderCart(); showToast("Solicitud vaciada"); });
$("#sendCart").addEventListener("click", () => {
  if (!cart.size) { showToast("Agrega al menos un servicio"); return; }
  const names = [...cart.values()].map(item => `• ${item.name}`).join("\n");
  const notes = $("#cartNotes").value.trim();
  const message = `Hola, Consultoría K y J. Quiero cotizar estos servicios:\n${names}${notes ? `\n\nComentarios: ${notes}` : ""}\n\n¿Me pueden orientar?`;
  if (CONFIG.whatsappNumber === "56900000000") {
    showToast("Configura el número de WhatsApp en script.js");
    return;
  }
  window.open(whatsappUrl(message), "_blank", "noopener");
});
$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `Consulta web - ${data.get("service")}`;
  const body = [
    `Nombre: ${data.get("name")}`,
    `Empresa: ${data.get("company") || "No indicada"}`,
    `Correo: ${data.get("email")}`,
    `Teléfono: ${data.get("phone") || "No indicado"}`,
    `Servicio: ${data.get("service")}`,
    "",
    `Mensaje: ${data.get("message")}`
  ].join("\n");
  $("#contactStatus").textContent = "Se abrirá tu aplicación de correo para enviar la consulta.";
  window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
$("#bookingDate").min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
$("#bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    "Hola, Consultoría K y J. Quiero solicitar una reserva:",
    `Nombre: ${data.get("name")}`,
    `Correo: ${data.get("email")}`,
    `Fecha preferida: ${data.get("date")}`,
    `Horario preferido: ${data.get("time")}`,
    `Motivo: ${data.get("details") || "No indicado"}`,
    "",
    "Entiendo que la reserva queda pendiente de confirmación."
  ].join("\n");
  if (CONFIG.whatsappNumber === "56900000000") {
    showToast("Configura el número de WhatsApp en script.js");
    return;
  }
  window.open(whatsappUrl(message), "_blank", "noopener");
  showToast("Solicitud preparada. Envía el mensaje por WhatsApp para coordinar.");
});
$("#year").textContent = new Date().getFullYear();
updateWhatsAppLinks();
