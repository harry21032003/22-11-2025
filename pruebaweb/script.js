// ===============================
// CONFIGURACIÓN
// ===============================
const modoPrueba = false;
const fechaReal = new Date("2025-11-22T05:13:00-20:00");
const fechaPrueba = new Date(Date.now() + 1 * 60 * 1000);
const fechaObjetivo = modoPrueba ? fechaPrueba : fechaReal;

// ===============================
// ELEMENTOS DEL DOM
// ===============================
const countdownEl = document.getElementById("countdown");
const countdownMobileEl = document.getElementById("countdown-mobile");
const videoEl = document.getElementById("video");
const playOverlay = document.getElementById("playOverlay");
const textBox = document.querySelector(".text-box");
const ctaButtonDesktop = document.querySelector(".overlay .cta-button"); // versión escritorio
const ctaButtonMobile = document.querySelector(".bottom-section-mobile .cta-button"); // versión móvil

// ===============================
// BOTÓN DE PLAY INICIAL
// ===============================
playOverlay.addEventListener("click", () => {
  videoEl.muted = false;
  videoEl.play();
  playOverlay.classList.add("hidden");
  setTimeout(() => playOverlay.remove(), 300);
});

// ===============================
// MODO COMPLETO
// ===============================
let modoCompletoActivo = false;

// Crear botón de regreso (flecha)
const backButton = document.createElement("button");
backButton.innerHTML = "&#8592;"; // ←
Object.assign(backButton.style, {
  position: "absolute",
  top: "20px",
  left: "20px",
  background: "rgba(0,0,0,0.4)",
  color: "#0ff",
  border: "2px solid rgba(0,255,255,0.5)",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  fontSize: "22px",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: "20",
  boxShadow: "0 0 10px rgba(0,255,255,0.5)",
});
document.body.appendChild(backButton);

// Función: activar modo completo
function activarModoCompleto() {
  if (modoCompletoActivo) return;
  modoCompletoActivo = true;

  // Ocultar textos, countdowns y botones
  [textBox, countdownEl, countdownMobileEl, ctaButtonDesktop, ctaButtonMobile].forEach(el => {
    if (el) {
      el.style.opacity = "0";
      setTimeout(() => (el.style.display = "none"), 300);
    }
  });

  // Mostrar botón de regreso
  setTimeout(() => {
    backButton.style.display = "flex";
  }, 300);
}

// Función: salir de modo completo
function salirModoCompleto() {
  modoCompletoActivo = false;
  backButton.style.display = "none";

  // Mostrar nuevamente los elementos según el dispositivo
  [textBox, countdownEl, countdownMobileEl, ctaButtonDesktop, ctaButtonMobile].forEach(el => {
    if (el) {
      el.style.display = ""; // que vuelva a sus reglas CSS
      setTimeout(() => (el.style.opacity = "1"), 50);
    }
  });
}

// Eventos de clic
if (ctaButtonDesktop) ctaButtonDesktop.addEventListener("click", activarModoCompleto);
if (ctaButtonMobile) ctaButtonMobile.addEventListener("click", activarModoCompleto);
backButton.addEventListener("click", salirModoCompleto);

// ===============================
// CONTEO REGRESIVO
// ===============================
function actualizarConteo() {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    videoEl.src = "video2.mp4";
    videoEl.loop = true;
    videoEl.muted = false;
    videoEl.play();

    countdownEl.textContent = "00:00:00";
    countdownMobileEl.textContent = "00:00:00";
    document.querySelector(".title").textContent = "¡Ya disponible!";
    document.querySelector(".subtitle").textContent = "¡Míralo ahora!";
    if (ctaButtonDesktop) ctaButtonDesktop.textContent = "Ver ahora";
    if (ctaButtonMobile) ctaButtonMobile.textContent = "Ver ahora";

    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  const timeString =
    dias > 0
      ? `${String(dias).padStart(2, "0")}:${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
      : `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

  countdownEl.textContent = timeString;
  countdownMobileEl.textContent = timeString;
}

// ===============================
// INICIALIZAR
// ===============================
actualizarConteo();
const intervalo = setInterval(actualizarConteo, 1000);
textBox.style.transition = "opacity 0.3s ease";
videoEl.play().catch(() => console.log("Autoplay bloqueado"));



