import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import CardsQuiz from "../components/CardsQuiz";
import BannerAluno from "../components/BannerAluno";
import EmptyPage from "../components/EmptyPage";
import Footer from "../components/Footer";

const InitialDashboard = () => {
  const navigate = useNavigate();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  const [dbQuiz, setDbQuiz] = useState(
    () => JSON.parse(localStorage.getItem("DbCardQuiz")) || []
  );

  let quizzesParaExibir;

  if (userAtual?.isTeacher === "director" || userAtual.isTeacher === false) {
    quizzesParaExibir = dbQuiz;
  } else if (userAtual?.isTeacher === true) {
    quizzesParaExibir = dbQuiz.filter((quiz) =>
      userAtual.materias.includes(quiz.materia)
    );
  } else {
    quizzesParaExibir = [];
  }

  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/Login");
    }
  }, [userAtual, navigate]);


  if (!userAtual) {
    return null;
  }

  function mediaNota(db) {
    if (db.length === 0) return 0;
    let notas = 0;
    db.forEach((e) => {
      if (e.notaMedia) {
        notas += e.notaMedia;
      }
    });
    const notaMedia = notas / db.length;
    return notaMedia.toFixed(1);
  }

  function deleteCard(cardId) {
    const newDb = dbQuiz.filter((item) => item.id !== cardId);
    setDbQuiz(newDb);
    localStorage.setItem("DbCardQuiz", JSON.stringify(newDb));
  }

  return (
    <div className="div-pai">
      <Header/>

      <main className="main-content">
        <div className="container mg-sup">
          
          {/* Renderização condicional dos painéis de métrica */}
          {userAtual.isTeacher ? 
            <div>
              <h1 className="title-sections">Dashboard</h1>
              <Dashboard dbQuiz={dbQuiz} />
            </div>
             : (
            <div className="aluno-Painel">
              <BannerAluno
                title={"Média de acertos"}
                dataValue={`${mediaNota(dbQuiz)}/10`}
              />
            </div>
          )}

          {/* Renderização da lista de quizzes */}
          {quizzesParaExibir.length === 0 ? (
            <EmptyPage />
          ) : (
            <div className="simulados">
              <h1 className="title-sections">Simulados</h1>
              <div className="quiz-painel">
                {/* AQUI ESTÁ A CORREÇÃO PRINCIPAL: Passamos a lista JÁ FILTRADA */}
                <CardsQuiz
                  dbQuiz={quizzesParaExibir}
                  userQuiz={userAtual}
                  onDelete={deleteCard}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InitialDashboard;
