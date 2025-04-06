    // ProductController.js - Controlador para los productos

    class ProductController {
    constructor(productModel, opinionModel, productView) {
        this.productModel = productModel;
        this.opinionModel = opinionModel;
        this.view = productView;
    }

    // Cargar productos destacados
    async loadFeaturedProducts() {
        try {
        const products = await this.productModel.getFeaturedProducts();
        this.view.showFeaturedProducts(products);
        } catch (error) {
        console.error("Error al cargar productos destacados:", error);
        this.view.showMessage(
            "No se pudieron cargar los productos destacados",
            "error"
        );
        }
    }

    // Cargar productos por categoría
    async loadProductsByCategory(category) {
        try {
        const products = await this.productModel.getProductsByCategory(category);

        // Obtener el nombre de la categoría (asumiendo que viene en los datos)
        const categoryName =
            products[0]?.nombre_categoria || this.formatCategoryName(category);

        this.view.showProductsByCategory(products, categoryName);
        this.view.updateURL(`/categoria/${category}`);
        } catch (error) {
        console.error("Error al cargar productos por categoría:", error);
        this.view.showMessage(
            "No se pudieron cargar los productos de esta categoría",
            "error"
        );
        }
    }

    // Formatear el nombre de la categoría
    formatCategoryName(category) {
        return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Buscar productos
    async searchProducts(searchTerm) {
        try {
        if (!searchTerm || searchTerm.trim().length < 3) {
            this.view.showMessage(
            "Por favor, ingrese al menos 3 caracteres para buscar",
            "warning"
            );
            return;
        }

        const products = await this.productModel.searchProducts(
            searchTerm.trim()
        );
        this.view.showSearchResults(products, searchTerm);
        this.view.updateURL(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        } catch (error) {
        console.error("Error al buscar productos:", error);
        this.view.showMessage("No se pudieron buscar los productos", "error");
        }
    }

    // Cargar detalles de un producto
    async loadProductDetails(productId) {
        try {
        const product = await this.productModel.getProductDetails(productId);

        // Mostrar detalles del producto
        this.view.showProductDetails(product);

        // Actualizar la URL
        const productSlug = product.nombre_producto
            .replace(/ /g, "-")
            .toLowerCase();
        this.view.updateURL(`/producto/${productSlug}`);

        // Cargar y mostrar opiniones
        this.loadProductOpinions(productId);

        // Agregar formulario de opiniones
        this.view.addOpinionForm(productId);

        // Configurar evento para enviar opiniones
        this.setupOpinionForm(productId);
        } catch (error) {
        console.error("Error al cargar detalles del producto:", error);
        this.view.showMessage(
            "No se pudieron cargar los detalles del producto",
            "error"
        );
        }
    }

    // Cargar opiniones de un producto
    async loadProductOpinions(productId) {
        try {
        const opinions = await this.opinionModel.getOpinions(productId);
        this.view.showOpinions(opinions);

        // Configurar evento para el botón "Ver más"
        this.setupShowMoreOpinionsButton();
        } catch (error) {
        console.error("Error al cargar opiniones:", error);
        // No mostramos mensaje de error para no interrumpir la experiencia
        }
    }

    // Configurar el botón "Ver más opiniones"
    setupShowMoreOpinionsButton() {
        const showMoreBtn = document.querySelector(".boton-ver-mas");
        if (showMoreBtn) {
        showMoreBtn.addEventListener("click", () => {
            try {
            // Obtener todas las opiniones del atributo data
            const allOpinions = JSON.parse(showMoreBtn.dataset.allOpinions);

            // Mostrar todas las opiniones
            this.view.showAllOpinions(allOpinions);
            } catch (error) {
            console.error("Error al mostrar más opiniones:", error);
            }
        });
        }
    }

    // Configurar el formulario de opiniones
    setupOpinionForm(productId) {
        const form = document.getElementById("formulario-opiniones");
        if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await this.submitOpinion(productId);
        });
        }
    }

    // Enviar una opinión
    async submitOpinion(productId) {
        try {
        const opinionInput = document.getElementById("opinion");
        const anonymousCheckbox = document.getElementById("anonimo");

        if (!opinionInput) return;

        const opinionContent = opinionInput.value.trim();
        const isAnonymous = anonymousCheckbox?.checked ? 1 : 0;

        // Validar que la opinión no esté vacía
        if (opinionContent === "") {
            this.view.showMessage("Por favor, escribe tu opinión.", "error");
            return;
        }

        // Preparar los datos para enviar
        const opinionData = {
            fk_id_productos: productId,
            fk_id_usuario: null, // En una implementación real, obtendríamos el ID del usuario autenticado
            es_anonimo: isAnonymous,
            opinion: opinionContent,
        };

        // Enviar la opinión
        const result = await this.opinionModel.addOpinion(opinionData);

        if (result.success) {
            this.view.showMessage("¡Opinión enviada con éxito!", "success");

            // Limpiar el formulario
            opinionInput.value = "";
            if (anonymousCheckbox) anonymousCheckbox.checked = false;

            // Recargar las opiniones
            this.loadProductOpinions(productId);
        } else {
            throw new Error(result.error || "Error al enviar la opinión");
        }
        } catch (error) {
        console.error("Error al enviar opinión:", error);
        this.view.showMessage(
            "No se pudo enviar la opinión. Intenta de nuevo más tarde.",
            "error"
        );
        }
    }
    }

    export { ProductController };
