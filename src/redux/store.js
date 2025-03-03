// src/redux/store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Adjust to your folder structure

const store = createStore(rootReducer);

export default store;
