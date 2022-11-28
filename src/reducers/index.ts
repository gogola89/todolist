import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { combineReducers } from "redux";
import { todosReducer } from "./todos";
import { Todo } from "../actions/todos";

export interface StoreState {
  todos: Todo[];
}

const reducers = combineReducers<StoreState>({
  todos: todosReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
