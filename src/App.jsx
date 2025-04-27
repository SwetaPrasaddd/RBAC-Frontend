import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
