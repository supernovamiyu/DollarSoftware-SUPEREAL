jest.mock('../base.view.js', () => ({
    BaseView: class BaseView {
        constructor() {}
    }
}));

import { CarouselView } from '../carousel.view';

describe('CarouselView', () => {
    let carouselView;
    let mockContainer;
    let mockSlides;

    beforeEach(() => {

        // Crear un DOM mock
        document.body.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-slide">Slide 1</div>
            <div class="carousel-slide">Slide 2</div>
            <div class="carousel-slide">Slide 3</div>
        </div>
    `;

        mockContainer = document.querySelector('.carousel-container');
        mockSlides = document.querySelectorAll('.carousel-slide');
        carouselView = new CarouselView();

        // Mock de setTimeout y setInterval
        jest.useFakeTimers();
    });

    afterEach(() => {
        // Limpiar todos los timers y mocks
        jest.clearAllTimers();
        jest.restoreAllMocks();
        
        // Asegurarse de que no quedan timers pendientes
        if (carouselView.slideInterval) {
            clearInterval(carouselView.slideInterval);
        }
        });
        
    describe('initCarousel', () => {
        it('debería retornar false si no encuentra el contenedor', () => {
            document.body.innerHTML = '';
            expect(carouselView.initCarousel()).toBe(false);
        });

        it('debería retornar false si no encuentra slides', () => {
            document.body.innerHTML = '<div class="carousel-container"></div>';
            expect(carouselView.initCarousel()).toBe(false);
        });

        it('debería retornar true si ya está inicializado y no se fuerza', () => {
            mockContainer.dataset.initialized = 'true';
            expect(carouselView.initCarousel()).toBe(true);
        });

        it('debería inicializar correctamente el carrusel', () => {
            expect(carouselView.initCarousel()).toBe(true);
            expect(mockContainer.dataset.initialized).toBe('true');
            expect(document.querySelector('.carousel-dots')).not.toBeNull();
            expect(document.querySelectorAll('.carousel-dot').length).toBe(3);
        });

        it('debería forzar la reinicialización cuando force=true', () => {
            mockContainer.dataset.initialized = 'true';
            expect(carouselView.initCarousel(true)).toBe(true);
        });
    });

    describe('showSlides', () => {
        beforeEach(() => {
            // Configurar estado inicial limpio
            mockSlides.forEach(slide => {
                slide.classList.remove('active', 'inactive');
            });
            
            // Inicializar carrusel
            carouselView.initCarousel();
            
            // Forzar estado inicial conocido
            mockSlides[0].classList.add('active');
            mockSlides[0].classList.remove('inactive');
            
            // Mockear completamente setTimeout para ejecución inmediata
            jest.spyOn(global, 'setTimeout').mockImplementation((fn) => fn());
        });

        afterEach(() => {
            // Limpiar todos los mocks
            jest.restoreAllMocks();
        });

        it('debería manejar correctamente el índice mayor al número de slides', () => {
            carouselView.showSlides(4); // Tenemos 3 slides
            expect(carouselView.slideIndex).toBe(1);
        });

        it('debería manejar correctamente el índice menor a 1', () => {
            carouselView.showSlides(0);
            expect(carouselView.slideIndex).toBe(3);
        });

        it('debería mostrar el slide correcto y actualizar los dots', () => {
            // Llamar a showSlides
            carouselView.showSlides(2);
            
            // Verificar estado del slide 2
            expect(mockSlides[1].classList.contains('active')).toBe(true);
            expect(mockSlides[1].classList.contains('inactive')).toBe(false);
            
            // Verificar estado de los otros slides
            expect(mockSlides[0].classList.contains('active')).toBe(false);
            expect(mockSlides[0].classList.contains('inactive')).toBe(true);
            expect(mockSlides[2].classList.contains('active')).toBe(false);
            expect(mockSlides[2].classList.contains('inactive')).toBe(true);
            
            // Verificar dots
            const dots = document.querySelectorAll('.carousel-dot');
            expect(dots[1].classList.contains('active')).toBe(true);
            expect(dots[0].classList.contains('active')).toBe(false);
            expect(dots[2].classList.contains('active')).toBe(false);
        });
    });

    describe('changeSlide', () => {
        it('debería avanzar al siguiente slide', () => {
            carouselView.initCarousel();
            carouselView.changeSlide(1);
            expect(carouselView.slideIndex).toBe(2);
        });

        it('debería retroceder al slide anterior', () => {
            carouselView.initCarousel();
            carouselView.slideIndex = 2;
            carouselView.changeSlide(-1);
            expect(carouselView.slideIndex).toBe(1);
        });
    });

    describe('currentSlide', () => {
        it('debería cambiar directamente al slide especificado', () => {
            carouselView.initCarousel();
            carouselView.currentSlide(3);
            expect(carouselView.slideIndex).toBe(3);
        });
    });

    describe('autoSlide', () => {
        it('debería avanzar automáticamente los slides', () => {
            carouselView.initCarousel();
            carouselView.startAutoSlide();

            // Avanzar el tiempo
            jest.advanceTimersByTime(carouselView.autoSlideTime);

            expect(carouselView.slideIndex).toBe(2);
        });

        it('debería detener el autoSlide cuando se llama a stopAutoSlide', () => {
            carouselView.initCarousel();
            carouselView.startAutoSlide();
            carouselView.stopAutoSlide();

            jest.advanceTimersByTime(carouselView.autoSlideTime * 2);

            // No debería haber cambiado porque se detuvo
            expect(carouselView.slideIndex).toBe(1);
        });

        it('debería detener el autoSlide al pasar el mouse', () => {
            carouselView.initCarousel();
            carouselView.startAutoSlide();

            // Simular evento mouseenter
            mockContainer.dispatchEvent(new Event('mouseenter'));

            jest.advanceTimersByTime(carouselView.autoSlideTime * 2);
            expect(carouselView.slideIndex).toBe(1);

            // Simular evento mouseleave
            mockContainer.dispatchEvent(new Event('mouseleave'));
            jest.advanceTimersByTime(carouselView.autoSlideTime);
            expect(carouselView.slideIndex).toBe(2);
        });
    });

    describe('handleSwipe', () => {
        it('debería avanzar al siguiente slide con swipe izquierda', () => {
            carouselView.initCarousel();
            carouselView.handleSwipe(300, 200); // swipe izquierda
            expect(carouselView.slideIndex).toBe(2);
        });

        it('debería retroceder al slide anterior con swipe derecha', () => {
            carouselView.initCarousel();
            carouselView.slideIndex = 2;
            carouselView.handleSwipe(200, 300); // swipe derecha
            expect(carouselView.slideIndex).toBe(1);
        });

        it('no debería hacer nada si el swipe es menor al umbral', () => {
            carouselView.initCarousel();
            carouselView.handleSwipe(300, 290); // swipe muy pequeño
            expect(carouselView.slideIndex).toBe(1);
        });
    });

    describe('tryInitCarousel', () => {
        it('debería inicializar el carrusel cuando está disponible', () => {
            // Simular que no hay contenedor inicialmente
            document.body.innerHTML = '';

            carouselView.tryInitCarousel();

            // Ahora añadir el contenedor
            document.body.innerHTML = `
        <div class="carousel-container">
          <div class="carousel-slide">Slide 1</div>
        </div>
      `;

            // Avanzar el tiempo para que se ejecute el setTimeout
            jest.advanceTimersByTime(500);

            expect(carouselView.initialized).toBe(true);
        });
    });
});