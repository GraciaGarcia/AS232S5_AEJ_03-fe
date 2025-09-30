import { useState } from "react";
import api from "../services/api";

function AiForm({ aitype }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await api.post(
        `?question=${encodeURIComponent(question)}&aitype=${aitype}`
      );
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setResponse("❌ Error al consultar la IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Consulta a {aitype}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-2"
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe tu consulta..."
          required
        ></textarea>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Consultando..." : "Enviar"}
        </button>
      </form>

      {response && (
        <div className="alert alert-info mt-3">
          <strong>Respuesta:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default AiForm;
