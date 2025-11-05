export default function StudentCard({ student, onDelete, onReturn }) {
  return (
    <div style={{ border: "1px solid #eee", padding: 10, borderRadius: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>{student.name}</strong>
          <div style={{ fontSize: 13, color: "#666" }}>{student.email}</div>
        </div>
        <div>
          <button onClick={() => onDelete(student.id)} style={{ background: "#ef4444", color: "white" }}>Remove</button>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 13, marginBottom: 6 }}>Borrowed:</div>
        {student.borrowed.length === 0 ? <em style={{ color: "#777" }}>No borrowed books</em> : student.borrowed.map(b => (
          <div key={b.bookId} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
            <div>{b.title} — due {new Date(b.dueDate).toLocaleDateString()}</div>
            <button onClick={() => onReturn(student.id, b.bookId)}>Return</button>
          </div>
        ))}
      </div>
    </div>
  );
}
