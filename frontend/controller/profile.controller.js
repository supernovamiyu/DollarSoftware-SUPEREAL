/**
 * Controlador para el perfil de usuario
 */
class ProfileController {
    /**
     * @param {Object} model - Modelo de usuario
     * @param {Object} view - Vista de perfil
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentSection = null;
        this.userOrders = [];
        this.userHistory = [];
        
        // Asignar el controlador a la vista
        this.view.controller = this;
    }

    /**
     * Muestra la página de perfil del usuario
     */
    async showProfilePage() {
        // Verificar autenticación primero
        if (!this.model.isAuthenticated()) {
            window.dispatchEvent(new CustomEvent("navigateTo", { 
                detail: { path: "/auth" } 
            }));
            return;
        }

        const user = this.model.getCurrentUser();
    
        if (this.view.showProfilePage(user)) {
            console.log("Perfil mostrado correctamente, configurando eventos...");
            
            try {
                // Cargar datos del usuario
                await this.loadUserData(user.id);
                this.setupProfileEvents();
                
                // Configurar el formulario de datos
                this.setupDataForm();
                
                // Mostrar la sección de gestión de pedidos por defecto
                setTimeout(() => {
                    this.handleProfileButtonClick("gestion-de-pedidos-boton-perfil");
                }, 100);
                
            } catch (error) {
                console.error("Error al cargar datos del perfil:", error);
                this.view.showMessage("Error al cargar datos del perfil", "error");
                this.setupProfileEvents(); // Configurar eventos básicos aunque falle la carga de datos
            }
        } else {
            console.error("Error al mostrar el perfil de usuario");
            this.view.showMessage("Error al cargar el perfil", "error");
        }
    }

    /**
     * Carga los datos del usuario (pedidos e historial)
     * @param {number} userId - ID del usuario
     */
    async loadUserData(userId) {
        try {
            // Cargar pedidos del usuario
            this.userOrders = await this.model.getUserOrders(userId);
            console.log("Pedidos cargados:", this.userOrders);
            
            // Cargar historial de productos
            try {
                this.userHistory = await this.model.getProductHistory(userId);
                console.log("Historial cargado:", this.userHistory);
            } catch (historyError) {
                console.warn("No se pudo cargar el historial:", historyError);
                this.userHistory = [];
            }
            
        } catch (error) {
            console.error("Error al cargar datos del usuario:", error);
            throw error;
        }
    }

    /**
     * Configura los eventos para la página de perfil
     */
    setupProfileEvents() {
        console.log("Configurando eventos del perfil");
    
        // Configurar botones del perfil
        this.view.setupProfileButtons((buttonId) => {
            this.handleProfileButtonClick(buttonId);
        });
    
        // Configurar botón de cerrar sesión
        const logoutButton = document.getElementById("logoutButton");
        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                this.handleLogout();
            });
        } else {
            console.log("Botón de logout no encontrado, buscando alternativas...");
            // Buscar por texto como fallback
            document.querySelectorAll("button").forEach((button) => {
                if (button.textContent.trim() === "Cerrar Sesión") {
                    button.id = "logoutButton";
                    button.addEventListener("click", () => {
                        this.handleLogout();
                    });
                }
            });
        }
        
        // Configurar eventos dinámicos cuando se cargue el contenido
        document.addEventListener("profileSectionLoaded", (e) => {
            const sectionId = e.detail;
            if (sectionId === "seccion-gestion-pedidos") {
                this.setupOrderEvents();
            } else if (sectionId === "seccion-historial-productos") {
                this.setupHistoryEvents();
            }
        });
    }
    
    /**
     * Maneja el cierre de sesión
     */
    handleLogout() {
        console.log("Cerrando sesión...");
        this.model.logout();
        this.view.showMessage("Sesión cerrada correctamente", "success");
        
        // Redirigir a la página de auth después de 1 segundo
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("navigateTo", { 
                detail: { path: "/auth" } 
            }));
        }, 1000);
    }

    /**
     * Maneja el clic en los botones del perfil
     * @param {string} buttonId - ID del botón
     */
    handleProfileButtonClick(buttonId) {
        console.log("Manejando clic en botón:", buttonId);
    
        // Obtener el ID de la sección correspondiente al botón
        const sectionId = this.getSectionIdFromButtonId(buttonId);
        console.log("Sección correspondiente:", sectionId);
    
        if (sectionId) {
            this.currentSection = sectionId;
            this.view.showProfileSection(sectionId);
    
            // Disparar evento cuando la sección se ha cargado
            setTimeout(() => {
                const event = new CustomEvent("profileSectionLoaded", { detail: sectionId });
                document.dispatchEvent(event);
            }, 300);
        } else {
            console.error("No se pudo determinar la sección para el botón:", buttonId);
        }
    }
    
    /**
     * Configura eventos para la sección de pedidos
     */
    setupOrderEvents() {
        document.querySelectorAll(".view-order-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const orderId = e.target.getAttribute("data-order-id");
                this.viewOrderDetails(orderId);
            });
        });
    }
    
    /**
     * Configura eventos para la sección de historial
     */
    setupHistoryEvents() {
        document.querySelectorAll(".view-product-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.getAttribute("data-product-id");
                this.viewProductDetails(productId);
            });
        });
    }
    
    /**
     * Muestra los detalles de un pedido específico
     * @param {string} orderId - ID del pedido
     */
    async viewOrderDetails(orderId) {
        try {
            // Buscar el pedido en los ya cargados
            const order = this.userOrders.find(o => (o.id_pedido || o.id) == orderId);
            
            if (order) {
                this.view.showOrderDetailsModal(order);
            } else {
                // Si no está en la lista, intentar cargarlo desde el servidor
                const fullOrder = await this.model.getOrderDetails(orderId);
                this.view.showOrderDetailsModal(fullOrder);
            }
        } catch (error) {
            console.error("Error al obtener detalles del pedido:", error);
            this.view.showMessage("Error al cargar los detalles del pedido", "error");
        }
    }
    
    /**
     * Muestra los detalles de un producto del historial
     * @param {string} productId - ID del producto
     */
    viewProductDetails(productId) {
        window.dispatchEvent(new CustomEvent("showProduct", { 
            detail: { productId } 
        }));
    }
    
    /**
     * Obtiene el ID de la sección correspondiente a un botón
     * @param {string} buttonId - ID del botón
     * @returns {string} - ID de la sección
     */
    getSectionIdFromButtonId(buttonId) {
        const buttonToSectionMap = {
            "gestion-de-pedidos-boton-perfil": "seccion-gestion-pedidos",
            "historial-de-productos-boton-perfil": "seccion-historial-productos",
            "agregar-o-modificar-datos-boton-perfil": "seccion-modificar-datos",
        };
        
        return buttonToSectionMap[buttonId] || "";
    }
    
    /**
     * Configura el formulario de modificación de datos
     */
    setupDataForm() {
        this.view.setupDataForm((formData) => this.handleDataFormSubmit(formData));
    }
    
    /**
     * Maneja el envío del formulario de modificación de datos
     * @param {Object} formData - Datos del formulario
     */
    async handleDataFormSubmit(formData) {
        try {
            const result = await this.model.updateUserData(formData);
    
            if (result.success) {
                this.view.showMessage("Datos actualizados correctamente", "success");
                
                // Actualizar la información del usuario en la vista
                const updatedUser = this.model.getCurrentUser();
                this.view.updateProfileInfo(updatedUser);
                
                // Actualizar el usuario global si existe
                if (window.usuarioActual) {
                    window.usuarioActual = { ...window.usuarioActual, ...formData };
                }
                
                // Disparar evento de actualización
                window.dispatchEvent(new CustomEvent("userDataUpdated", { 
                    detail: updatedUser 
                }));
                
            } else {
                this.view.showMessage(result.error || "Error al actualizar los datos", "error");
            }
        } catch (error) {
            console.error("Error al guardar datos:", error);
            this.view.showMessage("Error al guardar los datos", "error");
        }
    }
    
    /**
     * Actualiza la lista de pedidos del usuario
     */
    async refreshUserOrders() {
        try {
            const user = this.model.getCurrentUser();
            if (user) {
                this.userOrders = await this.model.getUserOrders(user.id);
                
                // Si estamos en la sección de pedidos, actualizar la vista
                if (this.currentSection === "seccion-gestion-pedidos") {
                    const section = document.getElementById("seccion-gestion-pedidos");
                    if (section) {
                        section.innerHTML = this.view.createOrderManagementHTML(this.userOrders);
                        this.setupOrderEvents();
                    }
                }
                
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar pedidos:", error);
            this.view.showMessage("Error al actualizar la lista de pedidos", "error");
            return false;
        }
    }
}

export default ProfileController;