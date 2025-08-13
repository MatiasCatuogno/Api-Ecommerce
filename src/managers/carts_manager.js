// Importamos los módulos necesarios para la ejecución de código.
import { cartsModel } from "../models/carts_model.js";

// Función para obtener todos los carritos
const getCarts = async () => {
 return await cartsModel.find().populate("products.product").lean();
};

// Función para obtener un carrito por ID
const getCartById = async (id) => {
 return await cartsModel.findOne({ _id:id }).populate("products.product").lean();
};

// Función para crear un nuevo carrito
const createCart = async () => {
 return await cartsModel.create({ products: [] });
};

// Función para agregar un producto al carrito
const addProductToCart = async (cartId, productId) => {
 let cart = await cartsModel.findOne({ _id:cartId });
 let product = cart.products.find(item => item.product.equals(productId));

 if (product) {
  product.quantity += 1;
 } else {
  let product = { product: productId, quantity: 1 };
  cart.products.push(product);
 }

 return await cart.save();
};

// Función para actualziar un producto del carrito
const updateCart = async (cartId, products) => {
 return await cartsModel.updateOne({ _id: cartId }, { products });
};

// Función para actualziar un producto de un carrito por ID
const updateProductQuantity = async (cartId, productId, quantity) => {
 let cart = await cartsModel.findOne({ _id: cartId });
 let product = cart.products.find(item => item.product.equals(productId));

 if (product) {
  product.quantity = quantity;
 } else {
  return null;
 }

 return await cart.save();
};

// Función para vaciar un carrito
const clearCart = async (cartId) => {
 return await cartsModel.updateOne({ _id: cartId }, { products: [] });
};

// Función para eliminar un carrito
const deleteProductCart = async (cartId, productId) => {
 let cart = await cartsModel.findOne({ _id: cartId });
 cart.products = cart.products.filter(item => !item.product.equals(productId));

 return await cart.save();
};

// Exportamos las funciones
export default { getCarts, getCartById, createCart, addProductToCart, updateCart, updateProductQuantity, clearCart, deleteProductCart };