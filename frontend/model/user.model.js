    // UserModel.js - Maneja los datos y la lógica relacionada con los usuarios

    class UserModel {
    constructor() {
        this.currentUser = null;
        this.initializeFromStorage();
    }

    // Inicializar el modelo desde localStorage
    initializeFromStorage() {
        try {
        const savedSession = localStorage.getItem("sesionUsuario");
        if (savedSession) {
            this.currentUser = JSON.parse(savedSession);
        }
        } catch (error) {
        console.error("Error al recuperar la sesión:", error);
        localStorage.removeItem("sesionUsuario");
        }
    }

    // Verificar si el usuario está autenticado
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Obtener el usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Iniciar sesión
    async login(email, password) {
        try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: email, contraseña: password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al iniciar sesión");
        }

        // Guardar datos del usuario
        this.currentUser = data.usuario;
        localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));
        localStorage.setItem("authToken", data.token);

        return { success: true, user: this.currentUser };
        } catch (error) {
        console.error("Error en login:", error);
        return { success: false, error: error.message };
        }
    }

    // Registrar un nuevo usuario
    async register(userData) {
        try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al registrar usuario");
        }

        // Guardar datos del usuario
        this.currentUser = data.usuario;
        localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));
        localStorage.setItem("authToken", data.token);

        return { success: true, user: this.currentUser };
        } catch (error) {
        console.error("Error en registro:", error);
        return { success: false, error: error.message };
        }
    }

    // Cerrar sesión
    logout() {
        this.currentUser = null;
        localStorage.removeItem("sesionUsuario");
        localStorage.removeItem("authToken");
        return true;
    }

    // Obtener el perfil del usuario
    async getUserProfile() {
        // Si ya tenemos los datos del usuario, los devolvemos
        if (this.currentUser) {
        return this.currentUser;
        }

        // Si no, intentamos obtenerlos del servidor (implementación futura)
        return null;
    }

    // Actualizar datos del usuario
    async updateUserData(userData) {
        try {
        // Aquí iría la lógica para actualizar los datos en el servidor
        // Por ahora, solo actualizamos localmente
        this.currentUser = { ...this.currentUser, ...userData };
        localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));
        return { success: true };
        } catch (error) {
        console.error("Error al actualizar datos:", error);
        return { success: false, error: error.message };
        }
    }
    }

    export { UserModel };
