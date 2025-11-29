import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center text-red-500">404 Not Found</h1>
      <p className="text-center text-gray-500">The page you are looking for does not exist.</p>
      <p className="text-center text-gray-500">Please check the URL or go back to the <Link to="/" className="text-blue-500">homepage</Link>.</p>
    </div>
  )
}

export default NotFoundPage
