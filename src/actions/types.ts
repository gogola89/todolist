import { DeleteTodoAction, FetchTodosAction } from "./todos";

export enum ActionTypes {
  fetchTodos,
  deleteTodo,
}

export type TodoAction = FetchTodosAction | DeleteTodoAction;
