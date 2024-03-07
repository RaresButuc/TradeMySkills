import "./App.css";
import { RequireAuth } from "react-auth-kit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AdDetail from "./pages/AdDetails";
import AdsPage from "./pages/AllAdsPage";
import ErrorPage from "./pages/ErrorPage";
import RatingPage from "./pages/RatingPage";
import ForgetPassword from "./pages/ForgetPassword";
import PrivacyPolicy from "./pages/PrivacyAndPolicy";
import AddNewAdPage from "./pages/AddNewAdPage";
import UserProfilePage from "./pages/UserProfilePage";
import ActiveAds from "./pages/Ads By Status/ActiveAds";
import PendingAds from "./pages/Ads By Status/PendingAds";
import TermsAndConditions from "./pages/TermsAndConditions";
import FinalisedAds from "./pages/Ads By Status/FinalisedAds";
import RejectedWorkersPage from "./pages/RejectedWorkersPage";
import ChangePasswordPageAuth from "./pages/ChangePasswordPageAuth";
import ChangePasswordPageNoAuth from "./pages/ChangePasswordPageNoAuth";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ minHeight: "81vh" }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="*"
              element={<ErrorPage mainMessage={"PAGE NOT FOUND!"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/change-forget-password/:uuid"
              element={<ChangePasswordPageNoAuth />}
            />
            <Route path="/all-ads" element={<AdsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<UserProfilePage />} />

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
              path="/changepassword"
              element={
                <RequireAuth loginPath="/login">
                  <ChangePasswordPageAuth />
                </RequireAuth>
              }
            />
            <Route
              path="/rating/:to"
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
                  <AddNewAdPage />
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
