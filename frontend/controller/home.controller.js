    /**
     * Controlador para la página de inicio
     */
    class HomeController {
        /**
         * @param {Object} view - Vista de la página de inicio
         * @param {Object} productController - Controlador de productos
         */
        constructor(view, productController) {
        this.view = view
        this.productController = productController
        }
    
        /**
         * Muestra la página de inicio
         */
        showHomePage() {
        this.view.showHomePage()
        this.view.initCarousel()
        this.setupCategoryButtons()
        this.productController.showFeaturedProducts()
        }
    
        /**
         * Configura los botones de categoría
         */
        setupCategoryButtons() {
        this.view.setupCategoryButtons((event) => {
            const button = event.target.closest('button');
            if (button) {
                const categoryId = event.target.closest("button").getAttribute("data-categoria")
                if (categoryId) {
                this.productController.showProductsByCategory(categoryId)
                }
            }
        })
        }
    }
    
    export default HomeController
    
