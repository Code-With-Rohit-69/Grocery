import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";

import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Footer = lazy(() => import("./components/Footer"));
const Login = lazy(() => import("./components/Login"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const AddAddress = lazy(() => import("./pages/AddAddress"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const SellerLogin = lazy(() => import("./components/seller/SellerLogin"));
const SellerLayout = lazy(() => import("./pages/seller/SellerLayout"));
const AddProduct = lazy(() => import("./pages/seller/AddProduct"));
const ProductList = lazy(() => import("./pages/seller/ProductList"));
const Orders = lazy(() => import("./pages/seller/Orders"));
const NewsLetter = lazy(() => import("./components/NewsLetter"));

import { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
// import Login from "./components/Login";
// import AllProducts from "./pages/AllProducts";
// import ProductCategory from "./pages/ProductCategory";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import AddAddress from "./pages/AddAddress";
// import MyOrders from "./pages/MyOrders";
// import SellerLogin from "./components/seller/SellerLogin";
// import SellerLayout from "./pages/seller/SellerLayout";
// import AddProduct from "./pages/seller/AddProduct";
// import ProductList from "./pages/seller/ProductList";
// import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";
// import NewsLetter from "./components/NewsLetter";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <>
      <div className="text-default min-h-screen text-gray-700 bg-white">
        {isSellerPath ? null : <Navbar />}

        {showUserLogin && (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        )}

        <Toaster />

        <div
          className={`${isSellerPath ? " " : "x-6 md-px-16 lg-px-24 xl:px-32"}`}
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:category" element={<ProductCategory />} />
              <Route
                path="/products/:category/:id"
                element={<ProductDetails />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-address" element={<AddAddress />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/loader" element={<Loading />} />
              <Route path="/contact" element={<NewsLetter />} />

              <Route
                path="/seller"
                element={isSeller ? <SellerLayout /> : <SellerLogin />}
              >
                <Route index element={isSeller ? <AddProduct /> : null} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
        {!isSellerPath && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default App;
