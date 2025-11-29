import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
  const [productList, setproductList] = useState([]);
 const [message, setMessage] = useState("");
 
  const addToCart = async (productId) => {
    return Promise.resolve(productId);
  };
 

  useEffect(() => {
    fetch("http://103.177.249.170:3000/api/products/")
      .then(res => res.json())
      .then(data => setproductList(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);


  // const handleAdd= async(productId)=>{
  //   await addToCart(productId)

  //   fetch("http://localhost:5000/products/getproducts")
  //   .then(res => res.json())
  //   .then(data => setproductList(data));

  // }



  const featuredproducts = productList?.filter(product => product.isFeatured === true);

  return (
    <div className='mt-10 flex-col items-center'>
      <h3 className='my-6'>Featured Products</h3>
       {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center">
          {message}
        </div>
      )}
      <div className='flex flex-wrap justify-center gap-6 mx-auto '>
{featuredproducts?.slice(0, 4).map((product) => (
        
          <div key={product._id} className='flex flex-col items-center  p-4 rounded-lg'>
            <Link to={`/productDetails/${product?._id}`}>
            <img className='w-full h-[450px] object-contain' src="https://media.istockphoto.com/id/667712200/sv/foto/professionellt-p%C3%A5-jobbet-top-view-ofman-arbetar-p%C3%A5-laptop-medan-du-sitter-p%C3%A5-hans-arbetsplats.jpg?s=2048x2048&w=is&k=20&c=ZEo0Pr-DKLYczJfBqn5V5JO3hrYPEA8OGvMhyTIP2JE=
" />
           
            <h6 className='text-center my-3'>{product.name}</h6>
            </Link>
            <span className='text-gray-400'>{product?.description}</span>
            <strong className='text-[#F86D72]'>{product?.price} $</strong>
            
            <div className='text-sm text-gray-500'>Stock: {product.stock}
              
            </div>
            <button 
            onClick={() => {addToCart(product._id);
               setproductList(prev => prev.map(b =>b._id=== product._id ?{ ...b, stock: b.stock - 1 } : b))
                setMessage("Added To Cart Successfully")
              
              }}

            
              disabled={product.stock === 0}
              className=" mt-5 whitespace-nowrap w-44 disabled:bg-gray-400"
            >
              {product.stock === 0 ? "Out of stock" : "Add to Cart"}
            </button>
          </div>
        
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
