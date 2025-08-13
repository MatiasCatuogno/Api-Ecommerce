// Imports necesarios para el funcionamiento del servidor
import colors from "colors";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/view_router.js";
import cartsRouter from "./routes/carts_router.js";
import productsRouter from "./routes/products_router.js";
import products_manager from "./managers/products_manager.js";

// Creamos una instancia de express
const port = process.env.PORT;
const app = express();

const httpServer = app.listen(port, () => {
 console.log(`Server listening on http://localhost:${port}`.green);
});

// Creamos SocketServer
const socketServer = new Server(httpServer);

// Configuramos el motor de plantillas handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middleware para loggear las peticiónes
app.use(express.static(__dirname + "/public"));

// Middleware para parsear el body de las peticiónes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGOOSE_CONNECT_URL);

// Rutas de la API
app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

socketServer.on("connection", async socket => {

 const products = await products_manager.getProducts();

 socket.emit("realtimeproducts", products.products);

 socket.on("nuevoProducto", async data => {
  await products_manager.addProduct(data);

  const products = await products_manager.getProducts();

  socket.emit("realtimeproducts", products.products);
 });

 socket.on("deleteProduct", async data => {
  await products_manager.deleteProduct(data);

  const products = await products_manager.getProducts();

  socket.emit("realtimeproducts", products.products);
 });
});