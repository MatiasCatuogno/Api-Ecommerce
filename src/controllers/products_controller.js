// Importamos el modelo de los productos
import products_manager from "../managers/products_manager.js";

// Función para obtener todos los productos
export const getAllProducts = async (req, res) => {
 try {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page && req.query.page >= 1 ? parseInt(req.query.page) : 1;
  const query = req.query.query ? req.query.query : "";
  const sort = req.query.sort ? req.query.sort : "asc";

  const { products, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink } = await products_manager.getProducts(limit, page, query, sort);

  res.status(200).json({ status: "Success", payload: products, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink});
 } catch (error) {
  res.status(400).json({ status: "Error", message: "Error no se pudo conectar con la Colección Productos."});
 }
};

// Función para obtener un producto por ID
export const getProductById = async (req, res) => {
 try {
  const product = await products_manager.getProductById(req.params.id);

  if (!product) {
   return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json({ status: "Success", payload: product});
 } catch (error) {
  res.status(500).json({ message: "Error al obtener el producto", error });
 }
};

// Función para agregar un producto
export const addProduct = async (req, res) => {
 try {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const status = true;

  if (!title || !description || !code || !price || !stock || !category ) {
   return res.status(400).json({ message: "Todos los campos son obligatorios, excepto thumbnails" });
  }

  const createdProduct = await products_manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });

  res.status(201).json({ status: "success", payload: createdProduct });
 } catch (error) {
  res.status(500).json({ message: "Error al agregar el producto", error });
 }
};

// Función para modificar un producto
export const updateProduct = async (req, res) => {
 try {
  const { id } = req.params;
  const updatedData = req.body;

  const updateProduct = await products_manager.updateProduct(id, updatedData);

  if (!updateProduct) {
   return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json({ status: "success", payload: updateProduct });
 } catch(error) {
  res.status(500).json({ message: "Error modificando el producto", error });
 }
};

// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
 try {
  const isDeleted = await products_manager.deleteProduct(req.params.id);

  if (!isDeleted) {
   return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json({ "message": "Producto eliminado correctamente" });

 } catch (error) {
  res.status(500).json({ message: "Error al eliminar el producto", error });
 }
};