import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Contact from "./Components/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home server="https://fiverr-1-mzaynch.herokuapp.com/" />}
          />
          <Route
            path="/contact"
            element={
              <Contact server="https://fiverr-1-mzaynch.herokuapp.com/" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
