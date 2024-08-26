import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // New Dashboard component for cafe owners
import Menu from "./pages/Menu";
import TablePage from "./pages/TablePage";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerProfile from "./pages/CustomerProfile";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tables/:tableId" element={<TablePage />} />

          {/* Protected routes for Cafe Owners */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="cafeOwner">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute role="cafeOwner">
                <Menu />
              </ProtectedRoute>
            }
          />

          {/* Protected routes for Customers */}
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute role="customer">
                <CustomerProfile />
              </ProtectedRoute>
            }
          />

          {/* Customer-specific routes */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
