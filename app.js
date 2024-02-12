const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");
const app = express();

const httpServer = app.listen(3000, () => console.log('Servidor corriendo en el puerto: http://127.0.0.1:3000'))

const io = new Server(httpServer);

const connectDB = require("./dao/db");
connectDB();

app.engine(
  "handlebars",
  handlebars.engine({ extname: "hbs", defaultLayout: "", layoutsDir: "" })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const viewsRouter = require("./routes/views.router");
app.use("/", viewsRouter);

const productsRouter = require("./routes/products.router");
app.use("/", productsRouter);

const chatRouter = require("./routes/chat.router");
app.use("/chat", chatRouter);

// io.on("connection", (socket) => {
//   console.log("Usuario conectado");

//   socket.on("addProduct", (product) => {
//     productsRouter.getProducts().push(product);
//     io.emit("updateProducts", productsRouter.getProducts());
//   });

//   socket.on("deleteProduct", (productId) => {
//     // Encontrar el índice del producto con el productId
//     const index = productsRouter.getProducts().findIndex((product) => product.id === productId);

//     // Si se encuentra el producto, eliminarlo del array
//     if (index !== -1) {
//       productsRouter.getProducts().splice(index, 1);
//       io.emit("updateProducts", productsRouter.getProducts());
//     }
//     });

//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado");
//   });
// });
