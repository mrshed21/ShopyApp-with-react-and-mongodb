import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://103.177.249.170:3000/api/products/");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data?.products || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p?.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p?.name?.toLowerCase()?.includes(search.toLowerCase());
      const matchesCategory = category ? p?.category === category : true;
      const price = Number(p?.price ?? 0);
      const minOk = minPrice !== "" ? price >= Number(minPrice) : true;
      const maxOk = maxPrice !== "" ? price <= Number(maxPrice) : true;
      return matchesSearch && matchesCategory && minOk && maxOk;
    });
  }, [products, search, category, minPrice, maxPrice]);

  if (loading) return <div className="container mx-auto px-4 py-10">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1 border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Search by name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Min Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Max Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="1000"
              />
            </div>
          </div>
          <button
            onClick={() => { setSearch(""); setCategory(""); setMinPrice(""); setMaxPrice(""); }}
            className="w-full rounded-md bg-gray-800 text-white px-3 py-2"
          >
            Clear
          </button>
        </div>
      </aside>
      <main className="md:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <span className="text-sm text-gray-500">{filtered.length} items</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <div key={product._id} className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4">
              <Link to={`/productDetails/${product?._id}`}>
                <img src={`${product?.image}`} alt={product?.name} className="w-full h-56 object-cover rounded" />
              </Link>
              <h3 className="font-semibold">{product?.name}</h3>
              <p className="text-sm text-gray-600">{product?.description}</p>
              <div className="flex items-center justify-between">
                <strong className="text-[#F86D72]">{product?.price} $</strong>
                <span className="text-xs text-gray-500">Stock: {product?.stock}</span>
              </div>
              <Link
                to={`/productDetails/${product?._id}`}
                className="rounded-md bg-[#F86D72] text-white px-3 py-2 text-center"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
