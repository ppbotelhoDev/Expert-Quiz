import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const DashboardProf = () => {
  //Recebe os dados vindo o PageLogin
  const location = useLocation();
  const profLogado = location.state.user;

  return (
    <div>
      <header className="header-Prof">
        <div className="containerHeader container">
          <div className="divLogo">
            <a href="">
              <img className="logo" src="logo.png" alt="" />
            </a>
          </div>
          <div className="navbar">
            <div className="linksNav">
              <a className="linkNav" href="">
                Home
              </a>
              <a className="linkNav" href="">
                Dashboard
              </a>
              <a className="linkNav" href="">
                Notas
              </a>
              <a className="linkNav" href="">
                Cadastrar
              </a>
            </div>
            <div className="itensUser">
              <div className="newQuiz">
                <a href="">
                  <button className="btnQuiz">Criar novo quiz +</button>
                </a>
              </div>
              <div className="perfilUser">
                <p className="paragrafoUser">
                  Olá professor,
                  <br />
                  {profLogado.nome}
                </p>
              </div>
              <div className="userExit">
                <a className="iconExit" href="">
                  <LogOut />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="containerMain container">
          <div className="methrics-Painel">
            <div className="methrics">
              <div className="methrics-Title">
                <h3>Total de Quizes</h3>
              </div>
              <div className="methrics-Value">
                <h1>{0}</h1>
              </div>
            </div>
            <div className="methrics">
              <div className="methrics-Title">
                <h3>Média de acertos</h3>
              </div>
              <div className="methrics-Value">
                <h1>{0}/10</h1>
              </div>
            </div>
            <div className="methrics">
              <div className="methrics-Title">
                <h3>Quizes feitos</h3>
              </div>
              <div className="methrics-Value">
                <h1>{0}</h1>
              </div>
            </div>
          </div>
          <div className="quiz-painel">
            <div className="card-Quiz">
              <div className="img-Quiz">
                <img src="math.png" alt="" width={65} />
              </div>
              <div className="nome-Quiz">
                <h4>Simulado Matemática #{2345}</h4>
              </div>
              <div className="legenda-Quiz">
                <p>
                  Simulador Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </p>
              </div>
              <div className="btn-Acessar-Quiz">
                <a href="">Acessar</a>
              </div>
            </div>

            <div className="card-Quiz">
              <div className="img-Quiz">
                <img src="math.png" alt="" width={65} />
              </div>
              <div className="nome-Quiz">
                <h4>Simulado Matemática #{2345}</h4>
              </div>
              <div className="legenda-Quiz">
                <p>
                  Simulador Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </p>
              </div>
              <div className="btn-Acessar-Quiz">
                <a href="">Acessar</a>
              </div>
            </div>

            <div className="card-Quiz">
              <div className="img-Quiz">
                <img src="math.png" alt="" width={65} />
              </div>
              <div className="nome-Quiz">
                <h4>Simulado Matemática #{2345}</h4>
              </div>
              <div className="legenda-Quiz">
                <p>
                  Simulador Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </p>
              </div>
              <div className="btn-Acessar-Quiz">
                <a href="">Acessar</a>
              </div>
            </div>

            <div className="card-Quiz">
              <div className="img-Quiz">
                <img src="math.png" alt="" width={65} />
              </div>
              <div className="nome-Quiz">
                <h4>Simulado Matemática #{2345}</h4>
              </div>
              <div className="legenda-Quiz">
                <p>
                  Simulador Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </p>
              </div>
              <div className="btn-Acessar-Quiz">
                <a href="">Acessar</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="container container-footer">
          <div className="footer-top">
            <a href="">Suporte</a>
            <a href="">Política de Privacidade</a>
            <a href="">Política de reembolso</a>
            <a href="">Termos de serviço</a>
            <a href="">Dashboard</a>
            <a href="">Criar simulado</a>
            <a href="">Cadastrar aluno</a>
            <a href="">Notas</a>
          </div>
          <div className="footer-bottom">
            <p>&#169;2025 Expert Vest</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardProf;
