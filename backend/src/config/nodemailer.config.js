const nodemailer = require("nodemailer")

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail", // Puedes usar otros servicios como 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

// Función para enviar correo con código de verificación
const sendVerificationCode = async (email, code) => {
    try {
        const mailOptions = {
            from: `"Ultra Commerce" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Código de verificación - Ultra Commerce",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
            <img src="../../frontend/assets/img/logo-moradito.png" alt="Ultra Commerce Logo" style="max-width: 150px;">
            </div>
            <h2 style="color: #6610f2; text-align: center;">Código de verificación</h2>
            <p>Has solicitado restablecer tu contraseña en Ultra Commerce.</p>
            <p>Tu código de verificación es:</p>
            <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;">
                ${code}
            </div>
            <p>Este código expirará en 10 minutos.</p>
            <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                <p>&copy; ${new Date().getFullYear()} Ultra Commerce. Todos los derechos reservados.</p>
            </div>
            </div>
        `,
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Correo enviado:", info.messageId)
        return true
    } catch (error) {
        console.error("Error al enviar correo:", error)
        throw error
    }
}

module.exports = {
    sendVerificationCode,
}