import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import PainelNotaAlunos from "./PainelNotasAlunos";
import PainelNotaGestores from "./PainelNotasGestores";

const ComponentesNotas = () => {
  const navigate = useNavigate();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  // Adicione a proteção || [] para o caso do localStorage estar vazio
  const dbUsers = JSON.parse(localStorage.getItem("UserQuiz")) || [];
  const userAlunos = dbUsers.filter((user) => user.isTeacher === false);

  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/"); 
    }
  }, [userAtual, navigate]);

  // Se o usuário não estiver logado, evite a renderização
  if (!userAtual) {
    return null;
  }
  return userAtual.isTeacher === false ? (
    <PainelNotaAlunos userAtual={userAtual} />
  ) : (
    <PainelNotaGestores dbAlunos={userAlunos} />
  );
};

export default ComponentesNotas;
