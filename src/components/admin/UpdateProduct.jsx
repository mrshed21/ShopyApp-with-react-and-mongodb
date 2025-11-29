import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discountPercent: 0,
    isFeatured: false,
    isOnSale: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://103.177.249.170:3000/api/admin/${id}`);
        if (!res.ok) throw new Error("Failed to load product");
        const data = await res.json();
        setForm({
          name: data?.name || "",
          description: data?.description || "",
          price: data?.price || "",
          stock: data?.stock || "",
          discountPercent: data?.discountPercent || 0,
          isFeatured: !!data?.isFeatured,
          isOnSale: !!data?.isOnSale,
        });
      } catch (e) {
        setMsg(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === "number") {
      setForm((p) => ({ ...p, [name]: Number(value) }));
      return;
    }
    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      setSaving(true);
      const res = await fetch(`http://103.177.249.170:3000/api/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to update product");
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="my-6">Update Product</h3>
      {msg && <div className="text-red-500 mb-4">{msg}</div>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Price *</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={form.price}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Stock *</label>
          <input
            type="number"
            name="stock"
            min="0"
            step="1"
            value={form.stock}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Discount Percent</label>
          <input
            type="number"
            name="discountPercent"
            min="0"
            max="100"
            step="1"
            value={form.discountPercent}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-6 md:col-span-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={onChange}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm">Featured</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="isOnSale"
              checked={form.isOnSale}
              onChange={onChange}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm">On Sale</span>
          </label>
        </div>
        <div className="md:col-span-2">
          <button
            disabled={saving}
            type="submit"
            className="px-4 py-2 rounded-md bg-[#F86D72] text-white"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;

