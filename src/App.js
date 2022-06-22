import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import ArticlePage from "./Components/ArticlePage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Admin from "./Components/Admin";

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
            path="/blog/:id"
            element={<ArticlePage server={serverLocation} />}
          />
          <Route path="/manager" element={<Admin server={serverLocation} />} />
          <Route
            path="/contact"
            element={<Contact server={serverLocation} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
