import UserList from "./pages/UserList";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NavBar from "./components/NavBar";
import ListGroup from "./components/ListGroup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content-container">
        <div className="list-group-container">
          <ListGroup />
        </div>
      </div>
    </div>
  );
}

export default App;
