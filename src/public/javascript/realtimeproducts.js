const socket = io();

socket.on("realtimeproducts", (data) => {
 limpiarSelectEliminarProducto();
 let contenidoHTML = "";

 data.forEach((item) => {
  contenidoHTML += `
   <div class="col-md-3 mb-4">
    <div class="card text-center border-none shadow-sm h-100">
     <img src="${item.thumbnails}" class="card-img-top img-fluid img-thumbnails" alt="${item.title}">
     <div class="card-body d-flex flex-column">
      <h2 class="card-title">${item.title}</h2>
      <p class="card-text">${item.description}</p>
      <p class="card-text"><strong>Código: </strong>${item.code}</p>
      <p class="card-text"><strong>Precio: </strong>${item.price}</p>
      <p class="card-text"><strong>Categoría: </strong>${item.category}</p>
     </div>
    </div>
   </div>`;

  agregarItemEliminarProducto(item);
 });

 contenidoHTML += "</ul>";
 document.getElementById("content").innerHTML = contenidoHTML;
});

const addProduct = () => {
 const title = document.getElementById("title");
 const description = document.getElementById("description");
 const code = document.getElementById("code");
 const price = document.getElementById("price");
 const category = document.getElementById("category");
 const image = document.getElementById("image");

 const product = { title: title.value, description: description.value, stock: true, code: code.value, price: parseFloat(price.value), category: category.value, thumbnails: [image.value] };

 socket.emit("nuevoProducto", product);

 title.value = "";
 description.value = "";
 code.value = "";
 price.value = "";
 category.value = "";
 image.value = "";

 setTimeout(() => {
  document.getElementById("producto_estado1").innerHTML = `<div class="alert alert-success" role="alert">El producto se agregó correctamente!</div>`;
  setTimeout(() => {
   document.getElementById("producto_estado1").innerHTML = "";
  }, 5000);
 }, 0);
};

const limpiarSelectEliminarProducto = () => {
 const productId = document.getElementById("product_id");

 productId.innerHTML = "";
};

const agregarItemEliminarProducto = (item) => {
 const productId = document.getElementById("product_id");
 let option = document.createElement("option");

 option.value = item._id;
 option.innerHTML = "Producto: " + item.title;

 productId.appendChild(option);
};

const deleteProduct = () => {
 const product_id = document.getElementById("product_id").value;

 socket.emit("deleteProduct", product_id);

 setTimeout(() => {
  document.getElementById("producto_estado1").innerHTML = `<div class="alert alert-danger" role="alert">El producto se eliminó correctamente!</div>`;
  setTimeout(() => {
   document.getElementById("producto_estado1").innerHTML = "";
  }, 5000);
 }, 0);
};