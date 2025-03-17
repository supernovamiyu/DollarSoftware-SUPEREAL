let slideIndex = 1;
let slideInterval;

function changeSlide(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = document.querySelectorAll(".carousel-slide");

  if (!slides.length) {
    console.error("No se encontraron slides.");
    return;
  }

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (slides.length > 0 && slideIndex > 0 && slideIndex <= slides.length) {
    slides[slideIndex - 1].style.display = "block";
  } else {
    console.error("Índice de slide inválido o no hay slides disponibles.");
  }
}

function autoSlide() {
  changeSlide(1);
}

function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(autoSlide, 2000);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// Función para inicializar el carrusel
function initializeCarousel() {
  const carousel = document.querySelector(".carousel-container");
  console.log("Carousel:", carousel); // Depuración

  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  } else {
    console.error("No se encontró el contenedor del carrusel.");
  }

  showSlides(slideIndex);
  startAutoSlide();
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado");

  // Verificar si el carrusel ya está en el DOM
  const carousel = document.querySelector(".carousel-container");
  if (carousel) {
    initializeCarousel();
  } else {
    console.log("El carrusel no está en el DOM. Esperando a que se cargue...");
  }
});

// Función para cargar el template y luego inicializar el carrusel
function mostrarPantallaInicio(event) {
  event.preventDefault();

  // Obtener el template
  const template = document.getElementById("plantilla-inicio");
  if (!template) {
    console.error("No se encontró el template de inicio.");
    return;
  }

  // Clonar el contenido del template
  const contenido = template.content.cloneNode(true);

  // Insertar el contenido en el contenedor principal
  const containerPrincipal = document.getElementById("container-principal");
  if (!containerPrincipal) {
    console.error("No se encontró el contenedor principal.");
    return;
  }

  containerPrincipal.innerHTML = ""; // Limpiar el contenedor
  containerPrincipal.appendChild(contenido); // Insertar el contenido del template

  // Inicializar el carrusel después de cargar el template
  initializeCarousel();
}