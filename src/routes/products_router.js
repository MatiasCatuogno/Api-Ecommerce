// Importamos el objeto Router desde express. y los controladores de carritos.
import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products_controller.js";

// Ejecutamos la función Router para obtener un objeto Router.
const productsRouter =  Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", addProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

// Exportamos el router.
export default productsRouter;