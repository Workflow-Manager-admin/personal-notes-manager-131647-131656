//
// Stubs for authentication and notes backend API integration.
// Replace these with actual fetch() or axios() calls once backend is ready.
//

// -- Authentication --

// PUBLIC_INTERFACE
export async function login({ email, password }) {
  /** Stubs login; accepts any non-empty input. */
  return new Promise((resolve, reject) => {
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setTimeout(() => resolve({ email }), 500);
    } else {
      setTimeout(() => reject(new Error("Invalid credentials")), 500);
    }
  });
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Logs out the current user. */
  localStorage.removeItem("user");
  return Promise.resolve();
}

// PUBLIC_INTERFACE
export async function signup({ email, password }) {
  /** Stubs signup; accepts any non-empty input. */
  return new Promise((resolve, reject) => {
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setTimeout(() => resolve({ email }), 500);
    } else {
      setTimeout(() => reject(new Error("Invalid signup info")), 500);
    }
  });
}

// PUBLIC_INTERFACE
export function getCurrentUser() {
  /** Returns the current logged-in user, if any. */
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
  } catch {
    return null;
  }
}

// -- Notes Management (all stubbed) --

const NOTES_KEY = "user_notes";

// PUBLIC_INTERFACE
export async function getNotes() {
  /** Returns all notes for the user as an array. */
  return new Promise((resolve) => {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    setTimeout(() => resolve(notes), 300);
  });
}

// PUBLIC_INTERFACE
export async function createNote({ title, content, category }) {
  /** Creates a new note and returns updated notes. */
  return new Promise((resolve) => {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    const note = {
      id: Date.now().toString(),
      title,
      content,
      category: category || "Uncategorized",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(note);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    setTimeout(() => resolve(note), 200);
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id, { title, content, category }) {
  /** Updates a note by id. */
  return new Promise((resolve, reject) => {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return reject(new Error("Note not found"));
    notes[idx] = {
      ...notes[idx],
      title,
      content,
      category,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    setTimeout(() => resolve(notes[idx]), 200);
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Deletes a note by id. */
  return new Promise((resolve) => {
    let notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    setTimeout(() => resolve(true), 200);
  });
}

// PUBLIC_INTERFACE
export async function searchNotes(query) {
  /** Returns notes matching the search query in title/content. */
  return new Promise((resolve) => {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    const lc = (s) => s.toLowerCase();
    const filtered = notes.filter(n =>
      lc(n.title).includes(lc(query)) || lc(n.content).includes(lc(query))
    );
    setTimeout(() => resolve(filtered), 200);
  });
}

// PUBLIC_INTERFACE
export async function getCategories() {
  // Returns unique note categories
  return new Promise((resolve) => {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    const cats = ["All"].concat([...new Set(notes.map(n => n.category || "Uncategorized"))]);
    setTimeout(() => resolve(cats), 100);
  });
}
