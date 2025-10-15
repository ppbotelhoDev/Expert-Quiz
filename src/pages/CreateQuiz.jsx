import { useLocation, useNavigate, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Footer from "../components/Footer";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userLogado = location.state.user;

  return (
    <>
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
                  to={userLogado ? "/DashboardProfessor" : "/DashboardAluno"}
                  className="linkNav"
                >
                  Home
                </Link>
                <Link
                  to={"/"}
                  className="linkNav"
                  onClick={() => navigate("./")}
                >
                  Dashboard
                </Link>
                <Link
                  to={"/"}
                  className="linkNav"
                  onClick={() => navigate("./")}
                >
                  Notas
                </Link>
                <Link
                  to={"/"}
                  className="linkNav"
                  onClick={() => navigate("/")}
                >
                  Cadastrar
                </Link>
              </div>
              <div className="itensUser">
                <div className="newQuiz">
                  <button className="btnQuiz">Criar Novo Simulado +</button>
                </div>
                <div className="perfilUser">
                  <p className="paragrafoUser">
                    Olá professor,
                    <br />
                    {userLogado.nome}
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
        <main className="main-content container">
            <div className="create-painel">
                <div>
                  <h1>Matéria</h1>
                  <select name="" id="">
                    <option value="Matemática">Matemática</option>
                    <option value="Português">Português</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biologia">Biologia</option>
                    <option value="Geografia">Geografia</option>
                    <option value="História">História</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Filosofia">Filosofia</option>
                    <option value="Sociologia">Sociologia</option>

                  </select>
                </div>
            </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CreateQuiz;
