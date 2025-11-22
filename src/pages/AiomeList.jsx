import { useEffect, useState } from "react";
import { getAll, softDelete } from "../services/aiomeService";

function AiomeList({ refresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, COPILOT, GEMINI

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getAll();
      setItems(
        Array.isArray(response.data) ? response.data : response.data.data || []
      );
    } catch (err) {
      console.error("Error al cargar:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      try {
        await softDelete(id);
        loadData();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "20px auto", 
      padding: "30px 20px",
      animation: "fadeIn 0.5s ease-in-out"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "white"
      }}>
        <h2 style={{ 
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "10px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
        }}>
          📚 Historial de Conversaciones
        </h2>
        <p style={{ 
          fontSize: "16px", 
          opacity: 0.9,
          fontWeight: "300",
          marginBottom: "20px"
        }}>
          Todas tus conversaciones con IA guardadas
        </p>
        
        {/* Filtros */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px"
        }}>
          <button
            onClick={() => setFilter("ALL")}
            style={{
              padding: "10px 24px",
              borderRadius: "25px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: filter === "ALL" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = filter === "ALL" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🌐 Todas ({items.length})
          </button>
          <button
            onClick={() => setFilter("COPILOT")}
            style={{
              padding: "10px 24px",
              borderRadius: "25px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: filter === "COPILOT" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = filter === "COPILOT" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🤖 Copilot ({items.filter(i => i.aitype === "COPILOT").length})
          </button>
          <button
            onClick={() => setFilter("GEMINI")}
            style={{
              padding: "10px 24px",
              borderRadius: "25px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: filter === "GEMINI" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = filter === "GEMINI" 
                ? "rgba(255, 255, 255, 0.25)" 
                : "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            💎 Gemini ({items.filter(i => i.aitype === "GEMINI").length})
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: "center", 
          padding: "80px",
          color: "white",
          fontSize: "18px"
        }}>
          <div style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            border: "5px solid rgba(255, 255, 255, 0.3)",
            borderTop: "5px solid white",
            borderRadius: "50%",
            animation: "pulse 1s linear infinite"
          }} />
          <p style={{ marginTop: "20px" }}>Cargando conversaciones...</p>
        </div>
      ) : items.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "80px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "2px dashed rgba(255, 255, 255, 0.3)"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🤖</div>
          <p style={{ 
            color: "white", 
            fontSize: "18px",
            fontWeight: "300"
          }}>
            Aún no hay conversaciones guardadas<br/>
            <span style={{ fontSize: "14px", opacity: 0.8 }}>Comienza una nueva conversación para verla aquí</span>
          </p>
        </div>
      ) : items.filter(item => filter === "ALL" || item.aitype === filter).length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "80px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "2px dashed rgba(255, 255, 255, 0.3)"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>
            {filter === "COPILOT" ? "🤖" : filter === "GEMINI" ? "💎" : "🤖"}
          </div>
          <p style={{ 
            color: "white", 
            fontSize: "18px",
            fontWeight: "300"
          }}>
            No hay conversaciones con {filter === "COPILOT" ? "Copilot" : filter === "GEMINI" ? "Gemini" : "esta IA"}<br/>
            <span style={{ fontSize: "14px", opacity: 0.8 }}>Prueba con otro filtro o crea una nueva conversación</span>
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {items
            .filter(item => filter === "ALL" || item.aitype === filter)
            .map((aiome, index) => (
            <div
              key={aiome.id}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s backwards`,
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                  paddingBottom: "15px",
                  borderBottom: "2px solid #f0f0f0"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px" 
                }}>
                  <div style={{
                    background: aiome.aitype === "COPILOT" 
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                      : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    {aiome.aitype === "COPILOT" ? "🤖 Copilot" : "💎 Gemini"}
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {aiome.date ? new Date(aiome.date).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ""}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(aiome.id)}
                  style={{
                    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(238, 90, 111, 0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(238, 90, 111, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(238, 90, 111, 0.3)";
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>

              <div style={{ marginBottom: "15px" }}>
                {/* Mensaje del usuario */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
                  <div style={{ maxWidth: "75%", textAlign: "right" }}>
                    <div style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      padding: "15px 18px",
                      borderRadius: "20px 20px 5px 20px",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      textAlign: "left",
                      wordWrap: "break-word"
                    }}>
                      {aiome.question}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>
                      👤 Tú
                    </div>
                  </div>
                </div>
              </div>

              {/* Respuesta de la IA */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ maxWidth: "75%", textAlign: "left" }}>
                  <div style={{
                    background: aiome.aitype === "COPILOT" 
                      ? "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)" 
                      : "linear-gradient(135deg, #fff9f0 0%, #fff4e8 100%)",
                    border: aiome.aitype === "COPILOT" 
                      ? "2px solid #e8ecff" 
                      : "2px solid #ffe8d6",
                    padding: "15px 18px",
                    borderRadius: "20px 20px 20px 5px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                    whiteSpace: "pre-wrap",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "#333",
                    wordWrap: "break-word"
                  }}>
                    {aiome.response}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>
                    {aiome.aitype === "COPILOT" ? "🤖 Copilot" : "💎 Gemini"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AiomeList;
