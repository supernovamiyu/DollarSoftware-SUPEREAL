
import HomeView from "../home.view"

jest.mock("../base.view") // Simula BaseView

describe("HomeView", () => {
    let homeView

    beforeEach(() => {
        document.body.innerHTML = `
        <div id="container-principal"></div>
        <div id="productos-populares"></div>
        <div class="carousel-container">
            <div class="carousel-slide"></div>
            <div class="carousel-slide"></div>
        </div>
        <button class="categoria-botones" id="btn1"></button>
        <button class="categoria-botones" id="btn2"></button>
    `
        homeView = new HomeView()
        homeView.showTemplate = jest.fn() // Simula método heredado
    })

    test("showHomePage debe invocar showTemplate con plantilla y contenedor correctos", () => {
        homeView.showHomePage()
        expect(homeView.showTemplate).toHaveBeenCalledWith("plantilla-inicio", "container-principal")
    })

    test("showFeaturedProducts debe mostrar hasta 4 productos", () => {
        const mockProducts = Array.from({ length: 6 }).map((_, i) => ({
            imagen_url: `img${i}.jpg`,
            nombre_producto: `Producto ${i}`,
            precio: i * 10,
            id_productos: i,
            unidades_disponibles: 100
        }))

        homeView.showFeaturedProducts(mockProducts)

        const container = document.getElementById("productos-populares")
        const buttons = container.querySelectorAll("button.comprar")
        expect(buttons.length).toBe(4)
        expect(container.innerHTML).toContain("Producto 0")
        expect(container.innerHTML).not.toContain("Producto 5")
    })

    test("showFeaturedProducts muestra error si no hay contenedor", () => {
        console.error = jest.fn()
        document.getElementById("productos-populares").remove()
        homeView.showFeaturedProducts([])
        expect(console.error).toHaveBeenCalledWith("No se encontró el contenedor de productos destacados")
    })

    test("initCarousel activa el primer slide y crea el autoplay", () => {
        jest.useFakeTimers()
        const slides = document.querySelectorAll(".carousel-slide")
        homeView.initCarousel()

        jest.advanceTimersByTime(60)
        expect(slides[0].classList.contains("active")).toBe(true)

        jest.advanceTimersByTime(5000)
        expect(slides[1].classList.contains("active")).toBe(true)
        jest.useRealTimers()
    })

    test("setupCategoryButtons agrega eventos a botones", () => {
        const mockHandler = jest.fn()
        homeView.setupCategoryButtons(mockHandler)

        document.getElementById("btn1").click()
        document.getElementById("btn2").click()
        expect(mockHandler).toHaveBeenCalledTimes(2)
    })
})
