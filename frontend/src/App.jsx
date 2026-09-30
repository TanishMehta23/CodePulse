import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compiler from "./pages/Compiler";
import History from "./pages/History";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/compiler" element={<Compiler />} />
      <Route path="/history" element={<History />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;