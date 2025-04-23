## 📄 Pruebas Unitarias

Las pruebas unitarias permiten verificar el correcto funcionamiento de partes específicas del código, asegurando que cada unidad cumpla con sus requisitos y expectativas.

En este documento, se evaluarán los casos de prueba y se documentarán los resultados obtenidos.

## ¿Cómo ejecutar las pruebas?
Para ejecutar las pruebas, se debe navegar en la terminar a la respectiva carpeta, ya sea backend o frontend y utilizar el comando `npm test` en la terminal, asegurándose de que todas las dependencias estén instaladas, que el entorno de pruebas esté configurado correctamente y especificando dentro del comando la ruta del archivo que se desea examinar.

Para generar un resumen de cobertura de pruebas (test coverage) se debe ingresar a la respectiva carpeta, ya sea del backend o del frontend y ejecutar el comando npx jest --coverage, el cual, producirá un resumen detallado de dicha cobertura y los módulos específicos no probados.

### Frontend
En en frontend, se verificaron componentes individuales, asegurando que rendericen correctamente y respondan a interacciones del usuario de manera esperada. Se utilizó JEST, JEST Environment DOM y Babel para facilitar la ejecución de pruebas.

#### Cobertura Actual

|   Métrica    |   Porcentaje  |
|--------------|---------------|
| Statements   | 79.38%        |
| Branches     | 61.72%        |
| Functions    | 76.00%        |
| Lines        | 80.28%        |

#### Casos de Prueba del Frontend

##### Controladores

###### AppController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/app.controller.test.js             

> test
> jest controller/__tests__/app.controller.test.js

  console.log
    Inicializando AppController

      at AppController.log [as init] (controller/app.controller.js:42:17)

  console.log                                                                                                                                            
    Configurando 0 enlaces de navegación                                                                                                                 

      at log (controller/app.controller.js:75:21)

  console.log
    Ruta inicial: /

      at AppController.log (controller/app.controller.js:121:17)

  console.log                                                                                                                                            
    Manejando ruta: /                                                                                                                                    

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Usuario autenticado: { nombre_completo: 'Juan Pérez', email: 'juan@example.com' }                                                                    

      at AppController.log [as checkAuthStatus] (controller/app.controller.js:57:21)

  console.log                                                                                                                                            
    Manejando ruta: /perfil                                                                                                                              

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Redirigiendo a auth

      at AppController.log [as handleRoute] (controller/app.controller.js:134:25)

  console.log                                                                                                                                            
    Manejando ruta: /auth                                                                                                                                

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Manejando ruta: /perfil                                                                                                                              

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Manejando ruta: /auth                                                                                                                                

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Redirigiendo a perfil                                                                                                                                

      at AppController.log [as handleRoute] (controller/app.controller.js:143:25)

  console.log                                                                                                                                            
    Manejando ruta: /perfil                                                                                                                              

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Manejando ruta: /                                                                                                                                    

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Manejando ruta: /carrito

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Manejando ruta: /ubicacion                                                                                                                           

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Manejando ruta: /ruta-desconocida                                                                                                                    

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

  console.log                                                                                                                                            
    Ruta no encontrada: /ruta-desconocida, redirigiendo a inicio                                                                                         

      at AppController.log (controller/app.controller.js:204:17)

  console.log
    Ruta no encontrada: /ruta-completamente-desconocida, redirigiendo a inicio

      at AppController.log [as handleUnknownRoute] (controller/app.controller.js:204:17)

  console.log                                                                                                                                            
    Manejando ruta: /carrito                                                                                                                             

      at AppController.log (controller/app.controller.js:128:17)

  console.log
    Configurando 5 enlaces de navegación

      at log (controller/app.controller.js:75:21)

  console.log                                                                                                                                            
    Configurando botones de sección de ayuda: 1                                                                                                          

      at AppController.log [as setupHelpSectionButtons] (controller/app.controller.js:105:21)

  console.log                                                                                                                                            
    Manejando ruta: /ubicacion                                                                                                                           

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)
          at Proxy.forEach (<anonymous>)

  console.log                                                                                                                                            
    Manejando ruta: /atencion-cliente                                                                                                                    

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)
          at Proxy.forEach (<anonymous>)

  console.log
    Manejando ruta: /

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)
          at Proxy.forEach (<anonymous>)

  console.log                                                                                                                                            
    Manejando ruta: /carrito                                                                                                                             

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)
          at Proxy.forEach (<anonymous>)

  console.log                                                                                                                                            
    Manejando ruta: /auth                                                                                                                                

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)
          at Proxy.forEach (<anonymous>)

  console.log                                                                                                                                            
    Configurando botones de sección de ayuda: 1                                                                                                          

      at AppController.log [as setupHelpSectionButtons] (controller/app.controller.js:105:21)

  console.log                                                                                                                                            
    Manejando ruta: /atencion-cliente/manejo-pagina

      at AppController.log [as handleRoute] (controller/app.controller.js:128:17)

 PASS  controller/__tests__/app.controller.test.js
  AppController                                                                                                                                          
    Constructor                                                                                                                                          
      √ debería inicializar todos los controladores correctamente (4 ms)                                                                                 
      √ debería inicializar el mapa de rutas correctamente (2 ms)                                                                                        
      √ debería inicializar el mapa de secciones a rutas correctamente (1 ms)                                                                            
    init                                                                                                                                                 
      √ debería llamar a los métodos de inicialización correctamente (45 ms)                                                                             
    checkAuthStatus                                                                                                                                      
      √ debería actualizar la interfaz si el usuario está autenticado (5 ms)                                                                             
      √ no debería actualizar la interfaz si el usuario no está autenticado (1 ms)                                                                       
    handleRoute                                                                                                                                          
      √ debería redirigir a /auth cuando se accede a ruta protegida sin autenticación (10 ms)                                                            
      √ debería permitir acceso a ruta protegida cuando el usuario está autenticado (4 ms)                                                               
      √ debería redirigir a /perfil cuando usuario autenticado intenta acceder a /auth (7 ms)                                                            
      √ debería manejar rutas conocidas correctamente (7 ms)
      √ debería manejar rutas desconocidas correctamente (4 ms)                                                                                          
    handleUnknownRoute                                                                                                                                   
      √ debería manejar rutas de producto correctamente (1 ms)                                                                                           
      √ debería manejar rutas de categoría correctamente (1 ms)                                                                                          
      √ debería manejar secciones de ayuda correctamente (1 ms)                                                                                          
      √ debería redirigir a la página de inicio para rutas completamente desconocidas (3 ms)                                                             
    navigateTo                                                                                                                                           
      √ debería actualizar el historial y manejar la ruta (7 ms)                                                                                         
    syncAuthState                                                                                                                                        
      √ debería actualizar las vistas cuando el usuario está autenticado (1 ms)                                                                          
      √ debería actualizar las vistas cuando el usuario no está autenticado (2 ms)                                                                       
    setupNavigationHandlers                                                                                                                              
      √ debería configurar los manejadores de eventos para los enlaces de navegación (41 ms)                                                             
      √ debería configurar los botones de ayuda correctamente (12 ms)                                                                                    
      
Test Suites: 1 passed, 1 total                                                                                                                           
Tests:       20 passed, 20 total                                                                                                                         
Snapshots:   0 total
Time:        2.46 s, estimated 4 s
Ran all test suites matching /controller\\__tests__\\app.controller.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                               | Resultado Esperado                                                                 |
|-------------------------|-------------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Constructor**         | `constructor()`         | Inicialización de controladores y modelos                                          | Todos los controladores asignados correctamente                                  |
|                         |                         | Inicialización del mapa de rutas                                                   | Rutas principales definidas (`/`, `/auth`, `/carrito`, etc.)                     |
| **Inicialización**      | `init()`                | Llamada a métodos de configuración                                                 | Debe llamar a `checkAuthStatus`, `setupNavigationEvents` y `handleInitialRoute`  |
| **Autenticación**       | `checkAuthStatus()`     | Usuario autenticado                                                                | Actualiza interfaz con datos del usuario                                         |
|                         |                         | Usuario no autenticado                                                             | No actualiza la interfaz                                                         |
| **Manejo de Rutas**     | `handleRoute()`         | Ruta protegida sin autenticación (ej. `/perfil`)                                   | Redirige a `/auth`                                                               |
|                         |                         | Ruta protegida con autenticación                                                   | Muestra la página correspondiente (ej. perfil)                                   |
|                         |                         | Ruta `/auth` con usuario autenticado                                               | Redirige a `/perfil`                                                             |
|                         |                         | Rutas conocidas (`/`, `/carrito`)                                                  | Llama al controlador correcto                                                    |
|                         |                         | Ruta desconocida                                                                   | Ejecuta `handleUnknownRoute`                                                     |
| **Rutas Desconocidas**  | `handleUnknownRoute()`  | Ruta de producto (`/producto/123`)                                                 | Muestra detalles del producto                                                    |
|                         |                         | Ruta de categoría (`/categoria/electronica`)                                       | Filtra productos por categoría                                                   |
|                         |                         | Sección de ayuda (`/atencion-cliente/manejo-pagina`)                               | Muestra contenido de ayuda específico                                            |
|                         |                         | Ruta inválida                                                                      | Redirige a página de inicio                                                      |
| **Navegación**          | `navigateTo()`          | Navegación programática a ruta válida                                              | Actualiza historial y maneja la ruta                                             |
| **Sincronización**      | `syncAuthState()`       | Cambio a autenticado                                                               | Actualiza vistas con datos de usuario                                            |
|                         |                         | Cambio a no autenticado                                                            | Limpia datos de usuario en vistas                                                |
| **Eventos UI**          | `setupNavigationHandlers()` | Click en links de navegación                                                   | Navega a ruta correspondiente                                                    |
|                         | `setupHelpSectionButtons()` | Click en botones de ayuda                                                      | Navega a sección de ayuda específica 

###### AuthController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/auth.controller.test.js

> test
> jest controller/__tests__/auth.controller.test.js

 PASS  controller/__tests__/auth.controller.test.js
  AuthController
    Constructor                                                                                                                                          
      √ debería inicializar correctamente con modelo y vista (3 ms)                                                                                      
    setupEventListeners                                                                                                                                  
      √ debería configurar el event listener para el formulario de login si existe (3 ms)                                                                
      √ debería configurar el event listener para el formulario de registro si existe (1 ms)                                                             
    showAuthOptions                                                                                                                                      
      √ debería llamar a showAuthOptions de la vista y configurar event listeners (1 ms)                                                                 
    showLoginPage                                                                                                                                        
      √ debería llamar a showLoginPage de la vista y configurar event listeners (1 ms)                                                                   
    showRegisterPage                                                                                                                                     
      √ debería llamar a showRegisterPage de la vista y configurar event listeners (1 ms)                                                                
    handleLogin                                                                                                                                          
      √ debería manejar un login exitoso correctamente (2 ms)                                                                                            
      √ debería manejar un login fallido correctamente (1 ms)                                                                                            
      √ debería manejar errores durante el login (1 ms)                                                                                                  
    handleRegister                                                                                                                                       
      √ debería rechazar el registro si las contraseñas no coinciden (1 ms)                                                                              
      √ debería manejar un registro exitoso correctamente (1 ms)                                                                                         
      √ debería manejar un registro fallido correctamente (1 ms)                                                                                         
      √ debería manejar errores durante el registro                                                                                                      
    handleLogout                                                                                                                                         
      √ debería manejar el logout correctamente (1 ms)                                                                                                   

Test Suites: 1 passed, 1 total                                                                                                                           
Tests:       14 passed, 14 total                                                                                                                         
Snapshots:   0 total
Time:        2.207 s
Ran all test suites matching /controller\\__tests__\\auth.controller.test.js/i.

| Categoría               | Método Probado          | Escenarios Cubiertos                            | Resultado Esperado                                       |
|-------------------------|-------------------------|-------------------------------------------------|----------------------------------------------------------|
| **Constructor**         | `constructor()`         | Inicialización con modelo y vista               | Modelo y vista asignados correctamente                   |
| **Event Listeners**     | `setupEventListeners()` | Formulario de login existe                      | Configura event listener para submit                     |
|                         |                         | Formulario de registro existe                   | Configura event listener para submit                     |
| **Vistas**              | `showAuthOptions()`     | Llamada básica                                  | Muestra opciones de autenticación y configura listeners  |
|                         | `showLoginPage()`       | Llamada básica                                  | Muestra página de login y configura listeners            |
|                         | `showRegisterPage()`    | Llamada básica                                  | Muestra página de registro y configura listeners         |
| **Login**               | `handleLogin()`         | Credenciales válidas                            | Muestra mensaje de éxito y actualiza UI                  |
|                         |                         | Credenciales inválidas                          | Muestra mensaje de error                                 |
|                         |                         | Error de red                                    | Muestra mensaje de error genérico                        |
| **Registro**            | `handleRegister()`      | Contraseñas no coinciden                        | Rechaza registro y muestra error                         |
|                         |                         | Registro exitoso                                | Muestra mensaje de éxito y actualiza UI                  |
|                         |                         | Correo ya registrado                            | Muestra mensaje de error específico                      |
|                         |                         | Error de red                                    | Muestra mensaje de error genérico                        |
| **Logout**              | `handleLogout()`        | Llamada básica                                  | Cierra sesión, limpia UI y muestra confirmación          |

###### CartController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/cart.controller.test.js                               

> test
> jest controller/__tests__/cart.controller.test.js

  console.log
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado completamente

      at CartController.log [as init] (controller/cart.controller.js:49:21)

  console.log
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log
    Actualizando vista del carrito con 0 productos

      at CartController.log [as updateCartDisplay] (controller/cart.controller.js:264:17)
          at Array.forEach (<anonymous>)

  console.log
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Actualizando cantidad para producto 123 a 2                                                                                                          

      at CartController.log [as updateQuantity] (controller/cart.controller.js:205:17)

  console.log                                                                                                                                            
    Cantidad actualizada con éxito                                                                                                                       

      at CartController.log [as updateQuantity] (controller/cart.controller.js:209:25)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Actualizando cantidad para producto 123 a 2                                                                                                          

      at CartController.log [as updateQuantity] (controller/cart.controller.js:205:17)

  console.error                                                                                                                                          
    Error al actualizar cantidad: Error de cantidad                                                                                                      

      210 |                 await this.updateCartDisplay()
      211 |             } else {
    > 212 |                 console.error("Error al actualizar cantidad:", result.error)
          |                         ^
      213 |                 this.view.showMessage(result.error || "Error al actualizar cantidad", "error")
      214 |             }
      215 |         } catch (error) {

      at CartController.error [as updateQuantity] (controller/cart.controller.js:212:25)
      at Object.<anonymous> (controller/__tests__/cart.controller.test.js:248:13)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Eliminando producto 123                                                                                                                              

      at CartController.log [as removeItem] (controller/cart.controller.js:226:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Eliminando producto 123                                                                                                                              

      at CartController.log [as removeItem] (controller/cart.controller.js:226:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Actualizando vista del carrito con 1 productos                                                                                                       

      at CartController.log [as updateCartDisplay] (controller/cart.controller.js:264:17)

  console.log
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.error
    Error en processPayment: Error: Error en el pago
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\cart.controller.test.js:377:72)     
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)      
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)      
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)      
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)      
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      355 |
      356 |         } catch (error) {
    > 357 |             console.error("Error en processPayment:", error);
          |                     ^
      358 |             this.handlePaymentFailure(error.message || "Error al procesar el pago");
      359 |             return { success: false, error: error.message };
      360 |         }

      at CartController.error [as processPayment] (controller/cart.controller.js:357:21)
      at Object.<anonymous> (controller/__tests__/cart.controller.test.js:385:28)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Actualizando vista del carrito con 1 productos                                                                                                       

      at CartController.log [as updateCartDisplay] (controller/cart.controller.js:264:17)
          at Array.forEach (<anonymous>)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Actualizando vista del carrito con 1 productos                                                                                                       

      at CartController.log [as updateCartDisplay] (controller/cart.controller.js:264:17)
          at Array.forEach (<anonymous>)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log                                                                                                                                            
    Creando pedido temporal para usuario no registrado                                                                                                   

      at CartController.log [as createOrder] (controller/cart.controller.js:681:25)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.error
    Error al crear pedido para usuario registrado: Error: Error en el servidor
        at CartController.createOrder (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\cart.controller.js:665:31)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\cart.controller.test.js:516:28)     

      671 |                     };
      672 |                 } catch (error) {
    > 673 |                     console.error('Error al crear pedido para usuario registrado:', error);
          |                             ^
      674 |                     return {
      675 |                         success: false,
      676 |                         error: error.message || 'Error al crear el pedido'

      at CartController.error [as createOrder] (controller/cart.controller.js:673:29)
      at Object.<anonymous> (controller/__tests__/cart.controller.test.js:516:28)

  console.log                                                                                                                                            
    CartController inicializado (sin mostrar carrito)                                                                                                    

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

  console.log
    CartController inicializado (sin mostrar carrito)

      at CartController.log [as initWithoutDisplay] (controller/cart.controller.js:38:17)

 PASS  controller/__tests__/cart.controller.test.js
  CartController                                                                                                                                         
    constructor e inicialización                                                                                                                         
      √ debe inicializarse correctamente (31 ms)                                                                                                         
    initWithoutDisplay                                                                                                                                   
      √ no debe volver a inicializar si ya está inicializado (3 ms)                                                                                      
    init                                                                                                                                                 
      √ debe inicializar completamente y mostrar el carrito (10 ms)                                                                                      
      √ solo debe actualizar la vista si ya está inicializado (4 ms)                                                                                     
    setupGlobalEventListeners                                                                                                                            
      √ debe configurar los listeners de eventos correctamente (5 ms)                                                                                    
    handleAddToCartClick                                                                                                                                 
      √ debe deshabilitar el botón durante la operación y restaurarlo después (3 ms)                                                                     
    addToCart                                                                                                                                            
      √ debe mostrar mensaje si el producto ya está en el carrito (3 ms)                                                                                 
      √ debe agregar producto al carrito si no está presente (14 ms)
      √ debe manejar error al obtener detalles del producto (3 ms)                                                                                       
      √ debe manejar error al agregar al carrito (3 ms)                                                                                                  
    updateQuantity                                                                                                                                       
      √ debe actualizar la cantidad y refrescar el carrito si es exitoso (6 ms)                                                                          
      √ debe mostrar mensaje de error si la actualización falla (13 ms)                                                                                  
    removeItem                                                                                                                                           
      √ debe eliminar producto y refrescar el carrito si es exitoso (7 ms)                                                                               
      √ debe mostrar mensaje de error si la eliminación falla (4 ms)                                                                                     
    updateCartDisplay                                                                                                                                    
      √ debe actualizar la vista con los elementos del carrito (4 ms)                                                                                    
    proceedToCheckout                                                                                                                                    
      √ debe mostrar mensaje si el carrito está vacío (2 ms)                                                                                             
      √ debe mostrar el checkout si hay productos en el carrito (2 ms)                                                                                   
    processPayment                                                                                                                                       
      √ debe procesar el pago correctamente para recogida en tienda (17 ms)                                                                              
      √ debe manejar errores en el proceso de pago (27 ms)                                                                                               
    handlePaymentSuccess                                                                                                                                 
      √ debe limpiar el carrito y mostrar mensaje de confirmación para usuario registrado (6 ms)                                                         
      √ debe mostrar mensaje diferente para usuario no registrado (4 ms)                                                                                 
    handlePaymentFailure                                                                                                                                 
      √ debe mostrar mensaje de error y generar PDF de transacción fallida (2 ms)                                                                        
    createOrder                                                                                                                                          
      √ debe crear orden para usuario registrado (4 ms)                                                                                                  
      √ debe crear orden temporal para usuario no registrado (5 ms)                                                                                      
      √ debe manejar errores en la creación de la orden (19 ms)                                                                                          
    generateInvoicePDF y generateFailedTransactionPDF                                                                                                    
      √ debe generar correctamente la factura PDF (24 ms)                                                                                                
      √ debe generar correctamente el PDF de transacción fallida (3 ms)                                                                                  

Test Suites: 1 passed, 1 total                                                                                                                           
Tests:       27 passed, 27 total                                                                                                                         
Snapshots:   0 total
Time:        2.275 s, estimated 4 s
Ran all test suites matching /controller\\__tests__\\cart.controller.test.js/i.


| Categoría               | Método Probado                 | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|--------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Inicialización**      | `constructor()`               | Creación de instancia con dependencias mockeadas                                    | Todas las dependencias asignadas correctamente                                   |
|                         | `init()`                      | Inicialización completa del carrito                                                 | Configura event listeners y actualiza vista                                      |
|                         | `initWithoutDisplay()`        | Inicialización sin actualizar vista                                                 | Solo configura event listeners                                                   |
| **Eventos**             | `setupGlobalEventListeners()` | Configuración de listeners para eventos globales                                   | Todos los listeners necesarios están registrados                                 |
| **Gestión de Carrito**  |`addToCart()`                 | Producto ya existe en carrito                                                       | Muestra mensaje informativo                                                     |
|                         |                               | Producto nuevo agregado exitosamente                                               | Actualiza modelo y vista, muestra mensaje de éxito                              |
|                         |                               | Error al obtener detalles del producto                                             | Muestra mensaje de error                                                        |
|                         | `updateQuantity()`            | Actualización exitosa de cantidad                                                  | Actualiza modelo y refresca vista                                               |
|                         |                               | Error al actualizar cantidad                                                       | Muestra mensaje de error                                                        |
|                         | `removeItem()`                | Eliminación exitosa de producto                                                    | Actualiza modelo, vista y botones, muestra mensaje                              |
|                         |                               | Error al eliminar producto                                                         | Muestra mensaje de error                                                        |
|                         | `updateCartDisplay()`         | Carrito con items                                                                  | Vista actualizada con items y total                                             |
| **Checkout**           | `proceedToCheckout()`         | Carrito vacío                                                                      | Muestra mensaje de advertencia                                                  |
|                         |                               | Carrito con productos                                                              | Muestra formulario de checkout con métodos de pago                              |
| **Pagos**              | `processPayment()`            | Pago exitoso (recogida en tienda)                                                  | Crea orden, genera factura, limpia carrito                                      |
|                         |                               | Error en procesamiento de pago                                                     | Muestra mensaje de error, genera PDF de fallo                                   |
|                         | `handlePaymentSuccess()`      | Usuario registrado                                                                 | Muestra confirmación con enlace a perfil                                        |
|                         |                               | Usuario no registrado                                                              | Muestra confirmación con factura descargable                                    |
|                         | `handlePaymentFailure()`      | Transacción fallida                                                                | Muestra mensaje de error y genera PDF de fallo                                  |
| **Órdenes**            | `createOrder()`               | Usuario registrado (éxito)                                                         | Crea orden en backend, retorna datos                                            |
|                         |                               | Usuario registrado (error)                                                         | Retorna mensaje de error                                                        |
|                         |                               | Usuario no registrado                                                              | Crea orden temporal con prefijo TEMP-                                           |
| **Generación PDF**     | `generateInvoicePDF()`        | Factura para orden exitosa                                                         | Genera PDF con detalles de compra y lo descarga                                 |
|                         | `generateFailedTransactionPDF()` | Comprobante de transacción fallida                                              | Genera PDF con detalles del error y lo descarga                                 |

###### HelpController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/help.controller.test.js            

> test
> jest controller/__tests__/help.controller.test.js

 PASS  controller/__tests__/help.controller.test.js
  CustomerSupportController
    Constructor                                                                                                                                                                                     
      √ debería inicializar correctamente con la vista proporcionada (3 ms)                                                                                                                         
    showCustomerSupportPage                                                                                                                                                                         
      √ debería llamar al método showCustomerSupportPage de la vista (9 ms)                                                                                                                         
      √ debería configurar los botones de ayuda                                                                                                                                                     
    showHelpSection                                                                                                                                                                                 
      √ debería mostrar la página principal y luego la sección específica (4 ms)                                                                                                                    
    setupHelpButtons                                                                                                                                                                                
      √ debería configurar los event listeners para los botones de ayuda (12 ms)                                                                                                                    
    showHelpContent                                                                                                                                                                                 
      √ debería llamar al método showHelpContent de la vista con el tipo de ayuda (1 ms)                                                                                                            

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       6 passed, 6 total                                                                                                                                                                      
Snapshots:   0 total
Time:        2.074 s
Ran all test suites matching /controller\\__tests__\\help.controller.test.js/i.



| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Constructor**         | `constructor()`              | Inicialización con vista proporcionada                                              | Asigna correctamente la vista y establece `currentSection` como `null`            |
| **Página Principal**    | `showCustomerSupportPage()`  | Llamada básica al método                                                            | Ejecuta `showCustomerSupportPage` en la vista                                     |
|                         |                              | Configuración de botones de ayuda                                                   | Llama a `setupHelpButtons`                                                        |
| **Secciones de Ayuda**  | `showHelpSection()`          | Mostrar sección específica ('pagos')                                                | 1. Muestra página principal y 2. Muestra contenido de la sección tras 100ms      |
|                         |                              | Actualización de estado                                                             | Asigna correctamente `currentSection`                                             |
| **Botones de Ayuda**    | `setupHelpButtons()`         | Configuración de event listeners                                                    | Agrega listeners a botones con `data-ayuda`                                       |
|                         |                              | Click en botón de ayuda                                                             | 1. Ejecuta `showHelpContent`y 2. Dispara evento `navigateTo` con ruta correcta  |
| **Contenido de Ayuda**  | `showHelpContent()`          | Llamada con tipo de ayuda ('envios')                                                | Ejecuta `showHelpContent` en la vista con el parámetro correcto                   |
|                         |                              | Actualización de estado                                                             | Asigna correctamente `currentSection`                                             |

###### HomeController
PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/home.controller.test.js            

> test
> jest controller/__tests__/home.controller.test.js

 PASS  controller/__tests__/home.controller.test.js
  HomeController
    Constructor                                                                                                                                                                                     
      √ debería inicializar correctamente con las dependencias inyectadas (3 ms)                                                                                                                    
    showHomePage()                                                                                                                                                                                  
      √ debería llamar a los métodos correctos de la vista y controlador (2 ms)                                                                                                                     
    setupCategoryButtons()                                                                                                                                                                          
      √ debería configurar los botones de categoría correctamente (1 ms)                                                                                                                            
      √ no debería hacer nada si no se encuentra el atributo data-categoria (1 ms)                                                                                                                  
      √ no debería hacer nada si el elemento más cercano no es un botón                                                                                                                             

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       5 passed, 5 total                                                                                                                                                                      
Snapshots:   0 total
Time:        2.092 s
Ran all test suites matching /controller\\__tests__\\home.controller.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Constructor**         | `constructor()`         | Inicialización con dependencias inyectadas                                         | View y ProductController asignados correctamente                                  |
| **Página Principal**    | `showHomePage()`        | Carga inicial de la página                                                         | Llama a: `showHomePage()`, `initCarousel()` y `setupCategoryButtons()` en la View |
|                         |                         |                                                                                     | Ejecuta `showFeaturedProducts()` en ProductController                             |
| **Botones Categoría**   | `setupCategoryButtons()`| Click en botón con atributo `data-categoria` válido                                 | Llama a `showProductsByCategory()` con el ID correcto                             |
|                         |                         | Click en elemento sin atributo `data-categoria`                                     | No ejecuta ninguna acción                                                        |
|                         |                         | Click fuera de botones de categoría                                                 | No ejecuta ninguna acción                                                        |

###### LocationController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/location.controller.test.js        

> test
> jest controller/__tests__/location.controller.test.js

 PASS  controller/__tests__/location.controller.test.js
  LocationController
    Constructor                                                                                                                                                                                     
      √ debería inicializar correctamente con modelo y vista (3 ms)                                                                                                                                 
    showLocationPage                                                                                                                                                                                
      √ debería llamar a showLocationPage de la vista y configurar eventos (2 ms)                                                                                                                   
    setupLocationEvents                                                                                                                                                                             
      √ debería configurar los eventos con los handlers correctos (2 ms)                                                                                                                            
    handleCityChange                                                                                                                                                                                
      √ debería actualizar las opciones de zona cuando cambia la ciudad (1 ms)                                                                                                                      
    handleSearchStores                                                                                                                                                                              
      √ debería buscar tiendas cuando se selecciona ciudad y zona (13 ms)                                                                                                                           
      √ debería manejar el caso cuando no encuentra los selectores (5 ms)                                                                                                                           

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.061 s
Ran all test suites matching /controller\\__tests__\\location.controller.test.js/i.


| Categoría               | Método Probado            | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|---------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Constructor**         | `constructor()`           | Inicialización con modelo y vista                                                   | Modelo y vista asignados correctamente                                           |
| **Visualización**       | `showLocationPage()`      | Llamada inicial                                                                     | Debe mostrar la página y configurar eventos                                      |
| **Configuración**       | `setupLocationEvents()`   | Registro de event handlers                                                          | Configura handlers para cambio de ciudad y búsqueda                              |
| **Manejo de Eventos**   | `handleCityChange()`      | Cambio de ciudad válido                                                             | Actualiza opciones de zona con datos del modelo                                  |
|                         | `handleSearchStores()`    | Búsqueda con ciudad y zona válidas                                                  | Muestra tiendas encontradas                                                      |
|                         |                           | Selectores de ciudad/zona no encontrados                                            | Reporta error y no llama al modelo                                               |

###### PaymentGateway

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/payment.gateway.test.js            

> test
> jest controller/__tests__/payment.gateway.test.js

 PASS  controller/__tests__/payment.gateway.test.js (6.017 s)
  Pasarela de Pagos - PaymentGateway
    Método validateCardNumber                                                                                                                                                                       
      √ valida correctamente un número válido (Luhn) (3 ms)                                                                                                                                         
      √ detecta un número inválido (Luhn) (1 ms)
    Método validateExpiryDate                                                                                                                                                                       
      √ acepta una fecha válida futura (MM/YY) (1 ms)                                                                                                                                               
      √ rechaza una fecha ya vencida (1 ms)                                                                                                                                                         
      √ rechaza una fecha con formato incorrecto (1 ms)                                                                                                                                             
    Método validatePaymentData                                                                                                                                                                      
      √ valida datos de tarjeta válidos (1 ms)                                                                                                                                                      
      √ detecta falta de campos en PayPal (1 ms)                                                                                                                                                    
      √ detecta cuenta bancaria no válida (1 ms)                                                                                                                                                    
    Método processPayment (simulado)                                                                                                                                                                
      √ procesa correctamente tarjeta de prueba exitosa (2701 ms)                                                                                                                                   
      √ rechaza tarjeta de prueba "decline" (2203 ms)                                                                                                                                               
      √ retorna error de validación si faltan datos (1 ms)                                                                                                                                          
    Métodos auxiliares                                                                                                                                                                              
      √ getPaymentMethods devuelve métodos disponibles (1 ms)                                                                                                                                       
      √ getTestCards incluye tarjeta de prueba exitosa (1 ms)                                                                                                                                       
      √ getBanks devuelve lista de bancos                                                                                                                                                           

Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        6.948 s, estimated 7 s
Ran all test suites matching /controller\\__tests__\\payment.gateway.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Validación Tarjeta**  | `validateCardNumber()`  | Número válido (algoritmo Luhn)                                                      | Retorna `true`                                                                    |
|                         |                         | Número inválido                                                                     | Retorna `false`                                                                   |
| **Validación Fecha**    | `validateExpiryDate()`  | Fecha futura válida (MM/YY)                                                         | Retorna `true`                                                                    |
|                         |                         | Fecha vencida                                                                       | Retorna `false`                                                                   |
|                         |                         | Formato incorrecto                                                                  | Retorna `false`                                                                   |
| **Validación General**  | `validatePaymentData()` | Datos de tarjeta completos                                                          | Retorna `{ valid: true }`                                                         |
|                         |                         | Falta campo en PayPal                                                               | Retorna error descriptivo                                                         |
|                         |                         | Cuenta bancaria inválida                                                            | Retorna `{ valid: false }`                                                        |
| **Procesamiento**       | `processPayment()`      | Tarjeta de prueba exitosa                                                           | Retorna `success: true` con ID de transacción                                     |
|                         |                         | Tarjeta de prueba "decline"                                                         | Retorna `success: false` con mensaje de rechazo                                   |
|                         |                         | Datos faltantes                                                                     | Retorna error de validación (`VALIDATION_ERROR`)                                  |
| **Métodos Auxiliares**  | `getPaymentMethods()`   | Consulta métodos disponibles                                                        | Retorna objeto con `card`, `paypal` y `transfer`                                  |
|                         | `getTestCards()`        | Obtiene tarjetas de prueba                                                          | Incluye tarjeta "4111..." para pruebas exitosas                                   |
|                         | `getBanks()`            | Obtiene lista de bancos                                                             | Retorna array no vacío                                                            |

###### ProductController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/product.controller.test.js         

> test
> jest controller/__tests__/product.controller.test.js

  console.log
    Producto encontrado por ID: {
      id_productos: 1,
      nombre_producto: 'Monitor',
      descripcion: 'Alta definición'
    }

      at ProductController.log [as showProductDetails] (controller/product.controller.js:118:29)

  console.log                                                                                                                                                                                       
    Datos completos del producto: {                                                                                                                                                                 
      id_productos: 1,
      nombre_producto: 'Monitor',
      descripcion: 'Alta definición',
      precio: '0',
      unidades_disponibles: 0,
      imagen_url: 'img/default-product.png'
    }

      at ProductController.log [as displayProductDetails] (controller/product.controller.js:178:17)

  console.error
    Error al enviar opinión: TypeError: Cannot set properties of null (setting 'value')
        at ProductController.handleReviewSubmit (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\product.controller.js:266:57)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\product.controller.test.js:91:9)

      271 |             }
      272 |         } catch (error) {
    > 273 |             console.error("Error al enviar opinión:", error);
          |                     ^
      274 |             this.view.showMessage("Error al enviar la opinión", "error");
      275 |         }
      276 |     }

      at ProductController.error [as handleReviewSubmit] (controller/product.controller.js:273:21)
      at Object.<anonymous> (controller/__tests__/product.controller.test.js:91:9)

 PASS  controller/__tests__/product.controller.test.js
  ProductController
    √ showFeaturedProducts muestra productos con descripciones por defecto (5 ms)                                                                                                                   
    √ searchProducts muestra advertencia si el término es muy corto (2 ms)                                                                                                                          
    √ searchProducts busca productos y actualiza la vista (2 ms)                                                                                                                                    
    √ showProductDetails carga y muestra producto por ID (30 ms)                                                                                                                                    
    √ handleReviewSubmit valida y muestra mensaje si la opinión está vacía (1 ms)                                                                                                                   
    √ handleReviewSubmit envía la opinión correctamente (22 ms)                                                                                                                                     

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       6 passed, 6 total                                                                                                                                                                      
Snapshots:   0 total
Time:        2.13 s
Ran all test suites matching /controller\\__tests__\\product.controller.test.js/i.


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Productos Destacados** | `showFeaturedProducts()`     | Productos sin descripción                                                           | Muestra descripción por defecto ("Descripción breve no disponible")               |
|                         |                              | Productos con descripción                                                           | Muestra la descripción original                                                   |
| **Búsqueda**            | `searchProducts()`           | Término muy corto (<3 caracteres)                                                   | Muestra mensaje de advertencia                                                    |
|                         |                              | Término válido                                                                      | Muestra resultados y actualiza URL                                                |
| **Detalles de Producto**| `showProductDetails()`       | Carga de producto existente                                                         | Muestra detalles + reseñas                                                        |
|                         |                              | Producto no encontrado                                                              | Maneja error adecuadamente (no mostrado en pruebas actuales)                      |
| **Reseñas**             | `handleReviewSubmit()`       | Opinión vacía/espacios en blanco                                                    | Muestra mensaje de error                                                          |
|                         |                              | Opinión válida                                                                      | Envía al modelo y muestra mensaje de éxito                                        |
|                         |                              | Reseña anónima                                                                      | Envía flag `es_anonimo=1` al modelo                                               |

###### ProfileController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/profile.controller.test.js 

> test
> jest controller/__tests__/profile.controller.test.js

 PASS  controller/__tests__/profile.controller.test.js
  ProfileController
    Constructor                                                                                                                                                                                     
      √ debería inicializar correctamente con modelo y vista (3 ms)                                                                                                                                 
    showProfilePage                                                                                                                                                                                 
      √ debería redirigir a auth si el usuario no está autenticado (3 ms)                                                                                                                           
      √ no debería mostrar mensaje si ya estamos en la página de auth (4 ms)                                                                                                                        
      √ debería cargar datos del usuario y configurar eventos cuando está autenticado (2 ms)                                                                                                        
      √ debería manejar errores al cargar datos del usuario (1 ms)                                                                                                                                  
    loadUserData                                                                                                                                                                                    
      √ debería cargar los pedidos del usuario correctamente                                                                                                                                        
      √ debería manejar errores al cargar pedidos (13 ms)                                                                                                                                           
    handleLogout                                                                                                                                                                                    
      √ debería cerrar sesión y redirigir a auth (5 ms)                                                                                                                                             
    handleProfileButtonClick                                                                                                                                                                        
      √ debería mostrar la sección correcta según el botón (2 ms)                                                                                                                                   
      √ no debería hacer nada si el botón no tiene sección asociada (1 ms)                                                                                                                          
    getSectionIdFromButtonId
      √ debería mapear correctamente los botones a secciones (1 ms)                                                                                                                                 
    handleDataFormSubmit                                                                                                                                                                            
      √ debería validar datos antes de enviar                                                                                                                                                       
      √ debería actualizar datos cuando el formulario es válido                                                                                                                                     
      √ debería manejar errores del servidor (1 ms)                                                                                                                                                 
      √ debería manejar errores de conexión (1 ms)                                                                                                                                                  
    refreshUserOrders                                                                                                                                                                               
      √ debería actualizar la lista de pedidos correctamente (1 ms)                                                                                                                                 
      √ debería manejar errores al actualizar pedidos (1 ms)                                                                                                                                        

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       17 passed, 17 total                                                                                                                                                                    
Snapshots:   0 total
Time:        2.1 s
Ran all test suites matching /controller\\__tests__\\profile.controller.test.js/i.


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Constructor**         | `constructor()`              | Inicialización con modelo y vista                                                   | Asigna correctamente modelo, vista y establece el controlador en la vista         |
| **Autenticación**       | `showProfilePage()`          | Usuario no autenticado                                                              | Redirige a `/auth` con mensaje de advertencia                                     |
|                         |                              | Usuario autenticado                                                                 | Carga datos del usuario y configura eventos                                       |
|                         |                              | Error al cargar datos                                                               | Muestra mensaje de error                                                          |
| **Datos de Usuario**    | `loadUserData()`             | Carga exitosa de pedidos                                                            | Almacena pedidos en `userOrders`                                                 |
|                         |                              | Error al cargar pedidos                                                             | Retorna array vacío y registra error                                              |
| **Sesión**             | `handleLogout()`             | Cierre de sesión                                                                    | Ejecuta logout, muestra mensaje y redirige a `/auth` después de 1s               |
| **Navegación**         | `handleProfileButtonClick()` | Click en botón válido (ej. "gestion-de-pedidos")                                    | Muestra sección correspondiente y dispara evento `profileSectionLoaded`          |
|                         |                              | Click en botón inválido                                                             | No realiza acción                                                                 |
| **Helpers**            | `getSectionIdFromButtonId()` | Mapeo de IDs de botón a secciones                                                   | Retorna ID de sección correcto o string vacío para IDs desconocidos               |
| **Formularios**        | `handleDataFormSubmit()`     | Formulario inválido (campos vacíos)                                                 | Muestra error sin llamar al modelo                                                |
|                         |                              | Formulario válido                                                                   | Actualiza datos, muestra éxito y dispara evento `userDataUpdated`                |
|                         |                              | Error del servidor                                                                  | Muestra mensaje de error específico                                              |
|                         |                              | Error de conexión                                                                   | Muestra mensaje genérico de error                                                |
| **Actualización**      | `refreshUserOrders()`        | Actualización exitosa                                                               | Refresca HTML de pedidos y retorna `true`                                        |
|                         |                              | Error al actualizar                                                                 | Muestra error y retorna `false`                                                  |

###### RecoveryController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test controller/__tests__/recovery.controller.test.js

> test
> jest controller/__tests__/recovery.controller.test.js

  console.error
    Error al verificar el correo: Error: Error de red
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\recovery.controller.test.js:155:56)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      137 |             this.view.updateButtonState("form-solicitar-codigo-btn", false, "Continuar")
      138 |         } catch (error) {
    > 139 |             console.error("Error al verificar el correo:", error)
          |                     ^
      140 |             this.view.showError(errorElementId, "Error al verificar el correo. Inténtalo de nuevo.")
      141 |             this.view.updateButtonState("form-solicitar-codigo-btn", false, "Continuar")
      142 |         }

      at RecoveryController.error [as handleEmailSubmit] (controller/recovery.controller.js:139:21)
      at Object.<anonymous> (controller/__tests__/recovery.controller.test.js:157:13)

  console.error
    Error al enviar el código de verificación: Error: Error de red
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\recovery.controller.test.js:226:65)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      193 |             this.view.updateButtonState("form-nueva-password-btn", false, "Continuar")
      194 |         } catch (error) {
    > 195 |             console.error("Error al enviar el código de verificación:", error)
          |                     ^
      196 |             this.view.showError(errorElementId, "Error al enviar el código de verificación. Inténtalo de nuevo.")
      197 |             this.view.updateButtonState("form-nueva-password-btn", false, "Continuar")
      198 |         }

      at RecoveryController.error [as handlePasswordSubmit] (controller/recovery.controller.js:195:21)
      at Object.<anonymous> (controller/__tests__/recovery.controller.test.js:228:13)

  console.error
    Error al actualizar la contraseña: Error: Error de red
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\recovery.controller.test.js:330:55)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      273 |             this.view.showNotification("¡Contraseña actualizada correctamente!", "success")
      274 |         } catch (error) {
    > 275 |             console.error("Error al actualizar la contraseña:", error)
          |                     ^
      276 |             this.view.showError(errorElementId, "Error al actualizar la contraseña. Inténtalo de nuevo.")
      277 |             this.view.updateButtonState("form-verificar-codigo-btn", false, "Verificar código")
      278 |         }

      at RecoveryController.error [as handleCodeSubmit] (controller/recovery.controller.js:275:21)
      at Object.<anonymous> (controller/__tests__/recovery.controller.test.js:332:13)

  console.error                                                                                                                                                                                     
    Error al reenviar el código: Error: Error de red                                                                                                                                                
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\controller\__tests__\recovery.controller.test.js:366:65)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      333 |             }, 3000)
      334 |         } catch (error) {
    > 335 |             console.error("Error al reenviar el código:", error)
          |                     ^
      336 |             this.view.showError(errorElementId, "Error al reenviar el código. Inténtalo de nuevo.")
      337 |
      338 |             const resendBtn = document.getElementById("resend-code")

      at RecoveryController.error [as resendVerificationCode] (controller/recovery.controller.js:335:21)
      at Object.<anonymous> (controller/__tests__/recovery.controller.test.js:368:13)

 PASS  controller/__tests__/recovery.controller.test.js
  RecoveryController
    Constructor
      √ debería inicializar correctamente con los valores por defecto (4 ms)                                                                                                                        
    showRecoveryPage                                                                                                                                                                                
      √ debería llamar a showRecoveryPage de la vista y configurar los listeners (2 ms)                                                                                                             
    handleEmailSubmit                                                                                                                                                                               
      √ debería mostrar error si el correo está vacío (16 ms)                                                                                                                                       
      √ debería mostrar error si el correo no es válido (4 ms)                                                                                                                                      
      √ debería verificar el correo con el modelo si es válido (3 ms)                                                                                                                               
      √ debería mostrar error si el correo no existe (3 ms)                                                                                                                                         
      √ debería manejar errores al verificar el correo (45 ms)                                                                                                                                      
    handlePasswordSubmit                                                                                                                                                                            
      √ debería mostrar error si la contraseña no cumple los requisitos (3 ms)                                                                                                                      
      √ debería mostrar error si las contraseñas no coinciden (2 ms)                                                                                                                                
      √ debería solicitar código de verificación si todo es válido (3 ms)                                                                                                                           
      √ debería manejar errores al solicitar el código (9 ms)                                                                                                                                       
    handleCodeSubmit                                                                                                                                                                                
      √ debería mostrar error si el código no está completo (20 ms)                                                                                                                                 
      √ debería mostrar error si el código es incorrecto (3 ms)                                                                                                                                     
      √ debería bloquear después de máximo de intentos (2 ms)                                                                                                                                       
      √ debería resetear la contraseña si el código es válido (3 ms)                                                                                                                                
      √ debería manejar errores al resetear la contraseña (7 ms)                                                                                                                                    
    resendVerificationCode                                                                                                                                                                          
      √ debería reenviar el código correctamente (4 ms)                                                                                                                                             
      √ debería manejar errores al reenviar el código (7 ms)                                                                                                                                        
    togglePasswordVisibility                                                                                                                                                                        
      √ debería cambiar la visibilidad de la contraseña (4 ms)                                                                                                                                      
    validatePasswordRequirements                                                                                                                                                                    
      √ debería validar correctamente los requisitos de la contraseña                                                                                                                               
    goToStep                                                                                                                                                                                        
      √ debería actualizar el paso actual y mostrarlo en la vista                                                                                                                                   
    isValidEmail                                                                                                                                                                                    
      √ debería validar correctamente los correos electrónicos                                                                                                                                      
    isValidPassword                                                                                                                                                                                 
      √ debería validar correctamente las contraseñas (1 ms)                                                                                                                                        

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       23 passed, 23 total                                                                                                                                                                    
Snapshots:   0 total
Time:        2.247 s, estimated 4 s
Ran all test suites matching /controller\\__tests__\\recovery.controller.test.js/i.


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Constructor**         | `constructor()`              | Inicialización con modelo y vista                                                   | Asigna correctamente las dependencias y valores iniciales                         |
| **Flujo de Recuperación** | `showRecoveryPage()`        | Mostrar página de recuperación                                                     | Llama a la vista para mostrar la página y configura listeners                     |
| **Validación de Email** | `handleEmailSubmit()`        | Correo vacío                                                                       | Muestra error "Ingresa tu correo"                                                 |
|                         |                              | Correo inválido                                                                    | Muestra error "Correo no válido"                                                  |
|                         |                              | Correo no registrado                                                               | Muestra error "No existe una cuenta con este correo"                              |
|                         |                              | Correo válido                                                                      | Verifica con el modelo y avanza al paso 2                                         |
|                         |                              | Error de red al verificar                                                          | Muestra error "Error al verificar el correo"                                      |
| **Contraseña Nueva**    | `handlePasswordSubmit()`     | Contraseña no cumple requisitos                                                    | Muestra error indicando requisitos incumplidos                                   |
|                         |                              | Contraseñas no coinciden                                                           | Muestra error "Las contraseñas no coinciden"                                      |
|                         |                              | Datos válidos                                                                      | Solicita código de verificación y avanza al paso 3                                |
|                         |                              | Error al solicitar código                                                          | Muestra error "Error al enviar el código"                                         |
| **Verificación Código** | `handleCodeSubmit()`         | Código incompleto                                                                  | Muestra error "Ingresa el código completo"                                        |
|                         |                              | Código incorrecto (intentos < 3)                                                   | Muestra intentos restantes y animación de error                                   |
|                         |                              | Código incorrecto (3 intentos)                                                     | Bloquea el formulario y pide nuevo código                                         |
|                         |                              | Código válido                                                                      | Restablece contraseña y muestra confirmación                                      |
|                         |                              | Error al restablecer                                                               | Muestra error "Error al actualizar la contraseña"                                 |
| **Reenvío de Código**   | `resendVerificationCode()`   | Reenvío exitoso                                                                    | Reinicia intentos y muestra confirmación                                          |
|                         |                              | Error al reenviar                                                                  | Muestra error y mantiene botón habilitado                                         |
| **Helpers**             | `togglePasswordVisibility()` | Alternar visibilidad contraseña                                                    | Cambia tipo de input entre password/text                                          |
|                         | `validatePasswordRequirements()` | Validar requisitos contraseña                                                 | Actualiza vista con estado de cada requisito                                      |
|                         | `goToStep()`                 | Cambio de paso                                                                    | Actualiza paso actual y muestra la vista correspondiente                          |
|                         | `isValidEmail()`             | Validación formato email                                                           | Retorna true/false según formato                                                  |
|                         | `isValidPassword()`          | Validación fortaleza contraseña                                                    | Retorna true si cumple todos los requisitos                                       |


##### Modelos
###### CartModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/cart.view.test.js                        

> test
> jest view/__tests__/cart.view.test.js

 PASS  view/__tests__/cart.view.test.js
  CartView
    updateCartDisplay                                                                                                                                                                               
      √ debe mostrar carrito vacío cuando no hay items (26 ms)                                                                                                                                      
      √ debe renderizar items correctamente (38 ms)                                                                                                                                                 
    Manejo de Eventos del Carrito                                                                                                                                                                   
      √ debe manejar aumento de cantidad (14 ms)                                                                                                                                                    
      √ debe manejar eliminación de producto (12 ms)                                                                                                                                                
    Checkout Process                                                                                                                                                                                
      √ debe renderizar métodos de pago (22 ms)                                                                                                                                                     
      √ debe manejar cambio de método de pago (22 ms)                                                                                                                                               
      √ debe recolectar datos de tarjeta correctamente (10 ms)                                                                                                                                      
    Manejo de Errores                                                                                                                                                                               
      √ debe manejar contenedor no encontrado (3 ms)                                                                                                                                                
    Notificaciones                                                                                                                                                                                  
      √ debe mostrar mensajes de notificación (3 ms)                                                                                                                                                

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.246 s
Ran all test suites matching /view\\__tests__\\cart.view.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Inicialización**      | `constructor()`         | Carrito vacío sin datos en localStorage                                            | Inicializa carrito vacío                                                         |
|                         |                         | Carga items existentes desde localStorage                                          | Recupera items correctamente                                                     |
|                         |                         | Datos inválidos en localStorage                                                    | Inicializa carrito vacío                                                         |
| **Agregar Items**       | `addToCart()`           | Producto nuevo                                                                      | Agrega producto con cantidad=1                                                   |
|                         |                         | Producto existente                                                                  | Incrementa cantidad                                                              |
|                         |                         | IDs numéricos/strings                                                              | Maneja ambos formatos como iguales                                               |
|                         |                         | Producto inválido                                                                   | Devuelve error                                                                   |
|                         |                         | Operaciones concurrentes                                                           | Bloquea operaciones duplicadas                                                   |
| **Verificación**        | `isProductInCart()`     | Producto existente                                                                  | Devuelve true                                                                    |
|                         |                         | Producto no existente                                                              | Devuelve false                                                                   |
|                         |                         | IDs numéricos/strings                                                              | Maneja ambos formatos                                                            |
| **Actualización**       | `updateQuantity()`      | Cantidad válida (positiva)                                                         | Actualiza cantidad                                                               |
|                         |                         | Cantidad 0 o negativa                                                              | Elimina producto                                                                 |
|                         |                         | Producto no existente                                                              | Devuelve error                                                                   |
|                         |                         | Operaciones concurrentes                                                           | Bloquea operaciones duplicadas                                                   |
| **Eliminación**         | `removeFromCart()`      | Producto existente                                                                  | Elimina del carrito                                                              |
|                         |                         | Producto no existente                                                              | Devuelve error                                                                   |
|                         |                         | Operaciones concurrentes                                                           | Bloquea operaciones duplicadas                                                   |
| **Cálculos**           | `getCartTotal()`        | Múltiples productos                                                                | Suma correctamente                                                               |
|                         |                         | Carrito vacío                                                                       | Devuelve 0                                                                       |
|                         |                         | Precios inválidos                                                                   | Maneja error (devuelve 0)                                                        |
| **Limpieza**           | `clearCart()`           | Carrito con items                                                                   | Vacía completamente                                                              |
| **Verificación Email** | `verifyUserEmail()`     | Email existente                                                                     | Devuelve datos usuario                                                           |
|                         |                         | Email no existente                                                                  | Devuelve false                                                                   |
|                         |                         | Error de red                                                                        | Devuelve false                                                                   |
| **Concurrencia**       | Múltiples métodos       | Operaciones simultáneas                                                            | Mantiene integridad de datos                                                     |

###### LocationModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test model/__tests__/location.model.test.js                  

> test
> jest model/__tests__/location.model.test.js

 PASS  model/__tests__/location.model.test.js
  LocationModel
    getAllCities                                                                                                                                                                                    
      √ debería devolver todas las ciudades disponibles (3 ms)                                                                                                                                      
      √ el resultado debería ser un array                                                                                                                                                           
    getZonesByCity                                                                                                                                                                                  
      √ debería devolver las zonas para una ciudad existente (1 ms)                                                                                                                                 
      √ debería devolver un array vacío para una ciudad inexistente (1 ms)                                                                                                                          
      √ debería ser case sensitive (1 ms)                                                                                                                                                           
    getStoresByCityAndZone                                                                                                                                                                          
      √ debería devolver las tiendas para una ciudad y zona existentes (2 ms)                                                                                                                       
      √ debería devolver un array vacío para una ciudad inexistente (1 ms)                                                                                                                          
      √ debería devolver un array vacío para una zona inexistente (1 ms)                                                                                                                            
      √ debería devolver la estructura correcta de los objetos tienda (1 ms)                                                                                                                        
    estructura de datos                                                                                                                                                                             
      √ debería tener las ciudades correctas (1 ms)                                                                                                                                                 
      √ cada tienda debería tener las propiedades requeridas (3 ms)                                                                                                                                 

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        2.025 s
Ran all test suites matching /model\\__tests__\\location.model.test.js/i.


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Ciudades**            | `getAllCities()`             | Obtener listado completo de ciudades                                                | Devuelve array con ['bogota', 'medellin', 'cali', 'barranquilla']                |
|                         |                              | Validar tipo de retorno                                                             | Devuelve un array                                                                |
| **Zonas**               | `getZonesByCity()`           | Ciudad existente (ej. 'bogota')                                                     | Devuelve zonas correspondientes (ej. ['engativa', 'puente-aranda', 'usme'])      |
|                         |                              | Ciudad inexistente                                                                  | Devuelve array vacío []                                                          |
|                         |                              | Validar case sensitive                                                              | No reconoce variaciones de mayúsculas (ej. 'Bogota' → [])                        |
| **Tiendas**             | `getStoresByCityAndZone()`   | Ciudad y zona existentes (ej. 'bogota', 'engativa')                                 | Devuelve array de tiendas con estructura completa                                |
|                         |                              | Ciudad inexistente                                                                  | Devuelve array vacío []                                                          |
|                         |                              | Zona inexistente                                                                    | Devuelve array vacío []                                                          |
|                         |                              | Validar estructura de tiendas                                                       | Cada tienda tiene: nombre, direccion, horario, lat, lng                          |
| **Validación Estructura**| -                            | Todas las ciudades registradas                                                      | Contiene exactamente: bogota, medellin, cali, barranquilla                       |
|                         |                              | Propiedades de todas las tiendas                                                    | Cada tienda en todas las ciudades/zona tiene propiedades requeridas               |

###### ProductModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test model/__tests__/product.model.test.js                   

> test
> jest model/__tests__/product.model.test.js

  console.error
    Error al obtener productos destacados: Error: Error de red
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\product.model.test.js:29:41)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      16 |             return data
      17 |         } catch (error) {
    > 18 |             console.error("Error al obtener productos destacados:", error)
         |                     ^
      19 |             return []
      20 |         }
      21 |         }

      at ProductModel.error [as getFeaturedProducts] (model/product.model.js:18:21)
      at Object.<anonymous> (model/__tests__/product.model.test.js:31:28)

  console.error                                                                                                                                                                                     
    Error al obtener productos por categoría: Error: Error al obtener productos por categoría
        at ProductModel.getProductsByCategory (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\product.model.js:32:19)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\product.model.test.js:56:28)

      35 |             return data
      36 |         } catch (error) {
    > 37 |             console.error("Error al obtener productos por categoría:", error)
         |                     ^
      38 |             return []
      39 |         }
      40 |         }

      at ProductModel.error [as getProductsByCategory] (model/product.model.js:37:21)
      at Object.<anonymous> (model/__tests__/product.model.test.js:56:28)

  console.log                                                                                                                                                                                       
    Datos del producto recibidos: { id: '456', name: 'Producto Detallado', price: 99.99 }                                                                                                           

      at ProductModel.log [as getProductDetails] (model/product.model.js:76:25)

  console.error                                                                                                                                                                                     
    Error al obtener detalles del producto: Error: Error al obtener detalles del producto                                                                                                           
        at ProductModel.getProductDetails (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\product.model.js:71:27)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\product.model.test.js:107:28)

      78 |                 return data;
      79 |             } catch (error) {
    > 80 |                 console.error("Error al obtener detalles del producto:", error);
         |                         ^
      81 |                 return null;
      82 |             }
      83 |         }

      at ProductModel.error [as getProductDetails] (model/product.model.js:80:25)
      at Object.<anonymous> (model/__tests__/product.model.test.js:107:28)

  console.error
    Error al obtener opiniones del producto: Error: Error al obtener opiniones del producto
        at ProductModel.getProductReviews (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\product.model.js:94:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\product.model.test.js:135:28)

       97 |                 return data
       98 |             } catch (error) {
    >  99 |                 console.error("Error al obtener opiniones del producto:", error)
          |                         ^
      100 |                 return []
      101 |             }
      102 |         }

      at ProductModel.error [as getProductReviews] (model/product.model.js:99:25)
      at Object.<anonymous> (model/__tests__/product.model.test.js:135:28)

  console.error                                                                                                                                                                                     
    Error al enviar opinión: Error: Error de servidor                                                                                                                                               
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\product.model.test.js:173:41)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      124 |             return { success: true, data }
      125 |         } catch (error) {
    > 126 |             console.error("Error al enviar opinión:", error)
          |                     ^
      127 |             return {
      128 |             success: false,
      129 |             error: error.message || "No se pudo enviar la opinión. Intenta de nuevo más tarde.",

      at ProductModel.error [as submitProductReview] (model/product.model.js:126:21)
      at Object.<anonymous> (model/__tests__/product.model.test.js:175:28)

  console.error                                                                                                                                                                                     
    Error al enviar opinión: Error: Error al enviar la opinión                                                                                                                                      
        at ProductModel.submitProductReview (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\product.model.js:120:19)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\product.model.test.js:193:28)

      124 |             return { success: true, data }
      125 |         } catch (error) {
    > 126 |             console.error("Error al enviar opinión:", error)
          |                     ^
      127 |             return {
      128 |             success: false,
      129 |             error: error.message || "No se pudo enviar la opinión. Intenta de nuevo más tarde.",

      at ProductModel.error [as submitProductReview] (model/product.model.js:126:21)
      at Object.<anonymous> (model/__tests__/product.model.test.js:193:28)

 PASS  model/__tests__/product.model.test.js
  ProductModel
    getFeaturedProducts                                                                                                                                                                             
      √ debería retornar productos destacados cuando la llamada es exitosa (3 ms)                                                                                                                   
      √ debería retornar array vacío cuando la llamada falla (38 ms)                                                                                                                                
    getProductsByCategory                                                                                                                                                                           
      √ debería retornar productos por categoría cuando la llamada es exitosa (1 ms)                                                                                                                
      √ debería retornar array vacío cuando la categoría no existe (8 ms)                                                                                                                           
    searchProducts                                                                                                                                                                                  
      √ debería retornar productos que coincidan con el término de búsqueda (1 ms)                                                                                                                  
      √ debería manejar correctamente términos de búsqueda con espacios (1 ms)                                                                                                                      
    getProductDetails                                                                                                                                                                               
      √ debería retornar detalles del producto cuando existe (4 ms)                                                                                                                                 
      √ debería retornar null cuando el producto no existe (3 ms)                                                                                                                                   
    getProductReviews                                                                                                                                                                               
      √ debería retornar opiniones del producto cuando existen (1 ms)                                                                                                                               
      √ debería retornar array vacío cuando no hay opiniones (4 ms)                                                                                                                                 
    submitProductReview                                                                                                                                                                             
      √ debería enviar correctamente una opinión y retornar éxito (1 ms)                                                                                                                            
      √ debería manejar errores al enviar una opinión (4 ms)                                                                                                                                        
      √ debería manejar respuestas no exitosas del servidor (3 ms)                                                                                                                                  

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       13 passed, 13 total                                                                                                                                                                    
Snapshots:   0 total
Time:        2.087 s
Ran all test suites matching /model\\__tests__\\product.model.test.js/i.

| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Productos Destacados** | `getFeaturedProducts()`      | Llamada exitosa                                                                     | Retorna array de productos destacados                                            |
|                         |                              | Error de red                                                                        | Retorna array vacío                                                              |
| **Productos por Categoría** | `getProductsByCategory()` | Llamada exitosa                                                                     | Retorna productos de la categoría especificada                                   |
|                         |                              | Categoría no existe                                                                 | Retorna array vacío                                                              |
| **Búsqueda**           | `searchProducts()`           | Término de búsqueda válido                                                         | Retorna productos que coinciden con el término                                   |
|                         |                              | Término con espacios                                                                | Codifica correctamente la URL                                                    |
| **Detalles de Producto** | `getProductDetails()`      | Producto existe                                                                     | Retorna objeto con detalles del producto                                         |
|                         |                              | Producto no existe                                                                  | Retorna null                                                                     |
| **Opiniones**          | `getProductReviews()`        | Opiniones existentes                                                                | Retorna array de opiniones                                                       |
|                         |                              | Sin opiniones                                                                       | Retorna array vacío                                                              |
| **Envío de Opiniones** | `submitProductReview()`      | Envío exitoso                                                                       | Retorna objeto con `success: true` y datos de la opinión                         |
|                         |                              | Error de red                                                                        | Retorna objeto con `success: false` y mensaje de error                           |
|                         |                              | Respuesta no exitosa del servidor                                                   | Retorna objeto con `success: false`                                              |

###### RecoveryModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test model/__tests__/recovery.model.test.js

> test
> jest model/__tests__/recovery.model.test.js

  console.error
    Error en checkUserEmail: Error: Error HTTP: 404
        at RecoveryModel.checkUserEmail (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:27:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:41:13)

      31 |             return data.exists
      32 |         } catch (error) {
    > 33 |             console.error("Error en checkUserEmail:", error)
         |                     ^
      34 |             throw error
      35 |         }
      36 |     }

      at RecoveryModel.error [as checkUserEmail] (model/recovery.model.js:33:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:41:13)

  console.error                                                                                                                                                                                     
    Error en checkUserEmail: Error: Network error                                                                                                                                                   
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:47:41)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)  
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      31 |             return data.exists
      32 |         } catch (error) {
    > 33 |             console.error("Error en checkUserEmail:", error)
         |                     ^
      34 |             throw error
      35 |         }
      36 |     }

      at RecoveryModel.error [as checkUserEmail] (model/recovery.model.js:33:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:49:13)

  console.error                                                                                                                                                                                     
    Error en requestVerificationCode: Error: El correo no está registrado                                                                                                                           
        at RecoveryModel.requestVerificationCode (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:55:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:80:13)

      59 |             return data.success
      60 |         } catch (error) {
    > 61 |             console.error("Error en requestVerificationCode:", error)
         |                     ^
      62 |             throw error
      63 |         }
      64 |     }

      at RecoveryModel.error [as requestVerificationCode] (model/recovery.model.js:61:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:80:13)

  console.error
    Error en requestVerificationCode: Error: Error al enviar el código de verificación
        at RecoveryModel.requestVerificationCode (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:55:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:91:13)

      59 |             return data.success
      60 |         } catch (error) {
    > 61 |             console.error("Error en requestVerificationCode:", error)
         |                     ^
      62 |             throw error
      63 |         }
      64 |     }

      at RecoveryModel.error [as requestVerificationCode] (model/recovery.model.js:61:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:91:13)

  console.error                                                                                                                                                                                     
    Error en verifyCode: Error: Código inválido                                                                                                                                                     
        at RecoveryModel.verifyCode (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:84:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:122:13)

      88 |             return data.success
      89 |         } catch (error) {
    > 90 |             console.error("Error en verifyCode:", error)
         |                     ^
      91 |             throw error
      92 |         }
      93 |     }

      at RecoveryModel.error [as verifyCode] (model/recovery.model.js:90:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:122:13)

  console.error                                                                                                                                                                                     
    Error en verifyCode: Error: Error al verificar el código                                                                                                                                        
        at RecoveryModel.verifyCode (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:84:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:133:13)

      88 |             return data.success
      89 |         } catch (error) {
    > 90 |             console.error("Error en verifyCode:", error)
         |                     ^
      91 |             throw error
      92 |         }
      93 |     }

      at RecoveryModel.error [as verifyCode] (model/recovery.model.js:90:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:133:13)

  console.error
    Error en resetPassword: Error: El código ha expirado
        at RecoveryModel.resetPassword (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:114:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:172:13)

      118 |             return data.success
      119 |         } catch (error) {
    > 120 |             console.error("Error en resetPassword:", error)
          |                     ^
      121 |             throw error
      122 |         }
      123 |     }

      at RecoveryModel.error [as resetPassword] (model/recovery.model.js:120:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:172:13)

  console.error                                                                                                                                                                                     
    Error en resetPassword: Error: Error al actualizar la contraseña                                                                                                                                
        at RecoveryModel.resetPassword (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\recovery.model.js:114:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\recovery.model.test.js:183:13)

      118 |             return data.success
      119 |         } catch (error) {
    > 120 |             console.error("Error en resetPassword:", error)
          |                     ^
      121 |             throw error
      122 |         }
      123 |     }

      at RecoveryModel.error [as resetPassword] (model/recovery.model.js:120:21)
      at Object.<anonymous> (model/__tests__/recovery.model.test.js:183:13)

 PASS  model/__tests__/recovery.model.test.js
  RecoveryModel
    checkUserEmail                                                                                                                                                                                  
      √ debe retornar true cuando el usuario existe (4 ms)                                                                                                                                          
      √ debe lanzar un error cuando la respuesta no es ok (43 ms)                                                                                                                                   
      √ debe lanzar un error cuando hay un problema de red (6 ms)                                                                                                                                   
    requestVerificationCode                                                                                                                                                                         
      √ debe retornar true cuando el envío es exitoso (1 ms)                                                                                                                                        
      √ debe lanzar un error con el mensaje del servidor cuando la respuesta no es ok (5 ms)                                                                                                        
      √ debe lanzar un error genérico cuando no hay mensaje en la respuesta (5 ms)                                                                                                                  
    verifyCode                                                                                                                                                                                      
      √ debe retornar true cuando el código es correcto (1 ms)                                                                                                                                      
      √ debe lanzar un error con el mensaje del servidor cuando el código es incorrecto (3 ms)                                                                                                      
      √ debe lanzar un error genérico cuando no hay mensaje en la respuesta (4 ms)                                                                                                                  
    resetPassword                                                                                                                                                                                   
      √ debe retornar true cuando el restablecimiento es exitoso (1 ms)                                                                                                                             
      √ debe lanzar un error con el mensaje del servidor cuando el restablecimiento falla (3 ms)                                                                                                    
      √ debe lanzar un error genérico cuando no hay mensaje en la respuesta (3 ms)                                                                                                                  

Test Suites: 1 passed, 1 total                                                                                                                                                                      
Tests:       12 passed, 12 total                                                                                                                                                                    
Snapshots:   0 total
Time:        2.067 s
Ran all test suites matching /model\\__tests__\\recovery.model.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Verificación Email**  | `checkUserEmail()`      | Email existe en el sistema                                                          | Retorna `true`                                                                    |
|                         |                         | Respuesta HTTP fallida (404)                                                        | Lanza error con mensaje "Error HTTP: 404"                                        |
|                         |                         | Error de red                                                                        | Lanza error con mensaje "Network error"                                          |
| **Código Verificación** | `requestVerificationCode()` | Envío exitoso del código                                                         | Retorna `true`                                                                    |
|                         |                         | Email no registrado                                                                 | Lanza error con mensaje del servidor                                             |
|                         |                         | Respuesta fallida sin mensaje                                                      | Lanza error genérico "Error al enviar el código"                                 |
| **Validación Código**   | `verifyCode()`          | Código correcto                                                                    | Retorna `true`                                                                    |
|                         |                         | Código incorrecto                                                                  | Lanza error con mensaje del servidor                                             |
|                         |                         | Respuesta fallida sin mensaje                                                      | Lanza error genérico "Error al verificar el código"                              |
| **Restablecimiento**    | `resetPassword()`       | Contraseña actualizada exitosamente                                                | Retorna `true`                                                                    |
|                         |                         | Código expirado                                                                    | Lanza error con mensaje "El código ha expirado"                                  |
|                         |                         | Respuesta fallida sin mensaje                                                      | Lanza error genérico "Error al actualizar la contraseña"                         |

###### UserModel
PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test model/__tests__/user.model.test.js                      

> test
> jest model/__tests__/user.model.test.js

  console.log
    Sesión recuperada: { id_usuario: 1, nombre: 'Test User' }

      at UserModel.log [as initSession] (model/user.model.js:16:25)

  console.error
    Error al recuperar la sesión: SyntaxError: Unexpected token 'i', "invalid-json" is not valid JSON
        at JSON.parse (<anonymous>)
        at UserModel.parse [as initSession] (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\user.model.js:14:41)
        at new initSession (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\user.model.js:5:14)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\user.model.test.js:49:31)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\node_modules\jest-runner\build\runTest.js:444:34)

      17 |                 return true;
      18 |             } catch (error) {
    > 19 |                 console.error("Error al recuperar la sesión:", error);
         |                         ^
      20 |                 this.clearSession();
      21 |                 return false;
      22 |             }

      at UserModel.error [as initSession] (model/user.model.js:19:25)
      at new initSession (model/user.model.js:5:14)
      at Object.<anonymous> (model/__tests__/user.model.test.js:49:31)

  console.log                                                                                                                                                                          
    Datos del usuario recibidos: { id_usuario: 1, nombre: 'Test User' }                                                                                                                

      at UserModel.log [as login] (model/user.model.js:53:21)

  console.log                                                                                                                                                                          
    Datos del usuario recibidos: undefined

      at UserModel.log [as login] (model/user.model.js:53:21)

  console.error                                                                                                                                                                        
    Error al iniciar sesión: Error: Credenciales inválidas                                                                                                                             
        at UserModel.login (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\user.model.js:56:23)
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend\model\__tests__\user.model.test.js:96:28)

      65 |             return { success: true, user: data.usuario };
      66 |         } catch (error) {
    > 67 |             console.error("Error al iniciar sesión:", error);
         |                     ^
      68 |             return {
      69 |                 success: false,
      70 |                 error: error.message || "Error al iniciar sesión. Verifica tus credenciales.",

      at UserModel.error (model/user.model.js:67:21)
      at Object.<anonymous> (model/__tests__/user.model.test.js:96:28)

 PASS  model/__tests__/user.model.test.js
  UserModel
    initSession                                                                                                                                                                        
      √ debería recuperar la sesión si hay datos en localStorage (33 ms)                                                                                                               
      √ debería limpiar la sesión si los datos son inválidos (26 ms)                                                                                                                   
      √ no debería recuperar sesión si no hay datos en localStorage (1 ms)                                                                                                             
    login                                                                                                                                                                              
      √ debería iniciar sesión correctamente (4 ms)                                                                                                                                    
      √ debería fallar si las credenciales son incorrectas (7 ms)                                                                                                                      
    register                                                                                                                                                                           
      √ debería registrar un nuevo usuario correctamente (1 ms)                                                                                                                        
    logout                                                                                                                                                                             
      √ debería cerrar sesión correctamente (2 ms)                                                                                                                                     
    updateUserData                                                                                                                                                                     
      √ debería actualizar los datos del usuario (1 ms)                                                                                                                                
    getUserOrders                                                                                                                                                                      
      √ debería devolver pedidos vacíos si no está autenticado (1 ms)                                                                                                                  
      √ debería obtener y procesar los pedidos del usuario (2 ms)                                                                                                                      
    getOrderDetails                                                                                                                                                                    
      √ debería obtener detalles del pedido (1 ms)                                                                                                                                     

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       11 passed, 11 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.099 s
Ran all test suites matching /model\\__tests__\\user.model.test.js/i.

| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Inicialización**      | `initSession()`         | Datos válidos en localStorage                                                       | Recupera sesión y marca como autenticado                                         |
|                         |                         | Datos inválidos en localStorage                                                     | Limpia sesión y marca como no autenticado                                        |
|                         |                         | Sin datos en localStorage                                                           | Mantiene estado no autenticado                                                   |
| **Autenticación**       | `login()`               | Credenciales correctas                                                              | Inicia sesión, almacena token y datos de usuario                                 |
|                         |                         | Credenciales incorrectas                                                            | Devuelve error y no inicia sesión                                                |
| **Registro**           | `register()`            | Datos de registro válidos                                                           | Crea nueva cuenta e inicia sesión automáticamente                                |
| **Cierre de Sesión**   | `logout()`              | Usuario autenticado                                                                 | Limpia datos de sesión y token                                                   |
| **Actualización**      | `updateUserData()`      | Datos válidos con usuario autenticado                                               | Actualiza información del usuario y localStorage                                 |
| **Pedidos**           | `getUserOrders()`       | Usuario no autenticado                                                              | Devuelve array vacío                                                             |
|                         |                         | Usuario autenticado con pedidos                                                     | Devuelve lista de pedidos formateada                                             |
| **Detalles de Pedido**| `getOrderDetails()`     | ID de pedido válido                                                                 | Devuelve detalles del pedido con estado formateado                               |

##### Utilidades

###### MessageUtils

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test utils/__tests__/message.utils.test.js                   

> test
> jest utils/__tests__/message.utils.test.js

 PASS  utils/__tests__/message.utils.test.js
  NotificationUtils
    showMessage                                                                                                                                                                        
      √ debe crear y mostrar un mensaje con los estilos correctos (18 ms)                                                                                                              
      √ debe eliminar notificaciones existentes antes de mostrar una nueva (4 ms)                                                                                                      
      √ debe aplicar los estilos correctos según el tipo de mensaje (12 ms)                                                                                                            
      √ debe ocultar y eliminar el mensaje después del tiempo establecido (5 ms)                                                                                                       
    métodos de conveniencia                                                                                                                                                            
      √ showSuccess debe llamar a showMessage con tipo success (2 ms)                                                                                                                  
      √ showError debe llamar a showMessage con tipo error (2 ms)                                                                                                                      
      √ showWarning debe llamar a showMessage con tipo warning (2 ms)                                                                                                                  
      √ showInfo debe llamar a showMessage con tipo info (2 ms)                                                                                                                        

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.073 s
Ran all test suites matching /utils\\__tests__\\message.utils.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Mostrar Mensajes**    | `showMessage()`         | Creación de mensaje con tipo "success"                                              | Elemento creado con texto, clases CSS y color de fondo correctos                 |
|                         |                         | Eliminación de notificaciones existentes                                            | Solo existe la nueva notificación en el DOM                                      |
|                         |                         | Tipos de mensaje (success, error, warning, info, unknown)                           | Aplica colores de fondo específicos para cada tipo                               |
|                         |                         | Ocultamiento automático después de 3 segundos                                       | Elemento se oculta y elimina del DOM tras 3.5 segundos                           |
| **Métodos Conveniencia**| `showSuccess()`         | Llamada con mensaje de éxito                                                        | Invoca `showMessage` con tipo "success"                                          |
|                         | `showError()`           | Llamada con mensaje de error                                                        | Invoca `showMessage` con tipo "error"                                            |
|                         | `showWarning()`         | Llamada con mensaje de advertencia                                                  | Invoca `showMessage` con tipo "warning"                                          |
|                         | `showInfo()`            | Llamada con mensaje informativo                                                     | Invoca `showMessage` con tipo "info"                                             |


###### UrlUtils

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test utils/__tests__/url.utils.test.js                       

> test
> jest utils/__tests__/url.utils.test.js

 PASS  utils/__tests__/url.utils.test.js
  URLUtils
    updateURL                                                                                                                                                                          
      √ debe actualizar la URL y disparar un evento urlChanged (7 ms)                                                                                                                  
      √ debe usar un objeto vacío como estado por defecto (1 ms)                                                                                                                       
    getURLParams                                                                                                                                                                       
      √ debe retornar un objeto vacío si no hay parámetros (1 ms)                                                                                                                      
      √ debe parsear correctamente los parámetros de la URL                                                                                                                            
      √ debe manejar correctamente los caracteres codificados                                                                                                                          
      √ debe manejar parámetros sin valor                                                                                                                                              
    getCurrentPath                                                                                                                                                                     
      √ debe retornar la ruta actual del navegador (1 ms)                                                                                                                              
      √ debe retornar "/" para la ruta raíz (1 ms)                                                                                                                                     
    setupPopStateHandler                                                                                                                                                               
      √ debe configurar un manejador para el evento popstate (2 ms)                                                                                                                    

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.175 s
Ran all test suites matching /utils\\__tests__\\url.utils.test.js/i.

| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Actualización de URL** | `updateURL()`           | Con URL y estado específico                                                        | Actualiza history.pushState y dispara evento 'urlChanged' con los datos correctos |
|                         |                         | Sin estado especificado                                                            | Usa objeto vacío como estado por defecto                                          |
| **Obtención de Parámetros** | `getURLParams()`    | URL sin parámetros                                                                 | Retorna objeto vacío                                                              |
|                         |                         | URL con parámetros simples (?nombre=Juan&edad=30)                                  | Retorna objeto con parámetros decodificados                                       |
|                         |                         | URL con caracteres codificados (?nombre=Juan%20Pérez)                              | Retorna valores decodificados correctamente                                       |
|                         |                         | URL con parámetros sin valor (?flag=&name=test)                                    | Maneja correctamente valores vacíos                                               |
| **Ruta Actual**         | `getCurrentPath()`      | Ruta específica (/productos/categoria/1)                                          | Retorna la ruta completa                                                          |
|                         |                         | Ruta raíz (/)                                                                      | Retorna "/"                                                                       |
| **Manejo de Navegación** | `setupPopStateHandler()`| Configuración de handler para popstate                                            | Ejecuta el handler con el estado correcto cuando ocurre popstate                  |

##### Vistas

###### AuthView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/auth.view.test.js                        

> test
> jest view/__tests__/auth.view.test.js

 PASS  view/__tests__/auth.view.test.js
  AuthView
    showAuthOptions
      √ debería mostrar las opciones de autenticación (23 ms)                                                                                                                          
    showLoginPage                                                                                                                                                                      
      √ debería mostrar la página de login (5 ms)                                                                                                                                      
    showRegisterPage                                                                                                                                                                   
      √ debería mostrar la página de registro (4 ms)                                                                                                                                   
    showProfilePage                                                                                                                                                                    
      √ debería mostrar la página de perfil y actualizar la información (5 ms)                                                                                                         
    updateProfileInfo                                                                                                                                                                  
      √ debería actualizar la información del perfil con los datos del usuario (8 ms)                                                                                                  
      √ no debería hacer nada si no se proporciona un usuario (3 ms)                                                                                                                   
    updateUserInterface                                                                                                                                                                
      √ debería actualizar la interfaz cuando hay un usuario autenticado (16 ms)                                                                                                       
      √ debería limpiar la información cuando no hay usuario autenticado (4 ms)                                                                                                        
    setupAuthForms                                                                                                                                                                     
      √ debería configurar los manejadores para los formularios de autenticación (7 ms)                                                                                                
    setupLogoutButton                                                                                                                                                                  
      √ debería configurar el manejador para el botón de cerrar sesión (4 ms)                                                                                                          

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       10 passed, 10 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.25 s
Ran all test suites matching /view\\__tests__\\auth.view.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Opciones de Autenticación** | `showAuthOptions()` | Mostrar plantilla de opciones de sesión/registro                                    | Llama a `showTemplate` con "plantilla-sesion-registro"                           |
| **Páginas de Autenticación**  | `showLoginPage()`    | Mostrar plantilla de inicio de sesión                                               | Llama a `showTemplate` con "plantilla-iniciar-sesion"                            |
|                         | `showRegisterPage()` | Mostrar plantilla de registro                                                       | Llama a `showTemplate` con "plantilla-registro"                                  |
| **Perfil de Usuario**         | `showProfilePage()`  | Mostrar plantilla de perfil con usuario válido                                      | Llama a `showTemplate` y `updateProfileInfo` con datos del usuario               |
| **Actualización de UI**       | `updateProfileInfo()`| Actualizar DOM con datos de usuario (nombre, email, inicial)                        | Elementos del DOM reflejan datos del usuario                                     |
|                         |                         | Llamada sin usuario                                                                 | No modifica el DOM                                                               |
|                         | `updateUserInterface()` | Usuario autenticado                                                                | Muestra nombre en barra de navegación                                            |
|                         |                         | Usuario no autenticado                                                             | Muestra "Cuenta Personal" y limpia elementos                                     |
| **Configuración de Formularios** | `setupAuthForms()`   | Configurar handlers para formularios de login/registro                              | Los eventos `submit` ejecutan los handlers proporcionados                        |
| **Botón de Logout**           | `setupLogoutButton()`| Configurar handler para botón de logout                                             | El evento `click` ejecuta el handler proporcionado                               |


###### BaseView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/base.view.test.js                        

> test
> jest view/__tests__/base.view.test.js

  console.error
    Template "no-existe" or container "test-container" not found.

      21 |             return true
      22 |         } else {
    > 23 |             console.error(`Template "${templateId}" or container "${containerId}" not found.`)
         |                     ^
      24 |             return false
      25 |         }
      26 |     }

      at console.<anonymous> (node_modules/jest-mock/build/index.js:794:25)
      at BaseView.error [as showTemplate] (view/base.view.js:23:21)
      at Object.showTemplate (view/__tests__/base.view.test.js:40:37)

  console.error
    Template "test-template" or container "no-existe" not found.

      21 |             return true
      22 |         } else {
    > 23 |             console.error(`Template "${templateId}" or container "${containerId}" not found.`)
         |                     ^
      24 |             return false
      25 |         }
      26 |     }

      at console.<anonymous> (node_modules/jest-mock/build/index.js:794:25)
      at BaseView.error [as showTemplate] (view/base.view.js:23:21)
      at Object.showTemplate (view/__tests__/base.view.test.js:50:37)

  console.log                                                                                                                                                                          
    Mostrando mensaje: Éxito de prueba, tipo: success                                                                                                                                  

      at BaseView.log [as showMessage] (view/base.view.js:36:17)

  console.log
    Mostrando mensaje: Nuevo mensaje, tipo: success

      at BaseView.log [as showMessage] (view/base.view.js:36:17)

  console.log
    Error no crítico al actualizar URL: URL inválida

      at console.<anonymous> (node_modules/jest-mock/build/index.js:794:25)

  console.log                                                                                                                                                                          
    Error no crítico al actualizar URL: URL inválida                                                                                                                                   

      at console.<anonymous> (node_modules/jest-mock/build/index.js:794:25)

  console.log                                                                                                                                                                          
    Error no crítico al actualizar URL: URL inválida                                                                                                                                   

      at console.<anonymous> (node_modules/jest-mock/build/index.js:794:25)

 PASS  view/__tests__/base.view.test.js
  BaseView                                                                                                                                                                             
    showTemplate()                                                                                                                                                                     
      √ debería mostrar la plantilla en el contenedor cuando ambos existen (14 ms)
      √ debería devolver false y loguear error cuando la plantilla no existe (27 ms)                                                                                                   
      √ debería devolver false y loguear error cuando el contenedor no existe (8 ms)                                                                                                   
    showMessage()                                                                                                                                                                      
      √ debería crear y mostrar un mensaje de éxito (22 ms)                                                                                                                            
      √ debería eliminar notificaciones existentes antes de mostrar una nueva (5 ms)                                                                                                   
    showFormError()                                                                                                                                                                    
      √ debería mostrar el mensaje de error en el elemento especificado (3 ms)                                                                                                         
      √ no debería hacer nada si el elemento no existe (4 ms)                                                                                                                          
    updateURL()                                                                                                                                                                        
      √ debería actualizar la URL cuando es diferente a la actual (2 ms)                                                                                                               
      √ no debería actualizar la URL si es la misma que la actual (2 ms)                                                                                                               
      √ no debería fallar si la URL no es un string (10 ms)                                                                                                                            
      √ debería normalizar URLs que no comienzan con / (2 ms)                                                                                                                          

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       11 passed, 11 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.145 s
Ran all test suites matching /view\\__tests__\\base.view.test.js/i.


| Categoría          | Método Probado       | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|--------------------|----------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Renderizado**    | `showTemplate()`     | Plantilla y contenedor existen                                                     | Muestra contenido de plantilla en contenedor (retorna `true`)                    |
|                    |                      | Plantilla no existe                                                                | Loggea error y retorna `false`                                                   |
|                    |                      | Contenedor no existe                                                               | Loggea error y retorna `false`                                                   |
| **Notificaciones** | `showMessage()`      | Mensaje de éxito                                                                   | Crea elemento con animación y lo elimina después de 3.5s                         |
|                    |                      | Notificación existente previa                                                      | Elimina notificación anterior antes de mostrar nueva                              |
| **Errores**        | `showFormError()`    | Elemento de error existe                                                           | Muestra mensaje en elemento (con `display: block`)                               |
|                    |                      | Elemento de error no existe                                                        | No realiza acción (no loggea error)                                              |
| **Navegación**     | `updateURL()`        | Nueva URL diferente a actual                                                       | Actualiza `history.pushState()` y dispara evento                                 |
|                    |                      | URL igual a actual                                                                 | No realiza actualización                                                         |
|                    |                      | URL no es string (número, null, objeto)                                           | Loggea error sin fallar (manejo elegante)                                        |
|                    |                      | URL sin barra inicial (`ruta-sin-barra`)                                          | Normaliza a URL válida (`/ruta-sin-barra`)                                       |


###### CarouselView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/carousel.view.test.js                    

> test
> jest view/__tests__/carousel.view.test.js

  console.log
    No se encontró el contenedor del carrusel. Se intentará más tarde.

      at CarouselView.log [as initCarousel] (view/carousel.view.js:18:17)

  console.log                                                                                                                                                                          
    No se encontraron slides en el carrusel. Se intentará más tarde.                                                                                                                   

      at CarouselView.log [as initCarousel] (view/carousel.view.js:24:17)

  console.log
    El carrusel ya está inicializado.

      at CarouselView.log [as initCarousel] (view/carousel.view.js:30:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log
    Inicializando carrusel con 3 slides

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log
    Inicializando carrusel con 3 slides

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log
    Inicializando carrusel con 3 slides

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log
    Inicializando carrusel con 3 slides

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log
    Inicializando carrusel con 3 slides

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 3 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

  console.log
    No se encontró el contenedor del carrusel. Se intentará más tarde.

      at CarouselView.log [as initCarousel] (view/carousel.view.js:18:17)

  console.log                                                                                                                                                                          
    Inicializando carrusel con 1 slides                                                                                                                                                

      at CarouselView.log [as initCarousel] (view/carousel.view.js:34:17)

 PASS  view/__tests__/carousel.view.test.js
  CarouselView
    initCarousel                                                                                                                                                                       
      √ debería retornar false si no encuentra el contenedor (44 ms)                                                                                                                   
      √ debería retornar false si no encuentra slides (11 ms)                                                                                                                          
      √ debería retornar true si ya está inicializado y no se fuerza (9 ms)                                                                                                            
      √ debería inicializar correctamente el carrusel (11 ms)                                                                                                                          
      √ debería forzar la reinicialización cuando force=true (8 ms)                                                                                                                    
    showSlides                                                                                                                                                                         
      √ debería manejar correctamente el índice mayor al número de slides (8 ms)                                                                                                       
      √ debería manejar correctamente el índice menor a 1 (8 ms)                                                                                                                       
      √ debería mostrar el slide correcto y actualizar los dots (6 ms)                                                                                                                 
    changeSlide                                                                                                                                                                        
      √ debería avanzar al siguiente slide (7 ms)                                                                                                                                      
      √ debería retroceder al slide anterior (8 ms)                                                                                                                                    
    currentSlide                                                                                                                                                                       
      √ debería cambiar directamente al slide especificado (6 ms)                                                                                                                      
    autoSlide                                                                                                                                                                          
      √ debería avanzar automáticamente los slides (11 ms)                                                                                                                             
      √ debería detener el autoSlide cuando se llama a stopAutoSlide (5 ms)                                                                                                            
      √ debería detener el autoSlide al pasar el mouse (8 ms)                                                                                                                          
    handleSwipe                                                                                                                                                                        
      √ debería avanzar al siguiente slide con swipe izquierda (5 ms)                                                                                                                  
      √ debería retroceder al slide anterior con swipe derecha (5 ms)                                                                                                                  
      √ no debería hacer nada si el swipe es menor al umbral (6 ms)                                                                                                                    
    tryInitCarousel                                                                                                                                                                    
      √ debería inicializar el carrusel cuando está disponible (10 ms)                                                                                                                 

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       18 passed, 18 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.224 s
Ran all test suites matching /view\\__tests__\\carousel.view.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Inicialización**      | `initCarousel()`        | Contenedor no encontrado                                                            | Retorna `false`                                                                  |
|                         |                         | Slides no encontrados                                                               | Retorna `false`                                                                  |
|                         |                         | Carrusel ya inicializado                                                            | Retorna `true` (sin reinicializar)                                               |
|                         |                         | Inicialización normal                                                               | Retorna `true`, marca contenedor como inicializado                               |
|                         |                         | Reinicialización forzada                                                            | Retorna `true` incluso si ya estaba inicializado                                 |
| **Navegación**          | `showSlides()`          | Índice mayor al número de slides                                                    | Vuelve al primer slide (índice 1)                                               |
|                         |                         | Índice menor a 1                                                                    | Va al último slide                                                               |
|                         |                         | Navegación a slide específico                                                       | Muestra slide correcto y actualiza dots                                          |
| **Controles**           | `changeSlide()`         | Avanzar slide (+1)                                                                  | Incrementa índice correctamente                                                  |
|                         |                         | Retroceder slide (-1)                                                               | Decrementa índice correctamente                                                  |
|                         | `currentSlide()`        | Cambio directo a slide                                                              | Establece índice exacto                                                         |
| **Auto Slide**          | `startAutoSlide()`      | Avance automático                                                                   | Cambia slides cada `autoSlideTime` ms                                            |
|                         | `stopAutoSlide()`       | Detener auto slide                                                                  | Cancela el intervalo de avance                                                   |
|                         |                         | Interacción con mouse (enter/leave)                                                 | Pausa/reanuda auto slide                                                         |
| **Touch Events**        | `handleSwipe()`         | Swipe izquierda (umbral superado)                                                   | Avanza al siguiente slide                                                        |
|                         |                         | Swipe derecha (umbral superado)                                                     | Retrocede al slide anterior                                                      |
|                         |                         | Swipe pequeño (sin superar umbral)                                                  | No cambia de slide                                                               |
| **Reintentos**          | `tryInitCarousel()`     | Inicialización diferida (cuando el DOM está listo)                                  | Inicializa correctamente tras timeout                                            |

###### CartView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/cart.view.test.js      

> test
> jest view/__tests__/cart.view.test.js

 PASS  view/__tests__/cart.view.test.js
  CartView
    updateCartDisplay
      √ debe mostrar carrito vacío cuando no hay items (29 ms)                                                                                                                         
      √ debe renderizar items correctamente (41 ms)                                                                                                                                    
    Manejo de Eventos del Carrito                                                                                                                                                      
      √ debe manejar aumento de cantidad (17 ms)                                                                                                                                       
      √ debe manejar eliminación de producto (15 ms)                                                                                                                                   
    Checkout Process                                                                                                                                                                   
      √ debe renderizar métodos de pago (30 ms)                                                                                                                                        
      √ debe manejar cambio de método de pago (16 ms)                                                                                                                                  
      √ debe recolectar datos de tarjeta correctamente (25 ms)                                                                                                                         
    Manejo de Errores                                                                                                                                                                  
      √ debe manejar contenedor no encontrado (3 ms)                                                                                                                                   
    Notificaciones                                                                                                                                                                     
      √ debe mostrar mensajes de notificación (6 ms)                                                                                                                                   

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       9 passed, 9 total                                                                                                                                                         
Snapshots:   0 total
Time:        2.214 s
Ran all test suites matching /view\\__tests__\\cart.view.test.js/i.

| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Renderizado**         | `updateCartDisplay()`        | Carrito vacío                                                                       | Muestra mensaje "El carrito está vacío"                                          |
|                         |                              | Carrito con items                                                                   | Renderiza productos con nombre, precio y cantidad correctos                      |
| **Eventos**            | Manejo de clicks            | Click en botón "+" (aumentar cantidad)                                             | Dispara evento `updateQuantity` con cantidad incrementada                        |
|                         |                              | Click en botón "Eliminar"                                                          | Dispara evento `removeItem` con ID del producto                                  |
| **Checkout**           | `showCheckout()`            | Renderizado de métodos de pago                                                     | Muestra todas las opciones de pago disponibles                                   |
|                         |                              | Selección de método de pago (PayPal)                                               | Dispara evento `changePaymentMethod` con método seleccionado                     |
|                         | `collectFormData()`         | Formulario de tarjeta completado                                                   | Devuelve objeto con datos de tarjeta (número, titular, etc.)                     |
| **Manejo de Errores**  | `updateCartDisplay()`       | Contenedor no encontrado                                                           | Muestra error en consola y no renderiza contenido                                |
| **Notificaciones**     | `showMessage()`             | Mensaje de éxito                                                                   | Llama a `NotificationUtils.showSuccess` con mensaje correcto                     |

###### HelpView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/help.view.test.js    

> test
> jest view/__tests__/help.view.test.js

  console.log
    Página de atención al cliente mostrada correctamente

      at CustomerSupportView.log [as showCustomerSupportPage] (view/help.view.js:12:21)

  console.error
    No se encontró el botón para el tipo de ayuda: tipo-inexistente

      30 |
      31 |         if (!button) {
    > 32 |             console.error(`No se encontró el botón para el tipo de ayuda: ${helpType}`)
         |                     ^
      33 |             return false
      34 |         }
      35 |

      at CustomerSupportView.error [as showHelpContent] (view/help.view.js:32:21)
      at Object.showHelpContent (view/__tests__/help.view.test.js:53:33)

 PASS  view/__tests__/help.view.test.js
  CustomerSupportView
    showCustomerSupportPage                                                                                                                                                            
      √ debe mostrar la plantilla y retornar true si showTemplate retorna true (32 ms)                                                                                                 
      √ debe retornar false si showTemplate retorna false (2 ms)                                                                                                                       
    showHelpContent                                                                                                                                                                    
      √ debe mostrar la página de atención al cliente si no existe .seccion-atencion-cliente (18 ms)                                                                                   
      √ debe retornar false si no se encuentra el botón correspondiente (11 ms)                                                                                                        
    showHelpContentFromButton                                                                                                                                                          
      √ debe mostrar la plantilla de contenido de ayuda y actualizar el DOM correctamente (15 ms)                                                                                      
      √ debe retornar false si showTemplate retorna false (2 ms)                                                                                                                       
    getHelpContentHTML                                                                                                                                                                 
      √ debe retornar el contenido HTML correspondiente al tipo de ayuda (2 ms)                                                                                                        
      √ debe retornar un mensaje por defecto si el tipo de ayuda no existe (1 ms)                                                                                                      

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       8 passed, 8 total                                                                                                                                                         
Snapshots:   0 total
Time:        2.3 s
Ran all test suites matching /view\\__tests__\\help.view.test.js/i.

| Categoría               | Método Probado                 | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|--------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Página Principal**    | `showCustomerSupportPage()`    | `showTemplate` retorna `true`                                                      | Retorna `true` y muestra plantilla correcta                                      |
|                         |                                | `showTemplate` retorna `false`                                                     | Retorna `false`                                                                   |
| **Contenido de Ayuda**  | `showHelpContent()`            | Sección no existe en DOM                                                           | Muestra página completa y contenido                                              |
|                         |                                | Botón no encontrado                                                                | Retorna `false`                                                                   |
| **Mostrar desde Botón** | `showHelpContentFromButton()`  | Botón válido con plantilla exitosa                                                 | Actualiza DOM con título y contenido                                             |
|                         |                                | `showTemplate` retorna `false`                                                     | Retorna `false`                                                                   |
| **Generación HTML**     | `getHelpContentHTML()`         | Tipo de ayuda existente (`manejo-pagina`)                                          | Retorna HTML con estructura de acordeón                                          |
|                         |                                | Tipo de ayuda inexistente                                                          | Retorna mensaje predeterminado                                                   |

###### HomeView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/home.view.test.js                        

> test
> jest view/__tests__/home.view.test.js

 PASS  view/__tests__/home.view.test.js
  HomeView
    √ showHomePage debe invocar showTemplate con plantilla y contenedor correctos (13 ms)                                                                                              
    √ showFeaturedProducts debe mostrar hasta 4 productos (29 ms)                                                                                                                      
    √ showFeaturedProducts muestra error si no hay contenedor (5 ms)                                                                                                                   
    √ initCarousel activa el primer slide y crea el autoplay (10 ms)                                                                                                                   
    √ setupCategoryButtons agrega eventos a botones (5 ms)                                                                                                                             

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       5 passed, 5 total                                                                                                                                                         
Snapshots:   0 total
Time:        2.119 s
Ran all test suites matching /view\\__tests__\\home.view.test.js/i.


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Renderizado**         | `showHomePage()`             | Llamada básica                                                                      | Invoca `showTemplate` con parámetros correctos (`plantilla-inicio`, `container-principal`) |
| **Productos**          | `showFeaturedProducts()`     | Lista con 6 productos                                                               | Muestra solo 4 productos (límite)                                                 |
|                         |                              | Contenedor no encontrado                                                            | Muestra error en consola                                                          |
| **Carrusel**           | `initCarousel()`             | Inicialización básica                                                               | Activa el primer slide y configura autoplay                                       |
|                         |                              | Transición automática                                                               | Cambia al siguiente slide después de 5 segundos                                   |
| **Interacción**        | `setupCategoryButtons()`     | Click en botones de categoría                                                       | Ejecuta handler para cada botón clickeado                                         |

###### LocationView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/location.view.test.js                    

> test
> jest view/__tests__/location.view.test.js

 PASS  view/__tests__/location.view.test.js
  LocationView
    showLocationPage                                                                                                                                                                   
      √ debe llamar a showTemplate y luego initMap (15 ms)                                                                                                                             
    initMap                                                                                                                                                                            
      √ debe inicializar el mapa si no existe ya (5 ms)                                                                                                                                
      √ no debe inicializar si el mapa ya existe (4 ms)                                                                                                                                
      √ debe registrar error si no hay #mapa (3 ms)                                                                                                                                    
    updateZoneOptions                                                                                                                                                                  
      √ debe agregar opciones nuevas al selector de zonas (14 ms)                                                                                                                      
      √ debe mostrar error si #zona no existe (2 ms)                                                                                                                                   
    formatZoneName                                                                                                                                                                     
      √ debe capitalizar nombres kebab-case (2 ms)                                                                                                                                     
    showStores                                                                                                                                                                         
      √ debe mostrar mensaje si no hay tiendas (6 ms)                                                                                                                                  
      √ debe agregar marcadores y detalles si hay tiendas (9 ms)                                                                                                                       
      √ debe mostrar error si el mapa no está inicializado (3 ms)                                                                                                                      
    setupLocationEvents                                                                                                                                                                
      √ debe asignar manejadores de eventos (4 ms)                                                                                                                                     

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        2.1 s
Ran all test suites matching /view\\__tests__\\location.view.test.js/i


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Renderizado**         | `showLocationPage()`    | Carga de plantilla e inicialización de mapa                                         | Llama a `showTemplate` y luego a `initMap`                                       |
| **Mapa**                | `initMap()`             | Inicialización cuando no existe mapa                                                | Crea instancia de Leaflet con el elemento correcto                               |
|                         |                         | Intento de reinicialización con mapa existente                                      | Muestra mensaje en consola ("El mapa ya está inicializado")                      |
|                         |                         | Elemento #mapa no existe                                                            | Registra error en consola                                                        |
| **Zonas**               | `updateZoneOptions()`   | Actualización con nuevas zonas                                                      | Agrega opciones al selector y formatea nombres                                   |
|                         |                         | Selector #zona no existe                                                            | Registra error en consola                                                        |
| **Formateo**            | `formatZoneName()`      | Conversión de kebab-case a formato legible                                          | Capitaliza palabras (ej: "zona-norte" → "Zona Norte")                            |
| **Tiendas**             | `showStores()`          | Sin tiendas disponibles                                                             | Muestra mensaje de advertencia                                                   |
|                         |                         | Con tiendas válidas                                                                 | Agrega marcadores al mapa y detalles al DOM                                      |
|                         |                         | Mapa no inicializado                                                                | Registra error en consola                                                        |
| **Eventos**             | `setupLocationEvents()` | Asignación de manejadores                                                           | Configura listeners para 'change' (ciudad) y 'submit' (formulario)               |

###### ProductView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/product.view.test.js                     

> test
> jest view/__tests__/product.view.test.js

  console.log
    Mostrando 1 resultados para: producto

      at log (view/product.view.js:129:21)

 PASS  view/__tests__/product.view.test.js
  ProductView
    showProductsByCategory                                                                                                                                                             
      √ debe mostrar mensaje cuando no hay productos (3 ms)
      √ debe mostrar productos correctamente (2 ms)                                                                                                                                    
      √ no debe hacer nada si la plantilla no se puede mostrar (1 ms)                                                                                                                  
    showSearchResults                                                                                                                                                                  
      √ debe mostrar mensaje de error si el término de búsqueda es inválido                                                                                                            
      √ debe mostrar mensaje de error si la plantilla no se puede cargar (1 ms)                                                                                                        
      √ debe mostrar mensaje cuando no hay resultados (2 ms)                                                                                                                           
      √ debe mostrar productos encontrados correctamente (46 ms)                                                                                                                       
    showProductDetails                                                                                                                                                                 
      √ debe mostrar mensaje de error si los datos del producto son incompletos (1 ms)                                                                                                 
      √ debe mostrar los detalles del producto correctamente (1 ms)                                                                                                                    
      √ debe usar descripción por defecto si no hay descripción (1 ms)                                                                                                                 
    showLoadingReviews                                                                                                                                                                 
      √ debe crear contenedor de opiniones si no existe (1 ms)                                                                                                                         
      √ debe mostrar indicador de carga (1 ms)                                                                                                                                         
    showProductReviews                                                                                                                                                                 
      √ debe mostrar mensaje cuando no hay opiniones (1 ms)                                                                                                                            
      √ debe mostrar opiniones limitadas y botón ver más (4 ms)                                                                                                                        
    showAllReviews                                                                                                                                                                     
      √ debe mostrar todas las opiniones (2 ms)                                                                                                                                        
    removeExistingReviewForms                                                                                                                                                          
      √ debe eliminar todos los formularios existentes (1 ms)                                                                                                                          
    addReviewForm                                                                                                                                                                      
      √ no debe agregar formulario si ya existe uno (1 ms)                                                                                                                             
      √ debe agregar formulario de opinión (1 ms)                                                                                                                                      
      √ debe manejar envío del formulario (2 ms)                                                                                                                                       
    setupAddToCartButtons                                                                                                                                                              
      √ debe configurar eventos para botones de compra (2 ms)                                                                                                                          
    showFeaturedProducts                                                                                                                                                               
      √ debe mostrar productos destacados limitados a 4 (1 ms)                                                                                                                         
      √ no debe hacer nada si no encuentra el contenedor                                                                                                                               

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       22 passed, 22 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.165 s, estimated 4 s
Ran all test suites matching /view\\__tests__\\product.view.test.js/i.


| Categoría               | Método Probado                 | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|--------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Productos por Categoría** | `showProductsByCategory()`    | Sin productos                                                                       | Muestra mensaje "No hay productos disponibles"                                   |
|                         |                                | Con productos válidos                                                               | Muestra nombre, precio y actualiza URL                                           |
|                         |                                | Plantilla no cargada                                                                | No modifica el DOM                                                                |
| **Resultados de Búsqueda** | `showSearchResults()`         | Término de búsqueda vacío                                                          | Muestra mensaje de error                                                         |
|                         |                                | Plantilla no cargada                                                                | Muestra mensaje de error                                                         |
|                         |                                | Sin resultados                                                                      | Muestra "No se encontraron productos"                                            |
|                         |                                | Con resultados                                                                      | Muestra productos y actualiza URL                                                |
| **Detalles de Producto**   | `showProductDetails()`        | Datos incompletos                                                                   | Muestra mensaje de error                                                         |
|                         |                                | Datos completos                                                                     | Muestra nombre, precio y descripción                                             |
|                         |                                | Sin descripción                                                                     | Usa texto por defecto                                                            |
| **Opiniones**             | `showLoadingReviews()`        | Contenedor no existe                                                                | Crea contenedor y muestra indicador de carga                                     |
|                         | `showProductReviews()`        | Sin opiniones                                                                       | Muestra mensaje informativo                                                      |
|                         |                                | Con opiniones (límite)                                                              | Muestra opiniones limitadas y botón "Ver más"                                    |
|                         | `showAllReviews()`            | Con múltiples opiniones                                                             | Renderiza todas las opiniones                                                    |
| **Formularios**           | `removeExistingReviewForms()` | Con formularios existentes                                                          | Elimina todos los formularios anteriores                                         |
|                         | `addReviewForm()`             | Formulario ya existe                                                                | No hace nada                                                                     |
|                         |                                | Formulario nuevo                                                                    | Crea formulario y configura evento submit                                        |
|                         |                                | Envío de formulario                                                                 | Ejecuta handler con datos correctos                                              |
| **Botones de Compra**     | `setupAddToCartButtons()`     | Con botones existentes                                                              | Configura eventos click                                                          |
| **Productos Destacados**  | `showFeaturedProducts()`      | Más de 4 productos                                                                  | Muestra solo los primeros 4                                                      |
|                         |                                | Contenedor no encontrado                                                            | Registra error en consola                                                        |


###### ProfileView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/profile.view.test.js                     

> test
> jest view/__tests__/profile.view.test.js

 PASS  view/__tests__/profile.view.test.js
  ProfileView
    showProfilePage                                                                                                                                                                    
      √ debería mostrar la página de perfil correctamente (6 ms)                                                                                                                       
    updateProfileInfo                                                                                                                                                                  
      √ debería actualizar la información del perfil correctamente (6 ms)                                                                                                              
      √ no debería hacer nada si el usuario es undefined (1 ms)                                                                                                                        
    showProfileSection                                                                                                                                                                 
      √ debería mostrar una sección existente (1 ms)                                                                                                                                   
      √ debería crear una nueva sección si no existe (2 ms)                                                                                                                            
    hideAllSections                                                                                                                                                                    
      √ debería ocultar todas las secciones (1 ms)                                                                                                                                     
    updateButtonStyles                                                                                                                                                                 
      √ debería actualizar los estilos de los botones correctamente (1 ms)                                                                                                             
    getButtonSectionId                                                                                                                                                                 
      √ debería retornar el ID de sección correcto para un botón (1 ms)                                                                                                                
      √ debería retornar string vacío para un botón desconocido (1 ms)                                                                                                                 
    loadSectionContent                                                                                                                                                                 
      √ debería cargar la sección de gestión de pedidos (1 ms)                                                                                                                         
      √ debería cargar la sección de historial de productos (1 ms)                                                                                                                     
      √ debería cargar la sección de modificación de datos (1 ms)                                                                                                                      
    loadOrderManagementSection                                                                                                                                                         
      √ debería cargar la sección de gestión de pedidos correctamente (1 ms)                                                                                                           
      √ debería manejar errores al cargar pedidos (2 ms)                                                                                                                               
    createOrderManagementHTML                                                                                                                                                          
      √ debería crear HTML para pedidos existentes (1 ms)                                                                                                                              
      √ debería crear HTML para cuando no hay pedidos                                                                                                                                  
    loadProductHistorySection                                                                                                                                                          
      √ debería cargar la sección de historial correctamente (2 ms)                                                                                                                    
      √ debería manejar errores al cargar historial (1 ms)                                                                                                                             
    createProductHistoryHTML                                                                                                                                                           
      √ debería crear HTML para productos vistos (21 ms)                                                                                                                               
      √ debería crear HTML cuando no hay historial (1 ms)                                                                                                                              
    loadDataModificationSection                                                                                                                                                        
      √ debería cargar la sección de modificación de datos correctamente (1 ms)                                                                                                        
    createDataModificationHTML                                                                                                                                                         
      √ debería crear HTML para el formulario de modificación de datos (1 ms)                                                                                                          
      √ debería manejar valores vacíos en datos de usuario (1 ms)                                                                                                                      
    getOrderStatusBadge                                                                                                                                                                
      √ debería retornar el badge HTML correcto para un estado conocido                                                                                                                
      √ debería retornar un badge genérico para un estado desconocido                                                                                                                  
    setupProfileButtons                                                                                                                                                                
      √ debería configurar los eventos para botones de perfil                                                                                                                          
      √ debería manejar el caso cuando no se encuentran los botones                                                                                                                    
    setupDataForm                                                                                                                                                                      
      √ debería configurar el formulario de datos correctamente (2 ms)                                                                                                                 
      √ debería manejar el caso cuando no se encuentran los elementos del formulario (1 ms)                                                                                            
    showMessage                                                                                                                                                                        
      √ debería crear y mostrar un mensaje de notificación (5 ms)                                                                                                                      
    showOrderDetailsModal                                                                                                                                                              
      √ debería crear y mostrar un modal con detalles del pedido (3 ms)                                                                                                                
      √ debería utilizar un modal existente si ya existe (1 ms)                                                                                                                        

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       32 passed, 32 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.207 s, estimated 4 s
Ran all test suites matching /view\\__tests__\\profile.view.test.js/i.


| Categoría               | Método Probado                 | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|--------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Inicialización**      | `showProfilePage`              | Mostrar página de perfil con usuario válido                                         | Llama a `showTemplate` y actualiza información                                    |
|                         |                                | Mostrar página sin usuario                                                          | No actualiza información                                                          |
| **Información Usuario** | `updateProfileInfo`            | Usuario con datos completos                                                         | Actualiza elementos DOM con datos del usuario                                     |
|                         |                                | Usuario undefined/null                                                              | No actualiza elementos DOM                                                        |
| **Secciones Perfil**    | `showProfileSection`           | Sección existente                                                                   | Muestra la sección y actualiza estilos                                            |
|                         |                                | Sección nueva                                                                       | Crea la sección y carga contenido                                                 |
|                         | `hideAllSections`              | Múltiples secciones visibles                                                        | Oculta todas las secciones                                                        |
|                         | `updateButtonStyles`           | Botón activo/inactivo                                                               | Actualiza clases y atributos ARIA                                                 |
| **Gestión Pedidos**     | `loadOrderManagementSection`   | Pedidos existentes                                                                  | Muestra tabla con pedidos                                                         |
|                         |                                | Sin pedidos                                                                         | Muestra mensaje "No tienes pedidos"                                               |
|                         |                                | Error al cargar                                                                     | Muestra mensaje de error                                                          |
|                         | `createOrderManagementHTML`    | Pedidos con diferentes estados                                                      | Genera HTML con badges de estado                                                  |
|                         | `getOrderStatusBadge`          | Estado conocido (ej. "pendiente")                                                   | Retorna badge con clase correspondiente                                           |
|                         |                                | Estado desconocido                                                                  | Retorna badge genérico                                                            |
| **Historial Productos** | `loadProductHistorySection`    | Historial con productos                                                             | Muestra grid de productos                                                         |
|                         |                                | Historial vacío                                                                     | Muestra mensaje "No hay productos"                                                |
|                         |                                | Error al cargar                                                                     | Muestra mensaje de error                                                          |
|                         | `createProductHistoryHTML`     | Productos en historial                                                              | Genera cards con imágenes y detalles                                              |
| **Modificación Datos**  | `loadDataModificationSection`  | Usuario con datos                                                                   | Rellena formulario con datos existentes                                           |
|                         |                                | Usuario sin datos                                                                   | Campos vacíos                                                                     |
|                         | `createDataModificationHTML`   | Generación de formulario                                                            | Incluye todos los campos necesarios                                               |
| **Eventos UI**          | `setupProfileButtons`          | Botones encontrados                                                                 | Configura event listeners                                                         |
|                         |                                | Botones no encontrados                                                              | No genera errores                                                                 |
|                         | `setupDataForm`                | Formulario válido                                                                   | Configura submit handler con datos                                                |
|                         |                                | Formulario no encontrado                                                            | Registra error en consola                                                         |
| **Modales**             | `showOrderDetailsModal`        | Modal no existente                                                                  | Crea nuevo modal y lo muestra                                                     |
|                         |                                | Modal existente                                                                     | Reutiliza modal existente                                                         |
|                         |                                | Pedido con productos                                                                | Muestra lista de productos                                                        |
| **Mensajes**            | `showMessage`                  | Mensaje de éxito/error                                                              | Crea notificación temporal                                                        |

###### RecoveryView

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\frontend> npm test view/__tests__/recovery.view.test.js                    

> test
> jest view/__tests__/recovery.view.test.js

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.error
    Template "plantilla-recuperar-contrasena" or container "container-principal" not found.

      21 |             return true
      22 |         } else {
    > 23 |             console.error(`Template "${templateId}" or container "${containerId}" not found.`)
         |                     ^
      24 |             return false
      25 |         }
      26 |     }

      at RecoveryView.error [as showTemplate] (view/base.view.js:23:21)
      at RecoveryView.showTemplate [as showRecoveryPage] (view/recovery.view.js:16:18)
      at Object.showRecoveryPage (view/__tests__/recovery.view.test.js:56:33)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log                                                                                                                                                                          
    Página de recuperación de contraseña mostrada correctamente                                                                                                                        

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log                                                                                                                                                                          
    Página de recuperación de contraseña mostrada correctamente                                                                                                                        

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log                                                                                                                                                                          
    Página de recuperación de contraseña mostrada correctamente                                                                                                                        

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log                                                                                                                                                                          
    Página de recuperación de contraseña mostrada correctamente                                                                                                                        

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Página de recuperación de contraseña mostrada correctamente

      at RecoveryView.log [as showRecoveryPage] (view/recovery.view.js:17:21)

  console.log
    Mostrando mensaje: Mensaje de prueba, tipo: success

      at RecoveryView.log (view/base.view.js:36:17)

 PASS  view/__tests__/recovery.view.test.js
  RecoveryView
    showRecoveryPage                                                                                                                                                                   
      √ debería mostrar la página de recuperación correctamente (56 ms)                                                                                                                
      √ debería retornar false si no puede mostrar el template (15 ms)                                                                                                                 
    showRecoveryStep                                                                                                                                                                   
      √ debería mostrar el paso 1 (email) correctamente (11 ms)                                                                                                                        
      √ debería mostrar el paso 2 (password) correctamente (10 ms)                                                                                                                     
      √ debería manejar pasos inválidos mostrando el paso de email por defecto (10 ms)                                                                                                 
    getStepId                                                                                                                                                                          
      √ debería retornar el id correcto para cada paso (4 ms)                                                                                                                          
    setupVerificationInputs                                                                                                                                                            
      √ debería enfocar el primer input al inicializar (11 ms)                                                                                                                         
      √ debería mover al siguiente input al ingresar un dígito (13 ms)                                                                                                                 
      √ debería llamar al callback cuando se completa el código (14 ms)                                                                                                                
      √ debería manejar el pegado de código correctamente (8 ms)                                                                                                                       
      √ debería manejar Backspace correctamente (9 ms)                                                                                                                                 
    shakeVerificationInputs                                                                                                                                                            
      √ debería agregar y remover la clase shake (8 ms)                                                                                                                                
    startResendCountdown                                                                                                                                                               
      √ debería iniciar la cuenta regresiva correctamente (10 ms)                                                                                                                      
      √ debería limpiar el intervalo existente al iniciar uno nuevo (7 ms)                                                                                                             
    clearCountdownInterval                                                                                                                                                             
      √ debería limpiar el intervalo correctamente (6 ms)                                                                                                                              
    displayEmail                                                                                                                                                                       
      √ debería mostrar el email correctamente (7 ms)                                                                                                                                  
    updateButtonState                                                                                                                                                                  
      √ debería actualizar el estado del botón a loading (9 ms)                                                                                                                        
      √ debería actualizar el estado del botón a normal (7 ms)                                                                                                                         
    updatePasswordRequirements                                                                                                                                                         
      √ debería actualizar los requisitos correctamente (7 ms)                                                                                                                         
    message handling                                                                                                                                                                   
      √ debería mostrar un mensaje de error (5 ms)                                                                                                                                     
      √ debería mostrar un mensaje de éxito (5 ms)                                                                                                                                     
      √ debería limpiar un mensaje (3 ms)                                                                                                                                              
    showNotification
      √ debería llamar al método showMessage de la clase base (8 ms)                                                                                                                   

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       23 passed, 23 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.269 s, estimated 4 s
Ran all test suites matching /view\\__tests__\\recovery.view.test.js/i.


| Categoría               | Método Probado                 | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|--------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Renderizado**         | `showRecoveryPage()`           | Template disponible                                                                 | Retorna `true` y muestra el paso 1 (email) activo                                |
|                         |                                | Template no disponible                                                              | Retorna `false`                                                                   |
| **Navegación**          | `showRecoveryStep()`           | Paso 1 (email)                                                                      | Muestra solo el paso de email activo                                             |
|                         |                                | Paso 2 (password)                                                                   | Muestra solo el paso de password activo                                          |
|                         |                                | Paso inválido                                                                       | Muestra el paso de email por defecto                                             |
| **Helpers**            | `getStepId()`                  | IDs para pasos válidos (1-4)                                                        | Retorna IDs correctos (`email`, `password`, etc.)                                |
|                         |                                | Paso inválido                                                                       | Retorna `email` como valor por defecto                                           |
| **Verificación**       | `setupVerificationInputs()`    | Inicialización                                                                      | Enfoca el primer input automáticamente                                           |
|                         |                                | Entrada manual                                                                      | Avanza al siguiente input al digitar                                             |
|                         |                                | Código completo                                                                     | Ejecuta callback con el código concatenado                                       |
|                         |                                | Pegado de código                                                                    | Distribuye el código en los inputs y ejecuta callback                             |
|                         |                                | Tecla Backspace                                                                     | Retrocede al input anterior si está vacío                                        |
| **Efectos Visuales**   | `shakeVerificationInputs()`    | Animación de error                                                                  | Agrega/remueve clase `shake` después de 500ms                                   |
| **Temporizador**       | `startResendCountdown()`       | Cuenta regresiva normal                                                             | Actualiza el contador y muestra botón al finalizar                               |
|                         |                                | Reinicio de temporizador                                                            | Limpia el intervalo anterior al iniciar uno nuevo                                |
|                         | `clearCountdownInterval()`     | Limpieza de intervalo                                                               | Detiene la cuenta regresiva                                                      |
| **UI Dinámica**        | `displayEmail()`               | Mostrar email en paso de código                                                     | Actualiza el elemento `email-display`                                            |
|                         | `updateButtonState()`          | Estado "loading"                                                                    | Deshabilita botón y muestra spinner                                              |
|                         |                                | Estado "normal"                                                                     | Habilita botón y muestra icono de check                                          |
|                         | `updatePasswordRequirements()` | Validación de contraseña                                                            | Actualiza iconos según requisitos cumplidos (longitud, mayúsculas, números)      |
| **Mensajes**           | `showError()`                  | Error visible                                                                       | Muestra mensaje con estilo de error                                              |
|                         | `showSuccess()`                | Éxito visible                                                                       | Muestra mensaje con estilo de éxito                                              |
|                         | `clearMessage()`               | Limpieza                                                                            | Oculta y limpia el contenido del mensaje                                         |
|                         | `showNotification()`           | Integración con BaseView                                                            | Llama a `showMessage` del padre con tipo y mensaje                               |



###  Backend

#### Casos de Prueba del Backend

##### Controladores

###### AuthController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/auth.controller.test.js           

> backend@1.0.0 test
> jest src/controllers/__tests__/auth.controller.test.js

  console.log
    Actualizando contraseña de texto plano a hash para usuario: test@test.com

      at Object.log [as login] (src/controllers/auth.controller.js:43:25)

  console.error
    Error al verificar token: Error: Token inválido
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\auth.controller.test.js:269:23)
        at C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-mock\build\index.js:397:39
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-mock\build\index.js:404:13)
        at Object.mockConstructor [as verify] (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-mock\build\index.js:148:19)
        at Object.verify [as verifyToken] (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\auth.controller.js:197:29)
        at Object.verifyToken (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\auth.controller.test.js:272:28)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at processTicksAndRejections (node:internal/process/task_queues:105:5)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      203 |         next();
      204 |     } catch (err) {
    > 205 |         console.error('Error al verificar token:', err);
          |                 ^
      206 |         return res.status(401).json({ 
      207 |             mensaje: 'No autorizado. Token inválido' 
      208 |         });

      at Object.error [as verifyToken] (src/controllers/auth.controller.js:205:17)
      at Object.verifyToken (src/controllers/__tests__/auth.controller.test.js:272:28)

 PASS  src/controllers/__tests__/auth.controller.test.js
  Auth Controller                                                                                                                                                                      
    login
      √ debería retornar error 400 si faltan credenciales (4 ms)                                                                                                                       
      √ debería retornar error 401 si el usuario no existe (1 ms)                                                                                                                      
      √ debería retornar error 401 si la contraseña no coincide (texto plano) (1 ms)                                                                                                   
      √ debería retornar error 401 si la contraseña no coincide (hash) (1 ms)                                                                                                          
      √ debería generar token y retornar usuario si las credenciales son correctas (texto plano) (38 ms)                                                                               
      √ debería generar token y retornar usuario si las credenciales son correctas (hash) (1 ms)                                                                                       
    register                                                                                                                                                                           
      √ debería retornar error 400 si faltan campos obligatorios (1 ms)                                                                                                                
      √ debería retornar error 400 si el correo ya existe (2 ms)                                                                                                                       
      √ debería crear usuario y retornar token si los datos son válidos (1 ms)                                                                                                         
    getProfile                                                                                                                                                                         
      √ debería retornar error 404 si el usuario no existe (1 ms)                                                                                                                      
      √ debería retornar los datos del usuario si existe (1 ms)                                                                                                                        
    verifyToken                                                                                                                                                                        
      √ debería retornar error 401 si no hay token                                                                                                                                     
      √ debería retornar error 401 si el token es inválido (37 ms)                                                                                                                     
      √ debería llamar a next() si el token es válido                                                                                                                                  

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       14 passed, 14 total                                                                                                                                                       
Snapshots:   0 total
Time:        2.625 s
Ran all test suites matching /src\\controllers\\__tests__\\auth.controller.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Login**               | `login()`               | Faltan credenciales                                                                 | Error 400 - Campos obligatorios                                                   |
|                         |                         | Usuario no existe                                                                   | Error 401 - Credenciales incorrectas                                              |
|                         |                         | Contraseña incorrecta (texto plano)                                                 | Error 401 - Credenciales incorrectas                                              |
|                         |                         | Contraseña incorrecta (hash)                                                       | Error 401 - Credenciales incorrectas                                              |
|                         |                         | Credenciales correctas (texto plano)                                               | Genera token, actualiza hash, retorna usuario                                     |
|                         |                         | Credenciales correctas (hash)                                                      | Genera token, retorna usuario                                                     |
| **Registro**            | `register()`            | Faltan campos obligatorios                                                         | Error 400 - Campos obligatorios                                                   |
|                         |                         | Correo ya existe                                                                   | Error 400 - Correo ya registrado                                                  |
|                         |                         | Datos válidos                                                                      | Crea usuario (con hash), genera token, retorna 201                                |
| **Perfil**              | `getProfile()`          | Usuario no existe                                                                  | Error 404 - Usuario no encontrado                                                 |
|                         |                         | Usuario existe                                                                     | Retorna datos de usuario (sin contraseña)                                         |
| **Verificación Token**  | `verifyToken()`         | No hay token                                                                       | Error 401 - Token no proporcionado                                                |
|                         |                         | Token inválido                                                                     | Error 401 - Token inválido                                                        |
|                         |                         | Token válido                                                                       | Asigna datos de usuario al request y llama a next()                               |

###### CategoryController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/category.controller.test.js       

> backend@1.0.0 test
> jest src/controllers/__tests__/category.controller.test.js

  console.error
    Error en readCategory: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\category.controller.test.js:63:58)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      24 |         }
      25 |     } catch (err) {
    > 26 |         console.error('Error en readCategory:', err);
         |                 ^
      27 |         res.status(500).json({ message: 'Error interno del servidor' });
      28 |     }
      29 | };

      at Object.error [as readCategory] (src/controllers/category.controller.js:26:17)
      at Object.<anonymous> (src/controllers/__tests__/category.controller.test.js:65:13)

  console.error                                                                                                                                                                        
    Error en createCategory: Error: DB Error                                                                                                                                           
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\category.controller.test.js:100:60)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      45 |         res.json({ message: 'Categoría creada con éxito' });
      46 |     } catch (err) {
    > 47 |         console.error('Error en createCategory:', err);
         |                 ^
      48 |         res.status(500).json({ message: 'Error interno del servidor' });
      49 |     }
      50 | };

      at Object.error [as createCategory] (src/controllers/category.controller.js:47:17)
      at Object.<anonymous> (src/controllers/__tests__/category.controller.test.js:102:13)

  console.error
    Error en updateCategory: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\category.controller.test.js:140:60)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      67 |         res.json({ message: 'Categoría actualizada con éxito' });
      68 |     } catch (err) {
    > 69 |         console.error('Error en updateCategory:', err);
         |                 ^
      70 |         res.status(500).json({ message: 'Error interno del servidor' });
      71 |     }
      72 | };

      at Object.error [as updateCategory] (src/controllers/category.controller.js:69:17)
      at Object.<anonymous> (src/controllers/__tests__/category.controller.test.js:142:13)

  console.error                                                                                                                                                                        
    Error en deleteCategory: Error: DB Error                                                                                                                                           
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\category.controller.test.js:177:60)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      88 |         res.json({ message: 'Categoría eliminada con éxito' });
      89 |     } catch (err) {
    > 90 |         console.error('Error en deleteCategory:', err);
         |                 ^
      91 |         res.status(500).json({ message: 'Error interno del servidor' });
      92 |     }
      93 | };

      at Object.error [as deleteCategory] (src/controllers/category.controller.js:90:17)
      at Object.<anonymous> (src/controllers/__tests__/category.controller.test.js:179:13)

 PASS  src/controllers/__tests__/category.controller.test.js
  Category Controller                                                                                                                                                                  
    readCategory                                                                                                                                                                       
      √ debe retornar un error HTTP tipo 400 si hace falta el id de la categoria (4 ms)                                                                                                
      √ debe retornar un error 404 si la categoría no se encuentra (1 ms)                                                                                                              
      √ debe retornar la categoría si fue encontrada (1 ms)                                                                                                                            
      √ debe manejar los errores en el servidor (56 ms)                                                                                                                                
    createCategory                                                                                                                                                                     
      √ debe retornar error 400 si alguno de los campos falta por diligenciar (1 ms)                                                                                                   
      √ debe crear una categorí y retornar success                                                                                                                                     
      √ debe manejar los errores en el servidor (4 ms)                                                                                                                                 
    updateCategory                                                                                                                                                                     
      √ sdebe retornar error 400 si alguno de los campos falta por diligenciar (1 ms)                                                                                                  
      √ debe actualizar la categoría y retornar success (4 ms)                                                                                                                         
      √ debe manejar los errores internos del servidor (6 ms)                                                                                                                          
    deleteCategory                                                                                                                                                                     
      √ debe retornar error 400 si el id de la categoría falta (1 ms)                                                                                                                  
      √ debe borrar la categoría y retornar success                                                                                                                                    
      √ debe manejar los errores internos del servidor (3 ms)                                                                                                                          

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       13 passed, 13 total                                                                                                                                                       
Snapshots:   0 total
Time:        0.617 s, estimated 2 s
Ran all test suites matching /src\\controllers\\__tests__\\category.controller.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readCategory()`        | Falta ID de categoría                                                               | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | Categoría no encontrada                                                             | Retorna error 404                                                                 |
|                         |                         | Categoría encontrada                                                                | Retorna objeto de categoría                                                       |
|                         |                         | Error de servidor                                                                   | Retorna error 500                                                                 |
| **Creación**            | `createCategory()`      | Campos faltantes                                                                    | Retorna error 400 (campos obligatorios)                                           |
|                         |                         | Creación exitosa                                                                    | Retorna mensaje de éxito                                                          |
|                         |                         | Error de servidor                                                                   | Retorna error 500                                                                 |
| **Actualización**       | `updateCategory()`      | Campos faltantes                                                                    | Retorna error 400 (campos obligatorios)                                           |
|                         |                         | Actualización exitosa                                                               | Retorna mensaje de éxito                                                          |
|                         |                         | Error de servidor                                                                   | Retorna error 500                                                                 |
| **Eliminación**         | `deleteCategory()`      | Falta ID de categoría                                                               | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | Eliminación exitosa                                                                 | Retorna mensaje de éxito                                                          |
|                         |                         | Error de servidor                                                                   | Retorna error 500                                                                 |


###### CityController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/city.controller.test.js           

> backend@1.0.0 test
> jest src/controllers/__tests__/city.controller.test.js

  console.error
    Error en readCity: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\city.controller.test.js:66:50)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      24 |         }
      25 |     } catch (err) {
    > 26 |         console.error('Error en readCity:', err);
         |                 ^
      27 |         res.status(500).json({ message: 'Error interno del servidor' });
      28 |     }
      29 | };

      at Object.error [as readCity] (src/controllers/city.controller.js:26:17)
      at Object.<anonymous> (src/controllers/__tests__/city.controller.test.js:68:13)

  console.error                                                                                                                                                                        
    Error en createCity: Error: DB Error                                                                                                                                               
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\city.controller.test.js:102:52)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      45 |         res.json({ message: 'Ciudad creada con éxito' });
      46 |     } catch (err) {
    > 47 |         console.error('Error en createCity:', err);
         |                 ^
      48 |         res.status(500).json({ message: 'Error interno del servidor' });
      49 |     }
      50 | };

      at Object.error [as createCity] (src/controllers/city.controller.js:47:17)
      at Object.<anonymous> (src/controllers/__tests__/city.controller.test.js:104:13)

  console.error                                                                                                                                                                        
    Error en updateCity: Error: DB Error                                                                                                                                               
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\city.controller.test.js:140:52)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      67 |         res.json({ message: 'Ciudad actualizada con éxito' });
      68 |     } catch (err) {
    > 69 |         console.error('Error en updateCity:', err);
         |                 ^
      70 |         res.status(500).json({ message: 'Error interno del servidor' });
      71 |     }
      72 | };

      at Object.error [as updateCity] (src/controllers/city.controller.js:69:17)
      at Object.<anonymous> (src/controllers/__tests__/city.controller.test.js:142:13)

  console.error                                                                                                                                                                        
    Error en deleteCity: Error: DB Error                                                                                                                                               
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\city.controller.test.js:176:52)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      88 |         res.json({ message: 'Ciudad eliminada con éxito' });
      89 |     } catch (err) {
    > 90 |         console.error('Error en deleteCity:', err);
         |                 ^
      91 |         res.status(500).json({ message: 'Error interno del servidor' });
      92 |     }
      93 | };

      at Object.error [as deleteCity] (src/controllers/city.controller.js:90:17)
      at Object.<anonymous> (src/controllers/__tests__/city.controller.test.js:178:13)

 PASS  src/controllers/__tests__/city.controller.test.js
  City Controller                                                                                                                                                                      
    readCity                                                                                                                                                                           
      √ debe retornar error 400 si el id de la ciudad falta (4 ms)                                                                                                                     
      √ debe retornar error 404 si la ciudad no existe (1 ms)                                                                                                                          
      √ debe retornar la ciudad si es encontrada (1 ms)                                                                                                                                
      √ debe manejar los errores internos del servidor (48 ms)                                                                                                                         
    createCity                                                                                                                                                                         
      √ debe retornar error 400 si algun campo falta (1 ms)                                                                                                                            
      √ debe crear una ciudad y mostrar un mensaje de éxito (1 ms)                                                                                                                     
      √ debe manejar los errores internos del servidor (6 ms)                                                                                                                          
    updateCity                                                                                                                                                                         
      √ debe retornar error 400 si alguno de los campos falta (1 ms)                                                                                                                   
      √ debe actualizar la ciudad y retornar un mensaje de éxito (1 ms)                                                                                                                
      √ debe manejar los errores internos del servidor (4 ms)                                                                                                                          
    deleteCity                                                                                                                                                                         
      √ debe retornar error 400 si el id de la ciudad falta (1 ms)                                                                                                                     
      √ debe borrar una ciudad y retornar un mensaje de éxito (1 ms)                                                                                                                   
      √ debe manejar los errores internos del servidor (5 ms)                                                                                                                          

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       13 passed, 13 total                                                                                                                                                       
Snapshots:   0 total
Time:        0.653 s, estimated 2 s
Ran all test suites matching /src\\controllers\\__tests__\\city.controller.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readCity()`            | ID de ciudad faltante                                                               | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | Ciudad no encontrada                                                                | Retorna error 404                                                                 |
|                         |                         | Ciudad encontrada                                                                   | Retorna objeto ciudad (ej. Madrid)                                                |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
| **Creación**            | `createCity()`          | Campos faltantes                                                                    | Retorna error 400 (campos obligatorios)                                           |
|                         |                         | Datos válidos (ej. Barcelona)                                                       | Crea ciudad y retorna mensaje de éxito                                            |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
| **Actualización**       | `updateCity()`          | Campos faltantes                                                                    | Retorna error 400 (campos obligatorios)                                           |
|                         |                         | Datos válidos (ej. Valencia)                                                        | Actualiza ciudad y retorna mensaje de éxito                                       |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
| **Eliminación**         | `deleteCity()`          | ID de ciudad faltante                                                               | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | ID válido (ej. 1)                                                                   | Elimina ciudad y retorna mensaje de éxito                                         |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |

###### DeliveryStateController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/delivery-state.model.test.js 

> backend@1.0.0 test
> jest src/models/__tests__/delivery-state.model.test.js

 PASS  src/models/__tests__/delivery-state.model.test.js
  Pruebas para el CRUD de estados de pedido
    readDeliveryState                                                                                                                                                                  
      √ debe llamar a la consulta correcta para leer un estado de pedido (4 ms)                                                                                                        
      √ debe manejar errores de la base de datos (20 ms)                                                                                                                               
    createDeliveryState                                                                                                                                                                
      √ debe crear un nuevo estado de pedido correctamente (2 ms)                                                                                                                      
      √ debe manejar errores al crear un estado de pedido                                                                                                                              
    updateDeliveryState                                                                                                                                                                
      √ debe actualizar un estado de pedido correctamente (1 ms)                                                                                                                       
      √ debe manejar errores al actualizar un estado de pedido (2 ms)                                                                                                                  
    deleteDeliveryState                                                                                                                                                                
      √ debe eliminar un estado de pedido correctamente (1 ms)                                                                                                                         
      √ debe manejar errores al eliminar un estado de pedido (1 ms)                                                                                                                    

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       8 passed, 8 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.57 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\delivery-state.model.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readDeliveryState()`   | No se proporciona ID                                                                | Devuelve 400 (ID obligatorio)                                                    |
|                         |                         | Estado no existe                                                                    | Devuelve 404 (No encontrado)                                                     |
|                         |                         | Estado existe                                                                       | Devuelve el estado (200 OK)                                                      |
|                         |                         | Error en el modelo                                                                  | Devuelve 500 (Error servidor)                                                    |
| **Creación**            | `createDeliveryState()` | Faltan campos obligatorios                                                         | Devuelve 400 (Campos obligatorios)                                               |
|                         |                         | Datos válidos                                                                       | Crea estado y devuelve 200 (Éxito)                                               |
|                         |                         | Error en el modelo                                                                  | Devuelve 500 (Error servidor)                                                    |
| **Actualización**       | `updateDeliveryState()` | Faltan campos obligatorios                                                         | Devuelve 400 (Campos obligatorios)                                               |
|                         |                         | Datos válidos                                                                       | Actualiza estado y devuelve 200 (Éxito)                                          |
|                         |                         | Error en el modelo                                                                  | Devuelve 500 (Error servidor)                                                    |
| **Eliminación**         | `deleteDeliveryState()` | No se proporciona ID                                                                | Devuelve 400 (ID obligatorio)                                                    |
|                         |                         | ID válido                                                                           | Elimina estado y devuelve 200 (Éxito)                                            |
|                         |                         | Error en el modelo                                                                  | Devuelve 500 (Error servidor)                                                    |

###### DeliveryController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/delivery.controller.test.js       

> backend@1.0.0 test
> jest src/controllers/__tests__/delivery.controller.test.js

  console.error
    Error en readIdDelivery: Error: Error de DB
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\delivery.controller.test.js:66:60)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      24 |         }
      25 |     } catch (err) {
    > 26 |         console.error('Error en readIdDelivery:', err);
         |                 ^
      27 |         res.status(500).json({ message: 'Error interno del servidor' });
      28 |     }
      29 | };

      at Object.error [as readIdDelivery] (src/controllers/delivery.controller.js:26:17)
      at Object.<anonymous> (src/controllers/__tests__/delivery.controller.test.js:68:13)

  console.error                                                                                                                                                                        
    Error en readUserDelivery: Error: Error de DB                                                                                                                                      
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\delivery.controller.test.js:109:62)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      51 |
      52 |     } catch (err) {
    > 53 |         console.error('Error en readUserDelivery:', err);
         |                 ^
      54 |         res.status(500).json({ message: 'Error interno del servidor' });
      55 |     }
      56 | };

      at Object.error [as readUserDelivery] (src/controllers/delivery.controller.js:53:17)
      at Object.<anonymous> (src/controllers/__tests__/delivery.controller.test.js:111:13)

  console.error
    Error en createUserDelivery: Error: Error de DB
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\delivery.controller.test.js:156:64)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      72 |         res.json({ message: 'Pedido creado con éxito' });
      73 |     } catch (err) {
    > 74 |         console.error('Error en createUserDelivery:', err);
         |                 ^
      75 |         res.status(500).json({ message: 'Error interno del servidor' });
      76 |     }
      77 | };

      at Object.error [as createUserDelivery] (src/controllers/delivery.controller.js:74:17)
      at Object.<anonymous> (src/controllers/__tests__/delivery.controller.test.js:158:13)

  console.error
    Error en updateUserDelivery: Error: Error de DB
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\delivery.controller.test.js:205:64)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      94 |         res.json({ message: 'Pedido actualizado con éxito' });
      95 |     } catch (err) {
    > 96 |         console.error('Error en updateUserDelivery:', err);
         |                 ^
      97 |         res.status(500).json({ message: 'Error interno del servidor' });
      98 |     }
      99 | };

      at Object.error [as updateUserDelivery] (src/controllers/delivery.controller.js:96:17)
      at Object.<anonymous> (src/controllers/__tests__/delivery.controller.test.js:207:13)

  console.error                                                                                                                                                                        
    Error en deleteUserDelivery: Error: Error de DB                                                                                                                                    
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\delivery.controller.test.js:237:64)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      115 |         res.json({ message: 'Pedido eliminado con éxito' });
      116 |     } catch (err) {
    > 117 |         console.error('Error en deleteUserDelivery:', err);
          |                 ^
      118 |         res.status(500).json({ message: 'Error interno del servidor' });
      119 |     }
      120 | };

      at Object.error [as deleteUserDelivery] (src/controllers/delivery.controller.js:117:17)
      at Object.<anonymous> (src/controllers/__tests__/delivery.controller.test.js:239:13)

 PASS  src/controllers/__tests__/delivery.controller.test.js
  Delivery Controller
    readIdDelivery                                                                                                                                                                     
      √ debe retornar 400 si no se proporciona id_pedido (5 ms)                                                                                                                        
      √ debe retornar 404 si el pedido no existe (3 ms)                                                                                                                                
      √ debe retornar el pedido si existe (1 ms)                                                                                                                                       
      √ debe manejar errores internos (70 ms)                                                                                                                                          
    readUserDelivery                                                                                                                                                                   
      √ debe retornar 400 si no se proporciona fk_id_usuario (2 ms)                                                                                                                    
      √ debe retornar 404 si no hay pedidos para el usuario (1 ms)                                                                                                                     
      √ debe retornar los pedidos del usuario si existen (2 ms)                                                                                                                        
      √ debe manejar errores internos (11 ms)                                                                                                                                          
    createUserDelivery                                                                                                                                                                 
      √ debe retornar 400 si faltan campos obligatorios (2 ms)                                                                                                                         
      √ debe crear el pedido si todos los campos son válidos (1 ms)                                                                                                                    
      √ debe manejar errores internos (5 ms)                                                                                                                                           
    updateUserDelivery                                                                                                                                                                 
      √ debe retornar 400 si faltan campos obligatorios (1 ms)                                                                                                                         
      √ debe actualizar el pedido si todos los campos son válidos (1 ms)                                                                                                               
      √ debe manejar errores internos (6 ms)                                                                                                                                           
    deleteUserDelivery                                                                                                                                                                 
      √ debe retornar 400 si no se proporciona id_pedido (1 ms)                                                                                                                        
      √ debe eliminar el pedido si el ID es válido (1 ms)                                                                                                                              
      √ debe manejar errores internos (4 ms)                                                                                                                                           

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        0.674 s, estimated 2 s
Ran all test suites matching /src\\controllers\\__tests__\\delivery.controller.test.js/i.

| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readIdDelivery()`      | No se proporciona ID de pedido                                                      | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | Pedido no existe                                                                    | Retorna error 404                                                                 |
|                         |                         | Pedido existe                                                                       | Retorna datos del pedido                                                          |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
|                         | `readUserDelivery()`    | No se proporciona ID de usuario                                                     | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | Usuario no tiene pedidos                                                            | Retorna error 404                                                                 |
|                         |                         | Usuario tiene pedidos                                                               | Retorna lista de pedidos                                                          |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
| **Creación**            | `createUserDelivery()`  | Faltan campos obligatorios                                                          | Retorna error 400 (campos requeridos)                                             |
|                         |                         | Todos los campos válidos                                                            | Crea pedido y retorna éxito                                                       |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
| **Actualización**       | `updateUserDelivery()`  | Faltan campos obligatorios                                                          | Retorna error 400 (campos requeridos)                                             |
|                         |                         | Todos los campos válidos                                                            | Actualiza pedido y retorna éxito                                                  |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |
| **Eliminación**         | `deleteUserDelivery()`  | No se proporciona ID de pedido                                                      | Retorna error 400 (ID obligatorio)                                                |
|                         |                         | ID de pedido válido                                                                 | Elimina pedido y retorna éxito                                                    |
|                         |                         | Error de base de datos                                                              | Retorna error 500                                                                 |

###### DetailDeliveryController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/detail-delivery.controller.test.js

> backend@1.0.0 test
> jest src/controllers/__tests__/detail-delivery.controller.test.js

  console.error
    Error en readDeliveryDetails: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\detail-delivery.controller.test.js:66:71)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      24 |         }
      25 |     } catch (err) {
    > 26 |         console.error('Error en readDeliveryDetails:', err);
         |                 ^
      27 |         res.status(500).json({ message: 'Error interno del servidor' });
      28 |     }
      29 | };

      at Object.error [as readDeliveryDetails] (src/controllers/detail-delivery.controller.js:26:17)
      at Object.<anonymous> (src/controllers/__tests__/detail-delivery.controller.test.js:68:13)

  console.error                                                                                                                                                                        
    Error en createDeliveryDetails: Error: DB Error                                                                                                                                    
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\detail-delivery.controller.test.js:111:73)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      45 |         res.json({ message: 'Detalle del pedido asignado con éxito' });
      46 |     } catch (err) {
    > 47 |         console.error('Error en createDeliveryDetails:', err);
         |                 ^
      48 |         res.status(500).json({ message: 'Error interno del servidor' });
      49 |     }
      50 | };

      at Object.error [as createDeliveryDetails] (src/controllers/detail-delivery.controller.js:47:17)
      at Object.<anonymous> (src/controllers/__tests__/detail-delivery.controller.test.js:113:13)

  console.error
    Error en updateDeliveryDetails: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\detail-delivery.controller.test.js:159:73)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      67 |         res.json({ message: 'Detalle del pedido actualizado con éxito' });
      68 |     } catch (err) {
    > 69 |         console.error('Error en updateDeliveryDetails:', err);
         |                 ^
      70 |         res.status(500).json({ message: 'Error interno del servidor' });
      71 |     }
      72 | };

      at Object.error [as updateDeliveryDetails] (src/controllers/detail-delivery.controller.js:69:17)
      at Object.<anonymous> (src/controllers/__tests__/detail-delivery.controller.test.js:161:13)

  console.error                                                                                                                                                                        
    Error en deleteDeliveryDetails: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\detail-delivery.controller.test.js:194:73)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      88 |         res.json({ message: 'Detalle del pedido eliminado con éxito' });
      89 |     } catch (err) {
    > 90 |         console.error('Error en deleteDeliveryDetails:', err);
         |                 ^
      91 |         res.status(500).json({ message: 'Error interno del servidor' });
      92 |     }
      93 | };

      at Object.error [as deleteDeliveryDetails] (src/controllers/detail-delivery.controller.js:90:17)
      at Object.<anonymous> (src/controllers/__tests__/detail-delivery.controller.test.js:196:13)

 PASS  src/controllers/__tests__/detail-delivery.controller.test.js
  Detail Delivery Controller                                                                                                                                                           
    readDeliveryDetails                                                                                                                                                                
      √ debe retornar error 400 si fk_id_pedido falta (3 ms)                                                                                                                           
      √ debe retornar error 404 si el detalle del pedido no se encuentra (1 ms)                                                                                                        
      √ debe retornar el detalle del pedido si se encuentra (1 ms)                                                                                                                     
      √ debe retornar error interno en el servidor (51 ms)                                                                                                                             
    createDeliveryDetails                                                                                                                                                              
      √ debe retornar error 400 si un campo falta (1 ms)                                                                                                                               
      √ debe crear el detalle del pedido y mostrar un mensaje de éxito (1 ms)                                                                                                          
      √ debe retornar error interno en el servidor (5 ms)                                                                                                                              
    updateDeliveryDetails                                                                                                                                                              
      √ debe retornar error 400 si algún campo hace falta (4 ms)                                                                                                                       
      √ debe actualizar el detalle del pedido y mostrar un mensaje de éxito (1 ms)                                                                                                     
      √ debe retornar error interno en el servidor (4 ms)                                                                                                                              
    deleteDeliveryDetails                                                                                                                                                              
      √ retornar error 400 si fk_id_pedido falta (1 ms)                                                                                                                                
      √ debe borrar el detalle del pedido y mostrar mensaje de éxito (1 ms)                                                                                                            
      √ debe retornar error interno en el servidor (4 ms)                                                                                                                              

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       13 passed, 13 total                                                                                                                                                       
Snapshots:   0 total
Time:        0.6 s, estimated 2 s
Ran all test suites matching /src\\controllers\\__tests__\\detail-delivery.controller.test.js/i.

| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**            | `readDeliveryDetails()`      | Falta `fk_id_pedido`                                                                | Error 400: ID obligatorio                                                        |
|                         |                              | Detalle no encontrado                                                               | Error 404: Mensaje descriptivo                                                   |
|                         |                              | Detalle encontrado                                                                  | Retorna datos del detalle                                                        |
|                         |                              | Error de base de datos                                                              | Error 500: Error interno                                                         |
| **Creación**           | `createDeliveryDetails()`    | Campos incompletos                                                                  | Error 400: Todos los campos son obligatorios                                     |
|                         |                              | Creación exitosa                                                                    | Mensaje de éxito                                                                 |
|                         |                              | Error de base de datos                                                              | Error 500: Error interno                                                         |
| **Actualización**      | `updateDeliveryDetails()`    | Campos incompletos                                                                  | Error 400: Todos los campos son obligatorios                                     |
|                         |                              | Actualización exitosa                                                               | Mensaje de éxito                                                                 |
|                         |                              | Error de base de datos                                                              | Error 500: Error interno                                                         |
| **Eliminación**        | `deleteDeliveryDetails()`    | Falta `fk_id_pedido`                                                                | Error 400: ID obligatorio                                                        |
|                         |                              | Eliminación exitosa                                                                 | Mensaje de éxito                                                                 |
|                         |                              | Error de base de datos                                                              | Error 500: Error interno                                                         |

###### OpinionsController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/opinions.controller.test.js      

> backend@1.0.0 test
> jest src/controllers/__tests__/opinions.controller.test.js

 PASS  src/controllers/__tests__/opinions.controller.test.js
  Opinions Controller
    readOpinionProduct                                                                                                                                                                 
      √ debería devolver 400 si falta el ID del producto (4 ms)                                                                                                                        
      √ debería devolver la opinión si se encuentra (1 ms)
    createOpinionProduct                                                                                                                                                               
      √ debería crear la opinión correctamente (1 ms)                                                                                                                                  
    updateOpinionProduct                                                                                                                                                               
      √ debería actualizar la opinión correctamente                                                                                                                                    
    deleteOpinionProduct                                                                                                                                                               
      √ debería eliminar la opinión correctamente (1 ms)                                                                                                                               

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       5 passed, 5 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.532 s, estimated 1 s
Ran all test suites matching /src\\controllers\\__tests__\\opinions.controller.test.js/i.


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readOpinionProduct()`       | Falta ID de producto                                                                | Devuelve error 400 (ID obligatorio)                                               |
|                         |                              | ID de producto válido                                                               | Devuelve la opinión encontrada                                                    |
| **Creación**            | `createOpinionProduct()`     | Datos completos (anónimo, opinión, ID producto)                                    | Crea la opinión y devuelve mensaje de éxito                                       |
| **Actualización**       | `updateOpinionProduct()`     | Datos completos (ID opinión, anónimo, nueva opinión, ID producto)                  | Actualiza la opinión y devuelve mensaje de éxito                                  |
| **Eliminación**         | `deleteOpinionProduct()`     | ID de opinión válido                                                                | Elimina la opinión y devuelve mensaje de éxito                                    |

###### ProductController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/product.controller.test.js                                                      

> backend@1.0.0 test
> jest src/controllers/__tests__/product.controller.test.js

  console.error
    Error en getAllProducts: Error: Error de base de datos
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\product.controller.test.js:60:31)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      10 |         res.json(result);
      11 |     } catch (err) {
    > 12 |         console.error('Error en getAllProducts:', err);
         |                 ^
      13 |         res.status(500).json({ message: 'Error interno del servidor' });
      14 |     }
      15 | };

      at error (src/controllers/product.controller.js:12:17)
      at Object.<anonymous> (src/controllers/__tests__/product.controller.test.js:63:13)

  console.error
    Error: Error: Error de prueba
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\product.controller.test.js:272:31)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      140 | // Función para manejar errores
      141 | const errorHandler = (err, req, res, next) => {
    > 142 |     console.error('Error:', err);
          |             ^
      143 |     res.status(500).json({ message: 'Error interno del servidor' });
      144 | };
      145 |

      at error (src/controllers/product.controller.js:142:13)
      at Object.errorHandler (src/controllers/__tests__/product.controller.test.js:274:13)

 PASS  src/controllers/__tests__/product.controller.test.js
  Product Controller                                                                                                                                                                   
    getAllProducts                                                                                                                                                                     
      √ debería devolver todos los productos (4 ms)                                                                                                                                    
      √ debería manejar errores correctamente (56 ms)                                                                                                                                  
    getSimilarProducts                                                                                                                                                                 
      √ debería devolver productos similares (1 ms)                                                                                                                                    
    getFeaturedProducts                                                                                                                                                                
      √ debería devolver productos destacados                                                                                                                                          
      √ debería devolver mensaje cuando no hay productos destacados (1 ms)                                                                                                             
    getProductCategory                                                                                                                                                                 
      √ debería devolver productos por categoría (1 ms)                                                                                                                                
      √ debería devolver mensaje cuando no hay productos en la categoría                                                                                                               
    readProduct                                                                                                                                                                        
      √ debería devolver un producto específico (1 ms)                                                                                                                                 
      √ debería devolver mensaje cuando el producto no existe (1 ms)                                                                                                                   
    createProduct                                                                                                                                                                      
      √ debería crear un nuevo producto (1 ms)                                                                                                                                         
      √ debería devolver error cuando faltan campos obligatorios (1 ms)                                                                                                                
    updateProduct                                                                                                                                                                      
      √ debería actualizar un producto existente (1 ms)                                                                                                                                
      √ debería devolver error cuando faltan campos obligatorios                                                                                                                       
    deleteProduct                                                                                                                                                                      
      √ debería eliminar un producto existente                                                                                                                                         
      √ debería devolver error cuando falta el ID del producto (1 ms)                                                                                                                  
    errorHandler                                                                                                                                                                       
      √ debería manejar errores y enviar respuesta 500 (7 ms)                                                                                                                          

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       16 passed, 16 total                                                                                                                                                       
Snapshots:   0 total
Time:        0.633 s, estimated 1 s
Ran all test suites matching /src\\controllers\\__tests__\\product.controller.test.js/i.

| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Obtener Productos**   | `getAllProducts()`      | Solicitud exitosa                                                                   | Devuelve lista de productos                                                      |
|                         |                         | Error en base de datos                                                              | Retorna error 500 con mensaje                                                    |
| **Productos Similares** | `getSimilarProducts()`  | Búsqueda con término válido                                                         | Devuelve productos similares                                                     |
| **Destacados**          | `getFeaturedProducts()` | Existencia de productos destacados                                                  | Retorna lista de destacados                                                      |
|                         |                         | Sin productos destacados                                                            | Devuelve mensaje "No se encontraron productos destacados"                        |
| **Por Categoría**       | `getProductCategory()`  | Categoría existente                                                                 | Devuelve productos de la categoría                                               |
|                         |                         | Categoría sin productos                                                             | Retorna mensaje de no encontrados                                                |
| **Detalle Producto**    | `readProduct()`         | Producto existente                                                                  | Devuelve detalles del producto                                                   |
|                         |                         | Producto no existente                                                               | Retorna mensaje "Producto no encontrado"                                         |
| **Creación**           | `createProduct()`       | Datos completos                                                                     | Crea producto y retorna mensaje de éxito                                         |
|                         |                         | Faltan campos obligatorios                                                          | Retorna error 400 con mensaje                                                    |
| **Actualización**       | `updateProduct()`       | Datos válidos                                                                       | Actualiza producto y retorna mensaje                                             |
|                         |                         | Faltan campos obligatorios                                                          | Retorna error 400                                                                |
| **Eliminación**        | `deleteProduct()`       | ID válido                                                                           | Elimina producto y retorna confirmación                                         |
|                         |                         | Falta ID                                                                            | Retorna error 400                                                                |
| **Manejo de Errores**  | `errorHandler()`        | Ocurre un error                                                                     | Retorna respuesta 500 con mensaje genérico                                       |

###### RecoveryController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/recovery.controller.test.js                                                     

> backend@1.0.0 test
> jest src/controllers/__tests__/recovery.controller.test.js

 PASS  src/controllers/__tests__/recovery.controller.test.js
  RecoveryController
    checkEmail                                                                                                                                                                         
      √ debe retornar true cuando el email existe (4 ms)                                                                                                                               
      √ debe lanzar un error cuando el modelo falla (15 ms)                                                                                                                            
    sendVerification                                                                                                                                                                   
      √ debe generar un código, guardarlo y enviarlo por email (3 ms)                                                                                                                  
      √ debe lanzar un error si falla el guardado del código (2 ms)                                                                                                                    
      √ debe lanzar un error si falla el envío del email (2 ms)                                                                                                                        
    verifyCode                                                                                                                                                                         
      √ debe retornar true cuando el código es válido (1 ms)                                                                                                                           
      √ debe retornar false cuando el código es inválido                                                                                                                               
      √ debe lanzar un error cuando la verificación falla (1 ms)                                                                                                                       
    resetPassword                                                                                                                                                                      
      √ debe actualizar la contraseña cuando el código es válido (1 ms)                                                                                                                
      √ debe retornar false cuando el código es inválido (1 ms)                                                                                                                        
      √ debe lanzar un error si falla la actualización de contraseña (2 ms)                                                                                                            

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       11 passed, 11 total                                                                                                                                                       
Snapshots:   0 total
Time:        0.873 s, estimated 3 s
Ran all test suites matching /src\\controllers\\__tests__\\recovery.controller.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Verificación Email**  | `checkEmail()`          | Email existe en el sistema                                                          | Retorna `true`                                                                    |
|                         |                         | Fallo en la consulta a la base de datos                                             | Lanza error con mensaje original                                                  |
| **Envío de Código**     | `sendVerification()`    | Generación y envío exitoso de código                                                | Retorna `true` (código de 6 dígitos guardado y email enviado)                    |
|                         |                         | Fallo al guardar el código en DB                                                    | Lanza error y registra en consola                                                 |
|                         |                         | Fallo en el envío del email                                                         | Lanza error específico del servicio de email                                      |
| **Validación Código**   | `verifyCode()`          | Código correcto para el email                                                       | Retorna `true`                                                                    |
|                         |                         | Código incorrecto                                                                   | Retorna `false`                                                                   |
|                         |                         | Error en la verificación (ej. DB no disponible)                                     | Lanza error con detalles                                                          |
| **Reset Password**      | `resetPassword()`       | Código válido + nueva contraseña                                                    | Actualiza contraseña y retorna `true`                                             |
|                         |                         | Código inválido                                                                     | No actualiza contraseña y retorna `false`                                         |
|                         |                         | Error al actualizar contraseña                                                      | Lanza error y registra en consola                                                 |

###### SendMethodController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/send-method.controller.test.js   

> backend@1.0.0 test
> jest src/controllers/__tests__/send-method.controller.test.js

  console.error
    Error en readSendMethod: Error: Error de DB
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\send-method.controller.test.js:74:66)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      24 |         }
      25 |     } catch (err) {
    > 26 |         console.error('Error en readSendMethod:', err);
         |                 ^
      27 |         res.status(500).json({ message: 'Error interno del servidor' });
      28 |     }
      29 | };

      at error (src/controllers/send-method.controller.js:26:17)
      at Object.<anonymous> (src/controllers/__tests__/send-method.controller.test.js:77:13)

  console.error
    Error en createSendMethod: Error: Error de DB
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\send-method.controller.test.js:120:68)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      45 |         res.json({ message: 'Método de envío creado con éxito' });
      46 |     } catch (err) {
    > 47 |         console.error('Error en createSendMethod:', err);
         |                 ^
      48 |         res.status(500).json({ message: 'Error interno del servidor' });
      49 |     }
      50 | };

      at error (src/controllers/send-method.controller.js:47:17)
      at Object.<anonymous> (src/controllers/__tests__/send-method.controller.test.js:126:13)

  console.error
    Error en updateSendMethod: Error: Error de DB
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\send-method.controller.test.js:161:68)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      67 |         res.json({ message: 'Método de envío actualizado con éxito' });
      68 |     } catch (err) {
    > 69 |         console.error('Error en updateSendMethod:', err);
         |                 ^
      70 |         res.status(500).json({ message: 'Error interno del servidor' });
      71 |     }
      72 | };

      at error (src/controllers/send-method.controller.js:69:17)
      at Object.<anonymous> (src/controllers/__tests__/send-method.controller.test.js:165:13)

  console.error                                                                                                                                                                        
    Error en deleteSendMethod: Error: Error de DB                                                                                                                                      
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\send-method.controller.test.js:194:68)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      88 |         res.json({ message: 'Método de envío eliminado con éxito' });
      89 |     } catch (err) {
    > 90 |         console.error('Error en deleteSendMethod:', err);
         |                 ^
      91 |         res.status(500).json({ message: 'Error interno del servidor' });
      92 |     }
      93 | };

      at error (src/controllers/send-method.controller.js:90:17)
      at Object.<anonymous> (src/controllers/__tests__/send-method.controller.test.js:197:13)

 PASS  src/controllers/__tests__/send-method.controller.test.js
  Send Method Controller                                                                                                                                                               
    readSendMethod                                                                                                                                                                     
      √ debería devolver 400 si no se proporciona id_metodo_envio (3 ms)                                                                                                               
      √ debería devolver el método de envío si existe (1 ms)                                                                                                                           
      √ debería devolver mensaje de no encontrado si el método no existe (1 ms)                                                                                                        
      √ debería manejar errores internos (50 ms)                                                                                                                                       
    createSendMethod                                                                                                                                                                   
      √ debería devolver 400 si faltan campos obligatorios (2 ms)                                                                                                                      
      √ debería crear el método de envío exitosamente (1 ms)                                                                                                                           
      √ debería manejar errores internos (5 ms)                                                                                                                                        
    updateSendMethod                                                                                                                                                                   
      √ debería devolver 400 si faltan campos obligatorios                                                                                                                             
      √ debería actualizar el método de envío exitosamente (4 ms)                                                                                                                      
      √ debería manejar errores internos (6 ms)                                                                                                                                        
    deleteSendMethod                                                                                                                                                                   
      √ debería devolver 400 si no se proporciona id_metodo_envio (1 ms)                                                                                                               
      √ debería eliminar el método de envío exitosamente (1 ms)                                                                                                                        
      √ debería manejar errores internos (5 ms)                                                                                                                                        

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        0.627 s, estimated 1 s
Ran all test suites matching /src\\controllers\\__tests__\\send-method.controller.test.js/i.

| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readSendMethod()`      | No se proporciona ID                                                                | Devuelve error 400 (campo obligatorio)                                           |
|                         |                         | Método existe                                                                       | Devuelve los datos del método                                                    |
|                         |                         | Método no existe                                                                    | Devuelve mensaje "No encontrado"                                                 |
|                         |                         | Error de base de datos                                                              | Devuelve error 500 (interno)                                                     |
| **Creación**            | `createSendMethod()`    | Faltan campos obligatorios (3 casos)                                                | Devuelve error 400 para cada caso                                                |
|                         |                         | Datos completos                                                                     | Crea el método y devuelve mensaje de éxito                                       |
|                         |                         | Error de base de datos                                                              | Devuelve error 500                                                               |
| **Actualización**       | `updateSendMethod()`    | Faltan campos obligatorios (2 casos)                                                | Devuelve error 400 para cada caso                                                |
|                         |                         | Datos completos                                                                     | Actualiza el método y devuelve mensaje de éxito                                  |
|                         |                         | Error de base de datos                                                              | Devuelve error 500                                                               |
| **Eliminación**         | `deleteSendMethod()`    | No se proporciona ID                                                                | Devuelve error 400 (campo obligatorio)                                           |
|                         |                         | ID válido                                                                           | Elimina el método y devuelve mensaje de éxito                                    |
|                         |                         | Error de base de datos                                                              | Devuelve error 500                                                               |

###### UserController

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/controllers/__tests__/user.controller.test.js

> backend@1.0.0 test
> jest src/controllers/__tests__/user.controller.test.js

  console.error
    Error en readUser: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\user.controller.test.js:117:50)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      51 |         }
      52 |     } catch (err) {
    > 53 |         console.error('Error en readUser:', err);
         |                 ^
      54 |         res.status(500).json({ message: 'Error interno del servidor' });
      55 |     }
      56 | };

      at Object.error [as readUser] (src/controllers/user.controller.js:53:17)
      at Object.<anonymous> (src/controllers/__tests__/user.controller.test.js:119:13)

  console.error                                                                                                                                                                        
    Error en createUser: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\user.controller.test.js:159:52)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      72 |         res.json({ message: `Usuario creado con éxito. El id del usuario es: ${result.insertId}` });
      73 |     } catch (err) {
    > 74 |         console.error('Error en createUser:', err);
         |                 ^
      75 |         res.status(500).json({ message: 'Error interno del servidor' });
      76 |     }
      77 | };

      at Object.error [as createUser] (src/controllers/user.controller.js:74:17)
      at Object.<anonymous> (src/controllers/__tests__/user.controller.test.js:161:13)

  console.error                                                                                                                                                                        
    Error en deleteUser: Error: DB Error                                                                                                                                               
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\user.controller.test.js:218:52)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      178 |         res.json({ message: 'Usuario eliminado con éxito' });
      179 |     } catch (err) {
    > 180 |         console.error('Error en deleteUser:', err);
          |                 ^
      181 |         res.status(500).json({ message: 'Error interno del servidor' });
      182 |     }
      183 | };

      at Object.error [as deleteUser] (src/controllers/user.controller.js:180:17)
      at Object.<anonymous> (src/controllers/__tests__/user.controller.test.js:220:13)

  console.error
    Error en readUser: Error: DB Error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\controllers\__tests__\user.controller.test.js:258:53)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      201 |         }
      202 |     } catch (err) {
    > 203 |         console.error('Error en readUser:', err);
          |                 ^
      204 |         res.status(500).json({ message: 'Error interno del servidor' });
      205 |     }
      206 | }

      at Object.error [as findByEmail] (src/controllers/user.controller.js:203:17)
      at Object.<anonymous> (src/controllers/__tests__/user.controller.test.js:260:13)

 PASS  src/controllers/__tests__/user.controller.test.js
  User Controller Tests                                                                                                                                                                
    Middleware verifyToken                                                                                                                                                             
      √ retornar error 401 si el token falta (4 ms)                                                                                                                                    
      √ retorna error 403 si el token es inválido (1 ms)                                                                                                                               
      √ llamar al siguiente método si el token es válido (1 ms)                                                                                                                        
    readUser                                                                                                                                                                           
      √ retorna error 404 si el ID del usuario falta (2 ms)                                                                                                                            
      √ retornar el usuario si este se encuentra (1 ms)                                                                                                                                
      √ retornar un mensaje de no encontrado si el usuario no existe                                                                                                                   
      √ debe manejar los errores (57 ms)                                                                                                                                               
    createUser                                                                                                                                                                         
      √ retornar error 404 si algún campo hace falta                                                                                                                                   
      √ debe crear el usuario y retornar un mensaje de éxito (1 ms)                                                                                                                    
      √ debe manejar errores (7 ms)                                                                                                                                                    
    updateUser                                                                                                                                                                         
      √ actualizar el usuario con su contraseña                                                                                                                                        
    deleteUser                                                                                                                                                                         
      √ retornar error 400 si falta el ID del usuario                                                                                                                                  
      √ debe eliminar el usuario y mostrar un mensaje de éxito                                                                                                                         
      √ debe manejar errores (4 ms)                                                                                                                                                    
    findByEmail                                                                                                                                                                        
      √ retornar error 400 si el email no se provee (1 ms)                                                                                                                             
      √ debe retornar el usuario con su respectivo correo (1 ms)                                                                                                                       
      √ debe retornar un mensaje de no encontrado en caso de no hallar el usuario con el correo (1 ms)                                                                                 
      √ manejar errores (5 ms)                                                                                                                                                         

Test Suites: 1 passed, 1 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        0.722 s, estimated 1 s
Ran all test suites matching /src\\controllers\\__tests__\\user.controller.test.js/i


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Middleware**          | `verifyToken()`         | Falta token                                                                         | Retorna error 401 (Token requerido)                                              |
|                         |                         | Token inválido                                                                      | Retorna error 403 (Token inválido/expirado)                                      |
|                         |                         | Token válido                                                                        | Asigna usuario a `req.user` y llama a `next()`                                   |
| **Lectura**             | `readUser()`            | Falta ID de usuario                                                                 | Retorna error 400 (ID obligatorio)                                               |
|                         |                         | Usuario encontrado                                                                  | Retorna datos del usuario                                                        |
|                         |                         | Usuario no existe                                                                   | Retorna mensaje "Usuario no encontrado"                                          |
|                         |                         | Error de base de datos                                                              | Retorna error 500 (Error interno)                                                |
| **Creación**            | `createUser()`          | Campos faltantes                                                                    | Retorna error 400 (Campos obligatorios)                                          |
|                         |                         | Creación exitosa                                                                    | Retorna mensaje con ID del nuevo usuario                                         |
|                         |                         | Error de base de datos                                                              | Retorna error 500 (Error interno)                                                |
| **Actualización**       | `updateUser()`          | Actualización con contraseña                                                        | Llama a modelo con nuevos datos y retorna usuario actualizado                    |
| **Eliminación**         | `deleteUser()`          | Falta ID de usuario                                                                 | Retorna error 400 (ID obligatorio)                                               |
|                         |                         | Eliminación exitosa                                                                 | Retorna mensaje de éxito                                                         |
|                         |                         | Error de base de datos                                                              | Retorna error 500 (Error interno)                                                |
| **Búsqueda**            | `findByEmail()`         | Falta email                                                                         | Retorna error 400 (Email obligatorio)                                            |
|                         |                         | Usuario encontrado                                                                  | Retorna datos del usuario                                                        |
|                         |                         | Usuario no existe                                                                   | Retorna mensaje "Usuario no encontrado"                                          |
|                         |                         | Error de base de datos                                                              | Retorna error 500 (Error interno)                                                |

##### Modelos

###### CategoryModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/category.model.test.js       

> backend@1.0.0 test
> jest src/models/__tests__/category.model.test.js

 PASS  src/models/__tests__/category.model.test.js
  Operaciones CRUD para las Categorías
    readCategory                                                                                                                                                                       
      √ el resultado debe ser una categoría por ID (4 ms)                                                                                                                              
      √ manejar errores en la BD (13 ms)                                                                                                                                               
    createCategory                                                                                                                                                                     
      √ debe crear una nueva categoría (1 ms)                                                                                                                                          
      √ manejar errores de la creación de categorías (1 ms)                                                                                                                            
    updateCategory                                                                                                                                                                     
      √ debe actualizar una categoría existente (1 ms)                                                                                                                                 
      √ manejar errores en la actualización (1 ms)                                                                                                                                     
    deleteCategory                                                                                                                                                                     
      √ debe eliminar una categoría                                                                                                                                                    
      √ manejar errores en la eliminación                                                                                                                                              

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.974 s, estimated 2 s
Ran all test suites matching /src\\models\\__tests__\\category.model.test.js/i.


| Categoría          | Método Probado       | Escenarios Cubiertos                          | Resultado Esperado                          |
|--------------------|----------------------|-----------------------------------------------|---------------------------------------------|
| **Lectura**        | `readCategory()`     | Consulta exitosa por ID                       | Retorna categoría específica                |
|                    |                      | Error en la base de datos                     | Lanza error 'Error en la BD'                |
| **Creación**       | `createCategory()`   | Inserción exitosa                             | Retorna objeto con affectedRows: 1          |
|                    |                      | Error al crear                                | Lanza error 'Fallo en la creación'          |
| **Actualización**  | `updateCategory()`   | Actualización exitosa                         | Retorna objeto con affectedRows: 1          |
|                    |                      | Error al actualizar                           | Lanza error 'Fallo en la actualización'     |
| **Eliminación**    | `deleteCategory()`   | Eliminación exitosa                           | Retorna objeto con affectedRows: 1          |
|                    |                      | Error al eliminar                             | Lanza error 'Fallo en la eliminación'       |

###### CityModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/city.model.test.js                                                                   

> backend@1.0.0 test
> jest src/models/__tests__/city.model.test.js

 PASS  src/models/__tests__/city.model.test.js
  Pruebas para el CRUD de ciudades
    readCity                                                                                                                                                                           
      √ debería llamar a la consulta SQL correcta para leer una ciudad (4 ms)                                                                                                          
      √ debería manejar errores de la base de datos (13 ms)                                                                                                                            
    createCity                                                                                                                                                                         
      √ debería crear una nueva ciudad correctamente (2 ms)                                                                                                                            
      √ debería manejar errores al crear una ciudad (1 ms)                                                                                                                             
    updateCity                                                                                                                                                                         
      √ debería actualizar una ciudad existente correctamente (1 ms)                                                                                                                   
      √ debería manejar errores al actualizar una ciudad (1 ms)                                                                                                                        
    deleteCity                                                                                                                                                                         
      √ debería eliminar una ciudad correctamente (1 ms)                                                                                                                               
      √ debería manejar errores al eliminar una ciudad (1 ms)                                                                                                                          

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.57 s, estimated 2 s
Ran all test suites matching /src\\models\\__tests__\\city.model.test.js/i.


| Categoría          | Método Probado  | Escenarios Cubiertos                              | Resultado Esperado                                                                 |
|--------------------|-----------------|--------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**        | `readCity()`    | Consulta exitosa por ID                          | Devuelve los datos de la ciudad (ej. `[{ id_ciudad: 1, nombre: 'Madrid' }]`)     |
|                    |                 | Error en consulta a BD                           | Lanza error con mensaje descriptivo                                               |
| **Creación**       | `createCity()`  | Inserción exitosa                                | Devuelve objeto con `affectedRows: 1`                                             |
|                    |                 | Error al insertar                                | Lanza error con mensaje descriptivo                                               |
| **Actualización**  | `updateCity()`  | Actualización exitosa                            | Devuelve objeto con `affectedRows: 1`                                             |
|                    |                 | Error al actualizar                              | Lanza error con mensaje descriptivo                                               |
| **Eliminación**    | `deleteCity()`  | Eliminación exitosa                              | Devuelve objeto con `affectedRows: 1`                                             |
|                    |                 | Error al eliminar                                | Lanza error con mensaje descriptivo                                               |

###### DeliveryStateModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/delivery-state.model.test.js 

> backend@1.0.0 test
> jest src/models/__tests__/delivery-state.model.test.js

 PASS  src/models/__tests__/delivery-state.model.test.js
  Pruebas para el CRUD de estados de pedido
    readDeliveryState                                                                                                                                                                  
      √ debe llamar a la consulta correcta para leer un estado de pedido (4 ms)                                                                                                        
      √ debe manejar errores de la base de datos (10 ms)                                                                                                                               
    createDeliveryState                                                                                                                                                                
      √ debe crear un nuevo estado de pedido correctamente (1 ms)                                                                                                                      
      √ debe manejar errores al crear un estado de pedido                                                                                                                              
    updateDeliveryState                                                                                                                                                                
      √ debe actualizar un estado de pedido correctamente (1 ms)                                                                                                                       
      √ debe manejar errores al actualizar un estado de pedido (1 ms)                                                                                                                  
    deleteDeliveryState                                                                                                                                                                
      √ debe eliminar un estado de pedido correctamente (1 ms)                                                                                                                         
      √ debe manejar errores al eliminar un estado de pedido (1 ms)                                                                                                                    

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       8 passed, 8 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.527 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\delivery-state.model.test.js/i.


| Categoría          | Método Probado           | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|--------------------|--------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**        | `readDeliveryState()`    | Consulta exitosa por ID                                                             | Retorna datos del estado de pedido                                                |
|                    |                          | Error de base de datos                                                              | Rechaza con el error correspondiente                                              |
| **Creación**       | `createDeliveryState()`  | Inserción exitosa                                                                   | Retorna objeto con `affectedRows: 1`                                              |
|                    |                          | Error al insertar                                                                   | Rechaza con el error de inserción                                                 |
| **Actualización**  | `updateDeliveryState()`  | Actualización exitosa por ID                                                        | Retorna objeto con `affectedRows: 1`                                              |
|                    |                          | Error al actualizar                                                                 | Rechaza con el error de actualización                                             |
| **Eliminación**    | `deleteDeliveryState()`  | Eliminación exitosa por ID                                                          | Retorna objeto con `affectedRows: 1`                                              |
|                    |                          | Error al eliminar                                                                   | Rechaza con el error de eliminación                                               |

###### DeliveryModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/delivery.model.test.js       

> backend@1.0.0 test
> jest src/models/__tests__/delivery.model.test.js

 PASS  src/models/__tests__/delivery.model.test.js
  Módulo de Pedidos
    readIdDelivery                                                                                                                                                                     
      √ debería buscar un pedido por ID correctamente (5 ms)                                                                                                                           
      √ debería manejar errores al buscar un pedido por ID (15 ms)
    readUserDelivery                                                                                                                                                                   
      √ debería buscar pedidos por usuario correctamente (1 ms)                                                                                                                        
    createUserDelivery                                                                                                                                                                 
      √ debería crear un nuevo pedido correctamente (1 ms)                                                                                                                             
    updateUserDelivery                                                                                                                                                                 
      √ debería actualizar un pedido existente correctamente (1 ms)                                                                                                                    
    deleteUserDelivery                                                                                                                                                                 
      √ debería eliminar un pedido correctamente (1 ms)                                                                                                                                
      √ debería manejar errores al eliminar un pedido (1 ms)                                                                                                                           

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       7 passed, 7 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.603 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\delivery.model.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Consultas**           | `readIdDelivery()`      | Búsqueda exitosa por ID de pedido                                                   | Retorna datos del pedido                                                          |
|                         |                         | Error en consulta a la base de datos                                                | Rechaza con mensaje de error                                                      |
|                         | `readUserDelivery()`    | Búsqueda exitosa por ID de usuario                                                  | Retorna lista de pedidos del usuario                                              |
| **Creación**           | `createUserDelivery()`  | Inserción exitosa de nuevo pedido                                                   | Retorna resultado con ID del nuevo pedido                                         |
| **Actualización**      | `updateUserDelivery()`  | Modificación exitosa de pedido existente                                            | Retorna resultado indicando filas afectadas                                       |
| **Eliminación**        | `deleteUserDelivery()`  | Eliminación exitosa de pedido                                                       | Retorna resultado indicando filas afectadas                                       |
|                         |                         | Error al eliminar pedido                                                            | Rechaza con mensaje de error                                                      |


###### DetailDeliveryModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/detail-delivery.model.test.js

> backend@1.0.0 test
> jest src/models/__tests__/detail-delivery.model.test.js

 PASS  src/models/__tests__/detail-delivery.model.test.js
  Funciones CRUD para Detalle de Pedido
    readDeliveryDetails                                                                                                                                                                
      √ debería ejecutar la consulta correcta para leer detalles de un pedido (4 ms)                                                                                                   
      √ debería manejar errores al leer detalles de un pedido (14 ms)                                                                                                                  
    createDeliveryDetails                                                                                                                                                              
      √ debería crear correctamente un nuevo detalle de pedido (1 ms)                                                                                                                  
      √ debería manejar errores al crear un detalle de pedido (1 ms)                                                                                                                   
    updateDeliveryDetails                                                                                                                                                              
      √ debería actualizar correctamente un detalle de pedido existente (1 ms)                                                                                                         
      √ debería manejar errores al actualizar un detalle de pedido (1 ms)                                                                                                              
    deleteDeliveryDetails                                                                                                                                                              
      √ debería eliminar correctamente un detalle de pedido (1 ms)                                                                                                                     
      √ debería manejar errores al eliminar un detalle de pedido (1 ms)                                                                                                                

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       8 passed, 8 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.574 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\detail-delivery.model.test.js/i.


| Categoría          | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|--------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**        | `readDeliveryDetails()`      | Consulta exitosa de detalles de pedido                                              | Devuelve los detalles del pedido                                                  |
|                    |                              | Error en la consulta a la base de datos                                             | Lanza el error correspondiente                                                    |
| **Creación**       | `createDeliveryDetails()`    | Inserción exitosa de nuevo detalle                                                  | Devuelve resultado con affectedRows: 1                                            |
|                    |                              | Error en la inserción                                                               | Lanza el error correspondiente                                                    |
| **Actualización**  | `updateDeliveryDetails()`    | Actualización exitosa de cantidad/precio                                            | Devuelve resultado con affectedRows: 1                                            |
|                    |                              | Error en la actualización                                                           | Lanza el error correspondiente                                                    |
| **Eliminación**    | `deleteDeliveryDetails()`    | Eliminación exitosa de detalle                                                      | Devuelve resultado con affectedRows: 1                                            |
|                    |                              | Error en la eliminación                                                             | Lanza el error correspondiente                                                    |



###### OpinionsModel
PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/opinions.model.test.js       

> backend@1.0.0 test
> jest src/models/__tests__/opinions.model.test.js

 PASS  src/models/__tests__/opinions.model.test.js
  Servicio de Opiniones de Productos
    readOpinionProduct                                                                                                                                                                 
      √ debería buscar opiniones de un producto específico (4 ms)                                                                                                                      
      √ debería manejar errores al buscar opiniones (14 ms)                                                                                                                            
    createOpinionProduct                                                                                                                                                               
      √ debería crear una nueva opinión para un producto (1 ms)                                                                                                                        
    updateOpinionProduct                                                                                                                                                               
      √ debería actualizar una opinión existente (2 ms)                                                                                                                                
      √ debería manejar errores al actualizar (1 ms)                                                                                                                                   
    deleteOpinionProduct                                                                                                                                                               
      √ debería eliminar una opinión existente (2 ms)                                                                                                                                  
      √ debería manejar errores al eliminar (1 ms)                                                                                                                                     

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       7 passed, 7 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.561 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\opinions.model.test.js/i


| Categoría               | Método Probado               | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Consultar Opiniones** | `readOpinionProduct()`       | Búsqueda exitosa de opiniones por producto                                         | Devuelve array con opiniones del producto                                        |
|                         |                              | Error en consulta a la base de datos                                               | Lanza error con mensaje descriptivo                                              |
| **Crear Opinión**       | `createOpinionProduct()`     | Creación exitosa de opinión (no anónima)                                           | Devuelve objeto con `insertId` de la nueva opinión                               |
|                         |                              | Creación exitosa de opinión anónima                                                 | Registra opinión con flag `es_anonimo = true`                                    |
| **Actualizar Opinión**  | `updateOpinionProduct()`     | Actualización exitosa de opinión existente                                          | Devuelve objeto con `affectedRows = 1`                                           |
|                         |                              | Error al actualizar (opinión no existe o DB error)                                  | Lanza error con mensaje descriptivo                                              |
| **Eliminar Opinión**    | `deleteOpinionProduct()`     | Eliminación exitosa de opinión existente                                            | Devuelve objeto con `affectedRows = 1`                                           |
|                         |                              | Error al eliminar (opinión no existe o DB error)                                    | Lanza error con mensaje descriptivo                                              |


###### ProductModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/product.model.test.js 

> backend@1.0.0 test
> jest src/models/__tests__/product.model.test.js

 PASS  src/models/__tests__/product.model.test.js
  Servicio de Productos
    getAllProducts                                                                                                                                                                     
      √ debería ejecutar la consulta correcta para obtener todos los productos (4 ms)                                                                                                  
    getSimilarProducts                                                                                                                                                                 
      √ debería ejecutar una consulta con LIKE para buscar productos similares (1 ms)                                                                                                  
    getFeaturedProducts                                                                                                                                                                
      √ debería obtener solo los productos destacados (1 ms)                                                                                                                           
    getProductCategory                                                                                                                                                                 
      √ debería obtener productos por categoría específica (1 ms)                                                                                                                      
    readProduct                                                                                                                                                                        
      √ debería obtener un producto por su ID (1 ms)                                                                                                                                   
    createProduct                                                                                                                                                                      
      √ debería insertar un nuevo producto en la base de datos (1 ms)                                                                                                                  
    updateProduct                                                                                                                                                                      
      √ debería actualizar un producto existente                                                                                                                                       
    deleteProduct                                                                                                                                                                      
      √ debería eliminar un producto por su ID                                                                                                                                         

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       8 passed, 8 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.576 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\product.model.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Obtener Productos**   | `getAllProducts()`      | Consulta básica de todos los productos                                              | Devuelve array de productos con campos específicos                                |
| **Búsqueda**            | `getSimilarProducts()`  | Búsqueda con término (ej. "camiseta")                                              | Usa LIKE en la consulta y devuelve productos coincidentes                        |
| **Productos Destacados**| `getFeaturedProducts()` | Filtrado por productos destacados                                                  | Solo devuelve productos con `destacado = 1`                                      |
| **Por Categoría**       | `getProductCategory()`  | Búsqueda por ID de categoría                                                       | Devuelve productos unidos con tabla categorías                                   |
| **Detalle Producto**    | `readProduct()`         | Búsqueda por ID de producto                                                        | Devuelve solo el producto solicitado                                             |
| **Creación**            | `createProduct()`       | Inserción con todos los campos requeridos                                          | Retorna objeto con `insertId` del nuevo producto                                 |
| **Actualización**       | `updateProduct()`       | Modificación de nombre, stock, categoría y precio                                  | Retorna objeto con `affectedRows`                                                |
| **Eliminación**         | `deleteProduct()`       | Eliminación por ID de producto                                                     | Retorna objeto con `affectedRows`                                                |


###### RecoveryModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/recovery.model.test.js

> backend@1.0.0 test
> jest src/models/__tests__/recovery.model.test.js

  console.error
    Error al verificar el correo: Error: Database error
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\models\__tests__\recovery.model.test.js:42:31)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      19 |             databaseConnection.query(query, [email], (err, results) => {
      20 |                 if (err) {
    > 21 |                     console.error("Error al verificar el correo:", err);
         |                             ^
      22 |                     reject(err);
      23 |                 } else {
      24 |                     resolve(results.length > 0);

      at error (src/models/recovery.model.js:21:29)
      at Object.callback (src/models/__tests__/recovery.model.test.js:44:17)
      at query (src/models/recovery.model.js:19:32)
      at RecoveryModel.checkUserEmail (src/models/recovery.model.js:16:16)
      at Object.checkUserEmail (src/models/__tests__/recovery.model.test.js:47:40)

  console.error                                                                                                                                                                        
    Error al actualizar la contraseña: Error: Database error                                                                                                                           
        at Object.<anonymous> (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\src\models\__tests__\recovery.model.test.js:163:31)
        at Promise.then.completed (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:298:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\utils.js:231:10)
        at _callCircusTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:316:40)
        at _runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:252:3)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:126:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at _runTestsForDescribeBlock (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:121:9)
        at run (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\run.js:71:3)
        at runAndTransformResultsToJestFormat (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
        at jestAdapter (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
        at runTestInternal (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:367:16)
        at runTest (C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend\node_modules\jest-runner\build\runTest.js:444:34)

      93 |                 databaseConnection.query(query, [hashedPassword, email], (err, results) => {
      94 |                     if (err) {
    > 95 |                         console.error("Error al actualizar la contraseña:", err);
         |                                 ^
      96 |                         reject(err);
      97 |                     } else if (results.affectedRows === 0) {
      98 |                         resolve(false);

      at error (src/models/recovery.model.js:95:33)
      at Object.callback (src/models/__tests__/recovery.model.test.js:166:17)
      at query (src/models/recovery.model.js:93:36)

 PASS  src/models/__tests__/recovery.model.test.js
  RecoveryModel                                                                                                                                                                        
    checkUserEmail                                                                                                                                                                     
      √ debe devolver true si el usuario existe (3 ms)                                                                                                                                 
      √ debe devolver false si el usuario no existe (1 ms)                                                                                                                             
      √ debe rechazar con error si hay un problema en la base de datos (52 ms)                                                                                                         
    saveVerificationCode                                                                                                                                                               
      √ debe guardar correctamente un código de verificación (2 ms)                                                                                                                    
      √ debe establecer el tiempo de expiración correctamente (1 ms)                                                                                                                   
    verifyCode                                                                                                                                                                         
      √ debe devolver true para un código válido (1 ms)                                                                                                                                
      √ debe devolver false para un código incorrecto (1 ms)                                                                                                                           
      √ debe devolver false para un código expirado (1 ms)                                                                                                                             
      √ debe devolver false para un email no existente (1 ms)                                                                                                                          
    updatePassword                                                                                                                                                                     
      √ debe actualizar la contraseña correctamente (4 ms)                                                                                                                             
      √ debe devolver false si no se actualiza ninguna fila (1 ms)                                                                                                                     
      √ debe rechazar con error si hay un problema en la base de datos (5 ms)                                                                                                          
    deleteVerificationCode                                                                                                                                                             
      √ debe eliminar correctamente un código de verificación                                                                                                                          
      √ debe devolver true incluso si el código no existe                                                                                                                              

Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        0.634 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\recovery.model.test.js/i


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Verificación Email**  | `checkUserEmail()`      | Email existe en la base de datos                                                    | Devuelve `true`                                                                   |
|                         |                         | Email no existe                                                                     | Devuelve `false`                                                                  |
|                         |                         | Error de base de datos                                                              | Rechaza con error                                                                 |
| **Códigos de Verificación** | `saveVerificationCode()` | Guardar código nuevo                                                              | Almacena código con timestamp de expiración                                       |
|                         |                         | Especificar tiempo de expiración personalizado                                     | Calcula correctamente el timestamp futuro                                         |
|                         | `verifyCode()`          | Código correcto y vigente                                                          | Devuelve `true`                                                                   |
|                         |                         | Código incorrecto                                                                  | Devuelve `false`                                                                  |
|                         |                         | Código expirado                                                                    | Devuelve `false` y limpia el código                                               |
|                         |                         | Email no registrado                                                                | Devuelve `false`                                                                  |
|                         | `deleteVerificationCode()` | Eliminar código existente                                                         | Remueve el código del almacenamiento                                              |
|                         |                         | Eliminar código no existente                                                       | Devuelve `true` (idempotente)                                                     |
| **Actualización Contraseña** | `updatePassword()`    | Actualización exitosa                                                              | Hashea la contraseña, actualiza BD y limpia códigos (devuelve `true`)             |
|                         |                         | Email no existe en BD                                                              | Devuelve `false` (0 filas afectadas)                                              |
|                         |                         | Error de base de datos                                                              | Rechaza con error                                                                 |


###### SendMethodModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/send-method.model.test.js

> backend@1.0.0 test
> jest src/models/__tests__/send-method.model.test.js

 PASS  src/models/__tests__/send-method.model.test.js
  Pruebas para el CRUD de métodos de envío
    readSendMethod                                                                                                                                                                     
      √ debería ejecutar una consulta SELECT correctamente (4 ms)                                                                                                                      
      √ debería manejar errores correctamente (15 ms)                                                                                                                                  
    createSendMethod                                                                                                                                                                   
      √ debería ejecutar una consulta INSERT correctamente (1 ms)                                                                                                                      
    updateSendMethod                                                                                                                                                                   
      √ debería ejecutar una consulta UPDATE correctamente (1 ms)                                                                                                                      
    deleteSendMethod                                                                                                                                                                   
      √ debería ejecutar una consulta DELETE correctamente (1 ms)                                                                                                                      

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       5 passed, 5 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.54 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\send-method.model.test.js/i.


| Categoría          | Método Probado           | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|--------------------|--------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**        | `readSendMethod()`       | Consulta SELECT con ID válido                                                       | Devuelve los datos del método de envío                                           |
|                    |                          | Error en la consulta a la base de datos                                             | Rechaza con el error correspondiente                                             |
| **Creación**       | `createSendMethod()`     | Inserción con datos válidos (ID y nombre)                                           | Devuelve objeto con `affectedRows: 1`                                            |
| **Actualización**  | `updateSendMethod()`     | UPDATE con nuevos datos válidos                                                     | Devuelve objeto con `affectedRows: 1`                                            |
| **Eliminación**    | `deleteSendMethod()`     | DELETE con ID válido                                                                | Devuelve objeto con `affectedRows: 1`                                            |


###### UserModel

PS C:\Users\rojas\OneDrive\Desktop\DollarSoftware-SUPEREAL\backend> npm test src/models/__tests__/user.model.test.js       

> backend@1.0.0 test
> jest src/models/__tests__/user.model.test.js

 PASS  src/models/__tests__/user.model.test.js
  Servicio de Usuarios
    readUser                                                                                                                                                                           
      √ debería buscar un usuario por ID correctamente (4 ms)                                                                                                                          
      √ debería manejar errores al buscar un usuario (18 ms)                                                                                                                           
    createUser                                                                                                                                                                         
      √ debería crear un nuevo usuario correctamente (1 ms)                                                                                                                            
    updateUser
      √ debería actualizar un usuario existente correctamente (1 ms)                                                                                                                   
    deleteUser                                                                                                                                                                         
      √ debería eliminar un usuario correctamente (1 ms)                                                                                                                               
    findByEmail                                                                                                                                                                        
      √ debería buscar un usuario por correo electrónico correctamente (1 ms)                                                                                                          
    updatePassword                                                                                                                                                                     
      √ debería actualizar solo la contraseña de un usuario (1 ms)                                                                                                                     

Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       7 passed, 7 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.55 s, estimated 1 s
Ran all test suites matching /src\\models\\__tests__\\user.model.test.js/i.


| Categoría               | Método Probado          | Escenarios Cubiertos                                                                 | Resultado Esperado                                                                 |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Lectura**             | `readUser()`            | Buscar usuario por ID existente                                                     | Retorna datos del usuario                                                        |
|                         |                         | Error al buscar usuario                                                             | Rechaza con error de base de datos                                               |
| **Creación**            | `createUser()`          | Crear nuevo usuario con datos válidos                                               | Retorna ID del usuario creado                                                    |
| **Actualización**       | `updateUser()`          | Actualizar datos completos de usuario                                               | Confirma número de filas afectadas                                               |
| **Eliminación**         | `deleteUser()`          | Eliminar usuario existente                                                          | Confirma número de filas afectadas                                               |
| **Búsqueda**            | `findByEmail()`         | Buscar usuario por email existente                                                  | Retorna datos del usuario                                                        |
| **Seguridad**           | `updatePassword()`      | Actualizar contraseña de usuario                                                    | Confirma cambio de contraseña                                                    |
