import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [msg, setMsg] = useState(null)
     const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "pc",
      image: "",
    })


    useEffect(()=>{

/*         if (loading) return
 */        /*  if (!isAuthenticated || !isAdmin) {
          navigate("/", { replace: true })
          return
        } */
        const loadCats= async()=>{
            try {
         const res = await fetch("http://103.177.249.170:3000/api/admin/",{
          method:"GET",
           
         })
         const data = await res.json()
         setCategories(Array.isArray(data) ? data : (data?.categories || []));       
            } catch (error) {
             console.error("Failed to load categories:", error);    
            }finally{
             setLoadingCats(false);
            }
        }
        loadCats();
    },[])



    const onChange =(e)=>{
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
    }

    const onSubmit= async(e)=>{
        e.preventDefault()
        setMsg(null)


        /*   if (!isAuthenticated || !isAdmin) {
          navigate('/', { replace: true })
          return
        } */

    if (!form.name || !form.description || !form.price || !form.category || !form.image || !form.stock) {
      setMsg("❌ All fields (name, description, price, category, image, stock) are required.");
      return; 
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category || "pc",
      image: form.image,
    }


    try{
     setSubmitting(true);
    const res = await fetch("http://103.177.249.170:3000/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
     const data = await res.json().catch(() => ({}))

      if (res.status === 401 || res.status === 403) {
        setMsg('❌ Not authorized')
        navigate('/', { replace: true })
        return
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create product");
      }
      setMsg("Product added successfully")

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      })

    }catch(err){
        setMsg("❌" , err.message)
    }finally{
        setSubmitting(false)
    }


};

/*  if (loading) return null
 if (!isAuthenticated || !isAdmin) return null
   */

  return (
   <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>

      <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Image URL *</label>
            <input
              name="image"
              value={form.image}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="https://..."
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
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="e.g. 19.99"
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
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="e.g. 20"
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
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Write a short description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              disabled={loadingCats}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300 bg-white"
            >
              <option value="">{loadingCats ? "Loading..." : "Select category"}</option>
              {categories?.map((c) => (

                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          

          

          
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center whitespace-nowrap justify-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Create Product"}
        </button>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>
    </div>
  )
}

export default AddProduct
