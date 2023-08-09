import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home'
import './App.css';
import Movie from "./components/Movie/Movie";
import Navbar from './components/Navbar/Navbar';
import Explore from "./components/Explore/Explore";
function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
      </Router>
    </div>
  );
}
  
export default App;
