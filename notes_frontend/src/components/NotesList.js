import React from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function NotesList({ notes, onSelect, selectedNoteId, onDelete }) {
  /** Renders notes in a minimalistic list */
  return (
    <div style={{ width: "100%", padding: "16px 12px", overflowY: "auto" }}>
      {notes.length === 0 && (
        <div style={{
          textAlign: "center", paddingTop: 48, color: COLORS.secondary, fontWeight: 500
        }}>
          No notes yet. Create your first note!
        </div>
      )}
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            background: note.id === selectedNoteId ? "#f1f8ff" : "#fff",
            border: `1.5px solid ${note.id === selectedNoteId ? COLORS.primary : COLORS.border}`,
            marginBottom: 10,
            padding: "12px 14px 13px 20px",
            borderRadius: 7,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
            boxShadow: note.id === selectedNoteId ? "0 2px 8px #1976d221" : ""
          }}
          onClick={() => onSelect(note.id)}
        >
          <div>
            <div style={{
              color: COLORS.primary,
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 1
            }}>
              {note.title} 
            </div>
            <div style={{ color: COLORS.secondary, fontSize: 13, lineHeight: 1.4 }}>
              {note.category}
            </div>
            <div style={{ color: "#999", fontSize: 12, marginTop: 2 }}>
              {new Date(note.updatedAt).toLocaleString()}
            </div>
          </div>
          <button
            style={{
              background: "none",
              border: "none",
              color: COLORS.accent,
              fontWeight: "bold",
              fontSize: 19,
              cursor: "pointer",
              marginLeft: 18,
              padding: 3,
              outline: "none",
            }}
            title="Delete note"
            onClick={e => { e.stopPropagation(); onDelete(note.id); }}
          >🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
