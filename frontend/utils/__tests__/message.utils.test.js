// Importar utilidad de mensajes
import NotificationUtils from '../message.utils';

// Mock del DOM para pruebas
document.body.innerHTML = '<div id="root"></div>';

// Espía en console.log
console.log = jest.fn();

describe('NotificationUtils', () => {
    // Limpiar mocks y DOM después de cada prueba
    afterEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    describe('showMessage', () => {
        it('debe crear y mostrar un mensaje con los estilos correctos', () => {
            // Probar el método showMessage
            const messageElement = NotificationUtils.showMessage('Prueba de mensaje', 'success');

            // Verificar que se llamó a console.log
            expect(console.log).toHaveBeenCalledWith('Mostrando mensaje: Prueba de mensaje, tipo: success');

            // Verificar que el elemento se creó correctamente
            expect(messageElement).toBeDefined();
            expect(messageElement.textContent).toBe('Prueba de mensaje');
            expect(messageElement.className).toBe('mensaje-notificacion mensaje-success');

            // Verificar que el elemento se agregó al DOM
            const addedElement = document.querySelector('.mensaje-notificacion');
            expect(addedElement).not.toBeNull();
            expect(addedElement.style.backgroundColor).toBe('rgb(76, 175, 80)'); // #4CAF50 en rgb
        });

        it('debe eliminar notificaciones existentes antes de mostrar una nueva', () => {
            // Crear una notificación existente
            const existingNotif = document.createElement('div');
            existingNotif.className = 'mensaje-notificacion';
            document.body.appendChild(existingNotif);

            // Verificar que existe
            expect(document.querySelectorAll('.mensaje-notificacion').length).toBe(1);

            // Mostrar un nuevo mensaje
            NotificationUtils.showMessage('Nuevo mensaje');

            // Verificar que sigue habiendo solo una notificación (la antigua se eliminó)
            expect(document.querySelectorAll('.mensaje-notificacion').length).toBe(1);

            // Y que es la nueva
            expect(document.querySelector('.mensaje-notificacion').textContent).toBe('Nuevo mensaje');
        });

        it('debe aplicar los estilos correctos según el tipo de mensaje', () => {
            const testCases = [
                { type: 'success', bgColor: 'rgb(76, 175, 80)' }, // #4CAF50
                { type: 'error', bgColor: 'rgb(244, 67, 54)' },   // #F44336
                { type: 'warning', bgColor: 'rgb(255, 152, 0)' }, // #FF9800
                { type: 'info', bgColor: 'rgb(33, 150, 243)' },   // #2196F3
                { type: 'unknown', bgColor: 'rgb(51, 51, 51)' }   // #333
            ];

            testCases.forEach(({ type, bgColor }) => {
                document.body.innerHTML = '<div id="root"></div>'; // Reset DOM
                const msg = NotificationUtils.showMessage('Test message', type);
                expect(msg.style.backgroundColor).toBe(bgColor);
            });
        });

        it('debe ocultar y eliminar el mensaje después del tiempo establecido', () => {
            jest.useFakeTimers();

            const messageElement = NotificationUtils.showMessage('Mensaje temporal');

            // Verificar que el mensaje está visible
            expect(document.querySelector('.mensaje-notificacion')).not.toBeNull();

            // Avanzar 3 segundos (tiempo para ocultar)
            jest.advanceTimersByTime(3000);

            // Verificar que se iniciaron las animaciones de ocultamiento
            expect(messageElement.style.opacity).toBe('0');

            // Avanzar 500ms más (tiempo para eliminar)
            jest.advanceTimersByTime(500);

            // Verificar que ya no existe en el DOM
            expect(document.querySelector('.mensaje-notificacion')).toBeNull();
        });
    });

    describe('métodos de conveniencia', () => {
        it('showSuccess debe llamar a showMessage con tipo success', () => {
            // Espiar el método showMessage
            const spy = jest.spyOn(NotificationUtils, 'showMessage');

            NotificationUtils.showSuccess('Mensaje de éxito');

            expect(spy).toHaveBeenCalledWith('Mensaje de éxito', 'success');
            spy.mockRestore();
        });

        it('showError debe llamar a showMessage con tipo error', () => {
            const spy = jest.spyOn(NotificationUtils, 'showMessage');

            NotificationUtils.showError('Mensaje de error');

            expect(spy).toHaveBeenCalledWith('Mensaje de error', 'error');
            spy.mockRestore();
        });

        it('showWarning debe llamar a showMessage con tipo warning', () => {
            const spy = jest.spyOn(NotificationUtils, 'showMessage');

            NotificationUtils.showWarning('Mensaje de advertencia');

            expect(spy).toHaveBeenCalledWith('Mensaje de advertencia', 'warning');
            spy.mockRestore();
        });

        it('showInfo debe llamar a showMessage con tipo info', () => {
            const spy = jest.spyOn(NotificationUtils, 'showMessage');

            NotificationUtils.showInfo('Mensaje informativo');

            expect(spy).toHaveBeenCalledWith('Mensaje informativo', 'info');
            spy.mockRestore();
        });
    });
});