import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import { useMeQuery } from '../features/auth/authApi'

const AppRoutes = () => {
    const { isLoading } = useMeQuery();

    const Admin = () => <h2>Admin Panel</h2>;
    const Unauthorized = () => <h2>Unauthorized</h2>;

    if (isLoading) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px"
            }}>
                Loading...
            </div>
        );
    }

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin"]}>
                <Admin />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes