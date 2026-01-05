import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
  id: string;
  url: string;
  title: string | null;
  status: string;
  created_at: string;
};

const API = "http://localhost:4000";

export default function App() {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`${API}/items`);
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch(`${API}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ? JSON.stringify(data.error) : "Failed to save");
      return;
    }

    setUrl("");
    await load();
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Inbox</h1>

      <form onSubmit={onSave} style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL…"
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit">Save</button>
      </form>

      {error && <p style={{ marginTop: 10 }}>{error}</p>}

      <ul style={{ marginTop: 16 }}>
        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 10 }}>
            <Link to={`/item/${it.id}`}>{it.title ?? it.url}</Link>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{it.url}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
