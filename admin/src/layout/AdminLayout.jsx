import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin">
      {/* Mobile top */}
      <div className="mobileTop">
        <button className="iconBtn" onClick={() => setOpen((p) => !p)} aria-label="Toggle menu">
          ☰
        </button>
        <div className="mobileBrand">🍽 Food Admin</div>
        <div className="pill live">● Live</div>
      </div>

      {/* Sidebar */}
      <aside className={`side ${open ? "open" : ""}`}>
        <div className="brand">
          <span className="logo">🍽</span>
          <div>
            <div className="brandName">Food Admin</div>
            <div className="brandSub">Manage products & orders</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="navIcon">📊</span> Dashboard
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="navIcon">📦</span> Products
          </NavLink>
          <NavLink to="/products/add" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="navIcon">➕</span> Add Product
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="navIcon">🧾</span> Orders
          </NavLink>
        </nav>

        <div className="sideFoot">
          <small className="muted">API: {import.meta.env.VITE_API_URL}</small>
          <button className="btn ghost" onClick={() => setOpen(false)}>Close</button>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <div>
            <div className="topTitle">Admin Panel</div>
            <div className="muted topSub">Track orders, add products, manage your menu</div>
          </div>

          <div className="topActions">
            <div className="pill live">● Live</div>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
