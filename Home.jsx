import { useLibrary } from "../context/LibraryContext";

export default function Home() {
  const { books, report } = useLibrary();
  const r = report();

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Library System</h1>
      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div>Total unique titles</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{r.totalUniqueTitles}</div>
        </div>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div>Total books (all copies)</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{r.totalBooks}</div>
        </div>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div>Currently borrowed</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{r.currentlyBorrowed}</div>
        </div>
      </div>

      <h2 style={{ marginTop: 24 }}>Book Catalog</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {books.map(b => (
          <div key={b.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
            <strong>{b.title}</strong>
            <div style={{ color: "#666" }}>{b.author}</div>
            <div style={{ marginTop: 6 }}>Available: {b.available}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
