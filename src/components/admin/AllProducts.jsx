import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../auth/context'
 
function AllProducts() {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { isAuthenticated, isAdmin } = useAuth()
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://103.177.249.170:3000/api/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`  
          },
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          setError("Not authorized");
          navigate("/", { replace: true });
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProductList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    if(isAuthenticated && isAdmin){
          fetchProducts()
          }else {
            console.log('Not authenticated or not admin')
          navigate("/", { replace: true });
          } 
   
  }, [navigate, isAuthenticated, isAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-10">
      <h3 className="my-6">All Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {productList?.map((product) => (
          <div key={product?._id} className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg">
            <img src={product?.image} alt={product?.name} />
            <h6>{product?.name}</h6>
            <span className="text-gray-400">{product?.description}</span>
            <strong className="text-[#F86D72]">{product?.price} $</strong>
            <div className="flex items-center gap-2">
              <Link
                to={`/admin/update-product/${product?._id}`}
                className="px-3 py-2 rounded-md bg-blue-600 text-white"
              >
                Edit
              </Link>
              <button
                className="px-3 py-2 rounded-md bg-red-600 text-white"
                onClick={async () => {
                  try {
                    const res = await fetch(`http://103.177.249.170:3000/api/admin/${product?._id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        credentials: "include",
                      }
                    );
                    if (!res.ok) {
                      throw new Error("Failed to delete");
                    }
                    setProductList((prev) => prev.filter((p) => p?._id !== product?._id));
                  } catch (err) {
                    console.error("Delete failed", err);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
