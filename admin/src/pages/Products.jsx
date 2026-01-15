import React, { useEffect, useMemo, useState } from "react";
import { api, imgUrl } from "../lib/api";
import { Page, Card, Button, Input, Select, Loader, Empty, Toast, Badge } from "../components/ui/AdminUI";

export default function Products() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: "", text: "" });

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [isActive, setIsActive] = useState("true");
  const [deletingId, setDeletingId] = useState("");

  async function load(page = 1) {
    try {
      setToast({ type: "", text: "" });
      setLoading(true);

      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "50");
      params.set("isActive", isActive);
      if (q.trim()) params.set("q", q.trim());
      if (cat !== "all") params.set("category", cat);

      const res = await api.get(`/api/products/admin?${params.toString()}`);
      setItems(res.data?.items || []);
      setMeta({ total: res.data?.total || 0, page: res.data?.page || 1, pages: res.data?.pages || 1 });
    } catch (e) {
      setToast({ type: "error", text: e?.response?.data?.message || "Failed to load products" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(1); }, [isActive]); // reload when active filter changes

  const categories = useMemo(() => {
    const set = new Set(["Main"]);
    items.forEach((x) => set.add(x.category || "Main"));
    return ["all", ...Array.from(set).sort((a,b)=>a.localeCompare(b))];
  }, [items]);

  const remove = async (id) => {
    if (!confirm("Delete this product?")) return;

    setDeletingId(id);
    setToast({ type: "", text: "" });

    const snapshot = items;
    setItems((p) => p.filter((x) => x._id !== id));

    try {
      await api.delete(`/api/products/${id}`);
      setToast({ type: "success", text: "✅ Product deleted (soft)" });
    } catch (e) {
      setItems(snapshot);
      setToast({ type: "error", text: e?.response?.data?.message || "Delete failed" });
    } finally {
      setDeletingId("");
    }
  };

  const restore = async (id) => {
    setToast({ type: "", text: "" });
    try {
      await api.patch(`/api/products/${id}/restore`);
      setToast({ type: "success", text: "✅ Product restored" });
      load(meta.page);
    } catch (e) {
      setToast({ type: "error", text: e?.response?.data?.message || "Restore failed" });
    }
  };

  return (
    <Page
      title={`Products (${meta.total})`}
      actions={
        <>
          <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={cat} onChange={(e) => setCat(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>)}
          </Select>
          <Select value={isActive} onChange={(e) => setIsActive(e.target.value)}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Select>
          <Button variant="ghost" onClick={() => load(1)} disabled={loading}>Search</Button>
        </>
      }
    >
      {loading ? (
        <Loader label="Loading products..." />
      ) : (
        <>
          {toast.text ? <Toast type={toast.type}>{toast.text}</Toast> : null}

          {items.length === 0 ? (
            <Empty title="No products found" desc="Try changing search/filter or add a new product." />
          ) : (
            <div className="list">
              {items.map((p) => (
                <Card key={p._id} className="row">
                  <img
                    src={imgUrl(p.image)}
                    alt={p.title}
                    className="thumb"
                    onError={(e) => (e.currentTarget.style.opacity = "0.35")}
                  />
                  <div className="rowMid">
                    <div className="rowTitle">{p.title}</div>
                    <div className="rowMeta">
                      <strong>£{Number(p.price).toFixed(2)}</strong>
                      <span className="dot">•</span>
                      <Badge variant="blue">{p.category || "Main"}</Badge>
                      {!p.isActive ? <Badge variant="gray">inactive</Badge> : null}
                    </div>
                  </div>

                  {p.isActive ? (
                    <Button variant="danger" disabled={deletingId === p._id} onClick={() => remove(p._id)}>
                      {deletingId === p._id ? "Deleting..." : "Delete"}
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => restore(p._id)}>
                      Restore
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          )}

          {meta.pages > 1 && (
            <div className="pager">
              <Button variant="ghost" disabled={meta.page <= 1} onClick={() => load(meta.page - 1)}>Prev</Button>
              <span className="muted">Page {meta.page} / {meta.pages}</span>
              <Button variant="ghost" disabled={meta.page >= meta.pages} onClick={() => load(meta.page + 1)}>Next</Button>
            </div>
          )}
        </>
      )}
    </Page>
  );
}
