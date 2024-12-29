// CSS
import { Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav id="navbar">
        <h2>
          <Link to="/">CineZoom</Link>
        </h2>
        <Link to="/movie/1">Movie</Link>
        <Link to="/search">Search</Link>
      </nav>
    </div>
  );
}

export default App;
