    import BaseView from "./base.view.js";

    /**
     * Vista para el perfil de usuario
     */
    class ProfileView extends BaseView {
        constructor() {
            super();
            this.controller = null;
            this.userOrders = [];
            this.userHistory = [];
        }

        /**
         * Muestra la página de perfil del usuario
         * @param {Object} user - Datos del usuario
         * @returns {boolean} - True si se mostró correctamente
         */
        showProfilePage(user) {
            if (this.showTemplate("plantilla-perfil-usuario", "container-principal")) {
                this.updateProfileInfo(user);
                
                // Mostrar la sección de gestión de pedidos por defecto
                setTimeout(() => {
                    const defaultButton = document.getElementById("gestion-de-pedidos-boton-perfil");
                    if (defaultButton) {
                        defaultButton.click();
                    }
                }, 100);
                return true;
            }
            return false;
        }

        /**
         * Actualiza la información del perfil con los datos del usuario
         * @param {Object} user - Datos del usuario
         */
        updateProfileInfo(user) {
            if (!user) return;

            const userInfoName = document.getElementById("userInfoName");
            const userInfoEmail = document.getElementById("userInfoEmail");
            const userInfoInitial = document.getElementById("userInfoInitial");

            if (userInfoName) userInfoName.textContent = user.nombre_completo || "Usuario";
            if (userInfoEmail) userInfoEmail.textContent = user.correo || "usuario@ejemplo.com";
            if (userInfoInitial) {
                userInfoInitial.textContent = (user.nombre_completo || "Usuario").charAt(0).toUpperCase();
            }
        }

        /**
         * Muestra una sección específica del perfil
         * @param {string} sectionId - ID de la sección a mostrar
         */
        showProfileSection(sectionId) {
            this.hideAllSections();
            let section = document.getElementById(sectionId);

            if (!section) {
                section = document.createElement("div");
                section.id = sectionId;
                section.className = "seccion-perfil";

                const profileContent = document.querySelector(".profile-content-container") || 
                                    document.getElementById("container-principal");
                if (profileContent) {
                    profileContent.appendChild(section);
                }

                this.loadSectionContent(sectionId, section);
            }

            section.style.display = "block";
            this.updateButtonStyles(sectionId);
        }

        /**
         * Oculta todas las secciones del perfil
         */
        hideAllSections() {
            const sections = document.querySelectorAll(".seccion-perfil");
            sections.forEach((section) => {
                section.style.display = "none";
            });
        }

        /**
         * Actualiza los estilos de los botones para mostrar cuál está activo
         * @param {string} activeSectionId - ID de la sección activa
         */
        updateButtonStyles(activeSectionId) {
            const buttons = document.querySelectorAll(".profile-option-btn, .profile-button");
            buttons.forEach((button) => {
                if (this.getButtonSectionId(button.id) === activeSectionId) {
                    button.classList.add("active");
                    button.setAttribute("aria-current", "true");
                } else {
                    button.classList.remove("active");
                    button.removeAttribute("aria-current");
                }
            });
        }

        /**
         * Obtiene el ID de la sección correspondiente a un botón
         * @param {string} buttonId - ID del botón
         * @returns {string} - ID de la sección
         */
        getButtonSectionId(buttonId) {
            const buttonToSectionMap = {
                "gestion-de-pedidos-boton-perfil": "seccion-gestion-pedidos",
                "historial-de-productos-boton-perfil": "seccion-historial-productos",
                "agregar-o-modificar-datos-boton-perfil": "seccion-modificar-datos",
            };

            return buttonToSectionMap[buttonId] || "";
        }

        /**
         * Carga el contenido específico para cada sección
         * @param {string} sectionId - ID de la sección
         * @param {HTMLElement} sectionElement - Elemento de la sección
         */
        loadSectionContent(sectionId, sectionElement) {
            switch (sectionId) {
                case "seccion-gestion-pedidos":
                    this.loadOrderManagementSection(sectionElement);
                    break;
                    
                case "seccion-historial-productos":
                    this.loadProductHistorySection(sectionElement);
                    break;
                    
                case "seccion-modificar-datos":
                    this.loadDataModificationSection(sectionElement);
                    break;
            }
        }

        /**
         * Carga la sección de gestión de pedidos
         * @param {HTMLElement} sectionElement - Elemento de la sección
         */
        async loadOrderManagementSection(sectionElement) {
            try {
                const orders = this.controller?.userOrders || [];
                sectionElement.innerHTML = this.createOrderManagementHTML(orders);
            } catch (error) {
                console.error("Error loading orders:", error);
                sectionElement.innerHTML = `
                    <section id="contenedor-gestion-pedidos">
                        <div class="titulo-seccion">
                            <h4>Gestión de Pedidos</h4>
                        </div>
                        <div class="error-message">
                            Error al cargar los pedidos. Por favor intente nuevamente.
                        </div>
                    </section>
                `;
            }
        }

        /**
         * Crea el HTML para la sección de gestión de pedidos
         * @param {Array} orders - Lista de pedidos
         * @returns {string} - HTML generado
         */
        createOrderManagementHTML(orders = []) {
            return `
                <section id="contenedor-gestion-pedidos">
                    <div class="titulo-seccion">
                        <h4>Gestión de Pedidos</h4>
                    </div>
                    <div class="contenedor-pedidos">
                        ${orders.length > 0 ? `
                        <div class="table-responsive">
                            <table class="tabla-de-pedidos">
                                <thead>
                                    <tr>
                                        <th>N° Pedido</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Dirección</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orders.map(order => `
                                    <tr>
                                        <td>${order.id_pedido || 'N/A'}</td>
                                        <td>${new Date(order.fecha_pedido).toLocaleDateString()}</td>
                                        <td>$${order.total.toFixed(2)}</td>
                                        <td>${this.getOrderStatusBadge(order.estado)}</td>
                                        <td>${order.direccion_entrega}</td>
                                        <td>
                                            <button class="btn btn-primary view-order-btn" 
                                                    data-order-id="${order.id_pedido}">
                                                Ver Detalles
                                            </button>
                                        </td>
                                    </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        ` : `
                        <div class="no-orders alert alert-info">
                            <p>No tienes pedidos registrados</p>
                        </div>
                        `}
                    </div>
                </section>
            `;
        }

        /**
         * Carga la sección de historial de productos
         * @param {HTMLElement} sectionElement - Elemento de la sección
         */
        async loadProductHistorySection(sectionElement) {
            try {
                const history = this.controller?.userHistory || [];
                sectionElement.innerHTML = this.createProductHistoryHTML(history);
            } catch (error) {
                console.error("Error loading product history:", error);
                sectionElement.innerHTML = `
                    <section id="contenedor-historial-productos">
                        <div class="titulo-seccion">
                            <h4>Historial de Productos</h4>
                        </div>
                        <div class="error-message alert alert-danger">
                            Error al cargar el historial. Por favor intente nuevamente.
                        </div>
                    </section>
                `;
            }
        }

        /**
         * Crea el HTML para la sección de historial de productos
         * @param {Array} history - Lista de productos vistos
         * @returns {string} - HTML generado
         */
        createProductHistoryHTML(history = []) {
            return `
                <section id="contenedor-historial-productos">
                    <div class="titulo-seccion">
                        <h4>Historial de Productos</h4>
                    </div>
                    <div class="contenedor-historial">
                        ${history.length > 0 ? `
                        <div class="product-history-grid row">
                            ${history.map(product => `
                            <div class="history-product-card col-md-4 col-sm-6 mb-4">
                                <div class="card h-100">
                                    <img src="${product.imagen || 'frontend/assets/img/default-product.png'}" 
                                        alt="${product.nombre}" class="img-fluid history-product-image">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.nombre}</h5>
                                        <p class="card-text">Visto el ${new Date(product.fecha_visto || product.viewedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                        ` : `
                        <div class="no-history alert alert-info">
                            <p>No hay productos en tu historial</p>
                        </div>
                        `}
                    </div>
                </section>
            `;
        }

        /**
         * Carga la sección de modificación de datos
         * @param {HTMLElement} sectionElement - Elemento de la sección
         */
        loadDataModificationSection(sectionElement) {
            const currentUser = window.usuarioActual || { nombre_completo: "", correo: "" };
            sectionElement.innerHTML = this.createDataModificationHTML(currentUser);
        }

        /**
         * Crea el HTML para la sección de modificación de datos
         * @param {Object} user - Datos del usuario
         * @returns {string} - HTML generado
         */
        createDataModificationHTML(user) {
            return `
                <section id="contenedor-modificar-datos" style="margin-bottom: 10vh;">
                    <div class="titulo-seccion">
                        <h4>Modificar datos personales</h4>
                    </div>
                    <form id="form-modificar-datos" class="form-datos-personales">
                        <div class="form-group mb-3">
                            <label for="nombre_completo" class="form-label">Nombre completo:</label>
                            <input type="text" id="nombre_completo" name="nombre_completo" class="form-control" 
                                value="${user.nombre_completo}" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="correo" class="form-label">Correo electrónico:</label>
                            <input type="email" id="correo" name="correo" class="form-control" 
                                value="${user.correo}" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="telefono" class="form-label">Teléfono:</label>
                            <input type="tel" id="telefono" name="telefono" class="form-control" 
                                value="${user.telefono || ''}" placeholder="Ingrese su número telefónico">
                        </div>
                        <div class="form-group mb-4">
                            <label for="direccion" class="form-label">Dirección:</label>
                            <input type="text" id="direccion" name="direccion" class="form-control" 
                                value="${user.direccion || ''}" placeholder="Ingrese su dirección">
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fa-solid fa-save me-2"></i>
                            Guardar cambios
                        </button>
                    </form>
                </section>
            `;
        }

        /**
         * Devuelve un badge HTML para el estado del pedido
         * @param {string} status - Estado del pedido
         * @returns {string} - HTML del badge
         */
        getOrderStatusBadge(status) {
            const statusMap = {
                'pendiente': '<span class="badge bg-warning text-dark">Pendiente</span>',
                'en_proceso': '<span class="badge bg-info text-white">En Proceso</span>',
                'enviado': '<span class="badge bg-primary text-white">Enviado</span>',
                'entregado': '<span class="badge bg-success text-white">Entregado</span>',
                'cancelado': '<span class="badge bg-danger text-white">Cancelado</span>',
                'pending': '<span class="badge bg-warning text-dark">Pendiente</span>',
                'processing': '<span class="badge bg-info text-white">En Proceso</span>',
                'shipped': '<span class="badge bg-primary text-white">Enviado</span>',
                'delivered': '<span class="badge bg-success text-white">Entregado</span>',
                'cancelled': '<span class="badge bg-danger text-white">Cancelado</span>',
                'PRE': '<span class="badge bg-warning text-dark">Pendiente</span>',
                'ENV': '<span class="badge bg-info text-white">Enviado</span>',
                'ENT': '<span class="badge bg-success text-white">Entregado</span>',
                'CAN': '<span class="badge bg-danger text-white">Cancelado</span>'
            };
            return statusMap[status] || `<span class="badge bg-secondary">${status}</span>`;
        }

        /**
         * Configura los eventos para los botones del perfil
         * @param {Function} buttonClickHandler - Manejador para los botones del perfil
         */
        setupProfileButtons(buttonClickHandler) {
            const profileButtons = [
                "gestion-de-pedidos-boton-perfil",
                "historial-de-productos-boton-perfil",
                "agregar-o-modificar-datos-boton-perfil"
            ];

            profileButtons.forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.addEventListener("click", (e) => {
                        e.preventDefault();
                        buttonClickHandler(buttonId);
                    });
                }
            });

            const logoutButton = document.getElementById("logoutButton");
            if (logoutButton) {
                logoutButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("logout"));
                });
            }
        }

        /**
         * Configura el formulario de modificación de datos
         * @param {Function} submitHandler - Manejador para el envío del formulario
         */
        setupDataForm(submitHandler) {
            const dataForm = document.getElementById("form-modificar-datos");
            if (dataForm) {
                dataForm.addEventListener("submit", (event) => {
                    event.preventDefault();

                    const formData = {
                        nombre_completo: dataForm.nombre_completo.value,
                        correo: dataForm.correo.value,
                        telefono: dataForm.telefono.value,
                        direccion: dataForm.direccion.value,
                    };

                    submitHandler(formData);
                });
            }
        }

        /**
         * Muestra un mensaje de notificación
         * @param {string} message - Mensaje a mostrar
         * @param {string} type - Tipo de mensaje (success, error, warning)
         */
        showMessage(message, type = "info") {
            const notification = document.createElement("div");
            notification.className = `alert alert-${type} mensaje-notificacion`;
            notification.setAttribute("role", "alert");
            notification.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} me-2"></i>
                    <span>${message}</span>
                </div>
            `;
            
            notification.style.position = "fixed";
            notification.style.top = "20px";
            notification.style.right = "20px";
            notification.style.zIndex = "9999";
            notification.style.maxWidth = "400px";
            notification.style.opacity = "0";
            notification.style.transform = "translateY(-20px)";
            notification.style.transition = "all 0.3s ease";
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = "1";
                notification.style.transform = "translateY(0)";
            }, 100);
            
            setTimeout(() => {
                notification.style.opacity = "0";
                notification.style.transform = "translateY(-20px)";
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }

        /**
         * Muestra los detalles de un pedido en un modal
         * @param {Object} order - Datos del pedido
         */
        showOrderDetailsModal(order) {
            let modal = document.getElementById("orderDetailsModal");
            if (!modal) {
                modal = document.createElement("div");
                modal.id = "orderDetailsModal";
                modal.className = "modal fade";
                modal.setAttribute("tabindex", "-1");
                modal.setAttribute("aria-hidden", "true");
                modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Detalles del Pedido #<span id="orderDetailId"></span></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="order-info mb-4">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p><strong>Fecha:</strong> <span id="orderDetailDate"></span></p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><strong>Estado:</strong> <span id="orderDetailStatus"></span></p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><strong>Método de envío:</strong> <span id="orderDetailShipping"></span></p>
                                        </div>
                                        <div class="col-12">
                                            <p><strong>Dirección de entrega:</strong> <span id="orderDetailAddress"></span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <h5>Productos</h5>
                                <div class="order-products-list mb-3" id="orderProductsList"></div>
                                
                                <div class="order-summary text-end">
                                    <p class="h5">Total: <span class="text-primary" id="orderDetailTotal"></span></p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            }
            
            document.getElementById("orderDetailId").textContent = order.id_pedido || order.id || order.id_peddo;
            document.getElementById("orderDetailDate").textContent = new Date(order.fecha_pedido || order.fecha || order.fecha_de_peddo).toLocaleDateString();
            document.getElementById("orderDetailStatus").innerHTML = this.getOrderStatusBadge(order.estado || order.fk_id_estado_envio || 'pending');
            document.getElementById("orderDetailShipping").textContent = order.metodo_envio || 'No especificado';
            document.getElementById("orderDetailAddress").textContent = order.direccion_entrega || order.direccion || "No especificada";
            
            const productsList = document.getElementById("orderProductsList");
            productsList.innerHTML = (order.productos || []).map(product => `
                <div class="order-product-item border-bottom pb-3 mb-3">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${product.imagen || product.image || 'frontend/assets/img/default-product.png'}" 
                                alt="${product.nombre || product.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-6">
                            <h6>${product.nombre || product.name}</h6>
                            ${product.descripcion ? `<p class="text-muted small mb-0">${product.descripcion}</p>` : ''}
                        </div>
                        <div class="col-md-2 text-end">
                            <span>$${(product.precio || product.price || 0).toFixed(2)} c/u</span>
                        </div>
                        <div class="col-md-2 text-end">
                            <span class="badge bg-secondary">x${product.cantidad || product.quantity || 1}</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            document.getElementById("orderDetailTotal").textContent = `$${(order.total || 0).toFixed(2)}`;
            
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        }
    }

    export default ProfileView;