import React, { useState } from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function AuthForm({ variant = "login", onSubmit, loading, error, switchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const text = variant === "login" ? "Login" : "Sign Up";

  return (
    <form
      style={{
        background: "#fff",
        maxWidth: 340,
        margin: "70px auto",
        padding: "34px 35px 20px 35px",
        borderRadius: 12,
        boxShadow: "0 2px 18px #42424223",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        border: `2px solid ${COLORS.border}`,
        fontFamily: "inherit"
      }}
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ email, password });
      }}>
      <div style={{
        fontWeight: 700,
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 12,
        textAlign: "center",
        letterSpacing: 1.2
      }}>{text} to Notes Manager</div>
      <input
        required
        style={{
          padding: "10px 12px",
          border: `1.3px solid ${COLORS.primary}`,
          borderRadius: 5,
          fontSize: 16
        }}
        type="email"
        value={email}
        autoFocus
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        autoComplete="username"
      />
      <input
        required
        style={{
          padding: "10px 12px",
          border: `1.3px solid ${COLORS.primary}`,
          borderRadius: 5,
          fontSize: 16
        }}
        type="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        autoComplete={variant === "login" ? "current-password" : "new-password"}
      />
      <button
        style={{
          background: COLORS.primary,
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: 6,
          padding: "12px 0",
          fontSize: 16,
          marginTop: 14,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading || !email.trim() || !password.trim()}
        type="submit">
        {loading ? "..." : text}
      </button>
      <div style={{
        textAlign: "center",
        fontSize: 14,
        marginTop: 10
      }}>
        <button 
          style={{
            background: "none",
            color: COLORS.accent,
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline"
          }}
          type="button"
          onClick={switchMode}
        >
          {variant === "login" ? "Create an account" : "Already have an account? Log In"}
        </button>
      </div>
      {error && <div style={{
        color: COLORS.accent, textAlign: "center", marginTop: 6
      }}>{error}</div>}
    </form>
  );
}

export default AuthForm;
