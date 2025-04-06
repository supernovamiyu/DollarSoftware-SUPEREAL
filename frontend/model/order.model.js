// OrderModel.js - Maneja la creación y procesamiento de pedidos
export class OrderModel {
    constructor(userModel, cartModel) {
        this.userModel = userModel;
        this.cartModel = cartModel;
    }

    async createOrder(shippingData) {
        try {
            const user = this.userModel.getUser();
            const token = this.userModel.getToken();
            const cart = this.cartModel.getCart();
            const total = this.cartModel.calculateTotal();

            if (!user || !user.id) {
                throw new Error("No se encontró un ID de usuario válido");
            }

            const order = {
                fk_id_usuario: user.id,
                fk_id_metodo_envio: "RET", // Valor por defecto
                fk_id_ciudad: shippingData.ciudad || "",
                direccion: shippingData.direccion || "",
                fk_id_estado_envio: "PRE", // Estado inicial: Preparando
                total: total,
                vigencia_factura: 90, // Días de vigencia por defecto
                productos: cart.map(item => ({
                    id_producto: item.id_productos,
                    cantidad: item.cantidad,
                    precio_unitario: item.precio
                }))
            };

            const response = await fetch("http://localhost:3000/delivery/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || "Error al crear el pedido");
            }

            return await response.json();
        } catch (error) {
            console.error("Error al crear pedido:", error);
            throw error;
        }
    }
}