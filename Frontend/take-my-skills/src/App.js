import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
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
    </div>
  );
}

export default App;
