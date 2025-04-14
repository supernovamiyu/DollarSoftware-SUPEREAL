    /**
     * Modelo para manejar los datos y la lógica de negocio relacionada con los usuarios
     */
    class UserModel {
    constructor() {
        this.currentUser = null
        this.initSession()
    }

    /**
     * Inicializa la sesión del usuario desde localStorage
     * @returns {boolean} - true si se recuperó la sesión, false en caso contrario
     */
    initSession() {
        const savedSession = localStorage.getItem("sesionUsuario")
        if (savedSession) {
        try {
            this.currentUser = JSON.parse(savedSession)
            return true
        } catch (error) {
            console.error("Error al recuperar la sesión:", error)
            localStorage.removeItem("sesionUsuario")
            return false
        }
        }
        return false
    }

    /**
     * Obtiene el usuario actual
     * @returns {Object|null} - Datos del usuario actual o null si no hay sesión
     */
    getCurrentUser() {
        return this.currentUser
    }

    /**
     * Verifica si hay un usuario autenticado
     * @returns {boolean} - true si hay un usuario autenticado, false en caso contrario
     */
    isAuthenticated() {
        return this.currentUser !== null
    }

    /**
     * Inicia sesión con las credenciales proporcionadas
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {Promise<Object>} - Resultado de la operación
     */
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
    
            // Guardar la sesión del usuario
            this.currentUser = data.usuario;
            localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));
            localStorage.setItem("authToken", data.token);
    
            // Disparar evento de login exitoso
            window.dispatchEvent(new CustomEvent("loginSuccess"));
    
            return { success: true, user: data.usuario };
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return {
                success: false,
                error: error.message || "Error al iniciar sesión. Verifica tus credenciales.",
            };
        }
    }

    /**
     * Registra un nuevo usuario
     * @param {Object} userData - Datos del usuario a registrar
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async register(userData) {
        try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al registrar usuario")
        }

        // Guardar la sesión del usuario
        this.currentUser = data.usuario
        localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser))
        localStorage.setItem("authToken", data.token)

        return { success: true, user: data.usuario }
        } catch (error) {
        console.error("Error al registrar usuario:", error)
        return {
            success: false,
            error: error.message || "Error al crear la cuenta. Inténtalo de nuevo.",
        }
        }
    }

    /**
     * Cierra la sesión del usuario actual
     * @returns {boolean} - true si se cerró la sesión correctamente
     */
    logout() {
        this.currentUser = null
        localStorage.removeItem("sesionUsuario")
        localStorage.removeItem("authToken")
        return true
    }

    /**
     * Actualiza los datos del usuario
     * @param {Object} userData - Nuevos datos del usuario
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async updateUserData(userData) {
        // Aquí iría la lógica para actualizar los datos del usuario en el servidor
        // Por ahora, simulamos una actualización exitosa
        try {
        // Simulación de actualización exitosa
        this.currentUser = { ...this.currentUser, ...userData }
        localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser))

        return { success: true, user: this.currentUser }
        } catch (error) {
        console.error("Error al actualizar datos del usuario:", error)
        return {
            success: false,
            error: error.message || "Error al actualizar los datos. Inténtalo de nuevo.",
        }
        }
    }
    }

    export default UserModel

