// Función para inicializar el mapa y agregar eventos
function inicializarMapa() {
  // Inicializa el mapa
  const map = L.map('mapa').setView([4.609710, -74.081749], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Datos ficticios de las tiendas
  const tiendas = {
    bogota: {
      "engativa": [
        { nombre: "Sucursal #1 - Parque Simón Bolívar", direccion: "Calle Falsa #123", horario: "9 AM - 6 PM", lat: 4.657, lng: -74.093 },
        { nombre: "Sucursal #2 - Parque San Andrés", direccion: "Carrera Verdadera #456", horario: "10 AM - 7 PM", lat: 4.712934, lng: -74.112192 }
      ],
      "puente-aranda": [
        { nombre: "Sucursal #3 - C.C. Plaza Central", direccion: "Calle Dorada #789", horario: "8 AM - 5 PM", lat: 4.630062, lng: -74.116559 }
      ],
      "usme": [
        { nombre: "Outlet #1 - C.C. Altavista", direccion: "Calle Dorada #209", horario: "10 AM - 6 PM", lat: 4.532279, lng: -74.118170 }
      ],
    },
    medellin: {
      "parque-berrio": [
        { nombre: "Outlet #2 - Barrio Candelaria", direccion: "Calle Medellín #321", horario: "9 AM - 6 PM", lat: 6.247, lng: -75.563 }
      ],
      "museo-de-antioquia": [
        { nombre: "Sucursal #1 - Museo de Antioquia", direccion: "Carrera Antioquia #654", horario: "10 AM - 7 PM", lat: 6.251, lng: -75.565 }
      ]
    },
    cali: {
      "parque-del-gato": [
        { nombre: "Sucursal #1 - Parque del Gato", direccion: "Calle Cali #901", horario: "9 AM - 6 PM", lat: 3.420556, lng: -76.522222 },
        { nombre: "Sucursal #2 - Barrio El Peñón", direccion: "Carrera Cali #111", horario: "10 AM - 7 PM", lat: 3.421111, lng: -76.523333 }
      ],
      "museo-de-la-caña-de-azucar": [
        { nombre: "Outlet #3 - Museo de la Caña de Azucar", direccion: "Calle Museo #456", horario: "8 AM - 5 PM", lat: 3.623200, lng: -76.226476 }
      ]
    },
    barranquilla: {
      "parque-fernando-villa": [
        { nombre: "Outlet #4 - Parque Fernando Villa", direccion: "Calle Barranquilla #789", horario: "9 AM - 6 PM", lat: 10.966667, lng: -74.783333 },
      ],
      "museo-del-caribe": [
        { nombre: "Sucursal #1 - Museo del Caribe", direccion: "Calle Museo #654", horario: "8 AM - 5 PM", lat: 10.968333, lng: -74.785555 }
      ]
    }
  };

  // Agregar eventos después de que el template esté en el DOM
  const ciudadSelect = document.querySelector('#ciudad');
  ciudadSelect.addEventListener('change', (e) => {
    const ciudad = e.target.value;
    const zonaSelect = document.querySelector('#zona');
    
    // Limpiar opciones anteriores
    zonaSelect.innerHTML = '';

    // Agregar nuevas opciones según la ciudad
    if (ciudad === 'bogota') {
      zonaSelect.innerHTML = `
        <option value="engativa">Engativá</option>
        <option value="puente-aranda">Puente Aranda</option>
        <option value="usme">Usme</option>
      `;
    } else if (ciudad === 'medellin') {
      zonaSelect.innerHTML = `
        <option value="parque-berrio">Parque Berrío</option>
        <option value="museo-de-antioquia">Museo de Antioquia</option>
      `;
    } else if (ciudad === 'cali') {
      zonaSelect.innerHTML = `
        <option value="parque-del-gato">Parque del Gato</option>
        <option value="museo-de-la-caña-de-azucar">Museo de la Caña de Azúcar</option>
      `;
    } else if (ciudad === 'barranquilla') {
      zonaSelect.innerHTML = `
        <option value="parque-fernando-villa">Parque Fernando Villa</option>
        <option value="museo-del-caribe">Museo del Caribe</option>
      `;
    }
  });

  // Manejar el formulario para buscar tiendas
  const formulario = document.querySelector('#formulario-ubicacion');
  formulario.addEventListener('submit', async function(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const zona = document.querySelector('#zona').value;

    // Limpiar marcadores y detalles anteriores
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });
    
    const detallesDiv = document.querySelector('#detalles-tiendas');
    detallesDiv.innerHTML = '';

    // Agregar marcadores al mapa y mostrar detalles
    if (tiendas[ciudad] && tiendas[ciudad][zona]) {
      tiendas[ciudad][zona].forEach(tienda => {
        // Crear marcador en el mapa
        L.marker([tienda.lat, tienda.lng]).addTo(map)
          .bindPopup(`<b>${tienda.nombre}</b><br>${tienda.direccion}<br>${tienda.horario}`);

        // Mostrar detalles en la página
        const detallesHTML = `
        <div class="tienda-ubicada">
        <i id="pin-ubicacion-tiendas" class="fa-solid fa-location-dot fa-xl"></i>
          <div class="textos-ubicacion-tiendas">
            <h5 class="elemento-ubicacion-tiendas">${tienda.nombre}</h5>
            <p class= "elemento-ubicacion-tiendas">Dirección: ${tienda.direccion}</p>
            <p class = "elemento-ubicacion-tiendas">Horario: ${tienda.horario}</p>
          </div>
        </div>
        `;
        detallesDiv.insertAdjacentHTML('beforeend', detallesHTML);
      });

      // Centrar el mapa en la primera tienda
      const primeraTienda = tiendas[ciudad][zona][0];
      map.setView([primeraTienda.lat, primeraTienda.lng], 15);
    } else {
      alert("No hay tiendas disponibles en esta zona.");
      map.setView([4.609710, -74.081749], 12); // Volver a Bogotá como vista predeterminada
    }
  });
}

// Llamar a la función después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Agrega un evento al ícono para mostrar la pantalla de ubicación
  document.getElementById('icono-ubicacion').addEventListener('click', function() {
    vista.mostrarPlantilla("plantilla-ubicacion", "container-principal");
    setTimeout(inicializarMapa, 100); // Llamar a inicializarMapa después de mostrar el template
  });
});
