import React from "react";

export function Page({ title, actions, children }) {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2 className="page-title">{title}</h2>
        </div>
        <div className="page-actions">{actions}</div>
      </div>
      {children}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Stat({ label, value, hint }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {hint ? <div className="stat-hint">{hint}</div> : null}
    </div>
  );
}

export function Button({ variant = "primary", className = "", ...props }) {
  return <button className={`btn ${variant} ${className}`} {...props} />;
}

export function Input(props) {
  return <input className="input" {...props} />;
}

export function Select(props) {
  return <select className="select" {...props} />;
}

export function Textarea(props) {
  return <textarea className="textarea" {...props} />;
}

export function Badge({ variant = "gray", children }) {
  return <span className={`badge ${variant}`}>{children}</span>;
}

export function Loader({ label = "Loading..." }) {
  return (
    <div className="loader">
      <div className="spinner" />
      <div className="muted">{label}</div>
    </div>
  );
}

export function Empty({ title = "Nothing here yet", desc = "Try adding some data." }) {
  return (
    <div className="empty">
      <div className="empty-title">{title}</div>
      <div className="muted">{desc}</div>
    </div>
  );
}

export function Toast({ type = "success", children }) {
  return <div className={`toast ${type}`}>{children}</div>;
}
