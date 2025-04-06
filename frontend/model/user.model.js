// UserModel.js - Maneja los datos de usuario y autenticación
export class UserModel {
    constructor() {
        this.sessionKey = 'sesionUsuario';
        this.tokenKey = 'authToken';
    }

    isLoggedIn() {
        return !!localStorage.getItem(this.sessionKey);
    }

    getUser() {
        return JSON.parse(localStorage.getItem(this.sessionKey)) || null;
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    saveSession(userData, token) {
        localStorage.setItem(this.sessionKey, JSON.stringify(userData));
        localStorage.setItem(this.tokenKey, token);
    }

    clearSession() {
        localStorage.removeItem(this.sessionKey);
        localStorage.removeItem(this.tokenKey);
    }

    async login(email, password) {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: email,
                    contraseña: password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al iniciar sesión");
            }

            this.saveSession(data.usuario, data.token);
            return data;
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            throw error;
        }
    }

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

            this.saveSession(data.usuario, data.token);
            return data;
        } catch (error) {
            console.error("Error de registro:", error);
            throw error;
        }
    }

    async getUserProfile() {
        try {
            const token = this.getToken();

            if (!token) {
                throw new Error("No se encontró token de autenticación");
            }

            const response = await fetch(`http://localhost:3000/auth/profile/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            return await response.json();
        } catch (error) {
            console.error("Error al obtener perfil de usuario:", error);
            throw error;
        }
    }
}