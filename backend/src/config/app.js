const path = require("path")
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
})

const express = require("express")
const cors = require("cors")

// Importar rutas API
const userRoutes = require("../routes/user.routes")
const categoriesRoutes = require("../routes/category.routes")
const cityRoutes = require("../routes/city.routes")
const deliveryStateRoutes = require("../routes/delivery-state.routes")
const sendMethodRoutes = require("../routes/send-method.routes")
const productRoutes = require("../routes/product.routes")
const detailDeliveryRoutes = require("../routes/detail-delivery.routes")
const deliveryRoutes = require("../routes/delivery.routes")
const opinionsRoutes = require("../routes/opinions.routes")
const authRoutes = require("../routes/auth.routes")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Determinar la ruta raíz del proyecto
const rootPath = path.resolve(__dirname, "../../../")
console.log("Ruta raíz del proyecto:", rootPath)

// 1. Configuración para servir archivos estáticos del frontend
// Primero servimos los archivos estáticos específicos
app.use("/frontend", express.static(path.join(rootPath, "frontend")))
app.use("/node_modules", express.static(path.join(rootPath, "node_modules")))

// 2. Todas las rutas API con prefijo /api para evitar conflictos
app.use("/api/users", userRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/city", cityRoutes)
app.use("/api/delivery-state", deliveryStateRoutes)
app.use("/api/send-method", sendMethodRoutes)
app.use("/api/products", productRoutes)
app.use("/api/detail-delivery", detailDeliveryRoutes)
app.use("/api/delivery", deliveryRoutes)
app.use("/api/opinions", opinionsRoutes)
app.use("/api/auth", authRoutes)


// 3. Servir el index.html para todas las rutas de navegación
app.get("*", (req, res) => {
  // Verificar si la solicitud es para un archivo estático
  const ext = path.extname(req.path)
  if (ext && ext !== "") {
    // Si es un archivo con extensión que no se encontró, devolver 404
    return res.status(404).send("Archivo no encontrado")
  }

  // Para rutas de navegación, enviar el index.html
  res.sendFile(path.join(rootPath, "index.html"))
})

console.log("Ruta absoluta al index.html:", path.join(rootPath, "index.html"))

module.exports = app
