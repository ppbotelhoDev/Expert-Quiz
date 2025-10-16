import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { LogOut } from "lucide-react";
import CardsQuiz from "../components/CardsQuiz";
import CardMethrics from "../components/CardMethrics";
import EmptyPage from "../components/EmptyPage";
import Footer from "../components/Footer";

const DashboardProf = () => {
  //Recebe os dados vindo o PageLogin
  const location = useLocation();
  const profLogado = location.state.user;
  const navigate = useNavigate();

  const [dbQuiz, setDbQuiz] = useState(JSON.parse(localStorage.getItem("DbCardQuiz")) || []); 
    
  //======================================================================//

  //Função média notas
  function mediaNota(db) {
    let notas = 0;
    db.forEach((e) => {
      notas += e.notaMedia;
    });
    const notaMedia = notas / db.length;
    return notaMedia ? notaMedia.toFixed(1) : 0
  }

  //Função Delete Card
  function deleteCard(cardId) {
    const newDb = dbQuiz.filter((item) => item.id !== cardId);
    setDbQuiz(newDb)
    localStorage.setItem('DbCardQuiz', JSON.stringify(newDb))
  }

  //======================================================================//
  return (
    <div className="div-pai">
      <header className="header-Prof">
        <div className="containerHeader container">
          <div className="divLogo">
            <Link to={"/DashboardProfessor"}>
              <img className="logo" src={"logo.png"} alt="" />
            </Link>
          </div>
          <div className="navbar">
            <div className="linksNav">
              <Link
                to={profLogado ? "/DashboardProfessor" : "/DashboardAluno"}
                className="linkNav"
              >
                Dashboard
              </Link>
              <Link to={"/"} className="linkNav" onClick={() => navigate("./")}>
                Notas
              </Link>
              <Link to={"/"} className="linkNav" onClick={() => navigate("./")}>
                Cadastrar
              </Link>
              <Link to={"/"} className="linkNav" onClick={() => navigate("/")}>
                Perfil
              </Link>
            </div>
            <div className="itensUser">
              <div
                className="newQuiz"
                onClick={() =>
                  navigate("/CreateQuiz", { state: { user: profLogado } })
                }
              >
                <button className="btnQuiz">Criar Novo Simulado +</button>
              </div>
              <div className="perfilUser">
                <p className="paragrafoUser">
                  Olá professor(a),
                  <br />
                  {profLogado.nome}
                </p>
              </div>
              <div className="userExit">
                <button className="iconExit" href="">
                  <LogOut />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="methrics-Painel">
            <CardMethrics
              title={"Total de Simulados"}
              dataValue={dbQuiz.length}
            />
            <CardMethrics
              title={"Média de acertos"}
              dataValue={`${mediaNota(dbQuiz)}/10`}
            />
            <CardMethrics title={"Simulados feitos"} dataValue={0} />
          </div>

          {dbQuiz.length === 0 ? (
            <EmptyPage />
          ) : (
            <div className="quiz-painel">
              <CardsQuiz dbQuiz={dbQuiz} userQuiz={profLogado} onDelete={deleteCard}/>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardProf;
