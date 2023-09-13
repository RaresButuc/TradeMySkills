import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AllOffer from "./pages/AllOffer";
import JoinUs from "./pages/JoinUs";
import Contact from "./pages/Contact";
import PostOffer from "./pages/PostOffer";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <div className="App">
      <NavBar />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-offer" element={<AllOffer />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post-offer" element={<PostOffer />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
