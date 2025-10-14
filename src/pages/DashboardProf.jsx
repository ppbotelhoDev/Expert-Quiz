import { useLocation } from "react-router-dom";

const DashboardProf = () => {
  //Recebe os dados vindo o PageLogin
  const location = useLocation();
  const profLogado = location.state.user;

  return (
    <div>
      <header className="header-Prof">
        <div className="containerHeader">
          <div className="divLogo">
            <img className="logo" src="logo.png" alt="" />
          </div>
          <div className="navbar">
            <div className="linksNav">
              <a className="linkNav" href="">Home</a>
              <a className="linkNav" href="">Dashboard</a>
              <a className="linkNav" href="">Notas</a>
              <a className="linkNav" href="">Cadastrar</a>
            </div>
            <div className="itensUser">
              <div className="newQuiz">
                <a href=""><button className="btnQuiz">Criar novo quiz +</button></a>
              </div>
              <div className="perfilUser">
                <p className="paragrafoUser">Olá professor,<br/>{profLogado.nome}</p>
              </div>
              <div className="userExit">
                <a href=""><img className="imgLogout" src="logout.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <main>
        <div>
          <h1></h1>
        </div>
        <div className="methrics-Painel">
          <div className="methrics">
            {" "}
            <h1>Métrica 1</h1>{" "}
          </div>
          <div className="methrics">
            {" "}
            <h1>Métrica 2</h1>{" "}
          </div>
          <div className="methrics">
            {" "}
            <h1>Métrica 3</h1>{" "}
          </div>
        </div>
        <div className="quiz-painel">{/* <CardQuiz/> }</div>
      </main>
      <footer>
        <div>Atalhos</div>
        <div>
          <div>Data</div>
          <div>
            Powered by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https//:www.linkedin/in/pedropbotelho "
            >
              ppbotelho_
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default DashboardProf;
