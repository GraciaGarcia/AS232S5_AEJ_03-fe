import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AiForm from "./pages/AiForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gemini" element={<AiForm aitype="GEMINI" />} />
        <Route path="/copilot" element={<AiForm aitype="COPILOT" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
