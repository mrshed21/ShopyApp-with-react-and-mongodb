import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Header from "./components/Header";
import AdminPage from "./components/admin/AdminPage";
import AddProduct from "./components/admin/AddProduct";
import AllProducts from "./components/admin/AllProducts";
import UpdateProduct from "./components/admin/UpdateProduct";
import UsersList from "./components/admin/UsersList";
import { useLocation } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import UpdateUser from "./components/admin/UpdateUser";



import AuthProvider from "./auth/AuthProvider";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  const location = useLocation();
  const hideHeader = /^\/admin(\/|$)/.test(location.pathname);
  return (
    <div className="container mx-auto">
      <AuthProvider>
        {!hideHeader && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          <Route path="admin" element={<AdminPage />}>
            <Route path="add-product" element={<AddProduct />} />
            <Route index element={<AllProducts />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
            <Route path="users" element={<UsersList />} />
            <Route path="update-user/:id" element={<UpdateUser />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
