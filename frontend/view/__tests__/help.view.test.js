// __tests__/customer-support.view.test.js

import CustomerSupportView from '../help.view.js';

describe('CustomerSupportView', () => {
    let view;

    beforeEach(() => {
        view = new CustomerSupportView();
        document.body.innerHTML = ''; // Limpiar el DOM antes de cada prueba
    });

    describe('showCustomerSupportPage', () => {
        it('debe mostrar la plantilla y retornar true si showTemplate retorna true', () => {
            // Mock del método showTemplate
            view.showTemplate = jest.fn().mockReturnValue(true);

            const result = view.showCustomerSupportPage();

            expect(view.showTemplate).toHaveBeenCalledWith('plantilla-atencion-cliente', 'container-principal');
            expect(result).toBe(true);
        });

        it('debe retornar false si showTemplate retorna false', () => {
            view.showTemplate = jest.fn().mockReturnValue(false);

            const result = view.showCustomerSupportPage();

            expect(view.showTemplate).toHaveBeenCalledWith('plantilla-atencion-cliente', 'container-principal');
            expect(result).toBe(false);
        });
    });

    describe('showHelpContent', () => {
        it('debe mostrar la página de atención al cliente si no existe .seccion-atencion-cliente', () => {
            view.showCustomerSupportPage = jest.fn().mockReturnValue(true);
            const mockButton = document.createElement('button');
            mockButton.setAttribute('data-ayuda', 'manejo-pagina');
            mockButton.classList.add('boton-ayuda-individual');
            document.body.appendChild(mockButton);

            view.showHelpContentFromButton = jest.fn();

            const result = view.showHelpContent('manejo-pagina');

            expect(view.showCustomerSupportPage).toHaveBeenCalled();
            expect(view.showHelpContentFromButton).toHaveBeenCalledWith(mockButton);
            expect(result).toBe(true);
        });

        it('debe retornar false si no se encuentra el botón correspondiente', () => {
            view.showCustomerSupportPage = jest.fn();

            const result = view.showHelpContent('tipo-inexistente');

            expect(view.showCustomerSupportPage).toHaveBeenCalled();
            expect(result).toBe(false);
        });
    });

    describe('showHelpContentFromButton', () => {
        it('debe mostrar la plantilla de contenido de ayuda y actualizar el DOM correctamente', () => {
            const mockButton = document.createElement('button');
            mockButton.setAttribute('data-ayuda', 'manejo-pagina');
            mockButton.classList.add('boton-ayuda-individual');
            const span = document.createElement('span');
            span.classList.add('texto-boton-ayuda-individual');
            span.textContent = 'Título de Ayuda';
            mockButton.appendChild(span);

            document.body.innerHTML = `
        <div id="container-principal"></div>
        <h1 id="titulo-del-aspecto-de-ayuda"></h1>
        <div class="contenido-aspecto-ayuda"></div>
      `;

            view.showTemplate = jest.fn().mockReturnValue(true);
            view.getHelpContentHTML = jest.fn().mockReturnValue('<p>Contenido de Ayuda</p>');

            const result = view.showHelpContentFromButton(mockButton);

            expect(view.showTemplate).toHaveBeenCalledWith('plantilla-contenido-boton-atencion-ayuda', 'container-principal');
            expect(view.getHelpContentHTML).toHaveBeenCalledWith('manejo-pagina');
            expect(document.getElementById('titulo-del-aspecto-de-ayuda').textContent).toBe('Título de Ayuda');
            expect(document.querySelector('.contenido-aspecto-ayuda').innerHTML).toBe('<p>Contenido de Ayuda</p>');
            expect(result).toBe(true);
        });

        it('debe retornar false si showTemplate retorna false', () => {
            const mockButton = document.createElement('button');
            mockButton.setAttribute('data-ayuda', 'manejo-pagina');
            const span = document.createElement('span');
            span.classList.add('texto-boton-ayuda-individual');
            span.textContent = 'Título de Ayuda';
            mockButton.appendChild(span);

            view.showTemplate = jest.fn().mockReturnValue(false);

            const result = view.showHelpContentFromButton(mockButton);

            expect(view.showTemplate).toHaveBeenCalledWith('plantilla-contenido-boton-atencion-ayuda', 'container-principal');
            expect(result).toBe(false);
        });
    });

    describe('getHelpContentHTML', () => {
        it('debe retornar el contenido HTML correspondiente al tipo de ayuda', () => {
            const result = view.getHelpContentHTML('manejo-pagina');
            expect(result).toContain('<div class="accordion" id="accordionExample">');
        });

        it('debe retornar un mensaje por defecto si el tipo de ayuda no existe', () => {
            const result = view.getHelpContentHTML('tipo-inexistente');
            expect(result).toBe('<p>No hay información disponible para esta sección.</p>');
        });
    });
});
