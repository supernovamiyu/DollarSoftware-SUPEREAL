import UserModel from '../user.model';

// Mock de localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

// Mock de fetch
global.fetch = jest.fn();

beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
    localStorageMock.clear();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('UserModel', () => {
    describe('initSession', () => {
        it('debería recuperar la sesión si hay datos en localStorage', () => {
            const userData = { id_usuario: 1, nombre: 'Test User' };
            localStorageMock.setItem('sesionUsuario', JSON.stringify(userData));
            localStorageMock.setItem('authToken', 'test-token');

            const userModel = new UserModel();

            expect(localStorageMock.getItem).toHaveBeenCalledWith('sesionUsuario');
            expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
            expect(userModel.getCurrentUser()).toEqual(userData);
            expect(userModel.isAuthenticated()).toBe(true);
        });

        it('debería limpiar la sesión si los datos son inválidos', () => {
            localStorageMock.setItem('sesionUsuario', 'invalid-json');
            localStorageMock.setItem('authToken', 'test-token');

            const userModel = new UserModel();

            expect(userModel.getCurrentUser()).toBeNull();
            expect(userModel.isAuthenticated()).toBe(false);
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('sesionUsuario');
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
        });

        it('no debería recuperar sesión si no hay datos en localStorage', () => {
            const userModel = new UserModel();
            expect(userModel.getCurrentUser()).toBeNull();
            expect(userModel.isAuthenticated()).toBe(false);
        });
    });

    describe('login', () => {
        it('debería iniciar sesión correctamente', async () => {
            const userData = { id_usuario: 1, nombre: 'Test User' };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ usuario: userData, token: 'test-token' }),
            };
            fetch.mockResolvedValue(mockResponse);

            const userModel = new UserModel();
            const result = await userModel.login('test@example.com', 'password');

            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: 'test@example.com', contraseña: 'password' }),
            });

            expect(result.success).toBe(true);
            expect(userModel.getCurrentUser()).toEqual(userData);
            expect(localStorageMock.setItem).toHaveBeenCalledWith('sesionUsuario', JSON.stringify(userData));
            expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'test-token');
        });

        it('debería fallar si las credenciales son incorrectas', async () => {
            const mockResponse = {
                ok: false,
                json: jest.fn().mockResolvedValue({ mensaje: 'Credenciales inválidas' }),
            };
            fetch.mockResolvedValue(mockResponse);

            const userModel = new UserModel();
            const result = await userModel.login('wrong@example.com', 'wrong');

            expect(result.success).toBe(false);
            expect(result.error).toBe('Credenciales inválidas');
            expect(userModel.getCurrentUser()).toBeNull();
        });
    });

    describe('register', () => {
        it('debería registrar un nuevo usuario correctamente', async () => {
            const userData = { nombre: 'New User', email: 'new@example.com', password: 'password' };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ usuario: { id_usuario: 2, ...userData }, token: 'new-token' }),
            };
            fetch.mockResolvedValue(mockResponse);

            const userModel = new UserModel();
            const result = await userModel.register(userData);

            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            expect(result.success).toBe(true);
            expect(userModel.getCurrentUser()).toEqual({ id_usuario: 2, ...userData });
        });
    });

    describe('logout', () => {
        it('debería cerrar sesión correctamente', () => {
            const userModel = new UserModel();
            userModel.currentUser = { id_usuario: 1 };
            userModel.token = 'test-token';

            const result = userModel.logout();

            expect(result).toBe(true);
            expect(userModel.getCurrentUser()).toBeNull();
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('sesionUsuario');
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
        });
    });

    describe('updateUserData', () => {
        it('debería actualizar los datos del usuario', async () => {
            const initialUser = { id_usuario: 1, nombre: 'Old Name' };
            const updatedData = { nombre: 'New Name' };
            const mockResponse = { ok: true };
            fetch.mockResolvedValue(mockResponse);

            const userModel = new UserModel();
            userModel.currentUser = initialUser;
            localStorageMock.setItem('authToken', 'test-token');

            const result = await userModel.updateUserData(updatedData);

            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/users/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer test-token',
                },
                body: JSON.stringify(updatedData),
            });

            expect(result.success).toBe(true);
            expect(userModel.getCurrentUser()).toEqual({ ...initialUser, ...updatedData });
        });
    });

    describe('getUserOrders', () => {
        it('debería devolver pedidos vacíos si no está autenticado', async () => {
            const userModel = new UserModel();
            const orders = await userModel.getUserOrders();
            expect(orders).toEqual([]);
        });

        it('debería obtener y procesar los pedidos del usuario', async () => {
            const mockOrders = [
                { id_pedido: 1, fecha_de_pedido: '2023-01-01', fk_id_estado_envio: 'ENV', total: 100, direccion: 'Test 123', fk_id_metodo_envio: 'ENV' },
            ];
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockOrders),
            };
            fetch.mockResolvedValue(mockResponse);

            const userModel = new UserModel();
            userModel.currentUser = { id_usuario: 1 };

            const orders = await userModel.getUserOrders();

            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/delivery/usuario/1');
            expect(orders).toEqual([
                {
                    id: 1,
                    fecha_pedido: '2023-01-01',
                    estado: 'Enviado',
                    total: 100,
                    direccion: 'Test 123',
                    metodo_envio: 'Envío a domicilio',
                },
            ]);
        });
    });

    describe('getOrderDetails', () => {
        it('debería obtener detalles del pedido', async () => {
            const mockOrder = {
                id_pedido: 1,
                fecha_de_pedido: '2023-01-01',
                fk_id_estado_envio: 'ENV',
                total: 100,
                direccion: 'Test 123',
                productos: []
            };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockOrder),
            };
            fetch.mockResolvedValue(mockResponse);
    
            const userModel = new UserModel();
            const orderDetails = await userModel.getOrderDetails(1);
    
            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/delivery/idPedidos/1');
            expect(orderDetails).toEqual({
                id_pedido: 1,
                fecha_pedido: '2023-01-01',
                fk_id_estado_envio: 'ENV',
                total: 100,
                direccion: 'Test 123',
                productos: [],
                estado: 'en_proceso',
                direccion_entrega: 'Test 123'
            });
        });
    });
});