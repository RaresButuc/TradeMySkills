import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import AdsPage from "./pages/AllAdsPage";
import Contact from "./pages/Contact";
import PostOffer from "./pages/PostOffer";
import Register from "./pages/Register";
import AdDetail from "./pages/AdDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyAndPolicy";
import MyProfile from "./pages/MyProfilePage";
import OtherUserProfile from "./pages/OtherUserProfile";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePasswordPageAuth from "./pages/ChangePasswordPageAuth";
import ChangePasswordPageNoAuth from "./pages/ChangePasswordPageNoAuth";
import ActiveAds from "./pages/Ads By Status/ActiveAds";
import PendingAds from "./pages/Ads By Status/PendingAds";
import FinalisedAds from "./pages/Ads By Status/FinalisedAds";
import RejectedWorkersPage from "./pages/RejectedWorkersPage";
import RatingPage from "./pages/RatingPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ minHeight: "81vh" }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/change-forget-password/:email"
              element={<ChangePasswordPageNoAuth />}
            />
            <Route path="/all-ads" element={<AdsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<OtherUserProfile />} />

            <Route path="/ad/:id" element={<AdDetail />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-and-policy" element={<PrivacyPolicy />} />
            <Route path="/:id/active" element={<ActiveAds />} />
            <Route path="/:id/pending" element={<PendingAds />} />
            <Route path="/:id/finalised" element={<FinalisedAds />} />
            <Route
              path="/ad/:id/rejectedworkers"
              element={<RejectedWorkersPage />}
            />
            <Route
              path="/changepassoword"
              element={<ChangePasswordPageAuth />}
            />
            <Route
              path="/rating/:from/:to"
              element={
                <RequireAuth loginPath="/login">
                  <RatingPage />
                </RequireAuth>
              }
            ></Route>
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
