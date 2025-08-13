// Importamos el modelo del carrito
import carts_manager from "../managers/carts_manager.js";
import product_manager from "../managers/products_manager.js";

// Función para obtener todos los carritos
export const getCarts = async (req, res) => {
 try {
  const carts = await carts_manager.getCarts();

  res.status(200).json(carts);
 } catch (error) {
  res.status(500).json({ message: "Error al obtener los carritos", error });
 }
};

// Función para obtener un carrito por ID
export const getCartByIdController = async (req, res) => {
 try {
  const { cid } = req.params;
  const cart = await carts_manager.getCartById(cid);

  if (!cart) {
   return res.status(404).json({ message: "Carrito no encontrado" });
  }

  res.status(200).json(cart);
 } catch (error) {
  res.status(500).json({ message: "Error al obtener el carrito", error });
 }
};

// Función para crear un nuevo carrito
export const createCart = async (req, res) => {
 try {
  const newCart = await carts_manager.createCart();

  res.status(201).json(newCart);
 } catch (error) {
  res.status(500).json({ message: "Error al crear el carrito", error });
 }
};

// Función para agregar un producto al carrito por ID
export const addToCart = async (req, res) => {
 const { productId } = req.body;

 try {
  let cart = await carts_manager.createCart({ products: [] });
  const product = await product_manager.getProductById(productId);

  if (!product) {
   return res.status(404).send("Producto no encontrado");
  }

  cart.products.push(productId);
  await carts_manager.updateCart(cart.id, cart.products);

  res.status(200).send("Producto agregado al carrito");
 } catch (error) {
  res.status(500).send("Error al agregar producto al carrito");
 }
};

// Función para agregar un producto al carrito
export const addProductToCartController = async (req, res) => {
 try {
  const { cid, pid } = req.params;

  const updatedCart = await carts_manager.addProductToCart(cid, pid);

  if (!updatedCart) {
   return res.status(404).json({ message: "Carrito no encontrado" });
  }

  res.status(200).json(updatedCart);
 } catch (error) {
  res.status(500).json({ message: "Error al agregar el producto al carrito", error });
 }
};

// Función para actualizar un producto al carrito
export const updateCartController = async (req, res) => {
 try {
  const { cid } = req.params;
  const { products } = req.body;
  const updatedCart = await carts_manager.updateCart(cid, products);

  if (!updatedCart) {
   return res.status(404).json({ message: "Carrito no encontrado" });
  }

  res.status(200).json(updatedCart);
 } catch (error) {
  res.status(500).json({ message: "Error al editar el producto del carrito", error });
 }
};

// Función para actualizar la cantidad de un producto en el carrito
export const updateProductQuantityController = async (req, res) => {
 try {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const updatedCart = await carts_manager.updateProductQuantity(cid, pid, quantity);

  if (!updatedCart) {
   return res.status(404).json({ message: "Carrito no encontrado" });
  }

  res.status(200).json(updatedCart);
 } catch (error) {
  res.status(500).json({ message: "Error al actualizar la cantidad del producto", error });
 }
};

// Función para eliminar todos los productos del carrito
export const deleteAllProductsFromCartController = async (req, res) => {
 try {
  const { cid } = req.params;
  const cartCleared = await carts_manager.clearCart(cid);

  if (!cartCleared) {
   return res.status(404).json({ message: "Carrito no encontrado" });
  }

  res.status(200).json({ message: "Carrito vaciado correctamente" });
 } catch (error) {
  res.status(500).json({ message: "Error al vaciar el carrito", error });
 }
};

// Función para eliminar un producto del carrito
export const deleteProductFromCartController = async (req, res) => {
 try {
  const { cid, pid } = req.params;
  const updatedCart = await carts_manager.deleteProductCart(cid, pid);

  if (!updatedCart) {
   return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json(updatedCart);
 } catch (error) {
  res.status(500).json({ message: "Error al eliminar el producto del carrito", error });
 }
};