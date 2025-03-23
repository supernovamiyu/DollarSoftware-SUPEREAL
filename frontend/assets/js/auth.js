// Funciones para manejar la autenticación de usuarios

// Almacenamiento de la sesión del usuario
let usuarioActual = null;

// Verificar si hay una sesión guardada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Intentar recuperar la sesión del localStorage
    const sesionGuardada = localStorage.getItem('sesionUsuario');
    if (sesionGuardada) {
        try {
            usuarioActual = JSON.parse(sesionGuardada);
            actualizarInterfazUsuario();
        } catch (error) {
            console.error('Error al recuperar la sesión:', error);
            localStorage.removeItem('sesionUsuario');
        }
    }

    // Configurar los event listeners para los formularios
    configurarFormularios();
});

// Configurar los event listeners para los formularios de autenticación
function configurarFormularios() {
    // Usar event delegation para capturar los formularios cuando se carguen dinámicamente
    document.addEventListener('submit', (event) => {
        const formulario = event.target;

        // Formulario de inicio de sesión
        if (formulario.id === 'login-form') {
            event.preventDefault();
            iniciarSesion(formulario);
        }
        
        // Formulario de registro
        else if (formulario.id === 'registro-form') {
            event.preventDefault();
            registrarUsuario(formulario);
        }
    });
}

// Función para iniciar sesión
async function iniciarSesion(formulario) {
    try {
        // Obtener los datos del formulario
        const correo = formulario.correo.value;
        const contraseña = formulario.contraseña.value;

        // Validar los datos
        if (!correo || !contraseña) {
            mostrarErrorFormulario('login-error', 'Por favor, completa todos los campos');
            return;
        }

        // Mostrar indicador de carga
        mostrarMensaje('Iniciando sesión...', 'warning');

        // Enviar la solicitud al servidor
        const respuesta = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, contraseña })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al iniciar sesión');
        }

        // Guardar la sesión del usuario
        usuarioActual = datos.usuario;
        localStorage.setItem('sesionUsuario', JSON.stringify(usuarioActual));
        localStorage.setItem('authToken', datos.token);

        // Actualizar la interfaz
        actualizarInterfazUsuario();

        // Mostrar mensaje de éxito
        mostrarMensaje('¡Inicio de sesión exitoso!', 'success');

        // Redirigir al perfil
        setTimeout(() => {
            mostrarPantallaPerfil();
        }, 1000);

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        mostrarErrorFormulario('login-error', error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    }
}

// Función para registrar un nuevo usuario
async function registrarUsuario(formulario) {
    try {
        // Obtener los datos del formulario
        const nombre_completo = formulario.nombre_completo.value;
        const numero_identificacion = formulario.numero_identificacion.value;
        const correo = formulario.correo.value;
        const contraseña = formulario.contraseña.value;
        const confirmar_contraseña = formulario.confirmar_contraseña.value;
        const terminos = formulario.terminos.checked;

        // Validar los datos
        if (!nombre_completo || !numero_identificacion || !correo || !contraseña || !confirmar_contraseña) {
            mostrarErrorFormulario('registro-error', 'Por favor, completa todos los campos');
            return;
        }

        if (contraseña !== confirmar_contraseña) {
            mostrarErrorFormulario('registro-error', 'Las contraseñas no coinciden');
            return;
        }

        if (!terminos) {
            mostrarErrorFormulario('registro-error', 'Debes aceptar los términos y condiciones');
            return;
        }

        // Mostrar indicador de carga
        mostrarMensaje('Creando cuenta...', 'warning');

        // Enviar la solicitud al servidor
        const respuesta = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_completo,
                numero_identificacion,
                correo,
                contraseña
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al registrar usuario');
        }

        // Guardar la sesión del usuario
        usuarioActual = datos.usuario;
        localStorage.setItem('sesionUsuario', JSON.stringify(usuarioActual));
        localStorage.setItem('authToken', datos.token);

        // Actualizar la interfaz
        actualizarInterfazUsuario();

        // Mostrar mensaje de éxito
        mostrarMensaje('¡Cuenta creada exitosamente!', 'success');

        // Redirigir al perfil
        setTimeout(() => {
            mostrarPantallaPerfil();
        }, 1000);

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        mostrarErrorFormulario('registro-error', error.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar la sesión del usuario
    usuarioActual = null;
    localStorage.removeItem('sesionUsuario');
    localStorage.removeItem('authToken');

    // Actualizar la interfaz
    actualizarInterfazUsuario();

    // Mostrar mensaje de éxito
    mostrarMensaje('Sesión cerrada correctamente', 'success');

    // Redirigir a la página de inicio
    mostrarPantallaInicio();
}

// Función para actualizar la interfaz según el estado de autenticación
function actualizarInterfazUsuario() {
    // Obtener el icono de usuario
    const iconoUsuario = document.querySelector('.fa-user');
    
    if (usuarioActual) {
        // Si hay un usuario autenticado, mostrar su nombre debajo del icono
        if (iconoUsuario) {
            // Verificar si ya existe el contenedor del nombre
            let nombreUsuarioElement = iconoUsuario.parentElement.querySelector('.nombre-usuario');
            
            if (!nombreUsuarioElement) {
                // Crear el elemento para mostrar el nombre
                nombreUsuarioElement = document.createElement('span');
                nombreUsuarioElement.className = 'nombre-usuario';
                nombreUsuarioElement.style.display = 'block';
                nombreUsuarioElement.style.fontSize = '12px';
                nombreUsuarioElement.style.textAlign = 'center';
                nombreUsuarioElement.style.marginTop = '5px';
                nombreUsuarioElement.style.color = 'white';
                
                // Insertar después del icono
                iconoUsuario.parentElement.appendChild(nombreUsuarioElement);
            }
            
            // Actualizar el texto con el nombre del usuario
            nombreUsuarioElement.textContent = usuarioActual.nombre_completo.split(' ')[0];
        }
    } else {
        // Si no hay usuario autenticado, eliminar el nombre si existe
        if (iconoUsuario) {
            const nombreUsuarioElement = iconoUsuario.parentElement.querySelector('.nombre-usuario');
            if (nombreUsuarioElement) {
                nombreUsuarioElement.remove();
            }
        }
    }
}

// Función para mostrar errores en los formularios
function mostrarErrorFormulario(elementId, mensaje) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
}

// Función para mostrar el perfil del usuario
function mostrarPantallaPerfil() {
    // Mostrar la plantilla de perfil
    const vista = new Vista();
    vista.mostrarPlantilla('plantilla-perfil-usuario', 'container-principal');
    
    // Actualizar los datos del perfil con la información del usuario
    if (usuarioActual) {
        const userInfoName = document.getElementById('userInfoName');
        const userInfoEmail = document.getElementById('userInfoEmail');
        const userInfoInitial = document.getElementById('userInfoInitial');
        
        if (userInfoName) userInfoName.textContent = usuarioActual.nombre_completo;
        if (userInfoEmail) userInfoEmail.textContent = usuarioActual.correo;
        if (userInfoInitial) userInfoInitial.textContent = usuarioActual.nombre_completo.charAt(0).toUpperCase();
        
        // Configurar el botón de cerrar sesión
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', cerrarSesion);
        }
    }
}

// Sobrescribir la función mostrarPantallaSesion para verificar si el usuario está autenticado
window.mostrarPantallaSesion = function(event) {
    if (event) event.preventDefault();
    
    if (usuarioActual) {
        // Si el usuario está autenticado, mostrar el perfil
        mostrarPantallaPerfil();
    } else {
        // Si no está autenticado, mostrar la pantalla de inicio de sesión/registro
        const vista = new Vista();
        vista.mostrarPlantilla('plantilla-sesion-registro', 'container-principal');
    }
};