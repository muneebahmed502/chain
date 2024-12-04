import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../Screens/Dashboard";
import  Product from "../Screens/Product";
import AboutUs from "../Screens/AboutUs";
import ContactUs from "../Screens/ContactUs";
import ProductDetail from "../Screens/ProductDetail";
import LoginAndSignUpPage from "../Screens/LoginAndSignUpPage";
import AdminDashboard from "../Screens/AdminDashboard";
import AddPerfume from "../Screens/AddPerfume";
import AddToCart from "../Screens/AddToCart";
import ViewAddToCart from "../Screens/ViewAddToCart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/Product",
        element: <Product />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/ProductDetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/LoginAndSignUpPage",
        element: <LoginAndSignUpPage />,
      },
      {
        path: "/AdminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/AddPerfume",
        element: <AddPerfume />,
      },
      {
        path: "/AddToCart",
        element: <AddToCart />,
      },
      {
        path: "/ViewAddToCart",
        element: <ViewAddToCart />,
      },
])

function Router() {
    return <RouterProvider router={router} />;
  }
  
  export default Router;