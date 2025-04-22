import CustomerSupportController from '../help.controller';

describe('CustomerSupportController', () => {
    let controller;
    let mockView;

    beforeEach(() => {
        // Configuración inicial antes de cada prueba
        mockView = {
            showCustomerSupportPage: jest.fn(),
            showHelpContent: jest.fn(),
        };
        controller = new CustomerSupportController(mockView);
    });

    describe('Constructor', () => {
        it('debería inicializar correctamente con la vista proporcionada', () => {
            expect(controller.view).toBe(mockView);
            expect(controller.currentSection).toBeNull();
        });
    });

    describe('showCustomerSupportPage', () => {
        it('debería llamar al método showCustomerSupportPage de la vista', () => {
            controller.showCustomerSupportPage();
            expect(mockView.showCustomerSupportPage).toHaveBeenCalled();
        });

        it('debería configurar los botones de ayuda', () => {
            // Mock del método setupHelpButtons
            controller.setupHelpButtons = jest.fn();

            controller.showCustomerSupportPage();
            expect(controller.setupHelpButtons).toHaveBeenCalled();
        });
    });

    describe('showHelpSection', () => {
        it('debería mostrar la página principal y luego la sección específica', () => {
            jest.useFakeTimers();
            const sectionType = 'pagos';
        
            // 👇 Mock explícito
            controller.setupHelpButtons = jest.fn();
        
            controller.showHelpSection(sectionType);
        
            expect(mockView.showCustomerSupportPage).toHaveBeenCalled();
            jest.advanceTimersByTime(100);
            expect(mockView.showHelpContent).toHaveBeenCalledWith(sectionType);
            expect(controller.currentSection).toBe(sectionType);
        
            // Ya es un mock, no lanzará error
            expect(controller.setupHelpButtons).toHaveBeenCalled();
        
            jest.useRealTimers();
        });
        
    });

    describe('setupHelpButtons', () => {
        it('debería configurar los event listeners para los botones de ayuda', () => {
            // Crear un botón de prueba en el DOM
            document.body.innerHTML = `
        <button class="boton-ayuda-individual" data-ayuda="pagos"></button>
    `;

            // Mock de los métodos que se llamarán
            controller.showHelpContent = jest.fn();
            window.dispatchEvent = jest.fn();

            controller.setupHelpButtons();

            // Simular click en el botón
            const button = document.querySelector('.boton-ayuda-individual');
            button.click();

            // Verificar que se llamó a los métodos esperados
            expect(controller.showHelpContent).toHaveBeenCalledWith('pagos');
            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'navigateTo',
                    detail: { path: '/atencion-cliente/pagos' }
                })
            );
        });
    });

    describe('showHelpContent', () => {
        it('debería llamar al método showHelpContent de la vista con el tipo de ayuda', () => {
            const helpType = 'envios';

            controller.showHelpContent(helpType);

            expect(mockView.showHelpContent).toHaveBeenCalledWith(helpType);
            expect(controller.currentSection).toBe(helpType);
        });
    });
});