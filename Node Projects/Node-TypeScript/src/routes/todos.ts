import { Router } from "express";
import { ToDo } from "./../models/todos";

const router = Router();

type ReqBody = { text: string };

let todos: ToDo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({
    todos: todos,
  });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as ReqBody;
  const newTodo: ToDo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({
    message: "Todo added",
    todo: newTodo,
    todos: todos,
  });
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as ReqBody;
  const tId = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === tId);
  if (todoIndex >= 0) {
    todos[todoIndex] = {
      id: todos[todoIndex].id,
      text: body.text,
    };
    return res.status(200).json({
      message: "Tod updated",
      todos: todos,
    });
  }
  res.status(404).json({ message: "No todos found!" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const tId = req.params.todoId;

  const updatedTodos = todos.filter((todo) => todo.id !== tId);

  res.status(200).json({
    message: "Deleted successfully",
    todos: updatedTodos,
  });
});

export default router;
