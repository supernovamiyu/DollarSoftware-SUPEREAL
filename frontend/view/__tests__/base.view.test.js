
import BaseView from '../base.view';

describe('BaseView', () => {
    let baseView;
    let mockTemplate;
    let mockContainer;

    beforeEach(() => {
        // Configuración inicial antes de cada prueba
        document.body.innerHTML = `
        <div id="test-template">
            <p>Contenido de prueba</p>
        </div>
        <div id="test-container"></div>
        <div id="error-element"></div>
    `;

        mockTemplate = document.getElementById('test-template');
        mockContainer = document.getElementById('test-container');
        baseView = new BaseView();
    });

    afterEach(() => {
        // Limpieza después de cada prueba
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('showTemplate()', () => {
        it('debería mostrar la plantilla en el contenedor cuando ambos existen', () => {
            const result = baseView.showTemplate('test-template', 'test-container');

            expect(result).toBe(true);
            expect(mockContainer.innerHTML).toBe(mockTemplate.innerHTML);
        });

        it('debería devolver false y loguear error cuando la plantilla no existe', () => {
            const consoleSpy = jest.spyOn(console, 'error');
            const result = baseView.showTemplate('no-existe', 'test-container');

            expect(result).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith(
                'Template "no-existe" or container "test-container" not found.'
            );
        });

        it('debería devolver false y loguear error cuando el contenedor no existe', () => {
            const consoleSpy = jest.spyOn(console, 'error');
            const result = baseView.showTemplate('test-template', 'no-existe');

            expect(result).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith(
                'Template "test-template" or container "no-existe" not found.'
            );
        });
    });

    describe('showMessage()', () => {
        it('debería crear y mostrar un mensaje de éxito', () => {
            jest.useFakeTimers();

            const message = 'Éxito de prueba';
            const messageElement = baseView.showMessage(message, 'success');

            // Verificar que se creó el elemento
            expect(messageElement).toBeTruthy();
            expect(messageElement.className).toContain('mensaje-notificacion');
            expect(messageElement.className).toContain('mensaje-success');
            expect(messageElement.textContent).toBe(message);

            // Verificar estilos iniciales
            expect(messageElement.style.opacity).toBe('0');
            expect(messageElement.style.transform).toBe('translateY(-20px)');

            // Avanzar el tiempo para verificar la animación
            jest.advanceTimersByTime(20);
            expect(messageElement.style.opacity).toBe('1');
            expect(messageElement.style.transform).toBe('translateY(0)');

            // Verificar que se elimina después del tiempo
            jest.advanceTimersByTime(3000);
            expect(messageElement.style.opacity).toBe('0');

            jest.advanceTimersByTime(500);
            expect(document.body.contains(messageElement)).toBe(false);

            jest.useRealTimers();
        });

        it('debería eliminar notificaciones existentes antes de mostrar una nueva', () => {
            // Crear una notificación existente
            const existingMessage = document.createElement('div');
            existingMessage.className = 'mensaje-notificacion';
            document.body.appendChild(existingMessage);

            baseView.showMessage('Nuevo mensaje');

            const notifications = document.querySelectorAll('.mensaje-notificacion');
            expect(notifications.length).toBe(1);
        });
    });

    describe('showFormError()', () => {
        it('debería mostrar el mensaje de error en el elemento especificado', () => {
            const errorElement = document.getElementById('error-element');
            const errorMessage = 'Error de prueba';

            baseView.showFormError('error-element', errorMessage);

            expect(errorElement.textContent).toBe(errorMessage);
            expect(errorElement.style.display).toBe('block');
        });

        it('no debería hacer nada si el elemento no existe', () => {
            const consoleSpy = jest.spyOn(console, 'error');

            baseView.showFormError('no-existe', 'Mensaje');

            expect(consoleSpy).not.toHaveBeenCalled();
        });
    });

    describe('updateURL()', () => {
        beforeEach(() => {
            // Mock de window.history y eventos
            window.history.pushState = jest.fn();
            window.dispatchEvent = jest.fn();
        });

        it('debería actualizar la URL cuando es diferente a la actual', () => {
            const testUrl = '/nueva-ruta';
            const testState = { data: 'test' };

            baseView.updateURL(testUrl, testState);

            expect(window.history.pushState).toHaveBeenCalledWith(
                testState,
                '',
                testUrl
            );

            expect(window.dispatchEvent).toHaveBeenCalled();
        });

        it('no debería actualizar la URL si es la misma que la actual', () => {
            const currentUrl = window.location.pathname;

            baseView.updateURL(currentUrl);

            expect(window.history.pushState).not.toHaveBeenCalled();
            expect(window.dispatchEvent).not.toHaveBeenCalled();
        });

        it('no debería fallar si la URL no es un string', () => {
            const consoleSpy = jest.spyOn(console, 'log');

            baseView.updateURL(123);
            baseView.updateURL(null);
            baseView.updateURL({});

            expect(window.history.pushState).not.toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Error no crítico al actualizar URL:')
            );
        });

        it('debería normalizar URLs que no comienzan con /', () => {
            const testUrl = 'ruta-sin-barra';
            const normalizedUrl = '/ruta-sin-barra';

            baseView.updateURL(testUrl);

            expect(window.history.pushState).toHaveBeenCalledWith(
                {},
                '',
                normalizedUrl
            );
        });
    });
});