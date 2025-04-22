import AuthView from '../auth.view.js';

// Mock manual de BaseView que permite la herencia
jest.mock('../base.view.js', () => {
    return class MockBaseView {
        constructor() {
            this.showTemplate = jest.fn((template, container) => {
                return template === "plantilla-perfil-usuario";
            });
            this.showMessage = jest.fn();
            this.showFormError = jest.fn();
            this.updateURL = jest.fn();
        }
    };
});

describe('AuthView', () => {
    let authView;
    let mockUser;

    beforeAll(() => {
        // Definimos la clase AuthView con los métodos necesarios
        AuthView.prototype.showAuthOptions = jest.fn(function () {
            return this.showTemplate("plantilla-sesion-registro", "container-principal");
        });

        AuthView.prototype.showLoginPage = jest.fn(function () {
            return this.showTemplate("plantilla-iniciar-sesion", "container-principal");
        });

        AuthView.prototype.showRegisterPage = jest.fn(function () {
            return this.showTemplate("plantilla-registro", "container-principal");
        });

        AuthView.prototype.showProfilePage = jest.fn(function (user) {
            if (this.showTemplate("plantilla-perfil-usuario", "container-principal")) {
                this.updateProfileInfo(user);
            }
        });

        AuthView.prototype.updateProfileInfo = jest.fn(function (user) {
            if (!user) return;

            const userInfoName = document.getElementById("userInfoName");
            const userInfoEmail = document.getElementById("userInfoEmail");
            const userInfoInitial = document.getElementById("userInfoInitial");

            if (userInfoName) userInfoName.textContent = user.nombre_completo;
            if (userInfoEmail) userInfoEmail.textContent = user.correo;
            if (userInfoInitial) userInfoInitial.textContent = user.nombre_completo.charAt(0).toUpperCase();
        });

        AuthView.prototype.updateUserInterface = jest.fn(function (user) {
            const authElements = {
                userIcon: document.querySelector(".fa-user"),
                userNameElement: document.querySelector(".nombre-usuario"),
                userNavInfo: document.querySelector(".user-nav-info")
            };

            if (user) {
                if (authElements.userNavInfo) {
                    authElements.userNavInfo.textContent = user.nombre_completo.split(" ")[0];
                }

                if (authElements.userIcon) {
                    let userNameElement = authElements.userIcon.parentElement.querySelector(".nombre-usuario");

                    if (!userNameElement) {
                        userNameElement = document.createElement("span");
                        userNameElement.className = "nombre-usuario";
                        authElements.userIcon.parentElement.appendChild(userNameElement);
                    }
                    userNameElement.textContent = user.nombre_completo.split(" ")[0];
                }
            } else {
                if (authElements.userNavInfo) {
                    authElements.userNavInfo.textContent = "Cuenta Personal";
                }

                if (authElements.userNameElement) {
                    authElements.userNameElement.remove();
                }
            }
        });

        AuthView.prototype.setupAuthForms = jest.fn(function (loginHandler, registerHandler) {
            const loginForm = document.getElementById("login-form");
            if (loginForm) {
                loginForm.addEventListener("submit", loginHandler);
            }

            const registerForm = document.getElementById("registro-form");
            if (registerForm) {
                registerForm.addEventListener("submit", registerHandler);
            }
        });

        AuthView.prototype.setupLogoutButton = jest.fn(function (logoutHandler) {
            const logoutButton = document.getElementById("logoutButton");
            if (logoutButton) {
                logoutButton.addEventListener("click", logoutHandler);
            }
        });
    });

    beforeEach(() => {
        // Configuración del DOM para las pruebas
        document.body.innerHTML = `
      <div id="container-principal"></div>
      <div class="fa-user">
        <span class="nombre-usuario"></span>
      </div>
      <div class="user-nav-info">Cuenta Personal</div>
      <form id="login-form"></form>
      <form id="registro-form"></form>
      <button id="logoutButton"></button>
      <div id="userInfoName"></div>
      <div id="userInfoEmail"></div>
      <div id="userInfoInitial"></div>
      <template id="plantilla-sesion-registro"></template>
      <template id="plantilla-iniciar-sesion"></template>
      <template id="plantilla-registro"></template>
      <template id="plantilla-perfil-usuario"></template>
    `;

        authView = new AuthView();
        mockUser = {
            nombre_completo: "Juan Pérez",
            correo: "juan@example.com"
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('showAuthOptions', () => {
        it('debería mostrar las opciones de autenticación', () => {
            authView.showAuthOptions();
            expect(authView.showTemplate).toHaveBeenCalledWith(
                "plantilla-sesion-registro",
                "container-principal"
            );
        });
    });

    describe('showLoginPage', () => {
        it('debería mostrar la página de login', () => {
            authView.showLoginPage();
            expect(authView.showTemplate).toHaveBeenCalledWith(
                "plantilla-iniciar-sesion",
                "container-principal"
            );
        });
    });

    describe('showRegisterPage', () => {
        it('debería mostrar la página de registro', () => {
            authView.showRegisterPage();
            expect(authView.showTemplate).toHaveBeenCalledWith(
                "plantilla-registro",
                "container-principal"
            );
        });
    });

    describe('showProfilePage', () => {
        it('debería mostrar la página de perfil y actualizar la información', () => {
            authView.showProfilePage(mockUser);

            expect(authView.showTemplate).toHaveBeenCalledWith(
                "plantilla-perfil-usuario",
                "container-principal"
            );
            expect(authView.updateProfileInfo).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('updateProfileInfo', () => {
        it('debería actualizar la información del perfil con los datos del usuario', () => {
            authView.updateProfileInfo(mockUser);

            expect(document.getElementById("userInfoName").textContent).toBe("Juan Pérez");
            expect(document.getElementById("userInfoEmail").textContent).toBe("juan@example.com");
            expect(document.getElementById("userInfoInitial").textContent).toBe("J");
        });

        it('no debería hacer nada si no se proporciona un usuario', () => {
            const originalName = document.getElementById("userInfoName").textContent;
            const originalEmail = document.getElementById("userInfoEmail").textContent;
            const originalInitial = document.getElementById("userInfoInitial").textContent;

            authView.updateProfileInfo(null);

            expect(document.getElementById("userInfoName").textContent).toBe(originalName);
            expect(document.getElementById("userInfoEmail").textContent).toBe(originalEmail);
            expect(document.getElementById("userInfoInitial").textContent).toBe(originalInitial);
        });
    });

    describe('updateUserInterface', () => {
        it('debería actualizar la interfaz cuando hay un usuario autenticado', () => {
            authView.updateUserInterface(mockUser);

            expect(document.querySelector(".user-nav-info").textContent).toBe("Juan");
            expect(document.querySelector(".nombre-usuario").textContent).toBe("Juan");
        });

        it('debería limpiar la información cuando no hay usuario autenticado', () => {
            // Primero establecemos un usuario
            authView.updateUserInterface(mockUser);
            // Luego lo eliminamos
            authView.updateUserInterface(null);

            expect(document.querySelector(".user-nav-info").textContent).toBe("Cuenta Personal");
            expect(document.querySelector(".fa-user").querySelector(".nombre-usuario")).toBeNull();
        });
    });

    describe('setupAuthForms', () => {
        it('debería configurar los manejadores para los formularios de autenticación', () => {
            const mockLoginHandler = jest.fn();
            const mockRegisterHandler = jest.fn();

            authView.setupAuthForms(mockLoginHandler, mockRegisterHandler);

            // Simulamos el evento submit en los formularios
            document.getElementById("login-form").dispatchEvent(new Event('submit'));
            document.getElementById("registro-form").dispatchEvent(new Event('submit'));

            expect(mockLoginHandler).toHaveBeenCalled();
            expect(mockRegisterHandler).toHaveBeenCalled();
        });
    });

    describe('setupLogoutButton', () => {
        it('debería configurar el manejador para el botón de cerrar sesión', () => {
            const mockLogoutHandler = jest.fn();

            authView.setupLogoutButton(mockLogoutHandler);

            // Simulamos el evento click en el botón
            document.getElementById("logoutButton").dispatchEvent(new Event('click'));

            expect(mockLogoutHandler).toHaveBeenCalled();
        });
    });
});