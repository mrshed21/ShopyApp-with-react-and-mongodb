import { useNavigate , NavLink} from "react-router-dom";
import { useAuth } from "../auth/context";

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <p className="font-bold text-2xl cursor-pointer" onClick={() => navigate("/")}>Shopy</p>
      <ul className="flex justify-between items-center space-x-4 nav-links">
        <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
        <NavLink to="/products" className="hover:text-gray-300">Products</NavLink>  
        <NavLink to="/contact" className="hover:text-gray-300">Contact</NavLink>
        <NavLink to="/about" className="hover:text-gray-300">About</NavLink>
      </ul>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-4">
          {!isAuthenticated && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-black px-4 py-2 rounded-md"
              >
                login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-black px-4 py-2 rounded-md"
              >
                signup
              </button>
            </>
          )}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-white text-black px-4 py-2 rounded-md"
            >
              Dashboard
            </button>
          )}
          {isAuthenticated && (
            <>
              <span>Welcome, {user?.username || "User"}</span>
              <button
                onClick={logout}
                className="bg-white text-black px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
