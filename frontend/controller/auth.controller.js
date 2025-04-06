    // AuthController.js - Controlador para la autenticación de usuarios

    class AuthController {
    constructor(userModel, authView) {
        this.userModel = userModel;
        this.view = authView;

        // Configurar manejadores de eventos
        this.setupEventHandlers();
    }

    // Configurar manejadores de eventos
    setupEventHandlers() {
        // Sobrescribir el método handleFormSubmit de la vista
        this.view.handleFormSubmit = this.handleFormSubmit.bind(this);

        // Usar event delegation para los botones del perfil
        document.addEventListener("click", (event) => {
        // Botón de cerrar sesión
        if (event.target.closest("#logoutButton")) {
            this.logout();
        }

        // Botones de secciones del perfil
        const profileButton = event.target.closest(".user-option-button button");
        if (profileButton) {
            this.handleProfileButtonClick(profileButton.id);
        }

        // Formulario de modificar datos
        if (event.target.closest("#form-modificar-datos")) {
            const form = event.target.closest("#form-modificar-datos");
            form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.saveUserData(form);
            });
        }
        });
    }

    // Manejar clic en el icono de usuario
    handleUserIconClick() {
        if (this.userModel.isLoggedIn()) {
        // Si el usuario está autenticado, mostrar el perfil
        this.showProfileScreen();
        } else {
        // Si no está autenticado, mostrar la pantalla de inicio de sesión/registro
        this.showAuthScreen();
        }
    }

    // Mostrar la pantalla de autenticación
    showAuthScreen() {
        this.view.showAuthScreen();
    }

    // Mostrar la pantalla de perfil
    showProfileScreen() {
        const userData = this.userModel.getCurrentUser();
        if (userData) {
        this.view.showProfileScreen(userData);
        } else {
        this.view.showMessage(
            "No se pudo cargar el perfil. Por favor, inicie sesión nuevamente.",
            "error"
        );
        this.showAuthScreen();
        }
    }

    // Manejar envío de formularios
    handleFormSubmit(event) {
        const form = event.target;

        // Formulario de inicio de sesión
        if (form.id === "login-form") {
        event.preventDefault();
        this.login(form);
        }

        // Formulario de registro
        else if (form.id === "registro-form") {
        event.preventDefault();
        this.register(form);
        }
    }

    // Iniciar sesión
    async login(form) {
        try {
        // Obtener los datos del formulario
        const email = form.correo.value;
        const password = form.contraseña.value;

        // Validar los datos
        if (!email || !password) {
            this.view.showFormError(
            "login-error",
            "Por favor, completa todos los campos"
            );
            return;
        }

        // Mostrar indicador de carga
        this.view.showMessage("Iniciando sesión...", "warning");

        // Llamar al modelo para iniciar sesión
        const result = await this.userModel.login(email, password);

        if (result.success) {
            // Actualizar la interfaz
            this.view.updateUserInterface(result.user);

            // Mostrar mensaje de éxito
            this.view.showMessage("¡Inicio de sesión exitoso!", "success");

            // Redirigir al perfil
            setTimeout(() => {
            this.showProfileScreen();
            }, 1000);
        } else {
            throw new Error(result.error || "Error al iniciar sesión");
        }
        } catch (error) {
        console.error("Error al iniciar sesión:", error);
        this.view.showFormError(
            "login-error",
            error.message || "Error al iniciar sesión. Verifica tus credenciales."
        );
        }
    }

    // Registrar un nuevo usuario
    async register(form) {
        try {
        // Obtener los datos del formulario
        const userData = {
            nombre_completo: form.nombre_completo.value,
            numero_identificacion: form.numero_identificacion.value,
            correo: form.correo.value,
            contraseña: form.contraseña.value,
        };

        const confirmar_contraseña = form.confirmar_contraseña.value;
        const terminos = form.terminos.checked;

        // Validar los datos
        if (
            !userData.nombre_completo ||
            !userData.numero_identificacion ||
            !userData.correo ||
            !userData.contraseña ||
            !confirmar_contraseña
        ) {
            this.view.showFormError(
            "registro-error",
            "Por favor, completa todos los campos"
            );
            return;
        }

        if (userData.contraseña !== confirmar_contraseña) {
            this.view.showFormError(
            "registro-error",
            "Las contraseñas no coinciden"
            );
            return;
        }

        if (!terminos) {
            this.view.showFormError(
            "registro-error",
            "Debes aceptar los términos y condiciones"
            );
            return;
        }

        // Mostrar indicador de carga
        this.view.showMessage("Creando cuenta...", "warning");

        // Llamar al modelo para registrar
        const result = await this.userModel.register(userData);

        if (result.success) {
            // Actualizar la interfaz
            this.view.updateUserInterface(result.user);

            // Mostrar mensaje de éxito
            this.view.showMessage("¡Cuenta creada exitosamente!", "success");

            // Redirigir al perfil
            setTimeout(() => {
            this.showProfileScreen();
            }, 1000);
        } else {
            throw new Error(result.error || "Error al registrar usuario");
        }
        } catch (error) {
        console.error("Error al registrar usuario:", error);
        this.view.showFormError(
            "registro-error",
            error.message || "Error al crear la cuenta. Inténtalo de nuevo."
        );
        }
    }

    // Cerrar sesión
    logout() {
        // Llamar al modelo para cerrar sesión
        this.userModel.logout();

        // Actualizar la interfaz
        this.view.updateUserInterface(null);

        // Mostrar mensaje de éxito
        this.view.showMessage("Sesión cerrada correctamente", "success");

        // Redirigir a la página de inicio
        setTimeout(() => {
        window.location.href = "/";
        }, 1000);
    }

    // Manejar clic en los botones del perfil
    handleProfileButtonClick(buttonId) {
        switch (buttonId) {
        case "gestion-de-pedidos-boton-perfil":
            this.view.showProfileSection("seccion-gestion-pedidos");
            break;
        case "historial-de-productos-boton-perfil":
            this.view.showProfileSection("seccion-historial-productos");
            break;
        case "agregar-o-modificar-datos-boton-perfil":
            this.view.showProfileSection("seccion-modificar-datos");
            break;
        }
    }

    // Guardar datos del usuario
    async saveUserData(form) {
        try {
        const userData = {
            nombre_completo: form.nombre_completo.value,
            correo: form.correo.value,
            telefono: form.telefono.value,
            direccion: form.direccion.value,
        };

        // Validar datos
        if (!userData.nombre_completo || !userData.correo) {
            this.view.showMessage(
            "Por favor, completa los campos obligatorios",
            "error"
            );
            return;
        }

        // Llamar al modelo para actualizar datos
        const result = await this.userModel.updateUserData(userData);

        if (result.success) {
            // Mostrar mensaje de éxito
            this.view.showMessage("Datos guardados correctamente", "success");

            // Actualizar la interfaz
            this.view.updateUserInterface(this.userModel.getCurrentUser());
        } else {
            throw new Error(result.error || "Error al guardar los datos");
        }
        } catch (error) {
        console.error("Error al guardar datos:", error);
        this.view.showMessage(
            "No se pudieron guardar los datos. Intenta de nuevo más tarde.",
            "error"
        );
        }
    }
    }

    export { AuthController };
