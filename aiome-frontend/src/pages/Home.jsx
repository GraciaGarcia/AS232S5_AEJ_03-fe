import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2>Selecciona la IA</h2>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigate("/gemini")}
      >
        Gemini
      </button>
      <button
        className="btn btn-success m-2"
        onClick={() => navigate("/copilot")}
      >
        Copilot
      </button>
    </div>
  );
}

export default Home;
