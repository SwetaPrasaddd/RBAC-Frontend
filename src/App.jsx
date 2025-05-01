import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Make sure this import is correct
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import { store } from './redux/store';
import { ToastContainer, toast } from 'react-toastify';
import Profile from "./components/Profile";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import MyBlogs from "./components/MyBlogs";
import AdminDashboard from "./components/AdminDashboard";
import VerifyEmail from "./components/VerifyEmail";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import BlogDetails from "./components/BlogDetails";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={1000} // Time to auto-close the toast
          hideProgressBar={true} // Optional: hide the progress bar
          newestOnTop={false} // Optional: control the order
          closeOnClick
          pauseOnHover
        />
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/my-blogs" element={<MyBlogs />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/blog/:id" element={<BlogDetails />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
