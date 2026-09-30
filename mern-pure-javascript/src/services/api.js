const api = {
  // MERN Stack Telemetry
  mern: {
    async getStatus() {
      try {
        const res = await fetch("/api/mern/status");
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        console.warn("Could not fetch MERN status:", e);
        return null;
      }
    },
    async getCollection(collectionName) {
      try {
        const res = await fetch(`/api/mern/collections/${collectionName}`);
        if (!res.ok) return { count: 0, documents: [] };
        return await res.json();
      } catch (e) {
        console.warn(`Could not fetch collection ${collectionName}:`, e);
        return { count: 0, documents: [] };
      }
    }
  },
  // Auth & Profile
  auth: {
    async getProfile(email) {
      try {
        const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(email)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.user || null;
      } catch (e) {
        console.warn("Could not fetch profile from server:", e);
        return null;
      }
    },
    async updateProfile(profile) {
      try {
        const res = await fetch("/api/auth/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.user || null;
      } catch (e) {
        console.warn("Could not sync profile to server:", e);
        return null;
      }
    }
  },
  // Daily Study Sessions (Planner)
  sessions: {
    async getSessions(userId) {
      try {
        const res = await fetch(`/api/sessions?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.sessions || [];
      } catch (e) {
        console.warn("Could not fetch sessions from server:", e);
        return [];
      }
    },
    async createSession(session) {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(session)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.session || null;
      } catch (e) {
        console.warn("Could not create session on server:", e);
        return null;
      }
    },
    async updateSession(id, updates) {
      try {
        const res = await fetch(`/api/sessions/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.session || null;
      } catch (e) {
        console.warn("Could not update session on server:", e);
        return null;
      }
    },
    async deleteSession(id) {
      try {
        const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
        return res.ok;
      } catch (e) {
        console.warn("Could not delete session on server:", e);
        return false;
      }
    }
  },
  // Personal Notes
  notes: {
    async getNotes(userId) {
      try {
        const res = await fetch(`/api/notes?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.notes || [];
      } catch (e) {
        console.warn("Could not fetch notes from server:", e);
        return [];
      }
    },
    async createNote(note) {
      try {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.note || null;
      } catch (e) {
        console.warn("Could not create note on server:", e);
        return null;
      }
    },
    async deleteNote(id) {
      try {
        const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
        return res.ok;
      } catch (e) {
        console.warn("Could not delete note on server:", e);
        return false;
      }
    }
  },
  // Mock Tests & Practice Attempts
  practice: {
    async getAttempts(userId) {
      try {
        const res = await fetch(`/api/practice/attempts?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) return { attempts: [], aggregateMetrics: null };
        return await res.json();
      } catch (e) {
        console.warn("Could not fetch practice attempts from server:", e);
        return { attempts: [], aggregateMetrics: null };
      }
    },
    async saveAttempt(attemptData) {
      try {
        const res = await fetch("/api/practice/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attemptData)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.attempt || null;
      } catch (e) {
        console.warn("Could not save test attempt to server:", e);
        return null;
      }
    }
  },
  // Bookmarks / Saved Resources
  bookmarks: {
    async getBookmarks(userId) {
      try {
        const res = await fetch(`/api/bookmarks?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.bookmarks || [];
      } catch (e) {
        console.warn("Could not fetch bookmarks from server:", e);
        return [];
      }
    },
    async saveBookmark(data) {
      try {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        console.warn("Could not save bookmark on server:", e);
        return null;
      }
    },
    async deleteBookmark(resourceId, userId) {
      try {
        const res = await fetch(`/api/bookmarks/${resourceId}?userId=${encodeURIComponent(userId)}`, {
          method: "DELETE"
        });
        return res.ok;
      } catch (e) {
        console.warn("Could not delete bookmark on server:", e);
        return false;
      }
    }
  }
};
export {
  api
};
