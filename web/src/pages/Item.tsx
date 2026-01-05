import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Item = {
    id: string;
    url: string;
    title: string | null;
    status: string;
    created_at: string;
};

const API = "http://localhost:4000";

export default function ItemPage() {
    const { id } = useParams();
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        async function load() {
            const res = await fetch(`${API}/items/${id}`);
            setItem(await res.json());
        }
        load();
    }, [id]);

    if (!item) return <div style={{ padding: 24 }}>Loading…</div>;

    return (
        <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
            <Link to="/">← Back</Link>
            <h1 style={{ marginTop: 12 }}>{item.title ?? "Untitled"}</h1>
            <p><a href={item.url} target="_blank">Open original</a></p>
            <p>Status: {item.status}</p>
            <p>Saved: {new Date(item.created_at).toLocaleString()}</p>
        </div>
    );
}
