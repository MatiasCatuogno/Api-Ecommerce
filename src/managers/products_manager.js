// Importamos los módulos necesarios para la ejecución de código.
import { productsModel } from "../models/products_model.js";

// Función para obtener todos los productos
const getProducts = async (limit, page, query, sort) => {
 let result;
 const sortOption = sort === "desc" ? { price: -1 } : { price: 1 };

 if (query) {
  result = await productsModel.paginate({ category: query }, { limit:limit, page:page, sort:sortOption, lean:true });
 } else {
  result = await productsModel.paginate({}, { limit:limit, page:page, sort:sortOption, lean:true });
 }

 const products = {
  products: result.docs,
  totalPages: result.totalPages,
  prevPage: result.prevPage,
  nextPage: result.nextPage,
  page: result.page,
  hasPrevPage: result.hasPrevPage,
  hasNextPage: result.hasNextPage,
  prevLink: result.hasPrevPage ? "/?limit=" + limit + "&page=" + (result.page - 1) : null,
  nextLink: result.hasNextPage ? "/?limit=" + limit + "&page=" + (result.page + 1) : null,
 };

 return products;
};

// Función para obtener un producto por ID
const getProductById = async (id) => {
 return await productsModel.find({ _id:id }).lean();
};

// Función para agregar un producto
const addProduct = async (product) => {
 return await productsModel.create({...product});
};

// Función para modificar un producto
const updateProduct = async (id, updatedData) => {
 return await productsModel.updateOne({_id: id}, updatedData);
};

// Función para eliminar un producto
const deleteProduct = async (id) => {
 const result = await productsModel.deleteOne({_id:id});
 return result.deletedCount > 0;
};

// Exportamos las funciones
export default { getProducts, getProductById, addProduct, updateProduct, deleteProduct };