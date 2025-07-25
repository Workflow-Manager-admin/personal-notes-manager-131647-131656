import React, { useState, useEffect } from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onCancel }) {
  /** Editor for creating or editing a note. */
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "Uncategorized");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setCategory(note?.category || "Uncategorized");
    setDirty(false);
  }, [note]);

  // Handle save button
  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      ...note,
      title: title.trim(),
      content: content || "",
      category: category || "Uncategorized"
    });
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%", minHeight: 350
    }}>
      <input
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 8,
          padding: "9px 12px",
          border: `1.5px solid ${COLORS.primary}`,
          borderRadius: 4,
          outline: "none"
        }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => { setTitle(e.target.value); setDirty(true); }}
        maxLength={80}
      />
      <input
        style={{
          fontSize: 14,
          fontWeight: 400,
          marginBottom: 9,
          padding: "8px 12px",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 4,
        }}
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={e => { setCategory(e.target.value); setDirty(true); }}
        maxLength={28}
      />
      <textarea
        style={{
          flex: 1,
          height: 220,
          fontSize: 16,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 4,
          padding: "10px 12px",
          marginBottom: 12,
          resize: "vertical"
        }}
        placeholder="Write your note here..."
        value={content}
        onChange={e => { setContent(e.target.value); setDirty(true); }}
        maxLength={3500}
      />
      <div style={{display:"flex", gap: 14, marginTop: 16 }}>
        <button
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 22px",
            fontWeight: "bold",
            fontSize: 15,
            cursor: (!dirty && note) ? "not-allowed" : "pointer",
            opacity: (!dirty && note) ? .53 : 1,
            transition: ".2s all"
          }}
          disabled={!title.trim() || (!dirty && note)}
          onClick={handleSave}
        >
          { note?.id ? "Save Changes" : "Create Note" }
        </button>
        <button
          style={{
            background: "#fff",
            color: COLORS.secondary,
            border: `1.5px solid ${COLORS.secondary}`,
            borderRadius: 6,
            padding: "8px 22px",
            fontWeight: "bold",
            fontSize: 15,
            cursor: "pointer"
          }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
