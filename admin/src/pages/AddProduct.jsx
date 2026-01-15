import React, { useMemo, useState } from "react";
import { api, imgUrl } from "../lib/api";
import { Page, Card, Button, Input, Select, Textarea, Toast } from "../components/ui/AdminUI";

const categories = ["Main", "Salad", "Dessert", "Drinks", "Pizza", "Pasta", "Sides"];

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "Main",
    stars: "4.5",
    desc: "",
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const preview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    const pr = Number(form.price);
    if (!form.price || Number.isNaN(pr) || pr <= 0) return "Price must be a positive number";
    const st = Number(form.stars);
    if (Number.isNaN(st) || st < 0 || st > 5) return "Stars must be between 0 and 5";
    if (!file) return "Please choose an image";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const v = validate();
    if (v) return setMsg({ type: "error", text: v });

    try {
      setSaving(true);

      // 1) upload image
      const fd = new FormData();
      fd.append("image", file);
      const up = await api.post("/api/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2) create product
      await api.post("/api/products", {
        title: form.title.trim(),
        price: Number(form.price),
        category: form.category,
        stars: Number(form.stars),
        desc: form.desc.trim(),
        image: up.data.url,
      });

      setMsg({ type: "success", text: "✅ Product added!" });
      setForm({ title: "", price: "", category: "Main", stars: "4.5", desc: "" });
      setFile(null);
    } catch (e2) {
      setMsg({ type: "error", text: e2?.response?.data?.message || "Failed to add product" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Page title="Add Product">
      <Card>
        <form onSubmit={submit} className="formGrid">
          <div className="formLeft">
            <label className="label">Title</label>
            <Input name="title" placeholder="e.g. Margherita Pizza" value={form.title} onChange={change} />

            <div className="two">
              <div>
                <label className="label">Price (£)</label>
                <Input name="price" placeholder="e.g. 9.99" value={form.price} onChange={change} />
              </div>
              <div>
                <label className="label">Stars (0-5)</label>
                <Input name="stars" placeholder="4.5" value={form.stars} onChange={change} />
              </div>
            </div>

            <label className="label">Category</label>
            <Select name="category" value={form.category} onChange={change}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>

            <label className="label">Description</label>
            <Textarea name="desc" rows={4} placeholder="Write short description…" value={form.desc} onChange={change} />

            <label className="label">Image</label>
            <input
              className="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <div className="formActions">
              <Button disabled={saving}>{saving ? "Saving..." : "Add product"}</Button>
              <Button type="button" variant="ghost" onClick={() => { setForm({ title:"", price:"", category:"Main", stars:"4.5", desc:"" }); setFile(null); setMsg({type:"", text:""}); }}>
                Reset
              </Button>
            </div>

            {msg.text ? <Toast type={msg.type}>{msg.text}</Toast> : null}
          </div>

          <div className="formRight">
            <div className="previewBox">
              {preview ? (
                <img src={preview} alt="Preview" className="previewImg" />
              ) : (
                <div className="muted">Image preview will show here</div>
              )}
            </div>

            <div className="muted" style={{ fontWeight: 850, marginTop: 10 }}>
              Tip: Use square images for best look (e.g. 800×800).
            </div>
          </div>
        </form>
      </Card>
    </Page>
  );
}
