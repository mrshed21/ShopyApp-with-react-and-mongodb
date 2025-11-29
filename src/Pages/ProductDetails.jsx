import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetch(
          `http://103.177.249.170:3000/api/products/${id}`
        );
        setProduct(await data.json());
        setLoading(false);
      } catch (error) {
        setMessage(error.message);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);
  return loading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : message ? (
    <div>
      <p>{message}</p>
    </div>
  ) : (
    <div>
      <h1>Product Details</h1>
      <div className="flex flex-col items-center">
        <img
          className="w-full h-[450px] object-contain"
          src={`${product?.image}`}
          alt={product?.name}
        />
        <h6 className="text-center my-3">{product?.name}</h6>
      </div>
      <p className="text-center my-3">{product?.description}</p>
      <p className="text-center my-3">Price: ${product?.price}</p>
      <p className="text-center my-3">Stock: {product?.stock}</p>
      <p className="text-center my-3">Category: {product?.category}</p>
    </div>
  );
};

export default ProductDetails;
