import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AdsPage from "./pages/AllAdsPage";
import Contact from "./pages/Contact";
import PostOffer from "./pages/PostOffer";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import AdDetail from "./pages/AdDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyAndPolicy";
import AdsByStatusPage from "./pages/AdsByStatusPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ minHeight: "70vh" }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/all-ads" element={<AdsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ad/:id" element={<AdDetail />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-and-policy" element={<PrivacyPolicy />} />
            <Route path="/:id/:status" element={<AdsByStatusPage />}/>
            <Route
              path="post-ads"
              element={
                <RequireAuth loginPath="/login">
                  <PostOffer />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
