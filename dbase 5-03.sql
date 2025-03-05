CREATE DATABASE  IF NOT EXISTS `db_dollarsoftware` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_dollarsoftware`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_dollarsoftware
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` char(3) NOT NULL,
  `nombre_categoria` varchar(30) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES ('CAL','Calzado'),('LIM','Limpieza'),('MAS','Mascotas'),('PAP','Papelería'),('ROP','Ropa'),('SAU','Salud'),('TEC','Tecnología'),('VIV','Víveres');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `id_ciudad` char(3) NOT NULL,
  `nombre_ciudad` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES ('ARC','Arauca'),('ARM','Armenia'),('BCR','Bucaramanga'),('BOG','Bogotá'),('BQL','Barranquilla'),('CAL','Cali'),('CCT','Cúcuta'),('CTG','Cartagena'),('FLO','Florencia'),('GUA','San José del Guaviare'),('IBG','Ibagué'),('INI','Puerto Inírida'),('LET','Leticia'),('MCA','Mocoa'),('MED','Medellín'),('MNZ','Manizales'),('MTR','Montería'),('MTU','Mitú'),('NEI','Neiva'),('POP','Popayán'),('PRO','Providencia (isla)'),('PST','Pasto'),('PTC','Puerto Carreño'),('QBD','Quibdó'),('RHC','Riohacha'),('SAN','San Andrés (isla)'),('SCA','Santa Catalina (isla)'),('SCJ','Sincelejo'),('SNT','Santa Marta'),('TUN','Tunja'),('VDP','Valledupar'),('VLV','Villavicencio'),('YOP','Yopal');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle_pedido` int NOT NULL AUTO_INCREMENT,
  `fk_id_pedido` char(36) NOT NULL,
  `fk_id_producto` varchar(10) NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `precio_total` decimal(10,2) GENERATED ALWAYS AS ((`cantidad` * `precio_unitario`)) STORED,
  PRIMARY KEY (`id_detalle_pedido`),
  KEY `fk_id_pedido` (`fk_id_pedido`),
  KEY `fk_id_producto` (`fk_id_producto`),
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`fk_id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`fk_id_producto`) REFERENCES `productos` (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` (`id_detalle_pedido`, `fk_id_pedido`, `fk_id_producto`, `cantidad`, `precio_unitario`) VALUES (1,'9eef461f-b705-11ef-9031-004e01bd6f0e','500FLORARR',2,2000.00);
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_del_pedido`
--

DROP TABLE IF EXISTS `estado_del_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_del_pedido` (
  `id_estado_envio` char(3) NOT NULL,
  `denominacion` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id_estado_envio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_del_pedido`
--

LOCK TABLES `estado_del_pedido` WRITE;
/*!40000 ALTER TABLE `estado_del_pedido` DISABLE KEYS */;
INSERT INTO `estado_del_pedido` VALUES ('ANL','Anulado'),('CNF','Confirmado'),('DSP','Disponible'),('ENT','Entregado'),('PRE','En preparación');
/*!40000 ALTER TABLE `estado_del_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_de_envio`
--

DROP TABLE IF EXISTS `metodo_de_envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_de_envio` (
  `id_metodo_envio` char(3) NOT NULL,
  `nombre_m_envio` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_metodo_envio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_de_envio`
--

LOCK TABLES `metodo_de_envio` WRITE;
/*!40000 ALTER TABLE `metodo_de_envio` DISABLE KEYS */;
INSERT INTO `metodo_de_envio` VALUES ('EAD','Envío a domicilio'),('RET','Recoger en tienda');
/*!40000 ALTER TABLE `metodo_de_envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` char(36) NOT NULL,
  `fk_id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `fk_id_metodo_envio` char(3) DEFAULT NULL,
  `fecha_de_pedido` timestamp NULL DEFAULT NULL,
  `fk_id_ciudad` char(3) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fk_id_estado_envio` char(3) DEFAULT NULL,
  `total` int NOT NULL,
  `vigencia_factura` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_id_metodo_envio` (`fk_id_metodo_envio`),
  KEY `fk_id_ciudad` (`fk_id_ciudad`),
  KEY `fk_id_estado_envio` (`fk_id_estado_envio`),
  KEY `fk_id_usuario` (`fk_id_usuario`),
  CONSTRAINT `fk_id_ciudad` FOREIGN KEY (`fk_id_ciudad`) REFERENCES `ciudades` (`id_ciudad`),
  CONSTRAINT `fk_id_estado_envio` FOREIGN KEY (`fk_id_estado_envio`) REFERENCES `estado_del_pedido` (`id_estado_envio`),
  CONSTRAINT `fk_id_metodo_envio` FOREIGN KEY (`fk_id_metodo_envio`) REFERENCES `metodo_de_envio` (`id_metodo_envio`),
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES ('9eef461f-b705-11ef-9031-004e01bd6f0e',4,'RET','2024-12-10 14:47:04','BOG','Carrera 0 #2-2','PRE',22000,'90 días');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_productos` varchar(10) NOT NULL,
  `nombre_producto` varchar(30) NOT NULL,
  `unidades_stock` smallint NOT NULL,
  `unidades_disponibles` smallint NOT NULL,
  `fk_id_categoria` char(3) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `destacado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_productos`),
  KEY `fk_id_categoria` (`fk_id_categoria`),
  CONSTRAINT `fk_id_categoria` FOREIGN KEY (`fk_id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES ('04JABREY','Jabon Rey',300,75,'LIM',12000.00,'https://acortar.link/mar8UK',1),('11IRRBUCA','Irrigador Bucal Kalley',45,30,'SAU',150000.00,'https://acortar.link/OtLkjv',1),('120DETSUA','Detergente Suavitel',200,187,'LIM',24000.00,'https://acortar.link/66ReQs',1),('13PROTDIA','Protectores Diarios Nosotras',400,200,'SAU',1200.00,'https://acortar.link/sp2Y65',0),('141FRJDIA5','Frijol Diana 500 gr',250,195,'VIV',6500.00,'https://acortar.link/XsglKj',0),('301ZTEA55','Celular ZTE A55 Negro',150,65,'TEC',300000.00,'https://acortar.link/BBXiEj',0),('40AGCTHAS','Aguacate Hass 500 gr',450,400,'VIV',3900.00,'https://acortar.link/BMjFiz',0),('500FLORARR','Arroz Florhuila',197,194,'VIV',2500.00,'https://acortar.link/AIXenv',0),('90DESREX','Desodorante Rexona 48 gr',200,110,'SAU',17000.00,'https://acortar.link/6KN9NA',0),('99ZAPTACV','Zapatos Valette Beige',200,10,'CAL',100000.00,'https://acortar.link/IC2Dkl',0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) DEFAULT NULL,
  `contraseña` varchar(50) DEFAULT NULL,
  `nombre_completo` varchar(100) DEFAULT NULL,
  `numero_identificacion` bigint DEFAULT NULL,
  UNIQUE KEY `idUsuario` (`id_usuario`),
  UNIQUE KEY `numero_identificacion` (`numero_identificacion`),
  UNIQUE KEY `numero_identificacion_2` (`numero_identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'lolololololol@lolololol.com','pikachu2304949@pfoeosa','Julian Example',1234567585),(6,'auralilia@email-example.com','hola1234@0932','Aura Lilia Martínez',1234564391),(7,'azerbaiyan@example.com','watashiwo3944','Azerbaiyan Díaz',1234567890),(8,'klwlskskqo@example.com','dwrlma201021@dlolaes','Mario Dario Magyanon',1234567790);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05  9:54:11
