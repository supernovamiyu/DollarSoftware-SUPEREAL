// Exportar los módulos necesarios

const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const recoveryController = require("../controllers/recovery.controller")

// Crear un enrutador
const router = Router();

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para obtener el perfil del usuario autenticado
// Esta ruta está protegida por el middleware verifyToken
router.get('/profile', authController.verifyToken, authController.getProfile);

// Ruta para verificar si existe un correo
router.post("/check-email", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "El correo electrónico es requerido",
            });
        }

        const exists = await recoveryController.checkEmail(email);

        return res.json({
            message: 'El correo existe en la base de datos',
            success: true,
            exists,
        });
        
    } catch (error) {
        console.error("Error en check-email:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});

// Ruta para enviar código de verificación
router.post("/send-verification", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "El correo electrónico es requerido",
            });
        }

        // Verificar si el correo existe
        const exists = await recoveryController.checkEmail(email);

        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "No existe una cuenta con este correo electrónico",
            });
        }

        // Enviar código de verificación
        await recoveryController.sendVerification(email);

        res.json({
            success: true,
            message: "Código enviado correctamente",
        });
    } catch (error) {
        console.error("Error en send-verification:", error);
        res.status(500).json({
            success: false,
            message: "Error al enviar el código de verificación",
        });
    }
});

// Ruta para verificar código
router.post("/verify-code", async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "El correo electrónico y el código son requeridos",
            });
        }

        const isValid = await recoveryController.verifyCode(email, code);

        res.json({
            success: isValid,
            message: isValid ? "Código verificado correctamente" : "Código incorrecto o expirado",
        });
    } catch (error) {
        console.error("Error en verify-code:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});

// Ruta para restablecer la contraseña
router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword, code } = req.body;

        if (!email || !newPassword || !code) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son requeridos",
            });
        }

        // Validar la contraseña (puedes añadir más validaciones)
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "La contraseña debe tener al menos 8 caracteres",
            });
        }

        const success = await recoveryController.resetPassword(email, newPassword, code);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Código inválido o expirado",
            });
        }

        res.json({
            success: true,
            message: "Contraseña actualizada correctamente",
        });
    } catch (error) {
        console.error("Error en reset-password:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});

// Exportar el enrutador
module.exports = router;