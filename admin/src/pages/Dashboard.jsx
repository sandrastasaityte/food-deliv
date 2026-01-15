import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { Page, Card, Stat, Loader, Toast, Badge, Button } from "../components/ui/AdminUI";

function badgeVariant(s) {
  if (s === "pending") return "yellow";
  if (s === "accepted" || s === "preparing" || s === "out_for_delivery") return "blue";
  if (s === "delivered") return "green";
  if (s === "cancelled") return "red";
  return "gray";
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: "", text: "" });

  const [productsTotal, setProductsTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      setToast({ type: "", text: "" });
      setLoading(true);

      const [p, o] = await Promise.all([
        api.get("/api/products/admin?limit=1"),
        api.get("/api/orders?limit=200"),
      ]);

      setProductsTotal(Number(p.data?.total || 0));
      setOrders(o.data?.items || []);
    } catch (e) {
      setToast({ type: "error", text: e?.response?.data?.message || "Failed to load dashboard" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const pending = orders.filter((o) => o.status === "pending").length;
    const accepted = orders.filter((o) => o.status === "accepted").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;

    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const avgOrder = totalOrders ? revenue / totalOrders : 0;

    return {
      totalOrders,
      pending,
      accepted,
      delivered,
      revenue,
      avgOrder,
    };
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6);
  }, [orders]);

  return (
    <Page
      title="Dashboard"
      actions={<Button variant="ghost" onClick={load} disabled={loading}>Refresh</Button>}
    >
      {loading ? (
        <Loader label="Loading dashboard..." />
      ) : (
        <>
          {toast.text ? <Toast type={toast.type}>{toast.text}</Toast> : null}

          <div className="grid3">
            <Card>
              <Stat label="Products" value={productsTotal} hint="Active + inactive (admin)" />
            </Card>

            <Card>
              <Stat label="Orders" value={stats.totalOrders} hint="Loaded last 200 orders" />
            </Card>

            <Card>
              <Stat label="Pending" value={stats.pending} hint="Waiting for action" />
            </Card>
          </div>

          <div className="grid3" style={{ marginTop: 14 }}>
            <Card>
              <Stat label="Delivered" value={stats.delivered} hint="Completed orders" />
            </Card>

            <Card>
              <Stat label="Revenue" value={`£${stats.revenue.toFixed(2)}`} hint="Excludes cancelled" />
            </Card>

            <Card>
              <Stat label="Avg order" value={`£${stats.avgOrder.toFixed(2)}`} hint="Average value" />
            </Card>
          </div>

          <div style={{ marginTop: 18 }}>
            <Card className="pad">
              <div className="rowTitle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Recent orders</span>
                <span className="muted">Last {recentOrders.length}</span>
              </div>

              {recentOrders.length === 0 ? (
                <div className="muted" style={{ marginTop: 10 }}>
                  No orders yet.
                </div>
              ) : (
                <div className="list" style={{ marginTop: 10 }}>
                  {recentOrders.map((o) => (
                    <div key={o._id} className="orderRowMini">
                      <div>
                        <div className="dark" style={{ fontWeight: 850 }}>
                          {o.customer?.name || "Unknown"}{" "}
                          <span className="muted" style={{ fontWeight: 600 }}>
                            • {o.customer?.phone || "-"}
                          </span>
                        </div>
                        <div className="muted">
                          {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div className="dark" style={{ fontWeight: 900 }}>
                          £{Number(o.total || 0).toFixed(2)}
                        </div>
                        <Badge variant={badgeVariant(o.status)}>{o.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </Page>
  );
}
