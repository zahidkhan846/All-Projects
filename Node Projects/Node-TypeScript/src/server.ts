import express from "express";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todos";

const server = express();

server.use(bodyParser.json());

server.use(todosRoutes);

server.listen(3000);
