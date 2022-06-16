import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import Navbar from "./Components/Navbar";

function App() {
  const serverLocation = "https://fiverr-1-mzaynch.herokuapp.com";
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home server={serverLocation} />} />
          <Route path="/blog" element={<Blog server={serverLocation} />} />
          <Route
            path="/contact"
            element={<Contact server={serverLocation} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
