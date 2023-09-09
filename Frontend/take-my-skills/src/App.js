import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  // return (
  //   <>
  //   <NavBar/>
  //   <div className="App">
  //   <Routes>
  //         <Route path="/" element={<MainPage />} />
  //         {/* <Route path="/watchlist" element={<Watchlist />} />
  //         <Route path="/history" element={<History />} /> */}
  //       </Routes>
  //     </div>
  //   </>
  // );
  return (
    <div className="App">
      <NavBar />

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
