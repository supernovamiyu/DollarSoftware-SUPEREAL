class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentProductId = null;
        this.productsCache = this.loadCache();
        this.setupGlobalProductClickHandler();
    }

    loadCache() {
        try {
            return JSON.parse(localStorage.getItem('productsCache')) || {};
        } catch (e) {
            console.error("Error al cargar caché:", e);
            return {};
        }
    }

    setupGlobalProductClickHandler() {
        document.body.addEventListener("click", (e) => {
            const productImage = e.target.closest(".imagen-individual-producto");
            if (!productImage) return;

            const productContainer = productImage.closest(".contenedor-producto");
            if (!productContainer) return;

            const buyButton = productContainer.querySelector(".comprar");
            if (!buyButton) return;

            const productId = buyButton.getAttribute("data-id");
            if (productId) {
                e.preventDefault();
                e.stopPropagation();
                this.showProductDetails(productId);
            }
        });
    }

    async showFeaturedProducts() {
        try {
            const products = await this.model.getFeaturedProducts();
            if (!products || !Array.isArray(products)) {
                throw new Error("Formato de productos inválido");
            }
            
            this.cacheProducts(products);
            this.view.showFeaturedProducts(products);
            this.setupAddToCartButtons();
        } catch (error) {
            console.error("Error al mostrar productos destacados:", error);
            this.view.showMessage("Error al cargar los productos destacados", "error");
        }
    }

    async showProductsByCategory(categoryId) {
        try {
            const products = await this.model.getProductsByCategory(categoryId);
            if (!products || !Array.isArray(products)) {
                throw new Error("Formato de productos inválido");
            }

            this.cacheProducts(products);
            const categoryName = products.length > 0 ? products[0].nombre_categoria : "Categoría";
            
            this.view.showProductsByCategory(products, categoryName);
            this.setupAddToCartButtons();
            this.view.updateURL(`/categoria/${categoryId}`, { categoryId, categoryName });
        } catch (error) {
            console.error("Error al mostrar productos por categoría:", error);
            this.view.showMessage("Error al cargar los productos de esta categoría", "error");
        }
    }

    async searchProducts(searchTerm) {
        try {
            const trimmedTerm = searchTerm ? searchTerm.trim() : "";
            
            if (trimmedTerm.length < 3) {
                this.view.showMessage("Ingresa al menos 3 caracteres", "warning");
                return;
            }

            const products = await this.model.searchProducts(trimmedTerm);
            if (!products || !Array.isArray(products)) {
                throw new Error("Formato de productos inválido");
            }

            this.cacheProducts(products);
            this.view.showSearchResults(products, trimmedTerm);
            this.view.updateURL(`/busqueda?q=${encodeURIComponent(trimmedTerm)}`, {
                searchTerm: trimmedTerm,
                resultsCount: products.length,
            });
            this.setupAddToCartButtons();
        } catch (error) {
            console.error("Error en searchProducts:", error);
            this.view.showMessage(error.message || "Error al buscar productos", "error");
            this.view.showSearchResults([], searchTerm);
        }
    }

    async showProductDetails(productIdentifier) {
        try {
            if (!productIdentifier) {
                throw new Error("Identificador de producto no proporcionado");
            }
    
            // Intento 1: Buscar directamente por ID (si es numérico)
            if (/^\d+$/.test(productIdentifier)) {
                const product = await this.model.getProductDetails(productIdentifier);
                if (product?.id_productos) {
                    console.log("Producto encontrado por ID:", product); // Debug
                    await this.displayProductDetails(product);
                    return;
                }
            }
    
            // Intento 2: Buscar por slug en caché
            const cachedProduct = this.findProductInCache(productIdentifier);
            if (cachedProduct) {
                console.log("Producto encontrado en caché:", cachedProduct); // Debug
                await this.displayProductDetails(cachedProduct);
                return;
            }
    
            // Intento 3: Buscar en productos destacados
            const featuredProducts = await this.model.getFeaturedProducts();
            this.cacheProducts(featuredProducts);
            const featuredMatch = this.findProductInCache(productIdentifier);
            if (featuredMatch) {
                console.log("Producto encontrado en destacados:", featuredMatch); // Debug
                await this.displayProductDetails(featuredMatch);
                return;
            }
    
            this.view.showMessage("Producto no encontrado", "error");
            window.dispatchEvent(new CustomEvent("navigateTo", { detail: { path: "/" } }));
        } catch (error) {
            console.error("Error al mostrar detalles del producto:", error);
            this.view.showMessage("Error al cargar el producto", "error");
        }
    }

    findProductInCache(identifier) {
        // Buscar por ID
        if (this.productsCache[identifier]) {
            return this.productsCache[identifier];
        }

        // Buscar por slug
        for (const [id, product] of Object.entries(this.productsCache)) {
            if (product.slug === identifier) {
                return product;
            }
        }

        return null;
    }

    async displayProductDetails(product) {
        // Verificar primero si hay descripción en el producto original
        const hasDescription = product.descripcion && product.descripcion.trim() !== "";
        
        const productWithDefaults = {
            ...product, // Esto mantiene todos los campos originales
            descripcion: hasDescription ? product.descripcion : "Descripción no disponible",
            precio: product.precio || "0",
            unidades_disponibles: product.unidades_disponibles || 0,
            imagen_url: product.imagen_url || "img/default-product.png"
        };
    
        console.log("Datos completos del producto:", productWithDefaults);
        // Actualizar caché con los datos completos
        this.cacheProducts([productWithDefaults]);
    
        // Mostrar detalles
        this.view.showProductDetails(productWithDefaults);
        
        // Actualizar URL con slug
        const productSlug = this.createProductSlug(productWithDefaults.nombre_producto);
        this.view.updateURL(`/producto/${productSlug}`);
    
        // Configuraciones adicionales
        await this.loadProductReviews(productWithDefaults.id_productos);
        this.setupAddToCartButtons();
    }

    cacheProducts(products) {
        if (!Array.isArray(products)) return;

        products.forEach(product => {
            if (product?.id_productos && product.nombre_producto && product.descripcion) {
                this.productsCache[product.id_productos] = {
                    ...product,
                    slug: this.createProductSlug(product.nombre_producto)
                };
            }
        });

        try {
            localStorage.setItem('productsCache', JSON.stringify(this.productsCache));
        } catch (e) {
            console.error("Error al guardar en caché:", e);
        }
    }

    createProductSlug(productName) {
        if (!productName) return "producto";
        return productName
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina acentos
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    async loadProductReviews(productId) {
        try {
            if (!productId) {
                console.error("ID de producto inválido para cargar opiniones");
                return;
            }

            this.currentProductId = productId;
            this.view.showLoadingReviews();

            const reviews = await this.model.getProductReviews(productId);
            if (!Array.isArray(reviews)) {
                throw new Error("Formato de opiniones inválido");
            }

            this.view.showProductReviews(reviews);
            this.view.removeExistingReviewForms();
            this.view.addReviewForm(productId, (reviewData) => {
                this.handleReviewSubmit(reviewData);
            });
        } catch (error) {
            console.error("Error al cargar opiniones:", error);
            this.view.showMessage("Error al cargar las opiniones", "error");
        }
    }

    async handleReviewSubmit(reviewData) {
        try {
            if (!reviewData?.opinion?.trim()) {
                this.view.showMessage("Por favor, escribe tu opinión", "error");
                return;
            }

            const result = await this.model.submitProductReview({
                fk_id_productos: reviewData.productId,
                fk_id_usuario: null,
                es_anonimo: reviewData.anonymous ? 1 : 0,
                opinion: reviewData.opinion.trim(),
            });

            if (result.success) {
                this.view.showMessage("¡Opinión enviada con éxito!", "success");
                document.getElementById("opinion").value = "";
                document.getElementById("anonimo").checked = false;
                await this.loadProductReviews(reviewData.productId);
            } else {
                this.view.showMessage(result.error || "Error al enviar opinión", "error");
            }
        } catch (error) {
            console.error("Error al enviar opinión:", error);
            this.view.showMessage("Error al enviar la opinión", "error");
        }
    }

    setupAddToCartButtons() {
        this.view.setupAddToCartButtons((event) => {
            const productId = event.target.getAttribute("data-id");
            if (productId) {
                window.dispatchEvent(new CustomEvent("addToCart", {
                    detail: { productId },
                }));
            }
        });
    }
}

export default ProductController;