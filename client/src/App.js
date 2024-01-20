import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Instructions from "./pages/Instructions";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";
import BlogScreen from "./pages/BlogScreen";
import ScrollToTop from "./components/ScrollToTop";
import EditBlog from "./pages/EditBlog";
import Signup from "./pages/Signup";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="bg-[#fafaf7] w-full">
      <BrowserRouter>
        <ScrollToTop />
        <div className="px-4">
          <Navbar />
          <div className="">
            <Routes>
              <Route
                path="/"
                element={!user ? <Home /> : <Navigate to="/blogs" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/blogs" />}
              />
              <Route
                path="/blogs"
                element={user ? <Blogs /> : <Navigate to="/" />}
              />
              <Route
                path="/instructions"
                element={user ? <Instructions /> : <Navigate to="/" />}
              />
              <Route
                path="/blogs/create"
                element={user ? <CreateBlog /> : <Navigate to="/" />}
              />
              <Route
                path="/blogs/:title"
                element={user ? <BlogScreen /> : <Navigate to="/" />}
              />
              <Route
                path="/blogs/:title/edit"
                element={user ? <EditBlog /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
