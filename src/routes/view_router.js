// Importamos el objeto Router desde express. y los controladores de carritos.
import { Router } from "express";
import carts_manager from "../managers/carts_manager.js";
import products_manager from "../managers/products_manager.js";

// Ejecutamos la función Router para obtener un objeto Router.
const viewsRouter = Router();

// Ruta para renderizar la vista de Handlebars en al raíz
viewsRouter.get("/", async (req, res) => {
 const { limit, page, query, sort } = req.query;
 const products = await products_manager.getProducts(limit, page, query, sort);

 res.render("home", { title: "Home", products });
});

viewsRouter.get("/products", async (req, res) => {
 const { limit, page, query, sort } = req.query;
 const products = await products_manager.getProducts(limit, page, query, sort);

 res.render("home", { title: "Products", products });
});

viewsRouter.get("/products/:pid", async (req, res) => {
 const product = await products_manager.getProductById(req.params.pid);

 res.render("product", { title: "Product Details", product });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
 res.render("realtimeproducts", { title: "Real Time Products"});
});

viewsRouter.get("/carts/:cid", async (req, res) => {
 const cart = await carts_manager.getCartById(req.params.cid);

 res.render("cart", { title: "Cart Details", cart });
});

// Exportamos el router.
export default viewsRouter;