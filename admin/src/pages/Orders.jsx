import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { Page, Card, Button, Select, Loader, Empty, Toast, Badge, Input } from "../components/ui/AdminUI";

const statuses = ["pending", "accepted", "preparing", "out_for_delivery", "delivered", "cancelled"];

function badgeVariant(s){
  if (s === "pending") return "yellow";
  if (s === "accepted" || s === "preparing" || s === "out_for_delivery") return "blue";
  if (s === "delivered") return "green";
  if (s === "cancelled") return "red";
  return "gray";
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: "", text: "" });
  const [q, setQ] = useState("");
  const [savingId, setSavingId] = useState("");

  async function load() {
    try {
      setToast({ type: "", text: "" });
      setLoading(true);
      const res = await api.get("/api/orders?limit=50");
      setOrders(res.data?.items || []);
    } catch (e) {
      setToast({ type: "error", text: e?.response?.data?.message || "Failed to load orders" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((o) => {
      const name = (o.customer?.name || "").toLowerCase();
      const phone = (o.customer?.phone || "").toLowerCase();
      const addr = (o.customer?.address || "").toLowerCase();
      const status = (o.status || "").toLowerCase();
      return name.includes(query) || phone.includes(query) || addr.includes(query) || status.includes(query);
    });
  }, [orders, q]);

  const updateStatus = async (id, status) => {
    setSavingId(id);
    setToast({ type: "", text: "" });

    const snapshot = orders;
    setOrders((p) => p.map((x) => (x._id === id ? { ...x, status } : x)));

    try {
      await api.patch(`/api/orders/${id}/status`, { status });
      setToast({ type: "success", text: "✅ Status updated" });
    } catch (e) {
      setOrders(snapshot);
      setToast({ type: "error", text: e?.response?.data?.message || "Update failed" });
    } finally {
      setSavingId("");
    }
  };

  return (
    <Page
      title="Orders"
      actions={
        <>
          <Input placeholder="Search customer…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="ghost" onClick={load}>Refresh</Button>
        </>
      }
    >
      {loading ? (
        <Loader label="Loading orders..." />
      ) : (
        <>
          {toast.text ? <Toast type={toast.type}>{toast.text}</Toast> : null}

          {filtered.length === 0 ? (
            <Empty title="No orders found" desc="Orders will appear here once customers place them." />
          ) : (
            <div className="list">
              {filtered.map((o) => (
                <Card key={o._id} className="orderCard">
                  <div className="orderTop">
                    <div>
                      <div className="rowTitle">
                        {o.customer?.name || "Unknown"}{" "}
                        <span className="muted">• {o.customer?.phone || "-"}</span>
                      </div>
                      <div className="muted">{o.customer?.address || "-"}</div>
                      {o.createdAt ? <div className="muted">🕒 {new Date(o.createdAt).toLocaleString()}</div> : null}
                    </div>

                    <div className="orderRight">
                      <div className="price">£{Number(o.total).toFixed(2)}</div>
                      <Badge variant={badgeVariant(o.status)}>{o.status}</Badge>
                      <Select
                        value={o.status}
                        disabled={savingId === o._id}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                      >
                        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </div>
                  </div>

                  <div className="orderItems">
                    {(o.items || []).map((it, idx) => (
                      <div className="orderItem" key={idx}>
                        <span className="muted">
                          <strong className="dark">{it.title}</strong> × {it.quantity}
                        </span>
                        <strong>£{Number(it.price * it.quantity).toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>

                  {o.customer?.notes ? (
                    <div className="orderNotes">
                      <span className="muted">Notes:</span> {o.customer.notes}
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </Page>
  );
}
