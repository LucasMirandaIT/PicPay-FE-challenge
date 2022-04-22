import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import { useState } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthContext from "./contexts/AuthContext";
import menuItems from "./utils/Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const initialValue = { authenticatedUser, setAuthenticatedUser };

  return (
    <Router>
      <div className="pageLayout">
        <AuthContext.Provider value={initialValue}>
          <Routes>
            {menuItems.map((item, index) => (
              <Route
                key={index}
                path={item.routePath}
                element={<ProtectedRoute>{item.element}</ProtectedRoute>}
                exact
              />
            ))}
            <Route path="/login" element={<Login />} exact />
          </Routes>
        </AuthContext.Provider>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
