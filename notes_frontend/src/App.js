import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import AuthForm from "./components/AuthForm";
import { COLORS } from "./theme";
import {
  login,
  logout,
  signup,
  getCurrentUser,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  getCategories,
} from "./services/api";

// PUBLIC_INTERFACE
function App() {
  // State
  const [user, setUser] = useState(() => getCurrentUser());
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editorNote, setEditorNote] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [theme] = useState("light"); // static for now, easily extendable

  // Set document theme (fixed light)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Initial fetch (if user logged in)
  useEffect(() => {
    if (user) {
      refreshNotes();
      refreshCategories();
    }
  }, [user]);

  // Refresh lists when CRUD or search
  async function refreshNotes() {
    setLoading(true);
    let data = [];
    if (search.trim()) {
      data = await searchNotes(search);
    } else {
      data = await getNotes();
    }
    if (categoryFilter && categoryFilter !== "All") {
      data = data.filter(n => n.category === categoryFilter);
    }
    setNotes(data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    setLoading(false);
  }

  async function refreshCategories() {
    const cats = await getCategories();
    setCategories(cats);
  }

  // -- Authentication actions --
  async function onDoLogin({ email, password }) {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await login({ email, password });
      setUser(getCurrentUser());
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  }
  async function onDoSignup({ email, password }) {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signup({ email, password });
      setUser(getCurrentUser());
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  }
  async function onLogout() {
    await logout();
    setUser(null);
    setNotes([]);
    setSelectedNoteId(null);
    setEditorNote(null);
    setCategoryFilter("All");
    setSearch("");
  }

  // -- Notes CRUD actions --
  async function handleCreate() {
    setEditorNote(null);
    setShowEditor(true);
  }
  function handleSelectNote(id) {
    setSelectedNoteId(id);
    const note = notes.find(n => n.id === id);
    setEditorNote(note);
    setShowEditor(false);
  }
  async function handleSaveNote(noteInput) {
    setLoading(true);
    let saved = null;
    if (noteInput.id) {
      saved = await updateNote(noteInput.id, noteInput);
    } else {
      saved = await createNote(noteInput);
    }
    setShowEditor(false);
    setSelectedNoteId(saved.id);
    setEditorNote(saved);
    await refreshNotes();
    await refreshCategories();
    setLoading(false);
  }
  async function handleDeleteNote(id) {
    setLoading(true);
    await deleteNote(id);
    setNotes(notes => notes.filter(n => n.id !== id));
    setShowEditor(false);
    setSelectedNoteId(null);
    setEditorNote(null);
    await refreshCategories();
    setLoading(false);
  }
  async function handleSearch(e) {
    setSearch(e.target.value);
  }
  async function handleSearchSubmit(e) {
    e.preventDefault();
    await refreshNotes();
  }
  async function handleCategoryChange(cat) {
    setCategoryFilter(cat);
    setShowEditor(false);
    setSelectedNoteId(null);
    setEditorNote(null);
    setSearch("");
    setLoading(true);
    let data = [];
    if (cat && cat !== "All") {
      const all = await getNotes();
      data = all.filter(n => n.category === cat);
    } else {
      data = await getNotes();
    }
    setNotes(data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    setLoading(false);
  }

  // Show authentication if not logged in 
  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column"
      }}>
        <Header />
        <AuthForm
          variant={authMode}
          onSubmit={authMode === "login" ? onDoLogin : onDoSignup}
          loading={authLoading}
          error={authError}
          switchMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        />
        <footer style={{
          margin: "auto",
          textAlign: "center",
          color: "#bbb",
          fontWeight: 400,
          padding: "27px 0"
        }}>
          &copy; {new Date().getFullYear()} Notes Manager.
        </footer>
      </div>
    );
  }

  // MAIN UI
  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      fontFamily: "Inter, Arial, Helvetica, sans-serif",
      color: COLORS.text
    }}>
      <Header user={user} onLogout={onLogout} />
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        minHeight: "calc(100vh - 56px)",
      }}>
        <Sidebar
          categories={categories}
          activeCategory={categoryFilter}
          onCategoryChange={handleCategoryChange}
        />

        <main style={{
          flex: 1,
          background: "#f8f9fa",
          minHeight: 600,
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Search bar and actions */}
          <section style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "18px 18px 0 26px",
            gap: 18,
          }}>
            <form onSubmit={handleSearchSubmit} style={{
              display: "flex",
              alignItems: "center"
            }}>
              <input
                style={{
                  padding: "7px 13px",
                  fontSize: 15,
                  border: `1.6px solid ${COLORS.border}`,
                  borderRadius: 6,
                  width: 240,
                  outline: "none",
                  marginRight: 8
                }}
                type="search"
                placeholder="Search notes"
                value={search}
                onChange={handleSearch}
                maxLength={60}
              />
              <button
                style={{
                  background: COLORS.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "7px 16px",
                  cursor: "pointer",
                  marginLeft: 2
                }}
                type="submit"
              >
                Search
              </button>
            </form>
            <button
              style={{
                background: COLORS.accent,
                color: "#222",
                border: "none",
                borderRadius: 6,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: "auto",
                padding: "8px 24px 8px 20px",
                cursor: "pointer",
                boxShadow: "0 2px 8px #ffc10722"
              }}
              onClick={handleCreate}
            >
              + New Note
            </button>
          </section>
          {/* List and Editor */}
          <section style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            minHeight: 310,
            margin: "13px 0 0 0"
          }}>
            <div style={{
              width: 350,
              minWidth: 220,
              maxWidth: 410,
              borderRight: `1px solid ${COLORS.border}`,
              background: "#fff",
              boxShadow: "0 0 12px #aaa01109"
            }}>
              <NotesList
                notes={notes}
                onSelect={handleSelectNote}
                selectedNoteId={selectedNoteId}
                onDelete={handleDeleteNote}
              />
            </div>
            <div style={{
              flex: 1,
              padding: "22px 30px",
              minHeight: 350
            }}>
              {showEditor || (!selectedNoteId && !loading) ? (
                <NoteEditor
                  note={editorNote}
                  onSave={handleSaveNote}
                  onCancel={() => {
                    setShowEditor(false);
                    setEditorNote(null);
                  }}
                />
              ) : selectedNoteId && !loading && (
                <div style={{
                  background: "#fff",
                  padding: "24px 33px",
                  minHeight: 260,
                  borderRadius: 7,
                  border: `1.8px solid ${COLORS.border}`,
                  boxShadow: "0 2px 14px #bfe1fe48"
                }}>
                  <div style={{
                    color: COLORS.primary,
                    fontWeight: 700,
                    fontSize: 26,
                    marginBottom: 8
                  }}>
                    {editorNote?.title || ""}
                  </div>
                  <div style={{
                    color: COLORS.secondary,
                    fontSize: 15,
                    fontWeight: 500,
                    marginBottom: 4
                  }}>
                    {editorNote?.category}
                  </div>
                  <div style={{
                    whiteSpace: "pre-wrap",
                    color: "#222",
                    fontSize: 17,
                    marginBottom: 19,
                    marginTop: 12
                  }}>
                    {editorNote?.content}
                  </div>
                  <div style={{
                    color: "#999",
                    fontSize: 12,
                    marginTop: 3
                  }}>
                    Last updated: {editorNote?.updatedAt && new Date(editorNote.updatedAt).toLocaleString()}
                  </div>
                  <button
                    style={{
                      background: COLORS.primary,
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 20px",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 26,
                      marginRight: 16,
                      cursor: "pointer"
                    }}
                    onClick={() => setShowEditor(true)}
                  >
                    Edit Note
                  </button>
                </div>
              )}
              {loading && (
                <div style={{
                  textAlign: "center", color: "#888"
                }}>Loading...</div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default App;
