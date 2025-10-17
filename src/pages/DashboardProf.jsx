import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import CardsQuiz from "../components/CardsQuiz";
import CardMethrics from "../components/CardMethrics";
import BannerAluno from "../components/BannerAluno";
import EmptyPage from "../components/EmptyPage";
import Footer from "../components/Footer";

const DashboardProf = () => {
  const navigate = useNavigate();
  const profLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  const [dbQuiz, setDbQuiz] = useState(
    () => JSON.parse(localStorage.getItem("DbCardQuiz")) || []
  );

  let quizzesParaExibir;

  if (profLogado?.isTeacher === "director") {
    quizzesParaExibir = dbQuiz;
  } else if (profLogado?.isTeacher === true) {
    quizzesParaExibir = dbQuiz.filter((quiz) =>
      profLogado.materias.includes(quiz.materia)
    );
  } else {
    quizzesParaExibir = [];
  }

  useEffect(() => {
    if (!profLogado) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/");
    }
  }, [profLogado, navigate]);


  if (!profLogado) {
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

  function handleLogout() {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/");
  }

  return (
    <div className="div-pai">
      <header className="header-Prof">
        <div className="containerHeader container">
          <div className="divLogo">
            <Link to={"/DashboardProfessor"}>
              <img className="logo" src={"/logo.png"} alt="Logo Expert Vest" />
            </Link>
          </div>
          <div className="navbar">
            <div className="linksNav">
              <Link to={"/DashboardProfessor"} className="linkNav">
                Dashboard
              </Link>
              <Link to={"/notas"} className="linkNav">
                Notas
              </Link>
              <Link to={"/cadastrar-aluno"} className="linkNav">
                Cadastrar
              </Link>
              <Link to={"/perfil"} className="linkNav">
                Perfil
              </Link>
            </div>
            <div className="itensUser">
              {/* Mostra o botão "Criar Simulado" apenas para professor ou diretor */}
              {(profLogado.isTeacher === true ||
                profLogado.isTeacher === "director") && (
                <div className="newQuiz">
                  <button
                    className="btnQuiz"
                    onClick={() =>
                      navigate("/CreateQuiz", { state: { user: profLogado } })
                    }
                  >
                    Novo Simulado +
                  </button>
                </div>
              )}
              <div className="perfilUser">
                <p className="paragrafoUser">
                  Olá{" "}
                  {profLogado.isTeacher === "director"
                    ? "diretor"
                    : profLogado.isTeacher === true
                    ? "professor(a)"
                    : "aluno(a)"}
                  ,
                  <br />
                  {profLogado.nome}
                </p>
              </div>
              <div className="userExit">
                <button className="iconExit" onClick={handleLogout}>
                  <LogOut />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {/* Renderização condicional dos painéis de métrica */}
          {profLogado.isTeacher ? (
            <div className="methrics-Painel">
              <CardMethrics
                title={"Total de Simulados"}
                dataValue={quizzesParaExibir.length}
              />
              <CardMethrics
                title={"Média de acertos"}
                dataValue={`${mediaNota(dbQuiz)}/10`}
              />
              <CardMethrics title={"Simulados feitos"} dataValue={0} />
            </div>
          ) : (
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
              <h1 className="title-questions">Simulados</h1>
              <div className="quiz-painel">
                {/* AQUI ESTÁ A CORREÇÃO PRINCIPAL: Passamos a lista JÁ FILTRADA */}
                <CardsQuiz
                  dbQuiz={quizzesParaExibir}
                  userQuiz={profLogado}
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

export default DashboardProf;
