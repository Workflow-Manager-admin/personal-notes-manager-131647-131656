import React from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function Sidebar({ categories, activeCategory, onCategoryChange }) {
  /** Vertical sidebar for note category filtering */
  return (
    <aside
      style={{
        background: COLORS.sidebarBg,
        width: 210,
        minWidth: 120,
        padding: "36px 0 0 0",
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        height: "100vh",
        position: "sticky",
        top: 56
      }}
    >
      <div style={{paddingLeft: 24, marginBottom: 8, fontWeight: 600, letterSpacing: 1, fontSize: "1.12rem", color: COLORS.text}}>
        Categories
      </div>
      {categories.map(cat => (
        <button key={cat}
          style={{
            textAlign: "left",
            padding: "10px 28px",
            background: activeCategory === cat ? COLORS.primary : "transparent",
            color: activeCategory === cat ? "#fff" : COLORS.sidebarText,
            border: "none",
            borderLeft: activeCategory === cat ? `6px solid ${COLORS.accent}` : "6px solid transparent",
            cursor: "pointer",
            fontWeight: activeCategory === cat ? "bold" : 400,
            fontSize: 15,
            transition: "all .15s",
            outline: "none"
          }}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
