import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  function handleLogout() {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/Login");
  }

  return (
    <header className="header-Prof">
      <div className="containerHeader container">
        <div className="divLogo">
          <Link to={"/Dashboard "}>
            <img className="logo" src={"/logo.png"} alt="Logo Expert Vest" />
          </Link>
        </div>
        <div className="navbar">
          <div className="linksNav">
            <Link to={"/Dashboard "} className="linkNav">
              {!userAtual.isTeacher ? "Simulados" : "Dashboard"}
            </Link>
            <Link to={"/Notas"} className="linkNav">
              Notas
            </Link>
            <Link to={"/Perfil"} className="linkNav">
              Perfil
            </Link>
            {userAtual.isTeacher === "director" ? <Link to={"/Cadastro"} className="linkNav">Cadastrar</Link> : null}
          </div>
          <div className="itensUser">
            {/* Mostra o botão "Criar Simulado" apenas para professor ou diretor */}
            {(userAtual.isTeacher === true ||
              userAtual.isTeacher === "director") && (
              <div className="newQuiz">
                <button
                  className="btnQuiz"
                  onClick={() =>
                    navigate("/CreateQuiz", { state: { user: userAtual } })
                  }
                >
                  Novo Simulado +
                </button>
              </div>
            )}
            <div className="perfilUser">
              <p className="paragrafoUser">
                {userAtual.isTeacher === "director"
                  ? "Olá Diretor"
                  : userAtual.isTeacher === true
                  ? "Olá Professor(a)"
                  : "Olá Aluno(a)"}
                ,
                <br />
                {userAtual.primeiroNome} {userAtual.sobrenome}
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
  );
};

export default Header;
