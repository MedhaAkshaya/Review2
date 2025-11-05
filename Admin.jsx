import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import BookCard from "../components/BookCard";
import AddEditBookForm from "../components/AddEditBookForm";
import StudentCard from "../components/StudentCard";

export default function Admin() {
  const { books, addBook, updateBook, removeBook, students, addStudent, deleteStudent, issueBook, returnBook } = useLibrary();
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [issueTarget, setIssueTarget] = useState(null);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <section style={{ marginTop: 12 }}>
        <h2>Manage Books</h2>
        {showAdd ? (
          <AddEditBookForm
            onSave={(payload) => { addBook(payload); setShowAdd(false); }}
            onCancel={() => setShowAdd(false)}
          />
        ) : editing ? (
          <AddEditBookForm
            initial={editing}
            onSave={(payload) => { updateBook(editing.id, payload); setEditing(null); }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <button onClick={() => setShowAdd(true)}>+ Add Book</button>
        )}

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {books.map(b => (
            <BookCard
              key={b.id}
              book={b}
              onEdit={() => setEditing(b)}
              onDelete={removeBook}
              onIssueClick={(book) => setIssueTarget(book)}
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Manage Students</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <input placeholder="Name" value={newStudentName} onChange={e => setNewStudentName(e.target.value)} />
          <input placeholder="Email" value={newStudentEmail} onChange={e => setNewStudentEmail(e.target.value)} />
          <button onClick={() => { if (newStudentName) { addStudent({ name: newStudentName, email: newStudentEmail }); setNewStudentName(""); setNewStudentEmail(""); } }}>Add Student</button>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {students.map(s => <StudentCard key={s.id} student={s} onDelete={deleteStudent} onReturn={returnBook} />)}
        </div>
      </section>

      {issueTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", padding: 18, borderRadius: 8, width: 400 }}>
            <h3>Issue "{issueTarget.title}"</h3>
            <p>Choose student:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {students.map(st => (
                <button key={st.id} onClick={() => { issueBook(st.id, issueTarget.id); setIssueTarget(null); }}>
                  {st.name} ({st.email})
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setIssueTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
