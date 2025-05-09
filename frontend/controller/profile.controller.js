class ProfileController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.currentSection = null
        this.userOrders = []
        this.view.controller = this
    }

    async showProfilePage() {
        // Verificación más robusta de autenticación
        if (!this.model.isAuthenticated()) {
            console.warn("Intento de acceso a perfil sin autenticación");
            
            // Mostrar mensaje solo si no estamos ya en la página de auth
            if (!window.location.pathname.includes("/auth")) {
                this.view.showMessage("Debes iniciar sesión para acceder al perfil", "warning");
            }
            
            window.dispatchEvent(
                new CustomEvent("navigateTo", {
                    detail: { path: "/auth" },
                })
            );
            return;
        }

        const user = this.model.getCurrentUser();
        console.log("Mostrando perfil para:", user); // Debug

        if (this.view.showProfilePage(user)) {
            try {
                await this.loadUserData();
                this.setupProfileEvents();
                
                // Forzar actualización de la UI
                this.view.updateProfileInfo(user);
                
                // Mostrar sección por defecto
                setTimeout(() => {
                    this.handleProfileButtonClick("gestion-de-pedidos-boton-perfil");
                }, 100);
            } catch (error) {
                console.error("Error al cargar perfil:", error);
                this.view.showMessage("Error al cargar datos del perfil", "error");
            }
        }
    }
    
    async loadUserData() {
        try {
            this.userOrders = await this.model.getUserOrders()
            console.log("Pedidos cargados:", this.userOrders)
        } catch (error) {
            console.error("Error al cargar datos del usuario:", error)
            this.userOrders = []

            throw error
        }
    }

    setupProfileEvents() {
        this.view.setupProfileButtons((buttonId) => {
            this.handleProfileButtonClick(buttonId)
        })

        const logoutButton = document.getElementById("logoutButton")
        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                this.handleLogout()
            })
        }

        document.addEventListener("profileSectionLoaded", (e) => {
            const sectionId = e.detail
            if (sectionId === "seccion-modificar-datos") {
                this.setupDataForm()
            }
        })
    }

    handleLogout() {
        this.model.logout()
        this.view.showMessage("Sesión cerrada correctamente", "success")
        setTimeout(() => {
            window.dispatchEvent(
                new CustomEvent("navigateTo", {
                    detail: { path: "/auth" },
                }),
            )
        }, 1000)
    }

    handleProfileButtonClick(buttonId) {
        const sectionId = this.getSectionIdFromButtonId(buttonId)
        if (sectionId) {
            this.currentSection = sectionId
            this.view.showProfileSection(sectionId)

            setTimeout(() => {
                document.dispatchEvent(
                    new CustomEvent("profileSectionLoaded", {
                        detail: sectionId,
                    }),
                )
            }, 300)
        }
    }

    viewProductDetails(productId) {
        window.dispatchEvent(
            new CustomEvent("showProduct", {
                detail: { productId },
            }),
        )
    }

    getSectionIdFromButtonId(buttonId) {
        const buttonToSectionMap = {
            "gestion-de-pedidos-boton-perfil": "seccion-gestion-pedidos",
            "historial-de-productos-boton-perfil": "seccion-historial-productos",
            "agregar-o-modificar-datos-boton-perfil": "seccion-modificar-datos",
        }
        return buttonToSectionMap[buttonId] || ""
    }

    setupDataForm() {
        console.log("Configurando formulario de datos...")
        this.view.setupDataForm((formData) => this.handleDataFormSubmit(formData))
    }

    async handleDataFormSubmit(formData) {
        console.log("Iniciando envío de datos...", formData)
        try {
            if (!formData.nombre_completo || !formData.correo) {
                console.error("Datos incompletos:", formData)
                this.view.showMessage("Por favor completa todos los campos requeridos", "error")
                return
            }

            const result = await this.model.updateUserData(formData)

            if (result.success) {
                console.log("Actualización exitosa:", result)
                this.view.showMessage("¡Datos actualizados correctamente!", "success")

                // Actualizar la UI con los nuevos datos
                if (result.user) {
                    this.view.updateProfileInfo(result.user)
                    window.dispatchEvent(
                        new CustomEvent("userDataUpdated", {
                            detail: result.user,
                        }),
                    )
                }
            } else {
                console.error("Error en la respuesta:", result.error)
                this.view.showMessage(result.error || "Error al actualizar datos", "error")
            }
        } catch (error) {
            console.error("Error en el controlador:", error)
            this.view.showMessage("Error de conexión con el servidor", "error")
        }
    }

    async refreshUserOrders() {
        try {
            this.userOrders = await this.model.getUserOrders()

            if (this.currentSection === "seccion-gestion-pedidos") {
                const section = document.getElementById("seccion-gestion-pedidos")
                if (section) {
                    section.innerHTML = this.view.createOrderManagementHTML(this.userOrders)
                }
            }
            return true
        } catch (error) {
            console.error("Error al actualizar pedidos:", error)
            this.view.showMessage("Error al actualizar la lista de pedidos", "error")
            return false
        }
    }
}

export default ProfileController
