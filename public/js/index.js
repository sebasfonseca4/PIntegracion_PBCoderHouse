
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.dataset.productId;
            console.log(productId)
            try {
                const response = await fetch(`/deleteProduct/${productId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (data.success) {
                    // Si la eliminación fue exitosa, recargar la página para actualizar la lista de productos
                    window.location.reload();
                } else {
                    console.error(data.message);
                    alert(data.message);
                }
            } catch (error) {
                console.error(error);
                alert('Error al eliminar el producto.');
            }
        });
    });
});

// const socket = io();

// socket.on("updateProducts", (updatedProducts) => {
//   updateProductList(updatedProducts);
// });

// // Evento para agregar producto
// document.getElementById("addProductBtn").addEventListener("click", () => {
//   const productName = document.getElementById("productName").value;
//   const productPrice = document.getElementById("productPrice").value;
//   const productId = uuid.v4();
//   if (productName.trim() !== "" && productPrice.trim() !== "") { 
//       socket.emit("addProduct", {
//         id: productId,
//         name: productName,
//         price: productPrice,
//       });
    
//       // Limpiar los campos después de agregar el producto
//       document.getElementById("productName").value = "";
//       document.getElementById("productPrice").value = "";
//   } else {
//     alert("Por favor, ingrese un nombre y un precio para el producto.");
//   }
// });

// // Evento para eliminar producto
// document.addEventListener("click", (event) => {
//   console.log(event)
//   if (event.target.classList.contains("delete-btn")) {
//     const productId = event.target.getAttribute("data-product-id");
//     console.log(productId)
//     socket.emit("deleteProduct", productId);
//   }
// });

// function updateProductList(products) {
//   const productList = document.getElementById("productList");
//   productList.innerHTML = "";

//   products.forEach((product) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = `${product.id} - ${product.name} - $${product.price}`;

//     // Agregar botón de eliminar con el id del producto
//     const deleteButton = document.createElement("button");
//     deleteButton.className = "delete-btn";
//     deleteButton.textContent = "Eliminar";
//     deleteButton.setAttribute("data-product-id", product.id);

//     listItem.appendChild(deleteButton);
//     productList.appendChild(listItem);
//   });
// }
