import { useState, useRef, useEffect } from "react";
import { createAiome } from "../services/aiomeService";

function AiomeForm({ onCreated }) {
  const [question, setQuestion] = useState("");
  const [aitype, setAitype] = useState("COPILOT");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null);

  // Auto scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Agregar pregunta del usuario a la conversación
    const userMessage = {
      type: "user",
      text: question,
      time: new Date().toLocaleTimeString()
    };
    setConversation(prev => [...prev, userMessage]);
    
    setLoading(true);
    try {
      const res = await createAiome({ question, aitype });
      
      // Agregar respuesta de la IA a la conversación
      const aiMessage = {
        type: "ai",
        text: res.data.response,
        aitype: aitype,
        time: new Date().toLocaleTimeString()
      };
      setConversation(prev => [...prev, aiMessage]);
      
      onCreated(res.data);
      setQuestion("");
    } catch (err) {
      console.error("Error al crear:", err);
      const errorMessage = {
        type: "error",
        text: "Error al obtener respuesta",
        time: new Date().toLocaleTimeString()
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: "900px", 
      margin: "20px auto", 
      padding: "30px 20px",
      animation: "fadeIn 0.5s ease-in-out"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "10px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
          }}>
            ✨ Chat con IA
          </h2>
          <p style={{ 
            fontSize: "16px", 
            opacity: 0.9,
            fontWeight: "300"
          }}>
            Haz tus preguntas y obtén respuestas inteligentes
          </p>
        </div>
        {conversation.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("¿Limpiar toda la conversación?")) {
                setConversation([]);
              }
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: "rgba(255, 255, 255, 0.1)",
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
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🗑️ Limpiar Chat
          </button>
        )}
      </div>
      
      {/* Área de conversación */}
      <div 
        ref={chatContainerRef}
        style={{ 
          height: "500px", 
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px", 
          padding: "25px", 
          marginBottom: "20px",
          overflowY: "auto",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        {conversation.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            color: "#999", 
            marginTop: "180px"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>💬</div>
            <p style={{ fontSize: "18px", fontWeight: "300" }}>
              Escribe una pregunta para comenzar la conversación
            </p>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: "20px",
                animation: "fadeIn 0.3s ease-in-out"
              }}
            >
              {msg.type === "user" && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ 
                    display: "inline-block", 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white", 
                    padding: "12px 18px", 
                    borderRadius: "20px 20px 5px 20px", 
                    maxWidth: "75%",
                    textAlign: "left",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    fontSize: "15px",
                    lineHeight: "1.5"
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#666", 
                    marginTop: "6px",
                    fontWeight: "500"
                  }}>
                    👤 Tú - {msg.time}
                  </div>
                </div>
              )}
              
              {msg.type === "ai" && (
                <div style={{ textAlign: "left" }}>
                  <div style={{ 
                    display: "inline-block", 
                    background: msg.aitype === "COPILOT" 
                      ? "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)" 
                      : "linear-gradient(135deg, #fff9f0 0%, #fff4e8 100%)",
                    border: msg.aitype === "COPILOT" 
                      ? "2px solid #e8ecff" 
                      : "2px solid #ffe8d6",
                    padding: "12px 18px", 
                    borderRadius: "20px 20px 20px 5px", 
                    maxWidth: "75%",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                    fontSize: "15px",
                    lineHeight: "1.5",
                    color: "#333"
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#666", 
                    marginTop: "6px",
                    fontWeight: "500"
                  }}>
                    {msg.aitype === "COPILOT" ? "🤖 Copilot" : "💎 Gemini"} - {msg.time}
                  </div>
                </div>
              )}
              
              {msg.type === "error" && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    display: "inline-block", 
                    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
                    color: "white", 
                    padding: "12px 18px", 
                    borderRadius: "20px",
                    boxShadow: "0 4px 15px rgba(238, 90, 111, 0.3)",
                    fontSize: "14px"
                  }}>
                    ⚠️ {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {loading && (
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <div style={{ 
              display: "inline-block", 
              background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
              padding: "12px 18px", 
              borderRadius: "20px 20px 20px 5px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
            }}>
              <span style={{ fontSize: "20px" }}>
                {aitype === "COPILOT" ? "🤖" : "💎"}
              </span>
              <span style={{ marginLeft: "10px", display: "inline-flex", gap: "4px", alignItems: "center" }}>
                Escribiendo
                <span style={{ animation: "typing 1.4s ease-in-out infinite", animationDelay: "0s" }}>•</span>
                <span style={{ animation: "typing 1.4s ease-in-out infinite", animationDelay: "0.2s" }}>•</span>
                <span style={{ animation: "typing 1.4s ease-in-out infinite", animationDelay: "0.4s" }}>•</span>
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Formulario de entrada */}
      <form onSubmit={handleSubmit} style={{ 
        display: "flex", 
        gap: "15px", 
        alignItems: "end",
        background: "rgba(255, 255, 255, 0.95)",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <div style={{ flex: 1 }}>
          <select 
            value={aitype} 
            onChange={(e) => setAitype(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "12px", 
              border: "2px solid #e8ecff", 
              borderRadius: "12px",
              marginBottom: "12px",
              fontSize: "15px",
              fontWeight: "500",
              background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            <option value="COPILOT">🤖 Copilot</option>
            <option value="GEMINI">💎 Gemini</option>
          </select>
          
          <textarea
            placeholder="Escribe tu pregunta..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey && !loading && question.trim()) {
                handleSubmit(e);
              }
            }}
            rows={3}
            maxLength={1000}
            style={{ 
              width: "100%", 
              padding: "12px", 
              border: "2px solid #e8ecff", 
              borderRadius: "12px",
              resize: "vertical",
              boxSizing: "border-box",
              fontSize: "15px",
              fontFamily: "inherit",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e8ecff";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <div style={{ 
            fontSize: "12px", 
            color: "#999", 
            marginTop: "6px",
            textAlign: "right"
          }}>
            {question.length}/1000 caracteres | Ctrl+Enter para enviar
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={loading || !question.trim()}
          style={{ 
            padding: "14px 28px", 
            background: loading || !question.trim()
              ? "linear-gradient(135deg, #ccc 0%, #aaa 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white", 
            border: "none", 
            borderRadius: "12px",
            cursor: loading || !question.trim() ? "not-allowed" : "pointer",
            height: "fit-content",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: loading || !question.trim()
              ? "none"
              : "0 4px 15px rgba(102, 126, 234, 0.4)",
            transition: "all 0.3s ease",
            minWidth: "100px"
          }}
          onMouseEnter={(e) => {
            if (!loading && question.trim()) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = loading || !question.trim()
              ? "none"
              : "0 4px 15px rgba(102, 126, 234, 0.4)";
          }}
        >
          {loading ? "🔄 Enviando..." : "🚀 Enviar"}
        </button>
      </form>
    </div>
  );
}

export default AiomeForm;
