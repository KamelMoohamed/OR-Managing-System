import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainNavigation from "./shared/Navigation/MainNavigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import AboutUS from "./pages/AboutUS";
import Staff from "./pages/Staff";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/login" element={<Login />} exact></Route>
          <Route path="/about" element={<About />} exact></Route>
          <Route path="/about-us" element={<AboutUS />} exact></Route>
          <Route path="/staff" element={<Staff />} exact></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
