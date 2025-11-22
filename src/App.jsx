import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AiomeList from "./pages/AiomeList.jsx";
import AiomeForm from "./pages/AiomeForm.jsx";
import AiomeEdit from "./pages/AiomeEdit.jsx";

function NavBar() {
  const location = useLocation();
  
  return (
    <nav style={{ 
      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",
      backdropFilter: "blur(10px)",
      padding: "15px 0",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "0 30px" 
      }}>
        <Link to="/" style={{ 
          color: "white", 
          textDecoration: "none", 
          fontSize: "28px", 
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "transform 0.3s ease"
        }}>
          <span style={{ fontSize: "32px" }}>🤖</span>
          <span style={{ 
            background: "linear-gradient(45deg, #fff, #e0e7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>AIOME</span>
        </Link>
        
        <div style={{ display: "flex", gap: "15px" }}>
          <Link 
            to="/" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "10px 20px",
              borderRadius: "25px",
              background: location.pathname === "/" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              fontWeight: "500",
              border: location.pathname === "/" 
                ? "2px solid rgba(255, 255, 255, 0.5)" 
                : "2px solid transparent"
            }}
          >
            📚 Historial
          </Link>
          <Link 
            to="/new" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "10px 20px",
              borderRadius: "25px",
              background: location.pathname === "/new" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              fontWeight: "500",
              border: location.pathname === "/new" 
                ? "2px solid rgba(255, 255, 255, 0.5)" 
                : "2px solid transparent"
            }}
          >
            ✨ Nuevo Chat
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = (newItem) => {
    console.log("Nueva pregunta creada:", newItem);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Círculos decorativos de fondo */}
        <div style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: "-250px",
          right: "-250px",
          zIndex: 0
        }} />
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          bottom: "-150px",
          left: "-150px",
          zIndex: 0
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <NavBar />
          
          <Routes>
            <Route path="/" element={<AiomeList refresh={refreshKey} />} />
            <Route path="/new" element={<AiomeForm onCreated={handleCreated} />} />
            <Route path="/edit/:id" element={<AiomeEdit />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}