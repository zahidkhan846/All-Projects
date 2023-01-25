"use strict";
// import { ToDo } from "./../models/todos";
// type ReqBody = { text: string };
// let todos: ToDo[] = [];
// export const getTodos = (req, res, next) => {
//   res.status(200).json({
//     todos: todos,
//   });
// };
// export const addTodo = (req, res, next) => {
//   const body = req.body as ReqBody;
//   const newTodo: ToDo = {
//     id: new Date().toISOString(),
//     text: body.text,
//   };
//   todos.push(newTodo);
//   res.status(201).json({
//     message: "Todo added",
//     todo: newTodo,
//     todos: todos,
//   });
// };
// export const updateTodo = (req, res, next) => {
//   const tId = req.params.todoId;
//   const todoIndex = todos.findIndex((todo) => todo.id === tId);
//   if (todoIndex >= 0) {
//     todos[todoIndex] = {
//       id: todos[todoIndex].id,
//       text: req.body as ReqBody;
//     };
//     return res.status(200).json({
//       message: "Tod updated",
//       todos: todos,
//     });
//   }
//   res.status(404).json({ message: "No todos found!" });
// }
// export const deleteTodo =(req, res, next) => {
//   const tId = req.params.todoId;
//   const updatedTodos = todos.filter((todo) => todo.id !== tId);
//   res.status(200).json({
//     message: "Deleted successfully",
//     todos: updatedTodos,
//   });
// }
