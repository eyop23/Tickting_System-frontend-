// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store"; // Adjust path to your store

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </Provider>
    );
  }
}

export default App;
