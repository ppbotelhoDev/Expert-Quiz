import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Simulado = () => {
  const navigate = useNavigate();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/Login");
    }
  }, [userAtual, navigate]);
  return (
    <div className="div-pai">
      <Header />
      <main className="main-content container mg-sup"></main>
      <Footer />
    </div>
  );
};

export default Simulado;
