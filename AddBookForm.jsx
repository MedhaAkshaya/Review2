import { useState } from "react";

export default function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      onAdd({ id: Date.now(), title, author });
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        className="border p-2 w-1/3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
      />
      <input
        className="border p-2 w-1/3"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Add Book
      </button>
    </form>
  );
}
