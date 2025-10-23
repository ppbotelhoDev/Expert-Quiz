import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookPlus } from 'lucide-react';
import Header from "../components/Header";
import ComponenteNotas from "../components/ComponentesNotas";
import Footer from "../components/Footer";

const Notas = () => {
  const navigate = useNavigate();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  //Funções

  //Verifica se o usuário está logado antes de renderizar a página
  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/");
    }
  }, [userAtual, navigate]);

  if (!userAtual) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <div className="div-pai">
      <Header userAtual={userAtual} logout={handleLogout} />
      <div className="main-content container mg-sup">
        <h1 className="title-sections">Notas do Aluno</h1>
        <div className="section-notas">
          <div className="aba-title">
            <div className="photo-user-notas">
              <BookPlus/>
            </div>
            <div className="name-user">
              <h3>Nome</h3>
            </div>
            <div className="id-user">
              <h3>Id</h3>
            </div>
            <div className="nota-user">
              <h3>Nota Média</h3>
            </div>
            <div className="status-user">
              <h3>Status</h3>
            </div>
          </div>
          <ComponenteNotas />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notas;
