import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AdsPage from "./pages/AllAdsPage";
import Contact from "./pages/Contact";
import PostOffer from "./pages/PostOffer";
import Register from "./pages/Register";
import { RequireAuth } from "react-auth-kit";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <div className="App">
      <NavBar />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-ads" element={<AdsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="post-ads" element={<RequireAuth loginPath="/login">
          <PostOffer />
          </RequireAuth>}></Route>
       </Routes>
          
        
      </Router>

      <Footer />
    </div>
  );
}

export default App;
