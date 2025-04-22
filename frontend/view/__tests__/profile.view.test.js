import ProfileView from "../profile.view.js";

jest.mock('../base.view.js', () => {
    return class MockBaseView {
        constructor() {
            this.showTemplate = jest.fn().mockReturnValue(true);
            this.updateURL = jest.fn();
        }

        // Implementación mínima de otros métodos necesarios para las pruebas
        showFormError() { }
    };
});

// Mock para document.getElementById y otros métodos DOM
document.getElementById = jest.fn();
document.createElement = jest.fn();
document.querySelector = jest.fn();
document.querySelectorAll = jest.fn();

// Mock de bootstrap.Modal
global.bootstrap = {
    Modal: jest.fn().mockImplementation(() => {
        return {
            show: jest.fn(),
        };
    }),
};

describe('ProfileView', () => {
    let profileView;
    let mockController;
    let mockUser;
    let mockElement;
    let mockAddEventListener;

    beforeEach(() => {
        // Resetear mocks
        jest.clearAllMocks();

        // Configurar mocks para elementos DOM
        mockElement = {
            style: {},
            classList: {
                add: jest.fn(),
                remove: jest.fn(),
            },
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
            addEventListener: jest.fn(),
            appendChild: jest.fn(),
            cloneNode: jest.fn().mockReturnValue({
                addEventListener: jest.fn(),
            }),
            parentNode: {
                replaceChild: jest.fn(),
            },
            innerHTML: '',
            textContent: '',
            click: jest.fn(),
            parentNode: {
                replaceChild: jest.fn(),
            }
        };

        document.getElementById.mockReturnValue(mockElement);
        document.createElement.mockReturnValue(mockElement);
        document.querySelector.mockReturnValue(mockElement);
        document.querySelectorAll.mockReturnValue([mockElement, mockElement]);

        // Setup mock user
        mockUser = {
            nombre_completo: 'Usuario Test',
            correo: 'test@example.com',
        };

        // Setup mock controller con modelo
        mockController = {
            userOrders: [
                {
                    id: 1,
                    fecha_pedido: '2024-04-20',
                    total: 150.00,
                    estado: 'pendiente',
                    direccion: 'Calle Test 123'
                }
            ],
            userHistory: [
                {
                    id: 1,
                    nombre: 'Producto Test',
                    imagen: 'test.jpg',
                    fecha_visto: '2024-04-20'
                }
            ],
            model: {
                getCurrentUser: jest.fn().mockReturnValue(mockUser)
            }
        };

        // Crea la instancia después de todos los mocks
        profileView = new ProfileView();

        // Asigna el controller y cualquier dependencia necesaria
        profileView.controller = mockController;

        // Mockea métodos heredados si es necesario
        profileView.showTemplate = jest.fn().mockReturnValue(true);
    });

    describe('showProfilePage', () => {
        it('debería mostrar la página de perfil correctamente', () => {
            // Mockear el método heredado
            profileView.showTemplate = jest.fn().mockReturnValue(true);
            profileView.updateProfileInfo = jest.fn();

            jest.useFakeTimers();

            const result = profileView.showProfilePage(mockUser);

            expect(profileView.showTemplate).toHaveBeenCalledWith(
                "plantilla-perfil-usuario",
                "container-principal"
            );

            jest.runAllTimers();
            expect(result).toBe(true);
            jest.useRealTimers();
        });
    });

    describe('updateProfileInfo', () => {
        it('debería actualizar la información del perfil correctamente', () => {
            document.getElementById
                .mockReturnValueOnce({ textContent: '' }) // userInfoName
                .mockReturnValueOnce({ textContent: '' }) // userInfoEmail
                .mockReturnValueOnce({ textContent: '' }); // userInfoInitial

            profileView.updateProfileInfo(mockUser);

            expect(document.getElementById).toHaveBeenCalledWith('userInfoName');
            expect(document.getElementById).toHaveBeenCalledWith('userInfoEmail');
            expect(document.getElementById).toHaveBeenCalledWith('userInfoInitial');
        });

        it('no debería hacer nada si el usuario es undefined', () => {
            profileView.updateProfileInfo(undefined);

            expect(document.getElementById).not.toHaveBeenCalled();
        });
    });

    describe('showProfileSection', () => {
        it('debería mostrar una sección existente', () => {
            const sectionId = 'seccion-gestion-pedidos';
            document.getElementById.mockReturnValueOnce(mockElement); // sección existente

            profileView.hideAllSections = jest.fn();
            profileView.updateButtonStyles = jest.fn();
            profileView.loadSectionContent = jest.fn();

            profileView.showProfileSection(sectionId);

            expect(profileView.hideAllSections).toHaveBeenCalled();
            expect(document.getElementById).toHaveBeenCalledWith(sectionId);
            expect(mockElement.style.display).toBe('block');
            expect(profileView.updateButtonStyles).toHaveBeenCalledWith(sectionId);
            expect(profileView.loadSectionContent).not.toHaveBeenCalled();
        });

        it('debería crear una nueva sección si no existe', () => {
            const sectionId = 'seccion-inexistente';
            document.getElementById.mockReturnValueOnce(null); // sección no existe
            document.querySelector.mockReturnValueOnce(mockElement); // container

            profileView.hideAllSections = jest.fn();
            profileView.updateButtonStyles = jest.fn();
            profileView.loadSectionContent = jest.fn();

            profileView.showProfileSection(sectionId);

            expect(profileView.hideAllSections).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('div');
            expect(mockElement.id).toBe(sectionId);
            expect(mockElement.className).toBe('seccion-perfil');
            expect(mockElement.appendChild).toHaveBeenCalled();
            expect(profileView.loadSectionContent).toHaveBeenCalledWith(sectionId, mockElement);
            expect(mockElement.style.display).toBe('block');
            expect(profileView.updateButtonStyles).toHaveBeenCalledWith(sectionId);
        });
    });

    describe('hideAllSections', () => {
        it('debería ocultar todas las secciones', () => {
            const sections = [
                { style: {} },
                { style: {} }
            ];
            document.querySelectorAll.mockReturnValueOnce(sections);

            profileView.hideAllSections();

            expect(document.querySelectorAll).toHaveBeenCalledWith('.seccion-perfil');
            expect(sections[0].style.display).toBe('none');
            expect(sections[1].style.display).toBe('none');
        });
    });

    describe('updateButtonStyles', () => {
        it('debería actualizar los estilos de los botones correctamente', () => {
            const activeSectionId = 'seccion-gestion-pedidos';
            const buttons = [
                { id: 'gestion-de-pedidos-boton-perfil', classList: { add: jest.fn(), remove: jest.fn() }, setAttribute: jest.fn(), removeAttribute: jest.fn() },
                { id: 'historial-de-productos-boton-perfil', classList: { add: jest.fn(), remove: jest.fn() }, setAttribute: jest.fn(), removeAttribute: jest.fn() }
            ];

            document.querySelectorAll.mockReturnValueOnce(buttons);
            profileView.getButtonSectionId = jest.fn()
                .mockReturnValueOnce(activeSectionId)
                .mockReturnValueOnce('seccion-historial-productos');

            profileView.updateButtonStyles(activeSectionId);

            expect(document.querySelectorAll).toHaveBeenCalledWith('.profile-option-btn, .profile-button');
            expect(profileView.getButtonSectionId).toHaveBeenCalledWith('gestion-de-pedidos-boton-perfil');
            expect(profileView.getButtonSectionId).toHaveBeenCalledWith('historial-de-productos-boton-perfil');
            expect(buttons[0].classList.add).toHaveBeenCalledWith('active');
            expect(buttons[0].setAttribute).toHaveBeenCalledWith('aria-current', 'true');
            expect(buttons[1].classList.remove).toHaveBeenCalledWith('active');
            expect(buttons[1].removeAttribute).toHaveBeenCalledWith('aria-current');
        });
    });

    describe('getButtonSectionId', () => {
        it('debería retornar el ID de sección correcto para un botón', () => {
            const result = profileView.getButtonSectionId('gestion-de-pedidos-boton-perfil');
            expect(result).toBe('seccion-gestion-pedidos');
        });

        it('debería retornar string vacío para un botón desconocido', () => {
            const result = profileView.getButtonSectionId('boton-inexistente');
            expect(result).toBe('');
        });
    });

    describe('loadSectionContent', () => {
        it('debería cargar la sección de gestión de pedidos', () => {
            profileView.loadOrderManagementSection = jest.fn();

            profileView.loadSectionContent('seccion-gestion-pedidos', mockElement);

            expect(profileView.loadOrderManagementSection).toHaveBeenCalledWith(mockElement);
        });

        it('debería cargar la sección de historial de productos', () => {
            profileView.loadProductHistorySection = jest.fn();

            profileView.loadSectionContent('seccion-historial-productos', mockElement);

            expect(profileView.loadProductHistorySection).toHaveBeenCalledWith(mockElement);
        });

        it('debería cargar la sección de modificación de datos', () => {
            profileView.loadDataModificationSection = jest.fn();

            profileView.loadSectionContent('seccion-modificar-datos', mockElement);

            expect(profileView.loadDataModificationSection).toHaveBeenCalledWith(mockElement);
        });
    });

    describe('loadOrderManagementSection', () => {
        it('debería cargar la sección de gestión de pedidos correctamente', async () => {
            profileView.createOrderManagementHTML = jest.fn().mockReturnValue('<div>Contenido HTML</div>');

            await profileView.loadOrderManagementSection(mockElement);

            expect(profileView.createOrderManagementHTML).toHaveBeenCalledWith(mockController.userOrders);
            expect(mockElement.innerHTML).toBe('<div>Contenido HTML</div>');
        });

        it('debería manejar errores al cargar pedidos', async () => {
            profileView.createOrderManagementHTML = jest.fn().mockImplementation(() => {
                throw new Error('Error test');
            });
            console.error = jest.fn();

            await profileView.loadOrderManagementSection(mockElement);

            expect(console.error).toHaveBeenCalled();
            expect(mockElement.innerHTML).toContain('Error al cargar los pedidos');
        });
    });

    describe('createOrderManagementHTML', () => {
        it('debería crear HTML para pedidos existentes', () => {
            profileView.getOrderStatusBadge = jest.fn().mockReturnValue('<span>Pendiente</span>');

            const orders = [
                {
                    id: 1,
                    fecha_pedido: '2024-04-20',
                    total: 150.00,
                    estado: 'pendiente',
                    direccion: 'Calle Test 123'
                }
            ];

            const result = profileView.createOrderManagementHTML(orders);

            expect(result).toContain('Gestión de Pedidos');
            expect(result).toContain('tabla-de-pedidos');
            expect(profileView.getOrderStatusBadge).toHaveBeenCalledWith('pendiente');
        });

        it('debería crear HTML para cuando no hay pedidos', () => {
            const result = profileView.createOrderManagementHTML([]);

            expect(result).toContain('Gestión de Pedidos');
            expect(result).toContain('No tienes pedidos registrados');
            expect(result).not.toContain('tabla-de-pedidos');
        });
    });

    describe('loadProductHistorySection', () => {
        it('debería cargar la sección de historial correctamente', async () => {
            profileView.createProductHistoryHTML = jest.fn().mockReturnValue('<div>Historial HTML</div>');

            await profileView.loadProductHistorySection(mockElement);

            expect(profileView.createProductHistoryHTML).toHaveBeenCalledWith(mockController.userHistory);
            expect(mockElement.innerHTML).toBe('<div>Historial HTML</div>');
        });

        it('debería manejar errores al cargar historial', async () => {
            profileView.createProductHistoryHTML = jest.fn().mockImplementation(() => {
                throw new Error('Error test');
            });
            console.error = jest.fn();

            await profileView.loadProductHistorySection(mockElement);

            expect(console.error).toHaveBeenCalled();
            expect(mockElement.innerHTML).toContain('Error al cargar el historial');
        });
    });

    describe('createProductHistoryHTML', () => {
        it('debería crear HTML para productos vistos', () => {
            const history = [
                {
                    nombre: 'Producto Test',
                    imagen: 'test.jpg',
                    fecha_visto: '2024-04-20'
                }
            ];

            const result = profileView.createProductHistoryHTML(history);

            expect(result).toContain('Historial de Productos');
            expect(result).toContain('product-history-grid');
            expect(result).toContain('Producto Test');
        });

        it('debería crear HTML cuando no hay historial', () => {
            const result = profileView.createProductHistoryHTML([]);

            expect(result).toContain('Historial de Productos');
            expect(result).toContain('No hay productos en tu historial');
            expect(result).not.toContain('product-history-grid');
        });
    });

    describe('loadDataModificationSection', () => {
        it('debería cargar la sección de modificación de datos correctamente', () => {
            profileView.createDataModificationHTML = jest.fn().mockReturnValue('<div>Form HTML</div>');
            console.log = jest.fn();

            profileView.loadDataModificationSection(mockElement);

            expect(profileView.controller.model.getCurrentUser).toHaveBeenCalled();
            expect(profileView.createDataModificationHTML).toHaveBeenCalledWith(mockUser);
            expect(mockElement.innerHTML).toBe('<div>Form HTML</div>');
        });
    });

    describe('createDataModificationHTML', () => {
        it('debería crear HTML para el formulario de modificación de datos', () => {
            const user = {
                nombre_completo: 'Test User',
                correo: 'test@example.com'
            };

            const result = profileView.createDataModificationHTML(user);

            expect(result).toContain('Modificar datos personales');
            expect(result).toContain('Test User');
            expect(result).toContain('test@example.com');
        });

        it('debería manejar valores vacíos en datos de usuario', () => {
            const result = profileView.createDataModificationHTML({});

            expect(result).toContain('value=""');
        });
    });

    describe('getOrderStatusBadge', () => {
        it('debería retornar el badge HTML correcto para un estado conocido', () => {
            const result = profileView.getOrderStatusBadge('pendiente');
            expect(result).toContain('badge bg-warning');
            expect(result).toContain('Pendiente');
        });

        it('debería retornar un badge genérico para un estado desconocido', () => {
            const result = profileView.getOrderStatusBadge('estado_desconocido');
            expect(result).toContain('badge bg-secondary');
            expect(result).toContain('estado_desconocido');
        });
    });

    describe('setupProfileButtons', () => {
        it('debería configurar los eventos para botones de perfil', () => {
            const buttonClickHandler = jest.fn();
            const mockButton = {
                addEventListener: jest.fn(),
            };

            // Mock para simular que se encuentran los botones
            document.getElementById
                .mockReturnValueOnce(mockButton) // primer botón
                .mockReturnValueOnce(mockButton) // segundo botón
                .mockReturnValueOnce(mockButton) // tercer botón
                .mockReturnValueOnce(mockButton); // botón de logout

            profileView.setupProfileButtons(buttonClickHandler);

            // Verificar que se buscaron los botones
            expect(document.getElementById).toHaveBeenCalledWith('gestion-de-pedidos-boton-perfil');
            expect(document.getElementById).toHaveBeenCalledWith('historial-de-productos-boton-perfil');
            expect(document.getElementById).toHaveBeenCalledWith('agregar-o-modificar-datos-boton-perfil');
            expect(document.getElementById).toHaveBeenCalledWith('logoutButton');

            // Verificar que se configuraron los event listeners
            expect(mockButton.addEventListener).toHaveBeenCalledTimes(4);
        });

        it('debería manejar el caso cuando no se encuentran los botones', () => {
            const buttonClickHandler = jest.fn();

            // Mock para simular que no se encuentran los botones
            document.getElementById.mockReturnValue(null);

            profileView.setupProfileButtons(buttonClickHandler);

            // No debe haber errores aunque no encuentre los botones
            expect(document.getElementById).toHaveBeenCalledTimes(4);
        });
    });

    describe('setupDataForm', () => {
        it('debería configurar el formulario de datos correctamente', () => {
            const submitHandler = jest.fn();
            const clonedButton = { addEventListener: jest.fn() };
            const saveButton = {
                cloneNode: jest.fn().mockReturnValue(clonedButton),
                parentNode: { replaceChild: jest.fn() }
            };
            const dataForm = {
                nombre_completo: { value: 'Test Name' },
                correo: { value: 'test@example.com' },
                contraseña: { value: 'password123' }
            };

            console.log = jest.fn();
            document.getElementById
                .mockReturnValueOnce(saveButton) // guardar-cambios-btn
                .mockReturnValueOnce(dataForm);   // form-modificar-datos

            profileView.setupDataForm(submitHandler);

            expect(document.getElementById).toHaveBeenCalledWith('guardar-cambios-btn');
            expect(document.getElementById).toHaveBeenCalledWith('form-modificar-datos');
            expect(saveButton.cloneNode).toHaveBeenCalledWith(true);
            expect(saveButton.parentNode.replaceChild).toHaveBeenCalledWith(clonedButton, saveButton);
            expect(clonedButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));

            // Simular click en el botón
            const clickEvent = { preventDefault: jest.fn() };
            const clickHandler = clonedButton.addEventListener.mock.calls[0][1];
            clickHandler(clickEvent);

            expect(clickEvent.preventDefault).toHaveBeenCalled();
            expect(submitHandler).toHaveBeenCalledWith({
                nombre_completo: 'Test Name',
                correo: 'test@example.com',
                contraseña: 'password123'
            });
        });

        it('debería manejar el caso cuando no se encuentran los elementos del formulario', () => {
            const submitHandler = jest.fn();
            console.error = jest.fn();
            console.log = jest.fn();

            // Mock para simular que no se encuentran los elementos
            document.getElementById
                .mockReturnValueOnce(null) // guardar-cambios-btn no encontrado
                .mockReturnValueOnce(null); // form-modificar-datos no encontrado

            profileView.setupDataForm(submitHandler);

            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('showMessage', () => {
        it('debería crear y mostrar un mensaje de notificación', () => {
            // Mockear appendChild en el body real
            const originalBody = document.body;
            document.body.appendChild = jest.fn();
            
            jest.useFakeTimers();
            
            profileView.showMessage('Mensaje de prueba', 'success');
            
            expect(document.createElement).toHaveBeenCalled();
            jest.useRealTimers();
            
            // Restaurar el body original
            document.body = originalBody;
        });
    });

    describe('showOrderDetailsModal', () => {
        it('debería crear y mostrar un modal con detalles del pedido', () => {
            // Configurar mocks para simular que el modal no existe inicialmente
            let modalCreated = false;
            document.getElementById.mockImplementation((id) => {
                if (id === 'orderDetailsModal') {
                    if (!modalCreated) {
                        modalCreated = true;
                        return null; // Primera llamada: el modal no existe
                    } else {
                        return mockElement; // Segunda llamada: el modal fue creado
                    }
                }
                
                // Mock para los elementos internos del modal
                const mockElements = {
                    textContent: '',
                    innerHTML: '',
                    appendChild: jest.fn()
                };
                
                switch (id) {
                    case 'orderDetailId':
                    case 'orderDetailDate':
                    case 'orderDetailStatus':
                    case 'orderDetailShipping':
                    case 'orderDetailAddress':
                    case 'orderProductsList':
                    case 'orderDetailTotal':
                        return mockElements;
                    default:
                        return null;
                }
            });
    
            // Mock para bootstrap.Modal
            const mockModalInstance = {
                show: jest.fn()
            };
            bootstrap.Modal.mockImplementation(() => mockModalInstance);
    
            // Mock para getOrderStatusBadge
            profileView.getOrderStatusBadge = jest.fn().mockReturnValue('<span>Pendiente</span>');
    
            // Datos de prueba para el pedido
            const order = {
                id_pedido: 123,
                fecha_pedido: '2024-04-20',
                estado: 'pendiente',
                metodo_envio: 'Domicilio',
                direccion: 'Calle Test 123',
                total: 150.00,
                productos: [
                    {
                        nombre: 'Producto Test',
                        imagen: 'test.jpg',
                        precio: 75.00,
                        cantidad: 2
                    }
                ]
            };
    
            // Ejecutar el método a probar
            profileView.showOrderDetailsModal(order);
    
            // Verificaciones
            // Se buscó el modal inicialmente
            expect(document.getElementById).toHaveBeenCalledWith('orderDetailsModal');
            
            // Se creó un nuevo elemento div para el modal
            expect(document.createElement).toHaveBeenCalledWith('div');
            
            // Se añadió el modal al body
            expect(document.body.appendChild).toHaveBeenCalledWith(mockElement);
            
            // Se llamó a getOrderStatusBadge para el estado
            expect(profileView.getOrderStatusBadge).toHaveBeenCalledWith('pendiente');
            
            // Se instanció la Modal de Bootstrap
            expect(bootstrap.Modal).toHaveBeenCalled();
            
            // Se llamó a show() en la instancia del modal
            expect(mockModalInstance.show).toHaveBeenCalled();
        });
    
        it('debería utilizar un modal existente si ya existe', () => {
            // Mock para simular que el modal ya existe
            const existingModal = mockElement;
            document.getElementById.mockReturnValueOnce(existingModal);
    
            // Mock para los elementos internos del modal
            const mockElements = {
                textContent: '',
                innerHTML: ''
            };
            document.getElementById
                .mockReturnValueOnce(mockElements) // orderDetailId
                .mockReturnValueOnce(mockElements) // orderDetailDate
                .mockReturnValueOnce(mockElements) // orderDetailStatus
                .mockReturnValueOnce(mockElements) // orderDetailShipping
                .mockReturnValueOnce(mockElements) // orderDetailAddress
                .mockReturnValueOnce(mockElements) // orderProductsList
                .mockReturnValueOnce(mockElements); // orderDetailTotal
    
            // Mock para bootstrap.Modal
            const mockModalInstance = {
                show: jest.fn()
            };
            bootstrap.Modal.mockImplementation(() => mockModalInstance);
    
            // Mock para getOrderStatusBadge
            profileView.getOrderStatusBadge = jest.fn();
    
            // Datos de prueba para el pedido
            const order = {
                id: 123,
                fecha: '2024-04-20',
                estado: 'pending',
                total: 150.00
            };
    
            // Ejecutar el método
            profileView.showOrderDetailsModal(order);
    
            // Verificaciones
            // No se debe crear un nuevo modal
            expect(document.createElement).not.toHaveBeenCalled();
            
            // Se debe usar el modal existente
            expect(bootstrap.Modal).toHaveBeenCalledWith(existingModal);
            
            // Se debe mostrar el modal
            expect(mockModalInstance.show).toHaveBeenCalled();
        });
    });
});