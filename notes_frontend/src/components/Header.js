import React from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function Header({ user, onLogout }) {
  /** App header, topmost navigation bar */
  return (
    <header style={{
      background: COLORS.primary,
      color: "#fff",
      height: 56,
      display: "flex",
      alignItems: "center",
      padding: "0 2rem",
      justifyContent: "space-between",
      borderBottom: `2px solid ${COLORS.accent}`,
      fontWeight: 500,
      letterSpacing: 1.1
    }}>
      <span style={{
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 1.5,
        display: "flex",
        alignItems: "center",
      }}>
        <span style={{
          color: COLORS.accent,
          fontWeight: "bold",
          marginRight: 8,
        }}>✏️</span>
        Notes Manager
      </span>
      {user ? (
        <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{
            color: COLORS.accent,
            background: COLORS.secondary,
            padding: "5px 13px",
            borderRadius: 12,
            fontWeight: 400,
            fontSize: 14,
          }}>
            {user.email}
          </span>
          <button
            style={{
              background: "#fff",
              color: COLORS.primary,
              border: `1.5px solid ${COLORS.primary}`,
              borderRadius: 6,
              padding: "6px 16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
              marginLeft: 8
            }}
            onClick={onLogout}
          >
            Logout
          </button>
        </span>
      ) : null}
    </header>
  );
}

export default Header;
